import Foundation
import UIKit
import Capacitor
import PhotosUI
import AVFoundation
import UniformTypeIdentifiers

// Tape vault (Modeling): move casting tapes, selfies and digitals out of Photos into Tega's own folder on this phone.
// vaultPick copies what you choose (originals untouched), vaultDelete asks iOS to remove the originals
// (iOS shows its own "Delete N items?" and keeps them in Recently Deleted for 30 days), vaultRemove deletes vault files.
enum TegaVaultState { static var call: CAPPluginCall? }

extension TegaNativePlugin: PHPickerViewControllerDelegate {
    static func vaultDir() -> URL {
        let d = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("TegaVault", isDirectory: true)
        try? FileManager.default.createDirectory(at: d, withIntermediateDirectories: true)
        return d
    }

    @objc func vaultPick(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            var cfg = PHPickerConfiguration(photoLibrary: .shared())
            cfg.selectionLimit = 0
            cfg.filter = .any(of: [.images, .videos])
            cfg.preferredAssetRepresentationMode = .current
            let p = PHPickerViewController(configuration: cfg)
            p.delegate = self
            TegaVaultState.call = call
            guard let vc = self.bridge?.viewController else { call.resolve(["items": [], "reason": "no view"]); return }
            vc.present(p, animated: true)
        }
    }

    public func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
        picker.dismiss(animated: true)
        guard let call = TegaVaultState.call else { return }
        TegaVaultState.call = nil
        if results.isEmpty { call.resolve(["items": []]); return }
        let dir = TegaNativePlugin.vaultDir()
        let g = DispatchGroup(), lock = NSLock()
        var items: [[String: Any]] = []
        for r in results {
            let prov = r.itemProvider
            let isVid = prov.hasItemConformingToTypeIdentifier(UTType.movie.identifier)
            let type = isVid ? UTType.movie.identifier : UTType.image.identifier
            g.enter()
            prov.loadFileRepresentation(forTypeIdentifier: type) { url, _ in
                defer { g.leave() }
                guard let url = url else { return }
                let id = UUID().uuidString
                var ext = url.pathExtension.lowercased()
                if ext.isEmpty { ext = isVid ? "mov" : "jpg" }
                var dest = dir.appendingPathComponent("\(id).\(ext)")
                var img: UIImage? = nil
                if !isVid, ["heic", "heif"].contains(ext), let im = UIImage(contentsOfFile: url.path), let jpg = im.jpegData(compressionQuality: 0.92) {
                    dest = dir.appendingPathComponent("\(id).jpg")   // the app's web view shows JPEG everywhere
                    do { try jpg.write(to: dest) } catch { return }
                    img = im
                } else {
                    do { try FileManager.default.copyItem(at: url, to: dest) } catch { return }
                }
                var item: [String: Any] = ["id": id, "file": dest.absoluteString, "kind": isVid ? "video" : "photo", "asset": r.assetIdentifier ?? ""]
                if isVid {
                    let a = AVURLAsset(url: dest)
                    let gen = AVAssetImageGenerator(asset: a)
                    gen.appliesPreferredTrackTransform = true
                    gen.maximumSize = CGSize(width: 480, height: 480)
                    if let cg = try? gen.copyCGImage(at: CMTime(seconds: 0.5, preferredTimescale: 600), actualTime: nil) { img = UIImage(cgImage: cg) }
                    let dur = CMTimeGetSeconds(a.duration)
                    if dur.isFinite { item["dur"] = dur }
                } else if img == nil {
                    img = UIImage(contentsOfFile: dest.path)
                }
                if let im = img {
                    let w: CGFloat = 480, h = w * im.size.height / max(1, im.size.width)
                    let small = im.preparingThumbnail(of: CGSize(width: w, height: h)) ?? im
                    let t = dir.appendingPathComponent("\(id)_t.jpg")
                    if let d = small.jpegData(compressionQuality: 0.75), (try? d.write(to: t)) != nil { item["thumb"] = t.absoluteString }
                }
                if let sz = (try? FileManager.default.attributesOfItem(atPath: dest.path))?[.size] as? NSNumber { item["size"] = sz.intValue }
                lock.lock(); items.append(item); lock.unlock()
            }
        }
        g.notify(queue: .main) { call.resolve(["items": items]) }
    }

    @objc func vaultDelete(_ call: CAPPluginCall) {
        let ids = (call.getArray("assets") ?? []).compactMap { $0 as? String }.filter { !$0.isEmpty }
        if ids.isEmpty { call.resolve(["ok": false, "deleted": 0, "reason": "nothing to delete"]); return }
        PHPhotoLibrary.requestAuthorization(for: .readWrite) { st in
            guard st == .authorized || st == .limited else { call.resolve(["ok": false, "deleted": 0, "reason": "no access"]); return }
            let assets = PHAsset.fetchAssets(withLocalIdentifiers: ids, options: nil)
            if assets.count == 0 { call.resolve(["ok": false, "deleted": 0, "reason": "not found"]); return }
            PHPhotoLibrary.shared().performChanges({ PHAssetChangeRequest.deleteAssets(assets) }) { ok, err in
                call.resolve(["ok": ok, "deleted": ok ? assets.count : 0, "reason": err?.localizedDescription ?? ""])
            }
        }
    }

    @objc func vaultRemove(_ call: CAPPluginCall) {
        let dir = TegaNativePlugin.vaultDir().standardizedFileURL.path
        var n = 0
        for s in (call.getArray("files") ?? []).compactMap({ $0 as? String }) {
            guard let u = URL(string: s), u.isFileURL, u.standardizedFileURL.path.hasPrefix(dir) else { continue }   // only ever inside the vault
            if (try? FileManager.default.removeItem(at: u)) != nil { n += 1 }
        }
        call.resolve(["removed": n])
    }
}
