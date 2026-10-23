import WidgetKit
import SwiftUI
import ActivityKit

private let neon = Color(red: 0.22, green: 1.0, blue: 0.62)
private let dim = Color(red: 0.42, green: 0.55, blue: 0.5)
private let mono = Font.system(.caption, design: .monospaced)

struct TegaEntry: TimelineEntry { let date: Date; let w: TegaWidgetData }

struct TegaProvider: TimelineProvider {
    func placeholder(in context: Context) -> TegaEntry { TegaEntry(date: Date(), w: TegaWidgetData()) }
    func getSnapshot(in context: Context, completion: @escaping (TegaEntry) -> Void) { completion(TegaEntry(date: Date(), w: TegaWidgetData.load())) }
    func getTimeline(in context: Context, completion: @escaping (Timeline<TegaEntry>) -> Void) {
        let now = Date(), w = TegaWidgetData.load()
        // refresh again just after midnight so a new day shows as a fresh day
        let midnight = Calendar.current.startOfDay(for: now.addingTimeInterval(86400)).addingTimeInterval(60)
        completion(Timeline(entries: [TegaEntry(date: now, w: w), TegaEntry(date: midnight, w: w)], policy: .after(min(midnight, now.addingTimeInterval(3 * 3600)))))
    }
}

extension View {
    @ViewBuilder func tegaBg() -> some View {
        if #available(iOSApplicationExtension 17.0, *) { self.containerBackground(Color.black, for: .widget) }
        else { self.padding().background(Color.black) }
    }
}

struct TodayView: View {
    @Environment(\.widgetFamily) var family
    let e: TegaEntry
    var w: TegaWidgetData { e.w }
    var fresh: Bool { w.stale && Calendar.current.isDate(e.date, inSameDayAs: Date()) }
    var done: Int { fresh ? 0 : w.habitsDone }
    var next: String? { fresh ? nil : w.top.first }
    var body: some View {
        switch family {
        case .accessoryCircular:
            Gauge(value: Double(done), in: 0...Double(max(1, w.habitsTotal))) { Text("H") } currentValueLabel: { Text("\(done)") }
                .gaugeStyle(.accessoryCircularCapacity)
        case .accessoryInline:
            Text("🔥\(w.streak) · LV \(w.lvl) · \(done)/\(w.habitsTotal) habits")
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 1) {
                Text("🔥 \(w.streak) · LV \(w.lvl) · ×\(w.mult)").font(.headline)
                Text("\(done)/\(w.habitsTotal) habits").font(.caption)
                if let n = next { Text("▸ \(n)").font(.caption).lineLimit(1) }
            }
        case .systemMedium:
            HStack(alignment: .top, spacing: 14) {
                stats
                VStack(alignment: .leading, spacing: 4) {
                    Text("TOP 3").font(mono).foregroundColor(dim)
                    if fresh || w.top.isEmpty { Text(w.check && !fresh ? "All done ✓" : "Set your top 3").font(mono).foregroundColor(.white) }
                    else { ForEach(Array(w.top.prefix(3).enumerated()), id: \.offset) { _, t in Text("▸ \(t)").font(mono).foregroundColor(.white).lineLimit(1) } }
                    Spacer(minLength: 0)
                    if !w.boss.isEmpty { bossBar }
                }
            }.tegaBg()
        default:
            stats.tegaBg()
        }
    }
    var stats: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("TEGA.EXE").font(.system(size: 10, weight: .bold, design: .monospaced)).foregroundColor(neon)
            Text("🔥 \(w.streak)").font(.system(size: 28, weight: .bold, design: .monospaced)).foregroundColor(.white)
            Text("LV \(w.lvl) · ×\(w.mult)").font(mono).foregroundColor(neon)
            Spacer(minLength: 0)
            Text("\(done)/\(w.habitsTotal) habits").font(mono).foregroundColor(.white)
            Text(fresh || !w.check ? "▸ check in" : "checked in ✓").font(mono).foregroundColor(fresh || !w.check ? neon : dim)
        }
    }
    var bossBar: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(w.boss.uppercased()).font(.system(size: 9, design: .monospaced)).foregroundColor(dim)
            GeometryReader { g in ZStack(alignment: .leading) { Rectangle().fill(Color(white: 0.15)); Rectangle().fill(Color(red: 1, green: 0.3, blue: 0.37)).frame(width: g.size.width * w.bossHp) } }.frame(height: 6)
        }
    }
}

struct TodayWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "TegaToday", provider: TegaProvider()) { e in TodayView(e: e).widgetURL(URL(string: "tegaexe://start")) }
            .configurationDisplayName("Today")
            .description("Streak, level, habits and your top 3.")
            .supportedFamilies([.systemSmall, .systemMedium, .accessoryCircular, .accessoryRectangular, .accessoryInline])
    }
}

struct WorkoutLive: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TegaWorkoutAttributes.self) { ctx in
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(ctx.attributes.title.uppercased()).font(.system(size: 11, weight: .bold, design: .monospaced)).foregroundColor(Color(red: 0.72, green: 0.55, blue: 1))
                    Text(ctx.state.label).font(.headline).foregroundColor(.white)
                    Text(ctx.state.detail).font(mono).foregroundColor(dim)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    if let r = ctx.state.restEnds, r > Date() { Text("REST").font(mono).foregroundColor(dim); Text(timerInterval: Date()...r, countsDown: true).font(.system(size: 26, weight: .bold, design: .monospaced)).foregroundColor(neon).multilineTextAlignment(.trailing) }
                    else { Text("\(ctx.state.sets) sets").font(mono).foregroundColor(dim); Text(ctx.attributes.started, style: .timer).font(.system(size: 26, weight: .bold, design: .monospaced)).foregroundColor(.white).multilineTextAlignment(.trailing) }
                }.frame(width: 110)
            }.padding().activityBackgroundTint(Color.black).activitySystemActionForegroundColor(neon)
            .widgetURL(URL(string: "tegaexe://workout?resume=1"))  // lock-screen tap → the live workout (was missing, so taps opened the last page)
        } dynamicIsland: { ctx in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) { Text(ctx.state.label).font(.headline).lineLimit(1) }
                DynamicIslandExpandedRegion(.trailing) {
                    if let r = ctx.state.restEnds, r > Date() { Text(timerInterval: Date()...r, countsDown: true).monospacedDigit().foregroundColor(neon).frame(width: 64) }
                    else { Text(ctx.attributes.started, style: .timer).monospacedDigit().frame(width: 64) }
                }
                DynamicIslandExpandedRegion(.bottom) { Text(ctx.state.detail).font(mono).foregroundColor(dim) }
            } compactLeading: { Image(systemName: "dumbbell.fill").foregroundColor(Color(red: 0.72, green: 0.55, blue: 1)) } compactTrailing: {
                if let r = ctx.state.restEnds, r > Date() { Text(timerInterval: Date()...r, countsDown: true).monospacedDigit().foregroundColor(neon).frame(width: 44) }
                else { Text(ctx.attributes.started, style: .timer).monospacedDigit().frame(width: 44) }
            } minimal: { Image(systemName: "dumbbell.fill").foregroundColor(neon) }
            .widgetURL(URL(string: "tegaexe://workout?resume=1"))
        }
    }
}

@main
struct TegaWidgetBundle: WidgetBundle {
    var body: some Widget { TodayWidget(); WorkoutLive() }
}
