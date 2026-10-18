import Foundation

// What the web app writes for widgets / Siri (key "widget" in the shared keychain).
struct TegaWidgetData {
    var streak = 0, lvl = 1, habitsDone = 0, habitsTotal = 0
    var mult = "1.0", check = false, boss = "", bossHp = 0.0, day = ""
    var top: [String] = []
    static func load() -> TegaWidgetData {
        var w = TegaWidgetData()
        guard let s = TegaShared.get("widget"), let d = s.data(using: .utf8), let o = (try? JSONSerialization.jsonObject(with: d)) as? [String: Any] else { return w }
        w.streak = o["streak"] as? Int ?? 0
        w.lvl = o["lvl"] as? Int ?? 1
        if let m = o["mult"] as? Double { var t = String(format: "%.2f", m); while t.hasSuffix("0") { t.removeLast() }; if t.hasSuffix(".") { t.removeLast() }; w.mult = t } else if let m = o["mult"] as? String { w.mult = m }
        w.top = ((o["top3"] as? [Any]) ?? []).compactMap { x -> String? in
            if let t = x as? String { return t }
            guard let d = x as? [String: Any], (d["done"] as? Bool) != true else { return nil }
            return d["t"] as? String
        }
        if let h = o["habits"] as? [String: Any] { w.habitsDone = h["done"] as? Int ?? 0; w.habitsTotal = h["total"] as? Int ?? 0 }
        w.check = o["checkedIn"] as? Bool ?? false
        if let b = o["boss"] as? [String: Any] { w.boss = b["name"] as? String ?? ""; w.bossHp = b["hp"] as? Double ?? 0 }
        w.day = o["day"] as? String ?? ""
        return w
    }
    // a new day since the app last wrote: habits reset, check-in pending
    var stale: Bool {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd"
        return !day.isEmpty && day != f.string(from: Date())
    }
}
