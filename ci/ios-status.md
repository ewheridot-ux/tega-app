# iPhone build #180 — success

Wed Nov 25 05:44:23 UTC 2026

```
✓ avatar painted within 300 ms of the app's first frame — 180 ms
page-change render ms today:23 week:10 quests:16 model:30 content:8 datum:11 gym:6 money:24 social:11 learn:14 city:16 evolve:25
after-data-change render ms today:31 week:14 quests:21 model:39 content:13 datum:18 gym:13 money:29 social:14 learn:19 city:23 evolve:37
✓ render today < 100 ms — 23 ms
✓ render week < 100 ms — 10 ms
✓ render quests < 100 ms — 16 ms
✓ render model < 100 ms — 30 ms
✓ render content < 100 ms — 8 ms
✓ render datum < 100 ms — 11 ms
✓ render gym < 100 ms — 6 ms
✓ render money < 100 ms — 24 ms
✓ render social < 100 ms — 11 ms
✓ render learn < 100 ms — 14 ms
✓ render city < 100 ms — 16 ms
✓ render evolve < 100 ms — 25 ms
✓ a tap that saves data (commit) on Today < 200 ms — 47 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 53 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe week: page never blank — min opacity 1.00 over 50 frames
✓ swipe week: one #view — 1
✓ swipe week: no transform left on #view
✓ swipe week: moved to next tab
✓ swipe week: header and tab bar hold still — 0 px
✓ swipe week: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 51 frames
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
✔ Adding native Xcode project in ios in 15.21ms
✔ add in 15.45ms
✔ Copying web assets from www to ios/App/App/public in 72.71ms
✔ Creating capacitor.config.json in ios/App/App in 327.75μs
✔ copy ios in 106.38ms
✔ Updating iOS plugins in 1.11ms
✔ Updating iOS native dependencies with pod install in 13.40s
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
✔ update ios in 13.43s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 82.91ms
✔ Creating capacitor.config.json in ios/App/App in 774.63μs
✔ copy ios in 116.83ms
✔ Updating iOS plugins in 829.54μs
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
✔ update ios in 5.64s
[info] Sync finished in 5.83s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-25 05:44:23.427  INFO: [ContentDelivery.Uploader.6000039144C0] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: 8b5da7d3-655a-4f4b-96b9-dad0ba3f1045
Transferred 8177022 bytes in 0.756 seconds (10.8MB/s, 86.478Mbps)
==========================================
2026-11-25 05:44:23.432  WARN: [altool.6000039144C0] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
