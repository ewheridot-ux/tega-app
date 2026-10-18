# iPhone build #58 — cancelled

Sun Oct 18 02:50:55 UTC 2026

```
       @capacitor/share@7.0.4
       @capacitor/splash-screen@7.0.5
       @capacitor/status-bar@7.0.6
       @capgo/capacitor-health@7.2.15
       @ebarooni/capacitor-calendar@7.5.0
✔ update ios in 11.09s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 81.73ms
✔ Creating capacitor.config.json in ios/App/App in 707.50μs
✔ copy ios in 98.96ms
✔ Updating iOS plugins in 735.13μs
✔ Updating iOS native dependencies with pod install in 3.15s
[info] Found 10 Capacitor plugins for ios:
       @capacitor/app@7.1.2
       @capacitor/filesystem@7.1.9
       @capacitor/geolocation@7.1.8
       @capacitor/haptics@7.0.5
       @capacitor/local-notifications@7.0.7
       @capacitor/share@7.0.4
       @capacitor/splash-screen@7.0.5
       @capacitor/status-bar@7.0.6
       @capgo/capacitor-health@7.2.15
       @ebarooni/capacitor-calendar@7.5.0
✔ update ios in 3.17s
[info] Sync finished in 3.291s
app capabilities: ['IN_APP_PURCHASE']
HealthKit turned on: True
POST /v1/bundleIds -> 409 {
  "errors" : [ {
    "id" : "0cabe7c8-8521-4d27-9cb5-ed56ea00529c",
    "status" : "409",
    "code" : "ENTITY_ERROR.ATTRIBUTE.INVALID",
    "title" : "An attribute in the provided entity has invalid value",
    "detail" : "'Tega.exe Widgets' is not a valid name for an app id. Please choose a name containing only alphanumeric characters and spaces."
  } ]
}
registered com.ewheridot.tegaexe.widgets False
com.ewheridot.tegaexe.widgets MISSING
POST /v1/bundleIds -> 409 {
  "errors" : [ {
    "id" : "fad6d64e-115f-48b6-8140-5f57341421c6",
    "status" : "409",
    "code" : "ENTITY_ERROR.ATTRIBUTE.INVALID",
    "title" : "An attribute in the provided entity has invalid value",
    "detail" : "'Tega.exe Share' is not a valid name for an app id. Please choose a name containing only alphanumeric characters and spaces."
  } ]
}
registered com.ewheridot.tegaexe.share False
com.ewheridot.tegaexe.share MISSING
== try: full (health=yes widgets+share=yes)
cp: native/ios/App/*.swift: No such file or directory
** ARCHIVE FAILED **
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'App' from project 'App')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Capacitor' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorApp' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorCordova' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorFilesystem' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorGeolocation' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorHaptics' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorLocalNotifications' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorShare' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorSplashScreen' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorStatusBar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapgoCapacitorHealth' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'EbarooniCapacitorCalendar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Pods-App' from project 'Pods')
== try: noHealth (health=no widgets+share=yes)
cp: native/ios/App/*.swift: No such file or directory
** ARCHIVE FAILED **
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'App' from project 'App')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Capacitor' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorApp' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorCordova' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorFilesystem' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorGeolocation' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorHaptics' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorLocalNotifications' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorShare' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorSplashScreen' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorStatusBar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapgoCapacitorHealth' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'EbarooniCapacitorCalendar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Pods-App' from project 'Pods')
== try: noWidgets (health=yes widgets+share=no)
cp: native/ios/App/*.swift: No such file or directory
** ARCHIVE FAILED **
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'App' from project 'App')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Capacitor' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorApp' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorCordova' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorFilesystem' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorGeolocation' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorHaptics' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorLocalNotifications' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorShare' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorSplashScreen' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorStatusBar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapgoCapacitorHealth' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'EbarooniCapacitorCalendar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Pods-App' from project 'Pods')
== try: basic (health=no widgets+share=no)
cp: native/ios/App/*.swift: No such file or directory
** ARCHIVE FAILED **
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'App' from project 'App')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Capacitor' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorApp' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorCordova' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorFilesystem' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorGeolocation' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorHaptics' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorLocalNotifications' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorShare' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorSplashScreen' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapacitorStatusBar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'CapgoCapacitorHealth' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'EbarooniCapacitorCalendar' from project 'Pods')
error: Ad Hoc code signing is not allowed with SDK 'iOS 26.2'. (in target 'Pods-App' from project 'Pods')
== try: plain (no native code)
```
