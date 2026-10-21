# iPhone build #113 — success

Wed Oct 21 02:43:44 UTC 2026

```
/Applications/Xcode_16.0.0.app
/Applications/Xcode_16.0.app
/Applications/Xcode_16.1.0.app
/Applications/Xcode_16.1.app
/Applications/Xcode_16.2.0.app
/Applications/Xcode_16.2.app
/Applications/Xcode_16.3.0.app
/Applications/Xcode_16.3.app
/Applications/Xcode_16.4.0.app
/Applications/Xcode_16.4.app
/Applications/Xcode_16.app
/Applications/Xcode_26.0.1.app
/Applications/Xcode_26.0.app
/Applications/Xcode_26.1.1.app
/Applications/Xcode_26.1.app
/Applications/Xcode_26.2.0.app
/Applications/Xcode_26.2.app
/Applications/Xcode_26.3.0.app
/Applications/Xcode_26.3.app
/Applications/Xcode.app
Xcode 26.3
Build version 17C529

added 113 packages in 6s

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 14.77ms
✔ add in 15.04ms
✔ Copying web assets from www to ios/App/App/public in 55.47ms
✔ Creating capacitor.config.json in ios/App/App in 884.79μs
✔ copy ios in 72.88ms
✔ Updating iOS plugins in 671.08μs
✔ Updating iOS native dependencies with pod install in 10.11s
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
✔ update ios in 10.16s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 151.60ms
✔ Creating capacitor.config.json in ios/App/App in 770.25μs
✔ copy ios in 173.17ms
✔ Updating iOS plugins in 613.29μs
✔ Updating iOS native dependencies with pod install in 6.10s
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
✔ update ios in 6.17s
[info] Sync finished in 6.375s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-21 02:43:44.477  INFO: [ContentDelivery.Uploader.6000013E8040] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: f696eace-f1d9-4c63-b104-af97a69484fb
Transferred 32147689 bytes in 0.958 seconds (33.6MB/s, 268.463Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
