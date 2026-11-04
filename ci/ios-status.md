# iPhone build #160 — success

Wed Nov  4 23:44:33 UTC 2026

```
✓ avatar gets baked and saved on the phone
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 296 ms
page-change render ms today:30 week:18 quests:15 model:31 content:9 datum:13 gym:14 money:26 social:14 hustle:8 learn:10 city:22 evolve:29
after-data-change render ms today:45 week:22 quests:19 model:43 content:15 datum:18 gym:21 money:33 social:16 hustle:11 learn:18 city:34 evolve:28
✓ render today < 100 ms — 30 ms
✓ render week < 100 ms — 18 ms
✓ render quests < 100 ms — 15 ms
✓ render model < 100 ms — 31 ms
✓ render content < 100 ms — 9 ms
✓ render datum < 100 ms — 13 ms
✓ render gym < 100 ms — 14 ms
✓ render money < 100 ms — 26 ms
✓ render social < 100 ms — 14 ms
✓ render hustle < 100 ms — 8 ms
✓ render learn < 100 ms — 10 ms
✓ render city < 100 ms — 22 ms
✓ render evolve < 100 ms — 29 ms
✓ a tap that saves data (commit) on Today < 200 ms — 53 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 52 frames
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
✓ swipe today: page never blank — min opacity 1.00 over 44 frames
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
✔ Adding native Xcode project in ios in 22.34ms
✔ add in 22.60ms
✔ Copying web assets from www to ios/App/App/public in 82.16ms
✔ Creating capacitor.config.json in ios/App/App in 465.75μs
✔ copy ios in 143.04ms
✔ Updating iOS plugins in 964.42μs
✔ Updating iOS native dependencies with pod install in 13.00s
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
✔ update ios in 13.04s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 88.67ms
✔ Creating capacitor.config.json in ios/App/App in 795.63μs
✔ copy ios in 115.71ms
✔ Updating iOS plugins in 1.80ms
✔ Updating iOS native dependencies with pod install in 5.68s
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
✔ update ios in 5.78s
[info] Sync finished in 5.969s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-04 23:44:33.561  INFO: [ContentDelivery.Uploader.6000008F43C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 2004ddba-cded-4a28-bcc1-164acb9c8fe9
Transferred 8080166 bytes in 0.261 seconds (30.9MB/s, 247.345Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
