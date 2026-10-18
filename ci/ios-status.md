# iPhone build #64 — success

Sun Oct 18 05:30:48 UTC 2026

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

added 113 packages in 8s

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 51.78ms
✔ add in 52.13ms
✔ Copying web assets from www to ios/App/App/public in 76.05ms
✔ Creating capacitor.config.json in ios/App/App in 385.79μs
✔ copy ios in 95.07ms
✔ Updating iOS plugins in 1.24ms
✔ Updating iOS native dependencies with pod install in 10.99s
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
✔ update ios in 11.08s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 161.55ms
✔ Creating capacitor.config.json in ios/App/App in 895.54μs
✔ copy ios in 187.35ms
✔ Updating iOS plugins in 893.42μs
✔ Updating iOS native dependencies with pod install in 4.20s
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
✔ update ios in 4.26s
[info] Sync finished in 4.488s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-18 05:30:48.355  INFO: [ContentDelivery.Uploader.600002658040] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 8d73e75e-37e6-45aa-9645-0e57c84a87e2
Transferred 31498000 bytes in 0.865 seconds (36.4MB/s, 291.313Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
