# iPhone build #176 — success

Fri Nov 20 07:52:21 UTC 2026

```
✓ avatar painted within 300 ms of the app's first frame — 155 ms
page-change render ms today:20 week:13 quests:9 model:28 content:11 datum:8 gym:6 money:22 social:9 learn:11 city:16 evolve:23
after-data-change render ms today:33 week:17 quests:13 model:30 content:15 datum:19 gym:14 money:38 social:22 learn:15 city:24 evolve:35
✓ render today < 100 ms — 20 ms
✓ render week < 100 ms — 13 ms
✓ render quests < 100 ms — 9 ms
✓ render model < 100 ms — 28 ms
✓ render content < 100 ms — 11 ms
✓ render datum < 100 ms — 8 ms
✓ render gym < 100 ms — 6 ms
✓ render money < 100 ms — 22 ms
✓ render social < 100 ms — 9 ms
✓ render learn < 100 ms — 11 ms
✓ render city < 100 ms — 16 ms
✓ render evolve < 100 ms — 23 ms
✓ a tap that saves data (commit) on Today < 200 ms — 59 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 53 frames
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
✓ swipe today: page never blank — min opacity 1.00 over 45 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 47 frames
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
✔ Adding native Xcode project in ios in 16.90ms
✔ add in 17.16ms
✔ Copying web assets from www to ios/App/App/public in 68.53ms
✔ Creating capacitor.config.json in ios/App/App in 346.62μs
✔ copy ios in 117.28ms
✔ Updating iOS plugins in 1.09ms
✔ Updating iOS native dependencies with pod install in 13.06s
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
✔ update ios in 13.11s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 152.55ms
✔ Creating capacitor.config.json in ios/App/App in 754.46μs
✔ copy ios in 177.71ms
✔ Updating iOS plugins in 1.50ms
✔ Updating iOS native dependencies with pod install in 6.40s
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
✔ update ios in 6.52s
[info] Sync finished in 6.753s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-20 07:52:21.270  INFO: [ContentDelivery.Uploader.6000020B8040] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: ba53b204-00ce-442f-bf6b-a031879c7a2c
Transferred 8130676 bytes in 0.668 seconds (12.2MB/s, 97.328Mbps)
==========================================
2026-11-20 07:52:21.271  WARN: [altool.6000020B8040] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
