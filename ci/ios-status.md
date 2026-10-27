# iPhone build #126 — success

Tue Oct 27 17:38:22 UTC 2026

```
Build version 17C529

added 113 packages in 9s
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
✓ a finished shoot day is added to what ONE owes — {"yesterday":"shot","today":"shot","future":"confirmed","add":2400,"total":4800}
✓ …and isn’t counted twice in money coming from ONE — {"yesterday":"shot","today":"shot","future":"confirmed","add":2400,"total":4800}
✓ OKR suggestions change nothing until you pick — {"none":true,"same":true,"kept":true,"replaced":true,"archived":true}
✓ replacing one category keeps every other goal — {"none":true,"same":true,"kept":true,"replaced":true,"archived":true}
✓ no errors anywhere

all checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 20.69ms
✔ add in 20.96ms
✔ Copying web assets from www to ios/App/App/public in 39.78ms
✔ Creating capacitor.config.json in ios/App/App in 943.79μs
✔ copy ios in 91.56ms
✔ Updating iOS plugins in 1.42ms
✔ Updating iOS native dependencies with pod install in 13.83s
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
✔ update ios in 13.89s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 125.29ms
✔ Creating capacitor.config.json in ios/App/App in 1.23ms
✔ copy ios in 149.99ms
✔ Updating iOS plugins in 1.94ms
✔ Updating iOS native dependencies with pod install in 8.44s
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
✔ update ios in 8.49s
[info] Sync finished in 8.714s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-27 17:38:22.116  INFO: [ContentDelivery.Uploader.6000008584C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 5cc1bb06-fda8-4305-9880-cabd35886cdd
Transferred 7251777 bytes in 0.228 seconds (31.8MB/s, 254.458Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
