# iPhone build #173 — success

Thu Nov 19 21:11:14 UTC 2026

```
✓ avatar painted within 300 ms of the app's first frame — 228 ms
page-change render ms today:34 week:21 quests:13 model:33 content:11 datum:19 gym:13 money:27 social:12 learn:13 city:21 evolve:33
after-data-change render ms today:40 week:25 quests:18 model:57 content:21 datum:23 gym:18 money:43 social:23 learn:23 city:45 evolve:56
✓ render today < 100 ms — 34 ms
✓ render week < 100 ms — 21 ms
✓ render quests < 100 ms — 13 ms
✓ render model < 100 ms — 33 ms
✓ render content < 100 ms — 11 ms
✓ render datum < 100 ms — 19 ms
✓ render gym < 100 ms — 13 ms
✓ render money < 100 ms — 27 ms
✓ render social < 100 ms — 12 ms
✓ render learn < 100 ms — 13 ms
✓ render city < 100 ms — 21 ms
✓ render evolve < 100 ms — 33 ms
✓ a tap that saves data (commit) on Today < 200 ms — 64 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 50 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe week: page never blank — min opacity 1.00 over 43 frames
✓ swipe week: one #view — 1
✓ swipe week: no transform left on #view
✓ swipe week: moved to next tab
✓ swipe week: header and tab bar hold still — 0 px
✓ swipe week: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 45 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 39 frames
✓ swipe money: one #view — 1
✓ swipe money: no transform left on #view
✓ swipe money: moved to next tab
✓ swipe money: header and tab bar hold still — 0 px
✓ swipe money: the tab's content slides — 390 px
· gym: no tab bar
✓ swipe social: next tab keeps your scroll — was 500 → 500
✓ swipe today: next tab keeps your scroll — was 500 → 500
✓ swipe money: next tab keeps your scroll — was 500 → 500
✓ tab highlight slides to the new tab
✓ tab highlight cleans up after the slide
✓ changing section: the old page dissolves over the new one
✓ changing section: nothing left behind
✓ start: the avatar-style library is not loaded (your pixel avatar doesn't need it)
✓ no page errors
all perf checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 17.81ms
✔ add in 18.07ms
✔ Copying web assets from www to ios/App/App/public in 70.93ms
✔ Creating capacitor.config.json in ios/App/App in 754.79μs
✔ copy ios in 123.10ms
✔ Updating iOS plugins in 2.24ms
✔ Updating iOS native dependencies with pod install in 12.43s
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
✔ update ios in 12.46s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 180.01ms
✔ Creating capacitor.config.json in ios/App/App in 1.19ms
✔ copy ios in 224.69ms
✔ Updating iOS plugins in 1.33ms
✔ Updating iOS native dependencies with pod install in 8.90s
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
✔ update ios in 8.94s
[info] Sync finished in 9.306s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-19 21:11:13.846  INFO: [ContentDelivery.Uploader.600001BC44C0] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: d2847edc-9542-480f-8ce4-c7c9af5113c6
Transferred 8105992 bytes in 0.292 seconds (27.7MB/s, 221.711Mbps)
==========================================
2026-11-19 21:11:13.847  WARN: [altool.600001BC44C0] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
