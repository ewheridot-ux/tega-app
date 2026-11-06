# iPhone build #162 — success

Fri Nov  6 19:24:58 UTC 2026

```
✓ avatar gets baked and saved on the phone
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 208 ms
page-change render ms today:40 week:20 quests:16 model:36 content:13 datum:13 gym:8 money:27 social:9 hustle:10 learn:13 city:15 evolve:33
after-data-change render ms today:62 week:24 quests:28 model:48 content:23 datum:24 gym:19 money:40 social:23 hustle:17 learn:19 city:38 evolve:36
✓ render today < 100 ms — 40 ms
✓ render week < 100 ms — 20 ms
✓ render quests < 100 ms — 16 ms
✓ render model < 100 ms — 36 ms
✓ render content < 100 ms — 13 ms
✓ render datum < 100 ms — 13 ms
✓ render gym < 100 ms — 8 ms
✓ render money < 100 ms — 27 ms
✓ render social < 100 ms — 9 ms
✓ render hustle < 100 ms — 10 ms
✓ render learn < 100 ms — 13 ms
✓ render city < 100 ms — 15 ms
✓ render evolve < 100 ms — 33 ms
✓ a tap that saves data (commit) on Today < 200 ms — 60 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 51 frames
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
✓ swipe today: page never blank — min opacity 1.00 over 47 frames
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
✔ Adding native Xcode project in ios in 20.34ms
✔ add in 20.63ms
✔ Copying web assets from www to ios/App/App/public in 89.14ms
✔ Creating capacitor.config.json in ios/App/App in 549.96μs
✔ copy ios in 142.19ms
✔ Updating iOS plugins in 3.56ms
✔ Updating iOS native dependencies with pod install in 13.20s
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
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 127.97ms
✔ Creating capacitor.config.json in ios/App/App in 1.95ms
✔ copy ios in 170.63ms
✔ Updating iOS plugins in 984.50μs
✔ Updating iOS native dependencies with pod install in 10.54s
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
✔ update ios in 10.60s
[info] Sync finished in 10.826s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-06 19:24:58.264  INFO: [ContentDelivery.Uploader.6000008B04C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 88c632f3-9542-44c8-8d0b-91eae845f0a6
Transferred 8084863 bytes in 0.676 seconds (12.0MB/s, 95.744Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
