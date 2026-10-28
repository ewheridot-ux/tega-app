# iPhone build #128 — success

Wed Oct 28 01:50:40 UTC 2026

```
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
✓ top bar shows streak+shields, level, gold, season — 🔥 7 day streak · 🛡️2/3 | Lv 4 · Rookie IV | 💰 110 | 🍂 1/13
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
✓ a casting asking for materials becomes a self-tape due that day — {"a":["selftape",true,"due end of day"],"b":"selftape","c":"selftape","cal":true}
✓ self-tape and casting-video emails are read — {"a":["selftape",true,"due end of day"],"b":"selftape","c":"selftape","cal":true}
✓ self-tapes show on the calendar — {"a":["selftape",true,"due end of day"],"b":"selftape","c":"selftape","cal":true}
✓ Tega sees your money, schedule and goals — {"ctx":true,"added":2,"notDeleted":true,"pend":1,"fix":true,"quest":true,"acts":4,"undone":true}
✓ asking Tega for goals actually adds them — {"ctx":true,"added":2,"notDeleted":true,"pend":1,"fix":true,"quest":true,"acts":4,"undone":true}
✓ removals wait for your Confirm tap — {"ctx":true,"added":2,"notDeleted":true,"pend":1,"fix":true,"quest":true,"acts":4,"undone":true}
✓ Undo puts everything back — {"ctx":true,"added":2,"notDeleted":true,"pend":1,"fix":true,"quest":true,"acts":4,"undone":true}
✓ problems you report go on the fix list — {"ctx":true,"added":2,"notDeleted":true,"pend":1,"fix":true,"quest":true,"acts":4,"undone":true}
✓ Tega can add quests — {"ctx":true,"added":2,"notDeleted":true,"pend":1,"fix":true,"quest":true,"acts":4,"undone":true}
✓ Ask Tega button sits next to your picture
✓ no errors anywhere

all checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 22.02ms
✔ add in 22.27ms
✔ Copying web assets from www to ios/App/App/public in 32.98ms
✔ Creating capacitor.config.json in ios/App/App in 463.42μs
✔ copy ios in 76.69ms
✔ Updating iOS plugins in 1.47ms
✔ Updating iOS native dependencies with pod install in 12.75s
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
✔ update ios in 12.79s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 66.90ms
✔ Creating capacitor.config.json in ios/App/App in 671.75μs
✔ copy ios in 86.69ms
✔ Updating iOS plugins in 1.97ms
✔ Updating iOS native dependencies with pod install in 5.10s
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
✔ update ios in 5.17s
[info] Sync finished in 5.281s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-10-28 01:50:40.256  INFO: [ContentDelivery.Uploader.600001E78040] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 5f70ccc7-1cc2-4d48-83e8-67f2253c5d6a
Transferred 7256697 bytes in 0.292 seconds (24.9MB/s, 199.135Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
