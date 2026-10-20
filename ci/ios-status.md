# iPhone build #94 — success

Tue Oct 20 02:21:07 UTC 2026

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

added 113 packages in 11s

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 21.00ms
✔ add in 21.59ms
✔ Copying web assets from www to ios/App/App/public in 72.04ms
✔ Creating capacitor.config.json in ios/App/App in 328.67μs
✔ copy ios in 94.23ms
✔ Updating iOS plugins in 826.83μs
✔ Updating iOS native dependencies with pod install in 12.66s
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
✔ update ios in 12.69s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 176.93ms
✔ Creating capacitor.config.json in ios/App/App in 917.88μs
✔ copy ios in 209.18ms
✔ Updating iOS plugins in 987.46μs
✔ Updating iOS native dependencies with pod install in 7.24s
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
✔ update ios in 7.32s
[info] Sync finished in 7.585s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-20 02:21:06.992  INFO: [ContentDelivery.Uploader.60000153C4C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 1dff32a5-06cd-4887-af21-77ee38d69a5d
Transferred 31528331 bytes in 1.171 seconds (26.9MB/s, 215.336Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
