# iPhone build #177 — success

Tue Nov 24 21:54:23 UTC 2026

```
✓ avatar painted within 300 ms of the app's first frame — 201 ms
page-change render ms today:38 week:19 quests:15 model:35 content:11 datum:16 gym:13 money:29 social:15 learn:13 city:26 evolve:23
after-data-change render ms today:36 week:22 quests:29 model:51 content:18 datum:23 gym:25 money:39 social:24 learn:18 city:40 evolve:35
✓ render today < 100 ms — 38 ms
✓ render week < 100 ms — 19 ms
✓ render quests < 100 ms — 15 ms
✓ render model < 100 ms — 35 ms
✓ render content < 100 ms — 11 ms
✓ render datum < 100 ms — 16 ms
✓ render gym < 100 ms — 13 ms
✓ render money < 100 ms — 29 ms
✓ render social < 100 ms — 15 ms
✓ render learn < 100 ms — 13 ms
✓ render city < 100 ms — 26 ms
✓ render evolve < 100 ms — 23 ms
✓ a tap that saves data (commit) on Today < 200 ms — 57 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 51 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe week: page never blank — min opacity 1.00 over 49 frames
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
✓ swipe money: page never blank — min opacity 1.00 over 46 frames
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
✔ Adding native Xcode project in ios in 23.58ms
✔ add in 24.08ms
✔ Copying web assets from www to ios/App/App/public in 91.61ms
✔ Creating capacitor.config.json in ios/App/App in 872.29μs
✔ copy ios in 154.56ms
✔ Updating iOS plugins in 1.46ms
✔ Updating iOS native dependencies with pod install in 17.24s
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
✔ update ios in 17.28s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 266.45ms
✔ Creating capacitor.config.json in ios/App/App in 827.67μs
✔ copy ios in 295.23ms
✔ Updating iOS plugins in 2.09ms
✔ Updating iOS native dependencies with pod install in 5.59s
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
✔ update ios in 5.62s
[info] Sync finished in 5.979s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-24 21:54:23.418  INFO: [ContentDelivery.Uploader.6000033A84C0] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: 2ebe0fe1-7938-4cbd-9683-3b4fda29a90c
Transferred 8151727 bytes in 0.425 seconds (19.2MB/s, 153.575Mbps)
==========================================
2026-11-24 21:54:23.426  WARN: [altool.6000033A84C0] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
