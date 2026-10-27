# iPhone build #124 — success

Tue Oct 27 05:22:05 UTC 2026

```
/Applications/Xcode_26.3.0.app
/Applications/Xcode_26.3.app
/Applications/Xcode.app
Xcode 26.3
Build version 17C529

added 113 packages in 8s
seed injected
✓ app boots
✓ private data is in this build
✓ today page renders
✓ money page renders
✓ model page renders
✓ gym page renders
✓ settings page renders
✓ social page renders
✓ datum page renders
✓ week page renders
✓ XP unchanged after visiting every page
✓ XP unchanged after a reload
✓ XP floor holds
✓ booking: both days found — 2026-10-26,2026-10-27
✓ booking: start time — 8:30am
✓ booking: per-day rate from full email ($9,000 over 2 days) — 4500
✓ booking: rate from preview is a clean number — 3000
✓ yoga: timer counts down
✓ yoga: pause holds
✓ yoga: buttons are not rebuilt every tick
✓ yoga: moves to the next pose by itself
✓ yoga: breathing guide shows — breathe in · 4
✓ pop shows after finishing Top 3 — ✦+29 XP · +35 💰 | 🌫️Fog −4 | 🎁2 chests
✓ daily clear gives a chest
✓ weekly clear gives a chest
✓ buff row is icons only
✓ tapping a buff shows its line
✓ quest log has Daily, Weekly, Season, Side
✓ no duplicate quest card on Today
✓ gold earned and whole
✓ shop: shield costs 150 and adds a shield
✓ shields cap at 3, gold never negative
✓ spend log kept
✓ season tier within 1–13
✓ season boss falls at 70% and gives 300 XP
✓ season sheet shows 13 tiers
✓ top bar shows streak+shields, level, gold, season — 🔥 7 day streak · 🛡️2/3 | Lv 4 · Rookie IV | 💰 110 | 🍂 2/13
✓ XP only went up
✓ undo takes the hits back
✓ pops wait while a sheet is open
✓ your picture opens the city — city
✓ bosses float on their buildings — 7
✓ quest board marker on the fountain opens the quest log
✓ quest board + house cards
✓ town and bosses not repeated on the Character page
✓ changes since last open pop on the next open — ✦+5 XP | 🌫️Fog −2
✓ all six bosses have idle, hit and defeat animations — []
✓ no errors anywhere

all checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 21.99ms
✔ add in 22.69ms
✔ Copying web assets from www to ios/App/App/public in 54.12ms
✔ Creating capacitor.config.json in ios/App/App in 340.54μs
✔ copy ios in 118.61ms
✔ Updating iOS plugins in 2.18ms
✔ Updating iOS native dependencies with pod install in 15.79s
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
✔ update ios in 15.91s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 184.93ms
✔ Creating capacitor.config.json in ios/App/App in 1.40ms
✔ copy ios in 223.97ms
✔ Updating iOS plugins in 1.97ms
✔ Updating iOS native dependencies with pod install in 7.40s
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
✔ update ios in 7.47s
[info] Sync finished in 7.764s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-27 05:22:05.239  INFO: [ContentDelivery.Uploader.600002354040] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 22023732-0c10-47d5-8916-abcecd6177ef
Transferred 7252151 bytes in 0.681 seconds (10.6MB/s, 85.189Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
