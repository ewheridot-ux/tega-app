# iPhone build #120 — success

Sat Oct 24 00:30:56 UTC 2026

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
seed injected
✓ app boots
✓ private data is in this build
✓ today page renders
✓ money page renders
✓ model page renders
✓ gym page renders
✓ settings page renders
✓ social page renders
✓ datum page renders
✓ week page renders
✓ XP unchanged after visiting every page
✓ XP unchanged after a reload
✓ XP floor holds
✓ booking: both days found — 2026-10-26,2026-10-27
✓ booking: start time — 8:30am
✓ booking: per-day rate from full email ($9,000 over 2 days) — 4500
✓ booking: rate from preview is a clean number — 3000
✓ yoga: timer counts down
✓ yoga: pause holds
✓ yoga: buttons are not rebuilt every tick
✓ yoga: moves to the next pose by itself
✓ yoga: breathing guide shows — breathe in · 4
✓ no errors anywhere

all checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 20.17ms
✔ add in 20.44ms
✔ Copying web assets from www to ios/App/App/public in 44.24ms
✔ Creating capacitor.config.json in ios/App/App in 440.58μs
✔ copy ios in 88.20ms
✔ Updating iOS plugins in 855.75μs
✔ Updating iOS native dependencies with pod install in 13.17s
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
✔ update ios in 13.22s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 78.78ms
✔ Creating capacitor.config.json in ios/App/App in 715.33μs
✔ copy ios in 102.08ms
✔ Updating iOS plugins in 2.33ms
✔ Updating iOS native dependencies with pod install in 6.62s
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
✔ update ios in 6.76s
[info] Sync finished in 6.906s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-24 00:30:56.524  INFO: [ContentDelivery.Uploader.6000023C44C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 7ad06a0d-4e12-4fcb-b414-01ffa07294d9
Transferred 6511511 bytes in 0.740 seconds (8.8MB/s, 70.350Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
