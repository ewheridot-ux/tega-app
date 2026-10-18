import Foundation
import BackgroundTasks
#if canImport(WidgetKit)
import WidgetKit
#endif
#if canImport(AppIntents)
import AppIntents

@available(iOS 16.0, *)
struct StartDayIntent: AppIntent {
    static var title: LocalizedStringResource = "Start the day"
    static var description = IntentDescription("Opens your check-in and Top 3.")
    static var openAppWhenRun: Bool = true
    func perform() async throws -> some IntentResult { TegaPending.add("start"); return .result() }
}
@available(iOS 16.0, *)
struct LogPostIntent: AppIntent {
    static var title: LocalizedStringResource = "Log a post"
    static var openAppWhenRun: Bool = true
    func perform() async throws -> some IntentResult { TegaPending.add("post"); return .result() }
}
@available(iOS 16.0, *)
struct StartWorkoutIntent: AppIntent {
    static var title: LocalizedStringResource = "Start workout"
    static var openAppWhenRun: Bool = true
    func perform() async throws -> some IntentResult { TegaPending.add("workout"); return .result() }
}
@available(iOS 16.0, *)
struct ScanReceiptIntent: AppIntent {
    static var title: LocalizedStringResource = "Scan receipt"
    static var openAppWhenRun: Bool = true
    func perform() async throws -> some IntentResult { TegaPending.add("receipt"); return .result() }
}
@available(iOS 16.0, *)
struct StatusIntent: AppIntent {
    static var title: LocalizedStringResource = "How am I doing"
    static var description = IntentDescription("Streak, level and what's left today, without opening the app.")
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let w = TegaWidgetData.load()
        let left = max(0, w.habitsTotal - w.habitsDone)
        let top = w.top.isEmpty ? "" : " Next: \(w.top[0])."
        return .result(dialog: "Level \(w.lvl), \(w.streak)-day streak, XP times \(w.mult). \(left == 0 ? "All habits done." : "\(left) habits left.")\(top)")
    }
}

@available(iOS 16.0, *)
struct TegaShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(intent: StartDayIntent(), phrases: ["Start the day in \(.applicationName)", "Check in with \(.applicationName)"], shortTitle: "Start the day", systemImageName: "sun.max.fill")
        AppShortcut(intent: LogPostIntent(), phrases: ["Log a post in \(.applicationName)"], shortTitle: "Log a post", systemImageName: "play.rectangle.fill")
        AppShortcut(intent: StartWorkoutIntent(), phrases: ["Start a workout in \(.applicationName)", "Start my workout in \(.applicationName)"], shortTitle: "Start workout", systemImageName: "dumbbell.fill")
        AppShortcut(intent: ScanReceiptIntent(), phrases: ["Scan a receipt in \(.applicationName)"], shortTitle: "Scan receipt", systemImageName: "doc.text.viewfinder")
        AppShortcut(intent: StatusIntent(), phrases: ["How am I doing in \(.applicationName)", "My streak in \(.applicationName)"], shortTitle: "How am I doing", systemImageName: "flame.fill")
    }
}
#endif

// Background refresh: keeps the widgets current (day rollover) while the app is closed.
enum TegaBG {
    static let id = "com.ewheridot.tegaexe.refresh"
    static func register() {
        BGTaskScheduler.shared.register(forTaskWithIdentifier: id, using: nil) { task in
            schedule()
            #if canImport(WidgetKit)
            if #available(iOS 14.0, *) { WidgetCenter.shared.reloadAllTimelines() }
            #endif
            task.setTaskCompleted(success: true)
        }
        schedule()
    }
    static func schedule() {
        let r = BGAppRefreshTaskRequest(identifier: id)
        r.earliestBeginDate = Date(timeIntervalSinceNow: 3 * 3600)
        try? BGTaskScheduler.shared.submit(r)
    }
}
