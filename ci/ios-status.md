# iPhone build #172 — success

Thu Nov 19 10:09:58 UTC 2026

```
after-data-change render ms today:39 week:22 quests:18 model:38 content:29 datum:28 gym:23 money:49 social:24 hustle:20 learn:29 city:31 evolve:41
✓ render today < 100 ms — 26 ms
✓ render week < 100 ms — 15 ms
✓ render quests < 100 ms — 18 ms
✓ render model < 100 ms — 30 ms
✓ render content < 100 ms — 15 ms
✓ render datum < 100 ms — 16 ms
✓ render gym < 100 ms — 13 ms
✓ render money < 100 ms — 42 ms
✓ render social < 100 ms — 12 ms
✓ render hustle < 100 ms — 12 ms
✓ render learn < 100 ms — 13 ms
✓ render city < 100 ms — 19 ms
✓ render evolve < 100 ms — 30 ms
✓ a tap that saves data (commit) on Today < 200 ms — 69 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 50 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe hustle: page never blank — min opacity 1.00 over 51 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 46 frames
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
✔ Adding native Xcode project in ios in 23.56ms
✔ add in 23.85ms
✔ Copying web assets from www to ios/App/App/public in 55.06ms
✔ Creating capacitor.config.json in ios/App/App in 478.62μs
✔ copy ios in 116.27ms
✔ Updating iOS plugins in 2.48ms
✔ Updating iOS native dependencies with pod install in 17.14s
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
✔ update ios in 17.18s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 210.74ms
✔ Creating capacitor.config.json in ios/App/App in 1.61ms
✔ copy ios in 272.64ms
✔ Updating iOS plugins in 1.62ms
✔ Updating iOS native dependencies with pod install in 13.16s
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
✔ update ios in 13.23s
[info] Sync finished in 13.583s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-19 10:09:57.875  INFO: [ContentDelivery.Uploader.600003418040] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: a12e5806-65d9-47ba-93f4-cad895ee46d6
Transferred 8099517 bytes in 0.342 seconds (23.7MB/s, 189.216Mbps)
==========================================
2026-11-19 10:09:57.878  WARN: [altool.600003418040] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
