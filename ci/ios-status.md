# iPhone build #80 — success

Mon Oct 19 09:45:06 UTC 2026

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

added 113 packages in 5s

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 13.83ms
✔ add in 14.06ms
✔ Copying web assets from www to ios/App/App/public in 65.67ms
✔ Creating capacitor.config.json in ios/App/App in 264.17μs
✔ copy ios in 84.05ms
✔ Updating iOS plugins in 718.38μs
✔ Updating iOS native dependencies with pod install in 8.89s
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
✔ update ios in 8.90s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 65.10ms
✔ Creating capacitor.config.json in ios/App/App in 702.42μs
✔ copy ios in 80.68ms
✔ Updating iOS plugins in 1.01ms
✔ Updating iOS native dependencies with pod install in 4.41s
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
✔ update ios in 4.44s
[info] Sync finished in 4.569s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-19 09:45:06.328  INFO: [ContentDelivery.Uploader.600001B6C040] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 8098182d-87b6-426d-9f71-5f08d56990ca
Transferred 31507955 bytes in 0.358 seconds (88.0MB/s, 703.861Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
