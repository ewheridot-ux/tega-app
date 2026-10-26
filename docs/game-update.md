# Game update — checklist (b247+)

Rule zero: XP and level never drop. Gold, tiers and shields only ever come from things already done; spending is logged, never deleted.

## 3 · Hit pops
- [x] A1 `gameSnap()` — XP, level, 6 stats, every boss's HP (Vault, Wyrm, Golem, Algorithm, Warden, card bosses), chests waiting, buffs/debuffs, gold, season tier
- [x] A2 After a change you made, the difference pops above the nav: up to 3 lines (+N more), CRIT style for big hits and kills; waits while a level-up, chest or sheet is open; an undo takes the hits back instead of popping
- [x] A3 Pops replace the old "+N XP" toast (no double message)
- [x] A4 Character reacts on Today: hype on a boss hit or kill
- [x] A5 Every hit is logged per day; Close the day shows today's hits + XP
- [x] A6 Hits from the bank feed (Vault, Wyrm) are logged and popped the next time you open the app; nothing pops on app start or cloud sync

## 6 · Buff row
- [x] B1 Icons only, in one row: green ring = buff, red ring = debuff, gold = chests; scrolls sideways if long
- [x] B2 Perk-driven effects (Titan, Steady Hands, Strategist, Polymath, Sage) collapse into one ⚙️ chip with a count
- [x] B3 Tap any icon → one line (name · effect · cure) + a fix button for debuffs
- [x] B4 XP multiplier sits at the end of the row; tap → full breakdown (existing XP sheet)
- [x] B5 Curing a debuff pops "✓ Rusty cured"
- [x] B6 Same row everywhere the old strip showed

## 4 · Quest log
- [x] C1 Daily = Top 3 + habits; all 3 Top 3 done = daily clear → chest
- [x] C2 Weekly = this week's initiatives + the money quest; all done = weekly clear → rare chest
- [x] C3 Season = class quest + the season boss (5)
- [x] C4 Thin line under Top 3: 📜 Quest log · week x/y (· day cleared ✓) → opens the log — no repeat of numbers already on screen
- [x] C5 Quest log sheet: Daily, Weekly, Season, Side quests (the old quest card moves here, add-quest included); no duplicate quest card elsewhere
- [x] C6 Each clear pays gold

## 2 · Three scores
- [x] D1 Gold 💰 earned (counted from Oct 20): Top 3 5 · quests S5/M15/B40 · daily clear 20 · weekly clear 60 · boss kill 100 · season tier rewards (the whole season counts) · chest loot by rarity 10/25/60/150
- [x] D2 Spending is a permanent log; gold can't go below 0
- [x] D3 Shop: streak shield 150 (hold max 3) · skill-point reset 200
- [x] D4 Shields = perfect weeks + season tiers + bought − used, max 3 held (extras wait and refill you, shown in the shop); always visible as 🛡️ n/3 next to the streak
- [x] D5 Top bar: streak + shields · Lv + title · 💰 gold · season. XP multiplier lives only in the buff row (no duplicate)
- [x] D6 Character page: level/XP + stats; one 🏆 Trophies sheet lists ranks (money + every area), titles (wear one) and badges; gold stays in the top bar only (no duplicate)
- [x] D7 Real money 🪙 on the Money page is untouched

## 5 · Seasons
- [x] E1 Season = quarter (Frost/Bloom/Heat/Harvest); Q4 2026 = Harvest
- [x] E2 13 tiers: one per week played (5+ active days or weekly clear) + one per area boss killed this quarter, max 13
- [x] E3 Tier rewards: gold, chests, 2 shields, the season background (tier 7, or the old 1,000 XP rule — whichever comes first, never taken away), title + legendary chest at 13
- [x] E4 Season boss = this quarter's goals: HP = key results, each finished KR hits, falls at 70% → trophy + title + 300 XP; last week shows "Showdown"
- [x] E5 Class quest shown on the season sheet
- [x] E6 First open of a new quarter shows last season's recap once
- [x] E7 Season pill opens the season sheet

## 1 · The city (picture first — not built until approved)
- [ ] Bosses on their buildings · glows for waiting rewards · quest board · your house (character, skill tree, evolution, trophies, inventory) · nav stays 7

## Checks
- [x] tests/run.mjs covers: pops fire on a change, buff row icons + tap line, quest log counts, gold ≥ 0 and spend log, shields formula, season tiers ≤ 13, XP unchanged by all of it
- [x] Screenshots at phone size of every changed screen, light + dark
- [x] Independent review against this checklist
