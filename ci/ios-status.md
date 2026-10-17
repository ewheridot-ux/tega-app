# iPhone build #11 — failure

Sat Oct 17 05:32:06 UTC 2026

```
Command line invocation:
    /Applications/Xcode_16.4.app/Contents/Developer/usr/bin/xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release -destination generic/platform=iOS -archivePath /Users/runner/work/_temp/App.xcarchive -allowProvisioningUpdates -authenticationKeyPath /Users/runner/.appstoreconnect/private_keys/AuthKey_3Q27XB8HJ5.p8 -authenticationKeyID 3Q27XB8HJ5 -authenticationKeyIssuerID 1536b8a6-d222-4605-8a6c-cadc831207dd DEVELOPMENT_TEAM=D5YMUKRPZV CODE_SIGN_STYLE=Automatic CURRENT_PROJECT_VERSION=11 MARKETING_VERSION=1.0 archive

Build settings from command line:
    CODE_SIGN_STYLE = Automatic
    CURRENT_PROJECT_VERSION = 11
    DEVELOPMENT_TEAM = D5YMUKRPZV
    MARKETING_VERSION = 1.0

ComputePackagePrebuildTargetDependencyGraph

Prepare packages

CreateBuildRequest

SendProjectDescription

CreateBuildOperation

ComputeTargetDependencyGraph
note: Building targets in dependency order
note: Target dependency graph (14 targets)
    Target 'App' in project 'App'
        ➜ Implicit dependency on target 'Pods-App' in project 'Pods' via file 'Pods_App.framework' in build phase 'Link Binary'
        ➜ Implicit dependency on target 'Capacitor' in project 'Pods' via options '-framework Capacitor' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorApp' in project 'Pods' via options '-framework CapacitorApp' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorFilesystem' in project 'Pods' via options '-framework CapacitorFilesystem' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorGeolocation' in project 'Pods' via options '-framework CapacitorGeolocation' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorHaptics' in project 'Pods' via options '-framework CapacitorHaptics' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorLocalNotifications' in project 'Pods' via options '-framework CapacitorLocalNotifications' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorShare' in project 'Pods' via options '-framework CapacitorShare' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorSplashScreen' in project 'Pods' via options '-framework CapacitorSplashScreen' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorStatusBar' in project 'Pods' via options '-framework CapacitorStatusBar' in build setting 'OTHER_LDFLAGS'
        ➜ Implicit dependency on target 'CapacitorCordova' in project 'Pods' via options '-framework Cordova' in build setting 'OTHER_LDFLAGS'
    Target 'Pods-App' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorApp' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorCordova' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorFilesystem' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorGeolocation' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorHaptics' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorLocalNotifications' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorShare' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorSplashScreen' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorStatusBar' in project 'Pods'
        ➜ Explicit dependency on target 'IONFilesystemLib' in project 'Pods'
        ➜ Explicit dependency on target 'IONGeolocationLib' in project 'Pods'
    Target 'CapacitorStatusBar' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
    Target 'CapacitorSplashScreen' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
    Target 'CapacitorShare' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
    Target 'CapacitorLocalNotifications' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
    Target 'CapacitorHaptics' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
    Target 'CapacitorGeolocation' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
        ➜ Explicit dependency on target 'IONGeolocationLib' in project 'Pods'
    Target 'IONGeolocationLib' in project 'Pods' (no dependencies)
    Target 'CapacitorFilesystem' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
        ➜ Explicit dependency on target 'IONFilesystemLib' in project 'Pods'
    Target 'IONFilesystemLib' in project 'Pods' (no dependencies)
    Target 'CapacitorApp' in project 'Pods'
        ➜ Explicit dependency on target 'Capacitor' in project 'Pods'
    Target 'Capacitor' in project 'Pods'
        ➜ Explicit dependency on target 'CapacitorCordova' in project 'Pods'
    Target 'CapacitorCordova' in project 'Pods' (no dependencies)

GatherProvisioningInputs

CreateBuildDescription

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -v -E -dM -arch arm64 -isysroot /Applications/Xcode_16.4.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS18.5.sdk -x c -c /dev/null

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/usr/bin/actool --print-asset-tag-combinations --output-format xml1 /Users/runner/work/tega-app/tega-app/ios/App/App/Assets.xcassets

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/usr/bin/ibtool --version --output-format xml1

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -v -E -dM -isysroot /Applications/Xcode_16.4.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS18.5.sdk -x c -c /dev/null

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -v -E -dM -arch arm64 -isysroot /Applications/Xcode_16.4.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS18.5.sdk -x objective-c -c /dev/null

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swiftc --version

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/libtool -V

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/ld -version_details

ExecuteExternalTool /Applications/Xcode_16.4.app/Contents/Developer/usr/bin/actool --version --output-format xml1

Build description signature: c1f46933457aadc03b6a83094ee07709
Build description path: /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/XCBuildData/c1f46933457aadc03b6a83094ee07709.xcbuilddata
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorApp' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorShare' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorSplashScreen' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorGeolocation' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'IONGeolocationLib' from project 'Pods')
warning: Run script build phase '[CP] Copy XCFrameworks' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'IONGeolocationLib' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorLocalNotifications' from project 'Pods')
/Users/runner/work/tega-app/tega-app/ios/App/App.xcodeproj: error: Communication with Apple failed: Your team has no devices from which to generate a provisioning profile. Connect a device to use or manually add device IDs in Certificates, Identifiers & Profiles. https://developer.apple.com/account/ (in target 'App' from project 'App')
/Users/runner/work/tega-app/tega-app/ios/App/App.xcodeproj: error: No profiles for 'com.ewheridot.tegaexe' were found: Xcode couldn't find any iOS App Development provisioning profiles matching 'com.ewheridot.tegaexe'. (in target 'App' from project 'App')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'App' from project 'App')
warning: Run script build phase '[CP] Embed Pods Frameworks' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'App' from project 'App')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorCordova' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'Pods-App' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'Capacitor' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorFilesystem' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'IONFilesystemLib' from project 'Pods')
warning: Run script build phase '[CP] Copy XCFrameworks' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'IONFilesystemLib' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorHaptics' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorStatusBar' from project 'Pods')
** ARCHIVE FAILED **


The following build commands failed:
	Archiving workspace App with scheme App
(1 failure)
```
