# iPhone build #60 — success

Sun Oct 18 03:00:22 UTC 2026

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

added 113 packages in 7s

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 19.40ms
✔ add in 19.87ms
✔ Copying web assets from www to ios/App/App/public in 82.70ms
✔ Creating capacitor.config.json in ios/App/App in 1.61ms
✔ copy ios in 116.11ms
✔ Updating iOS plugins in 1.00ms
✔ Updating iOS native dependencies with pod install in 11.28s
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
✔ update ios in 11.32s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 165.63ms
✔ Creating capacitor.config.json in ios/App/App in 1.05ms
✔ copy ios in 271.62ms
✔ Updating iOS plugins in 1.29ms
✔ Updating iOS native dependencies with pod install in 7.01s
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
✔ update ios in 7.07s
[info] Sync finished in 7.475s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT']
registered com.ewheridot.tegaexe.widgets True
com.ewheridot.tegaexe.widgets ok
registered com.ewheridot.tegaexe.share True
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-18 03:00:22.145  INFO: [ContentDelivery.Uploader.6000018184C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: ff4840cb-7900-4b58-8bb8-18128f9aa786
Transferred 31494637 bytes in 0.525 seconds (60.0MB/s, 480.259Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
