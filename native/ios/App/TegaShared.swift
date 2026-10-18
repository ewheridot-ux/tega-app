import Foundation
import Security

// Keychain shared by the app, the widgets and the share extension (no App Group needed).
enum TegaShared {
    static var group: String? { Bundle.main.object(forInfoDictionaryKey: "TegaKeychainGroup") as? String }
    static func base(_ key: String) -> [String: Any] {
        var q: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrService as String: "tega.shared",
                                kSecAttrAccount as String: key]
        if let g = group, !g.isEmpty, !g.hasPrefix("$") { q[kSecAttrAccessGroup as String] = g }
        return q
    }
    static func set(_ key: String, _ value: String) {
        let q = base(key)
        SecItemDelete(q as CFDictionary)
        if value.isEmpty { return }
        var add = q
        add[kSecValueData as String] = Data(value.utf8)
        add[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
        SecItemAdd(add as CFDictionary, nil)
    }
    static func get(_ key: String) -> String? {
        var q = base(key)
        q[kSecReturnData as String] = true
        q[kSecMatchLimit as String] = kSecMatchLimitOne
        var out: AnyObject?
        guard SecItemCopyMatching(q as CFDictionary, &out) == errSecSuccess, let d = out as? Data else { return nil }
        return String(data: d, encoding: .utf8)
    }
}
