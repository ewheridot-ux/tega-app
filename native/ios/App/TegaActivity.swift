import Foundation
#if canImport(ActivityKit)
import ActivityKit

// Live Activity for a workout: shared by the app and the widget extension.
@available(iOS 16.1, *)
struct TegaWorkoutAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var label: String      // "Bench 3/4" or "Rest"
        var detail: String     // "60 kg × 8"
        var restEnds: Date?    // counts down when resting
        var sets: Int
    }
    var title: String          // "Push day"
    var started: Date
}
#endif
