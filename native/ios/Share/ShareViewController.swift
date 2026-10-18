import UIKit
import UniformTypeIdentifiers

// "Share → Tega.exe": saves the link or text to the inbox; the app files it next time it opens.
class ShareViewController: UIViewController {
    let label = UILabel()
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.85)
        label.text = "Saving to Tega.exe…"
        label.textColor = UIColor(red: 0.22, green: 1, blue: 0.62, alpha: 1)
        label.font = .monospacedSystemFont(ofSize: 17, weight: .bold)
        label.textAlignment = .center; label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)
        NSLayoutConstraint.activate([label.centerXAnchor.constraint(equalTo: view.centerXAnchor), label.centerYAnchor.constraint(equalTo: view.centerYAnchor), label.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8)])
        collect()
    }
    func collect() {
        let items = (extensionContext?.inputItems as? [NSExtensionItem]) ?? []
        let g = DispatchGroup(); var got: [[String: String]] = []; let lk = NSLock()
        let add = { (t: String, v: String) in lk.lock(); got.append(["t": t, "v": String(v.prefix(2000))]); lk.unlock() }
        for it in items {
            if let s = it.attributedContentText?.string, !s.isEmpty { add("text", s) }
            for p in it.attachments ?? [] {
                if p.hasItemConformingToTypeIdentifier(UTType.url.identifier) {
                    g.enter(); p.loadItem(forTypeIdentifier: UTType.url.identifier) { v, _ in if let u = v as? URL { add("url", u.absoluteString) }; g.leave() }
                } else if p.hasItemConformingToTypeIdentifier(UTType.plainText.identifier) {
                    g.enter(); p.loadItem(forTypeIdentifier: UTType.plainText.identifier) { v, _ in if let s = v as? String { add("text", s) }; g.leave() }
                }
            }
        }
        g.notify(queue: .main) {
            var L: [[String: Any]] = []
            if let s = TegaShared.get("inbox"), let d = s.data(using: .utf8), let o = try? JSONSerialization.jsonObject(with: d) as? [[String: Any]] { L = o }
            // one entry per share: url wins, text kept as the note
            let url = got.first(where: { $0["t"] == "url" })?["v"]
            let text = got.first(where: { $0["t"] == "text" })?["v"]
            if url != nil || text != nil {
                L.append(["url": url ?? "", "text": text ?? "", "at": Int(Date().timeIntervalSince1970 * 1000)])
                if let d = try? JSONSerialization.data(withJSONObject: Array(L.suffix(30))), let s = String(data: d, encoding: .utf8) { TegaShared.set("inbox", s) }
                self.label.text = "✓ Saved to Tega.exe\nOpen the app to file it."
            } else { self.label.text = "Nothing to save here." }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.9) { self.extensionContext?.completeRequest(returningItems: nil) }
        }
    }
}
