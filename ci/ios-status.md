# iPhone build #12 — success

Sat Oct 17 05:35:30 UTC 2026

```

sent 113029 bytes  received 70 bytes  53856666 bytes/sec
total size is 112589  speedup is 1.00
Symlinked...
rsync --delete -av --filter P .*.?????? --links --filter "- CVS/" --filter "- .svn/" --filter "- .git/" --filter "- .hg/" --filter "- Headers" --filter "- PrivateHeaders" --filter "- Modules" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/CapacitorSplashScreen.framework" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Frameworks"
Transfer starting: 3 files
CapacitorSplashScreen.framework/
CapacitorSplashScreen.framework/CapacitorSplashScreen
CapacitorSplashScreen.framework/Info.plist

sent 146325 bytes  received 70 bytes  47224193 bytes/sec
total size is 145853  speedup is 1.00
Symlinked...
rsync --delete -av --filter P .*.?????? --links --filter "- CVS/" --filter "- .svn/" --filter "- .git/" --filter "- .hg/" --filter "- Headers" --filter "- PrivateHeaders" --filter "- Modules" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/CapacitorStatusBar.framework" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Frameworks"
Transfer starting: 3 files
CapacitorStatusBar.framework/
CapacitorStatusBar.framework/CapacitorStatusBar
CapacitorStatusBar.framework/Info.plist

sent 165399 bytes  received 70 bytes  53377096 bytes/sec
total size is 164935  speedup is 1.00
rsync --delete -av --filter P .*.?????? --links --filter "- CVS/" --filter "- .svn/" --filter "- .git/" --filter "- .hg/" --filter "- Headers" --filter "- PrivateHeaders" --filter "- Modules" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/BuildProductsPath/Release-iphoneos/XCFrameworkIntermediates/IONFilesystemLib/IONFilesystemLib.framework" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Frameworks"
Transfer starting: 3 files
IONFilesystemLib.framework/
IONFilesystemLib.framework/IONFilesystemLib
IONFilesystemLib.framework/Info.plist

sent 149239 bytes  received 70 bytes  48164193 bytes/sec
total size is 148787  speedup is 1.00
rsync --delete -av --filter P .*.?????? --links --filter "- CVS/" --filter "- .svn/" --filter "- .git/" --filter "- .hg/" --filter "- Headers" --filter "- PrivateHeaders" --filter "- Modules" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/BuildProductsPath/Release-iphoneos/XCFrameworkIntermediates/IONGeolocationLib/IONGeolocationLib.framework" "/Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Frameworks"
Transfer starting: 3 files
IONGeolocationLib.framework/
IONGeolocationLib.framework/IONGeolocationLib
IONGeolocationLib.framework/Info.plist

sent 105189 bytes  received 70 bytes  33954516 bytes/sec
total size is 104737  speedup is 1.00

GenerateDSYMFile /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/BuildProductsPath/Release-iphoneos/App.app.dSYM /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/App (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/dsymutil /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/App -o /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/BuildProductsPath/Release-iphoneos/App.app.dSYM

ExtractAppIntentsMetadata (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/appintentsmetadataprocessor --toolchain-dir /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain --module-name App --sdk-root /Applications/Xcode_16.4.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS18.5.sdk --xcode-version 16F6 --platform-family iOS --deployment-target 14.0 --bundle-identifier com.ewheridot.tegaexe --output /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app --target-triple arm64-apple-ios14.0 --binary-file /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/App --dependency-file /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/Objects-normal/arm64/App_dependency_info.dat --stringsdata-file /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/Objects-normal/arm64/ExtractedAppShortcutsMetadata.stringsdata --source-file-list /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/Objects-normal/arm64/App.SwiftFileList --metadata-file-list /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/App.DependencyMetadataFileList --static-metadata-file-list /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/App.DependencyStaticMetadataFileList --swift-const-vals-list /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/Objects-normal/arm64/App.SwiftConstValuesFileList --compile-time-extraction --deployment-aware-processing --validate-assistant-intents --no-app-shortcuts-localization
2026-10-17 05:34:16.246 appintentsmetadataprocessor[4393:17853] Starting appintentsmetadataprocessor export
2026-10-17 05:34:16.248 appintentsmetadataprocessor[4393:17853] warning: Metadata extraction skipped. No AppIntents.framework dependency found.

CopySwiftLibs /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    builtin-swiftStdLibTool --copy --verbose --scan-executable /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/App --scan-folder /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Frameworks --scan-folder /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/PlugIns --scan-folder /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/SystemExtensions --scan-folder /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Extensions --scan-folder /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/BuildProductsPath/Release-iphoneos/Pods_App.framework --platform iphoneos --toolchain /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain --destination /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Frameworks --unsigned-destination /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/BuildProductsPath/SwiftSupport --strip-bitcode --strip-bitcode-tool /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/bitcode_strip --emit-dependency-info /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/SwiftStdLibToolInputDependencies.dep --filter-for-swift-os --back-deploy-swift-concurrency
Ignoring --strip-bitcode because --sign was not passed

AppIntentsSSUTraining (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/appintentsnltrainingprocessor --infoplist-path /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Info.plist --temp-dir-path /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/ssu --bundle-id com.ewheridot.tegaexe --product-path /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app --extracted-metadata-path /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/Metadata.appintents --deployment-postprocessing --metadata-file-list /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/IntermediateBuildFilesPath/App.build/Release-iphoneos/App.build/App.DependencyMetadataFileList --archive-ssu-assets
2026-10-17 05:34:16.266 appintentsnltrainingprocessor[4394:17856] Parsing options for appintentsnltrainingprocessor
2026-10-17 05:34:16.267 appintentsnltrainingprocessor[4394:17856] No AppShortcuts found - Skipping.

Strip /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/App (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /Applications/Xcode_16.4.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip -D /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app/App

SetOwnerAndGroup runner:staff /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /usr/sbin/chown -RH runner:staff /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app

SetMode u+w,go-w,a+rX /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /bin/chmod -RH u+w,go-w,a+rX /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app

RegisterExecutionPolicyException /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    builtin-RegisterExecutionPolicyException /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app

Validate /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    builtin-validationUtility /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app -validate-for-store -infoplist-subpath Info.plist

Touch /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app (in target 'App' from project 'App')
    cd /Users/runner/work/tega-app/tega-app/ios/App
    /usr/bin/touch -c /Users/runner/Library/Developer/Xcode/DerivedData/App-dideniotfvrxldfnxxovvbsxdtaq/Build/Intermediates.noindex/ArchiveIntermediates/App/InstallationBuildProductsLocation/Applications/App.app

note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'IONGeolocationLib' from project 'Pods')
warning: Run script build phase '[CP] Copy XCFrameworks' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'IONGeolocationLib' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'IONFilesystemLib' from project 'Pods')
warning: Run script build phase '[CP] Copy XCFrameworks' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'IONFilesystemLib' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'Pods-App' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'App' from project 'App')
warning: Run script build phase '[CP] Embed Pods Frameworks' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'App' from project 'App')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorStatusBar' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorSplashScreen' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorShare' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorLocalNotifications' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorHaptics' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorGeolocation' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorFilesystem' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorCordova' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'CapacitorApp' from project 'Pods')
note: Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O, expected -Onone (in target 'Capacitor' from project 'Pods')
** ARCHIVE SUCCEEDED **

2026-10-17 05:34:17.346 xcodebuild[4403:17899] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path "/var/folders/nj/vtw8zd2j31d1gdrtntc5y4600000gn/T/App_2026-10-17_05-34-17.345.xcdistributionlogs".
Exported App to: /Users/runner/work/_temp/out
** EXPORT SUCCEEDED **

Running altool at path '/Applications/Xcode_16.4.app/Contents/SharedFrameworks/ContentDeliveryServices.framework/Frameworks/AppStoreService.framework/Support/altool'...
2026-10-17 05:35:15.974 ERROR: [altool.600001D941C0] [ContentDelivery.Uploader.600001D941C0] Validation failed (409) SDK version issue. This app was built with the iOS 18.5 SDK. All iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution. (ID: 59638a18-23c1-4f3e-a977-e37e2d988da2)
2026-10-17 05:35:30.471  INFO: [altool.600001D941C0] [ContentDelivery.Uploader.600001D941C0] 
=======================================
UPLOAD FAILED with 1 error, 0 warnings, 0 messages
=======================================
2026-10-17 05:35:30.474 ERROR: [altool.600001D941C0] Error uploading '/Users/runner/work/_temp/out/App.ipa'.
2026-10-17 05:35:30.474 ERROR: [altool.600001D941C0] Validation failed SDK version issue. This app was built with the iOS 18.5 SDK. All iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution. (ID: 59638a18-23c1-4f3e-a977-e37e2d988da2) (409)
 {
    NSLocalizedDescription = "Validation failed";
    NSLocalizedFailureReason = "SDK version issue. This app was built with the iOS 18.5 SDK. All iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution. (ID: 59638a18-23c1-4f3e-a977-e37e2d988da2)";
    NSUnderlyingError = "Error Domain=IrisAPI Code=-19241 \"Validation failed\" UserInfo={status=409, detail=SDK version issue. This app was built with the iOS 18.5 SDK. All iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution., id=59638a18-23c1-4f3e-a977-e37e2d988da2, code=STATE_ERROR.VALIDATION_ERROR, title=Validation failed, NSLocalizedFailureReason=SDK version issue. This app was built with the iOS 18.5 SDK. All iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution., NSLocalizedDescription=Validation failed}";
    "iris-code" = "STATE_ERROR.VALIDATION_ERROR";
}
```
