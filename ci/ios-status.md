# iPhone build #163 — success

Sat Nov  7 01:06:17 UTC 2026

```
✓ avatar gets baked and saved on the phone
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 200 ms
page-change render ms today:25 week:14 quests:11 model:28 content:7 datum:15 gym:14 money:36 social:13 hustle:12 learn:7 city:24 evolve:36
after-data-change render ms today:30 week:20 quests:20 model:36 content:12 datum:19 gym:24 money:48 social:23 hustle:23 learn:20 city:52 evolve:58
✓ render today < 100 ms — 25 ms
✓ render week < 100 ms — 14 ms
✓ render quests < 100 ms — 11 ms
✓ render model < 100 ms — 28 ms
✓ render content < 100 ms — 7 ms
✓ render datum < 100 ms — 15 ms
✓ render gym < 100 ms — 14 ms
✓ render money < 100 ms — 36 ms
✓ render social < 100 ms — 13 ms
✓ render hustle < 100 ms — 12 ms
✓ render learn < 100 ms — 7 ms
✓ render city < 100 ms — 24 ms
✓ render evolve < 100 ms — 36 ms
✓ a tap that saves data (commit) on Today < 200 ms — 67 ms
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
✓ swipe hustle: page never blank — min opacity 1.00 over 50 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 41 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 26 frames
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
✔ Adding native Xcode project in ios in 21.91ms
✔ add in 22.16ms
✔ Copying web assets from www to ios/App/App/public in 72.16ms
✔ Creating capacitor.config.json in ios/App/App in 789.62μs
✔ copy ios in 120.36ms
✔ Updating iOS plugins in 649.58μs
✔ Updating iOS native dependencies with pod install in 14.85s
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
✔ update ios in 14.94s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 219.31ms
✔ Creating capacitor.config.json in ios/App/App in 1.74ms
✔ copy ios in 255.08ms
✔ Updating iOS plugins in 1.18ms
✔ Updating iOS native dependencies with pod install in 4.49s
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
✔ update ios in 4.77s
[info] Sync finished in 5.12s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-07 01:06:17.102  INFO: [ContentDelivery.Uploader.600002C5C4C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: e30591c4-3eee-4797-b825-56b27e41ccf8
Transferred 8085339 bytes in 0.610 seconds (13.3MB/s, 106.083Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
