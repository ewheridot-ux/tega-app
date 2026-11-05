# iPhone build #161 — success

Thu Nov  5 00:23:34 UTC 2026

```
✓ avatar gets baked and saved on the phone
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 205 ms
page-change render ms today:28 week:17 quests:11 model:23 content:9 datum:12 gym:8 money:21 social:7 hustle:7 learn:6 city:10 evolve:14
after-data-change render ms today:27 week:20 quests:19 model:24 content:17 datum:22 gym:14 money:26 social:13 hustle:10 learn:10 city:19 evolve:27
✓ render today < 100 ms — 28 ms
✓ render week < 100 ms — 17 ms
✓ render quests < 100 ms — 11 ms
✓ render model < 100 ms — 23 ms
✓ render content < 100 ms — 9 ms
✓ render datum < 100 ms — 12 ms
✓ render gym < 100 ms — 8 ms
✓ render money < 100 ms — 21 ms
✓ render social < 100 ms — 7 ms
✓ render hustle < 100 ms — 7 ms
✓ render learn < 100 ms — 6 ms
✓ render city < 100 ms — 10 ms
✓ render evolve < 100 ms — 14 ms
✓ a tap that saves data (commit) on Today < 200 ms — 43 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 53 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe hustle: page never blank — min opacity 1.00 over 52 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 45 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 45 frames
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
✔ Adding native Xcode project in ios in 22.03ms
✔ add in 22.29ms
✔ Copying web assets from www to ios/App/App/public in 102.84ms
✔ Creating capacitor.config.json in ios/App/App in 609.12μs
✔ copy ios in 183.61ms
✔ Updating iOS plugins in 1.15ms
✔ Updating iOS native dependencies with pod install in 11.97s
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
✔ update ios in 12.01s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 93.34ms
✔ Creating capacitor.config.json in ios/App/App in 1.05ms
✔ copy ios in 112.17ms
✔ Updating iOS plugins in 901.67μs
✔ Updating iOS native dependencies with pod install in 5.81s
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
✔ update ios in 5.89s
[info] Sync finished in 6.085s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-05 00:23:34.152  INFO: [ContentDelivery.Uploader.600001BD84C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 6bc59cd0-9da6-4835-969c-08cd9acf0aa3
Transferred 8080748 bytes in 0.693 seconds (11.7MB/s, 93.323Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
