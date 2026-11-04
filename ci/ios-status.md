# iPhone build #156 — success

Wed Nov  4 21:16:43 UTC 2026

```
✓ swipe hustle: page never blank — min opacity 1.00 over 35 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe today: page never blank — min opacity 1.00 over 42 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe money: page never blank — min opacity 1.00 over 50 frames
✓ swipe money: one #view — 1
✓ swipe money: no transform left on #view
✓ swipe money: moved to next tab
· gym: no tab bar
✓ no page errors
all perf checks passed
testing app.html · engine webkit
fixture {"days":60,"txns":2183,"gym":24}
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 234 ms
page-change render ms today:28 week:10 quests:12 model:32 content:10 datum:14 gym:10 money:30 social:8 hustle:9 learn:10 city:17 evolve:16
after-data-change render ms today:35 week:17 quests:15 model:51 content:19 datum:19 gym:16 money:35 social:14 hustle:11 learn:13 city:32 evolve:28
✓ render today < 100 ms — 28 ms
✓ render week < 100 ms — 10 ms
✓ render quests < 100 ms — 12 ms
✓ render model < 100 ms — 32 ms
✓ render content < 100 ms — 10 ms
✓ render datum < 100 ms — 14 ms
✓ render gym < 100 ms — 10 ms
✓ render money < 100 ms — 30 ms
✓ render social < 100 ms — 8 ms
✓ render hustle < 100 ms — 9 ms
✓ render learn < 100 ms — 10 ms
✓ render city < 100 ms — 17 ms
✓ render evolve < 100 ms — 16 ms
✓ a tap that saves data (commit) on Today < 200 ms — 51 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 53 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe hustle: page never blank — min opacity 1.00 over 54 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe today: page never blank — min opacity 1.00 over 46 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe money: page never blank — min opacity 1.00 over 49 frames
✓ swipe money: one #view — 1
✓ swipe money: no transform left on #view
✓ swipe money: moved to next tab
· gym: no tab bar
✓ no page errors
all perf checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 21.68ms
✔ add in 22.21ms
✔ Copying web assets from www to ios/App/App/public in 55.63ms
✔ Creating capacitor.config.json in ios/App/App in 314.58μs
✔ copy ios in 124.17ms
✔ Updating iOS plugins in 910.96μs
✔ Updating iOS native dependencies with pod install in 13.93s
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
✔ update ios in 13.98s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 106.39ms
✔ Creating capacitor.config.json in ios/App/App in 997.83μs
✔ copy ios in 136.44ms
✔ Updating iOS plugins in 1.77ms
✔ Updating iOS native dependencies with pod install in 8.16s
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
✔ update ios in 8.22s
[info] Sync finished in 8.516s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-04 21:16:43.443  INFO: [ContentDelivery.Uploader.6000036244C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 42bfcb2f-ed03-44cf-bc7b-9ebb939a3fc2
Transferred 8075611 bytes in 0.291 seconds (27.8MB/s, 222.376Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
