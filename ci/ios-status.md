# iPhone build #144 — success

Mon Nov  2 15:01:42 UTC 2026

```
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
✓ bosses float on their buildings — 8
✓ quest board marker on the fountain opens the quest log
✓ quest board + house cards
✓ town and bosses not repeated on the Character page
✓ changes since last open pop on the next open — ✦+10 XP
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
✓ side hustle gets a starter goal — {"seeded":true,"hrs":2,"kr":2,"xpUp":true,"stat":true,"tree":true,"boss":true,"track":"Side Hustle","renamed":"CAD⚙️","xpKept":true}
✓ logging side hustle time counts toward its goal — {"seeded":true,"hrs":2,"kr":2,"xpUp":true,"stat":true,"tree":true,"boss":true,"track":"Side Hustle","renamed":"CAD⚙️","xpKept":true}
✓ side hustle work earns XP, and XP never drops when it is deleted — {"seeded":true,"hrs":2,"kr":2,"xpUp":true,"stat":true,"tree":true,"boss":true,"track":"Side Hustle","renamed":"CAD⚙️","xpKept":true}
✓ side hustle has a stat, skill tree and boss — {"seeded":true,"hrs":2,"kr":2,"xpUp":true,"stat":true,"tree":true,"boss":true,"track":"Side Hustle","renamed":"CAD⚙️","xpKept":true}
✓ you can rename it (e.g. to CAD) — {"seeded":true,"hrs":2,"kr":2,"xpUp":true,"stat":true,"tree":true,"boss":true,"track":"Side Hustle","renamed":"CAD⚙️","xpKept":true}
✓ the city shows the side hustle — Studio · Vault|Forge · Molten Golem|Tower · Algorithm|Gym · Iron Warden|Bank · Wyrm|Plaza · Hermit King|Workshop · Someday Spider|Library · Fog
✓ Top 3 is never filled in for you — [{"cleared":true,"kept":true,"notFilled":true},{"head":1,"quip":0,"sug":0}]
✓ one Ask Tega button (next to your picture) — {"head":1,"quip":0,"sug":0}
✓ Lululemon self-tape is on the calendar
✓ a photo on the wrong piece can be moved — {"ui":true,"moved":true,"notYet":true,"gone":true,"keptSession":true,"back":true}
✓ photos delete on a second tap, keep the session, and Undo restores them — {"ui":true,"moved":true,"notYet":true,"gone":true,"keptSession":true,"back":true}
✓ FI plan matches Mom’s PDF ($142,850 at 30, $1,529,615 at 55) — {"a30":142850,"a55":1529615,"ms":5,"ms2":5,"months":1}
✓ FI milestones are in the 5-year plan once — {"a30":142850,"a55":1529615,"ms":5,"ms2":5,"months":1}
✓ investing on plan counts as a month for goals — {"a30":142850,"a55":1529615,"ms":5,"ms2":5,"months":1}
✓ subscriptions are found from the bank (monthly, not bills) — {"nf":"monthly","nfBill":false,"rentBill":true,"subsRows":4,"fixedRows":2,"merch":4}
✓ transactions filter by any category, bucket or merchant across all months — {"nf":"monthly","nfBill":false,"rentBill":true,"subsRows":4,"fixedRows":2,"merch":4}
✓ each bucket shows its real account vs the plan (ahead / behind) — {"linked":true,"v":500,"plan":1000,"st":"behind","diff":-500}
✓ Datum: bank charges that look like supplies are suggested and count once — {"sug":true,"rows":1,"logged":true,"ret":true}
✓ Datum: logged purchases become write-offs — {"sug":true,"rows":1,"logged":true,"ret":true}
✓ money plan invests the FI plan amount once it starts — {"sug":true,"rows":1,"logged":true,"ret":true}
✓ Datum shopping suggestions add to the list and disappear once added — {"n":6,"added":true,"gone":true}
✓ no errors anywhere

all checks passed

> tega-app@1.0.0 build
> node scripts/build-www.mjs

www built with Supabase config
✔ Adding native Xcode project in ios in 12.82ms
✔ add in 13.04ms
✔ Copying web assets from www to ios/App/App/public in 26.92ms
✔ Creating capacitor.config.json in ios/App/App in 294.96μs
✔ copy ios in 55.63ms
✔ Updating iOS plugins in 753.13μs
✔ Updating iOS native dependencies with pod install in 10.89s
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
✔ update ios in 10.91s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 60.70ms
✔ Creating capacitor.config.json in ios/App/App in 680.96μs
✔ copy ios in 79.41ms
✔ Updating iOS plugins in 919.13μs
✔ Updating iOS native dependencies with pod install in 3.01s
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
✔ update ios in 3.02s
[info] Sync finished in 3.13s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-02 15:01:42.803  INFO: [ContentDelivery.Uploader.6000011104C0] 
==========================================
UPLOAD SUCCEEDED with no errors
Delivery UUID: 41c21e97-4a97-48ee-91b5-5b9804981dea
Transferred 8030607 bytes in 0.240 seconds (33.4MB/s, 267.356Mbps)
==========================================
No errors uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
