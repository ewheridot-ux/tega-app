import Foundation
import UIKit
import Capacitor
import LocalAuthentication
import UserNotifications
#if canImport(HealthKit)
import HealthKit
#endif
#if canImport(WidgetKit)
import WidgetKit
#endif
#if canImport(ActivityKit)
import ActivityKit
#endif

// Quick actions, Siri and the share sheet drop ids here; the web app picks them up.
enum TegaPending {
    static let note = Notification.Name("TegaPendingAction")
    static func add(_ id: String) {
        var L = UserDefaults.standard.stringArray(forKey: "tegaPending") ?? []
        L.append(id); UserDefaults.standard.set(Array(L.suffix(8)), forKey: "tegaPending")
        NotificationCenter.default.post(name: note, object: nil)
    }
    static func take() -> [String] {
        let L = UserDefaults.standard.stringArray(forKey: "tegaPending") ?? []
        UserDefaults.standard.removeObject(forKey: "tegaPending"); return L
    }
}

@objc(TegaNativePlugin)
public class TegaNativePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TegaNativePlugin"
    public let jsName = "TegaNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "badge", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setShared", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getShared", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setShortcuts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "takePending", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "healthRead", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "healthSaveWorkout", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "liveStart", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "liveUpdate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "liveEnd", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "info", returnType: CAPPluginReturnPromise),
    ]

    override public func load() {
        NotificationCenter.default.addObserver(forName: TegaPending.note, object: nil, queue: .main) { [weak self] _ in
            for id in TegaPending.take() { self?.notifyListeners("shortcut", data: ["id": id], retainUntilConsumed: true) }
        }
    }

    @objc func info(_ call: CAPPluginCall) {
        var hk = false
        #if canImport(HealthKit)
        hk = HKHealthStore.isHealthDataAvailable()
        #endif
        call.resolve(["ok": true, "health": hk, "group": TegaShared.group ?? "", "widgets": Bundle.main.object(forInfoDictionaryKey: "TegaHasWidgets") != nil])
    }

    @objc func badge(_ call: CAPPluginCall) {
        let n = max(0, call.getInt("count") ?? 0)
        UNUserNotificationCenter.current().requestAuthorization(options: [.badge]) { _, _ in
            DispatchQueue.main.async {
                if #available(iOS 16.0, *) { UNUserNotificationCenter.current().setBadgeCount(n) { _ in } }
                else { UIApplication.shared.applicationIconBadgeNumber = n }
                call.resolve(["ok": true])
            }
        }
    }

    @objc func unlock(_ call: CAPPluginCall) {
        let ctx = LAContext(); var err: NSError?
        guard ctx.canEvaluatePolicy(.deviceOwnerAuthentication, error: &err) else { call.resolve(["ok": true, "none": true]); return }
        ctx.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: call.getString("reason") ?? "Unlock Tega.exe") { ok, _ in
            call.resolve(["ok": ok])
        }
    }

    @objc func setShared(_ call: CAPPluginCall) {
        guard let k = call.getString("key") else { call.reject("key"); return }
        TegaShared.set(k, call.getString("value") ?? "")
        #if canImport(WidgetKit)
        if k == "widget", #available(iOS 14.0, *) { WidgetCenter.shared.reloadAllTimelines() }
        #endif
        call.resolve(["ok": true])
    }

    @objc func getShared(_ call: CAPPluginCall) {
        guard let k = call.getString("key") else { call.reject("key"); return }
        call.resolve(["value": TegaShared.get(k) ?? ""])
    }

    @objc func setShortcuts(_ call: CAPPluginCall) {
        let items = (call.getArray("items") as? [[String: Any]]) ?? []
        DispatchQueue.main.async {
            UIApplication.shared.shortcutItems = items.compactMap { o in
                guard let id = o["id"] as? String, let t = o["title"] as? String else { return nil }
                let icon = (o["icon"] as? String).map { UIApplicationShortcutIcon(systemImageName: $0) }
                return UIApplicationShortcutItem(type: id, localizedTitle: t, localizedSubtitle: o["subtitle"] as? String, icon: icon, userInfo: nil)
            }
            call.resolve(["ok": true])
        }
    }

    @objc func takePending(_ call: CAPPluginCall) { call.resolve(["ids": TegaPending.take()]) }

    // ---------- Apple Health ----------
    #if canImport(HealthKit)
    let store = HKHealthStore()
    static func wName(_ t: HKWorkoutActivityType) -> String {
        switch t {
        case .traditionalStrengthTraining: return "traditionalStrengthTraining"
        case .functionalStrengthTraining: return "functionalStrengthTraining"
        case .highIntensityIntervalTraining: return "highIntensityIntervalTraining"
        case .coreTraining: return "coreTraining"
        case .crossTraining: return "crossTraining"
        case .running: return "running"
        case .walking: return "walking"
        case .cycling: return "cycling"
        case .swimming: return "swimming"
        case .yoga: return "yoga"
        case .pilates: return "pilates"
        case .dance: return "dance"
        case .elliptical: return "elliptical"
        case .rowing: return "rowing"
        case .stairClimbing: return "stairClimbing"
        case .boxing: return "boxing"
        case .hiking: return "hiking"
        case .basketball: return "basketball"
        case .soccer: return "soccer"
        case .tennis: return "tennis"
        case .flexibility: return "flexibility"
        case .mixedCardio: return "mixedCardio"
        default: return "other"
        }
    }
    #endif

    @objc func healthRead(_ call: CAPPluginCall) {
        #if canImport(HealthKit)
        guard HKHealthStore.isHealthDataAvailable() else { call.resolve(["ok": false, "reason": "unavailable"]); return }
        let days = Double(call.getInt("days") ?? 14)
        var read: Set<HKObjectType> = [HKObjectType.workoutType()]
        for id in [HKQuantityTypeIdentifier.stepCount, .bodyMass, .activeEnergyBurned] { if let t = HKObjectType.quantityType(forIdentifier: id) { read.insert(t) } }
        if let s = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) { read.insert(s) }
        var write: Set<HKSampleType> = [HKObjectType.workoutType()]
        if let e = HKObjectType.quantityType(forIdentifier: .activeEnergyBurned) { write.insert(e) }
        store.requestAuthorization(toShare: write, read: read) { [weak self] _, err in
            guard let self = self else { return }
            if let err = err { call.resolve(["ok": false, "reason": err.localizedDescription]); return }
            let end = Date(), start = end.addingTimeInterval(-days * 86400)
            let iso = ISO8601DateFormatter()
            let g = DispatchGroup()
            var workouts: [[String: Any]] = [], sleep: [[String: Any]] = [], steps: [[String: Any]] = [], weight: [[String: Any]] = []
            let pred = HKQuery.predicateForSamples(withStart: start, end: end, options: [])
            let newest = [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)]
            g.enter()
            self.store.execute(HKSampleQuery(sampleType: HKObjectType.workoutType(), predicate: pred, limit: 200, sortDescriptors: newest) { _, s, _ in
                for w in (s as? [HKWorkout]) ?? [] {
                    let cal = w.totalEnergyBurned?.doubleValue(for: .kilocalorie()) ?? 0
                    workouts.append(["type": TegaNativePlugin.wName(w.workoutActivityType), "start": iso.string(from: w.startDate), "end": iso.string(from: w.endDate), "cal": cal, "src": w.sourceRevision.source.name])
                }
                g.leave()
            })
            if let st = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) {
                g.enter()
                self.store.execute(HKSampleQuery(sampleType: st, predicate: pred, limit: 3000, sortDescriptors: newest) { _, s, _ in
                    for x in (s as? [HKCategorySample]) ?? [] {
                        let state = x.value == HKCategoryValueSleepAnalysis.inBed.rawValue ? "inBed" : x.value == HKCategoryValueSleepAnalysis.awake.rawValue ? "awake" : "asleep"
                        sleep.append(["start": iso.string(from: x.startDate), "end": iso.string(from: x.endDate), "state": state])
                    }
                    g.leave()
                })
            }
            if let qt = HKObjectType.quantityType(forIdentifier: .stepCount) {
                g.enter()
                let anchor = Calendar.current.startOfDay(for: start)
                let q = HKStatisticsCollectionQuery(quantityType: qt, quantitySamplePredicate: pred, options: .cumulativeSum, anchorDate: anchor, intervalComponents: DateComponents(day: 1))
                q.initialResultsHandler = { _, res, _ in
                    res?.enumerateStatistics(from: anchor, to: end) { st, _ in
                        let v = st.sumQuantity()?.doubleValue(for: .count()) ?? 0
                        if v > 0 { steps.append(["start": iso.string(from: st.startDate), "value": v]) }
                    }
                    g.leave()
                }
                self.store.execute(q)
            }
            if let bt = HKObjectType.quantityType(forIdentifier: .bodyMass) {
                g.enter()
                let p90 = HKQuery.predicateForSamples(withStart: end.addingTimeInterval(-90 * 86400), end: end, options: [])
                self.store.execute(HKSampleQuery(sampleType: bt, predicate: p90, limit: 30, sortDescriptors: newest) { _, s, _ in
                    for x in (s as? [HKQuantitySample]) ?? [] { weight.append(["d": iso.string(from: x.startDate), "value": x.quantity.doubleValue(for: .pound()), "unit": "lb"]) }
                    g.leave()
                })
            }
            g.notify(queue: .main) { call.resolve(["ok": true, "own": true, "workouts": workouts, "sleep": sleep, "steps": steps, "weight": weight]) }
        }
        #else
        call.resolve(["ok": false, "reason": "unavailable"])
        #endif
    }

    @objc func healthSaveWorkout(_ call: CAPPluginCall) {
        #if canImport(HealthKit)
        guard HKHealthStore.isHealthDataAvailable() else { call.resolve(["ok": false]); return }
        let iso = ISO8601DateFormatter()
        guard let s = call.getString("start").flatMap({ iso.date(from: $0) }), let e = call.getString("end").flatMap({ iso.date(from: $0) }), e > s else { call.reject("dates"); return }
        let kcal = call.getDouble("cal") ?? 0
        let type: HKWorkoutActivityType = (call.getString("kind") ?? "") == "cardio" ? .mixedCardio : .traditionalStrengthTraining
        let cfg = HKWorkoutConfiguration(); cfg.activityType = type
        let b = HKWorkoutBuilder(healthStore: store, configuration: cfg, device: .local())
        b.beginCollection(withStart: s) { ok, err in
            guard ok else { call.resolve(["ok": false, "reason": err?.localizedDescription ?? "begin"]); return }
            var samples: [HKSample] = []
            if kcal > 0, let et = HKObjectType.quantityType(forIdentifier: .activeEnergyBurned) {
                samples.append(HKQuantitySample(type: et, quantity: HKQuantity(unit: .kilocalorie(), doubleValue: kcal), start: s, end: e))
            }
            let finish = {
                b.endCollection(withEnd: e) { _, _ in
                    b.finishWorkout { w, err in call.resolve(["ok": w != nil, "reason": err?.localizedDescription ?? ""]) }
                }
            }
            if samples.isEmpty { finish() } else { b.add(samples) { _, _ in finish() } }
        }
        #else
        call.resolve(["ok": false])
        #endif
    }

    // ---------- Live Activity (workout timer on the lock screen + Dynamic Island) ----------
    @objc func liveStart(_ call: CAPPluginCall) {
        #if canImport(ActivityKit)
        if #available(iOS 16.2, *) {
            guard ActivityAuthorizationInfo().areActivitiesEnabled else { call.resolve(["ok": false, "reason": "off"]); return }
            for a in Activity<TegaWorkoutAttributes>.activities { Task { await a.end(nil, dismissalPolicy: .immediate) } }
            let attr = TegaWorkoutAttributes(title: call.getString("title") ?? "Workout", started: Date())
            let st = TegaWorkoutAttributes.ContentState(label: call.getString("label") ?? "", detail: call.getString("detail") ?? "", restEnds: nil, sets: call.getInt("sets") ?? 0)
            do { _ = try Activity.request(attributes: attr, content: .init(state: st, staleDate: nil)); call.resolve(["ok": true]) }
            catch { call.resolve(["ok": false, "reason": error.localizedDescription]) }
            return
        }
        #endif
        call.resolve(["ok": false, "reason": "old iOS"])
    }

    @objc func liveUpdate(_ call: CAPPluginCall) {
        #if canImport(ActivityKit)
        if #available(iOS 16.2, *) {
            let rest = call.getInt("rest") ?? 0
            let st = TegaWorkoutAttributes.ContentState(label: call.getString("label") ?? "", detail: call.getString("detail") ?? "", restEnds: rest > 0 ? Date().addingTimeInterval(Double(rest)) : nil, sets: call.getInt("sets") ?? 0)
            for a in Activity<TegaWorkoutAttributes>.activities { Task { await a.update(.init(state: st, staleDate: nil)) } }
            call.resolve(["ok": true]); return
        }
        #endif
        call.resolve(["ok": false])
    }

    @objc func liveEnd(_ call: CAPPluginCall) {
        #if canImport(ActivityKit)
        if #available(iOS 16.2, *) {
            for a in Activity<TegaWorkoutAttributes>.activities { Task { await a.end(nil, dismissalPolicy: .default) } }
        }
        #endif
        call.resolve(["ok": true])
    }
}

// Registers the plugin with the web view (local plugins aren't auto-discovered).
class TegaViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(TegaNativePlugin())
    }
}

// Home-screen quick actions (long-press the icon).
extension AppDelegate {
    func application(_ application: UIApplication, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
        TegaPending.add(shortcutItem.type); completionHandler(true)
    }
}
