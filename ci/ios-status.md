# iPhone build #179 — success

Wed Nov 25 02:14:12 UTC 2026

```
✓ avatar painted within 300 ms of the app's first frame — 169 ms
page-change render ms today:35 week:16 quests:18 model:38 content:14 datum:19 gym:8 money:24 social:12 learn:9 city:21 evolve:29
after-data-change render ms today:38 week:24 quests:28 model:45 content:24 datum:23 gym:26 money:38 social:20 learn:22 city:43 evolve:50
✓ render today < 100 ms — 35 ms
✓ render week < 100 ms — 16 ms
✓ render quests < 100 ms — 18 ms
✓ render model < 100 ms — 38 ms
✓ render content < 100 ms — 14 ms
✓ render datum < 100 ms — 19 ms
✓ render gym < 100 ms — 8 ms
✓ render money < 100 ms — 24 ms
✓ render social < 100 ms — 12 ms
✓ render learn < 100 ms — 9 ms
✓ render city < 100 ms — 21 ms
✓ render evolve < 100 ms — 29 ms
✓ a tap that saves data (commit) on Today < 200 ms — 67 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 52 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe week: page never blank — min opacity 1.00 over 48 frames
✓ swipe week: one #view — 1
✓ swipe week: no transform left on #view
✓ swipe week: moved to next tab
✓ swipe week: header and tab bar hold still — 0 px
✓ swipe week: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 48 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 44 frames
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
✔ Adding native Xcode project in ios in 18.40ms
✔ add in 18.64ms
✔ Copying web assets from www to ios/App/App/public in 76.83ms
✔ Creating capacitor.config.json in ios/App/App in 845.58μs
✔ copy ios in 128.66ms
✔ Updating iOS plugins in 1.36ms
✔ Updating iOS native dependencies with pod install in 15.13s
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
✔ update ios in 15.18s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 89.02ms
✔ Creating capacitor.config.json in ios/App/App in 1.02ms
✔ copy ios in 121.44ms
✔ Updating iOS plugins in 792.29μs
✔ Updating iOS native dependencies with pod install in 6.93s
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
✔ update ios in 6.95s
[info] Sync finished in 7.17s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-25 02:14:12.255  INFO: [ContentDelivery.Uploader.600002E2C4C0] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: eb7a83ac-c5b3-43d3-add1-ed3cf40410eb
Transferred 8165789 bytes in 0.741 seconds (11.0MB/s, 88.149Mbps)
==========================================
2026-11-25 02:14:12.258  WARN: [altool.600002E2C4C0] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
