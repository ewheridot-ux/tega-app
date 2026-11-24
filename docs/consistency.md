# Every feature counts somewhere

Before a feature ships, it answers each of these. If the answer is "no" for something you do (not something you read), wire it in or say why not.

| Hook | Where it lives | Example |
|---|---|---|
| **XP** | `computeXP0()` — add a `…XP()` function; history counts from `GAME_START` | lesson done +15, takeaway +10, drawing stage +25, inspo +3 (5/day), hangout +20 |
| **KR source** | `KSRC` (fixed) or `ksrcAll()` (generated, e.g. one per habit, one per Learning subject) | `lessons`, `learn:<subject>`, `yoga`, `art`, `sep` |
| **Area / skill tree** | `SK_TREES` metrics in `skMetrics()`; each area in `AREAS` | Mind & Learning grows with lessons and takeaways |
| **Habit auto-tick** | `autoHabits()` | a guitar lesson or drawing stage ticks Guitar / art |
| **Boss / season** | the area's boss damage, if it has one | tax moves hit the Tax Wyrm |
| **Feedback** | `commit()` (not `commit({skipXp:true})`) so the XP pop shows | |

Rules that never bend:
- XP and level never drop because of an app change. New sources only add; finished days are floored (`S.xpFloor`).
- Things you *read* (news, demos) don't pay XP; things you *do or make* do.
- Anything a person can add (subjects, habits) gets its KR source generated, never hard-coded.
- `tests/run.mjs` checks every KR source returns a number and that a learning action pays and undoes.
- Money: anything owed (cards, old tax bills) gets a step in the waterfall, a KR source, XP per $100 paid, and a calendar date — entered by you in the app, never written into code.

## Look and feel
- Circle, Hustle and Learning share one Life look: Streetwear · Safety Orange (`data-look="street"`), with the LIFE RN. header holding the three numbers + next up. No per-page switchers, no repeated counters.
- New CSS goes right above the `/* @css-insert */` marker, between whole rules — never inside a selector.
- Tab bars (`.seg` or `[role=tablist]`) get swipe + slide animation for free; new pages should use one.
- Wishlist (Money → Now): claiming loot you saved for gives 10 XP per $100 (same as old tax bills) and logs a win.
- Side hustle (b318): no longer its own category. It is a Learning Project (old data stays in S.hustle; its XP, badges and goal sources still count; items tracked 'hustle' moved to 'learning'). Projects earn 10 XP/hour + 40 per thing shipped, have goal sources (proj:<id> hours) and hit the Fog boss.
- Learning (b318): subject types Skill / Book / Language / Hobby / Project. Lessons 15 XP; finishing a book +50 XP and a win; book sessions tick a "Read" habit; every lesson and project session hits the Fog boss.
- Circle (b318): Close the day "Saw anyone?" logs a hangout for today (counts as an event: XP, SOCIAL, Plaza, Hermit King); calendar plans "with Sam" update people.
- Activities link by words (b317): stretch/mobility/yoga, gym/workout, guitar/practice, bench/Datum, post/film, read (books), study/lesson/learn — matching habits and Top 3 tick themselves.

- Learning skill tree (b324): every subject is a tree of its own steps (lessons, Datum resources, Drawing stages, every 5 project hours) with a Proof of skill boss every 5 steps. Nothing is ticked twice — the tree reads the same records the subject already keeps.
  - XP: quiz 5 per right answer (best score per step), flashcards 2 per card you get right (max 30 a day), teach-back 15 (once per step), proof of skill 60 + a win, rank-up 30 per rank (Novice → Apprentice → Adept → Expert → Master, from skill points) + a win, Daily 10 5 per day with any learning.
  - Goals: Daily 10 days, flashcards reviewed, quiz answers right, teach-backs, proofs of skill (all generated, Learning track).
  - Habits / Top 3: "study / learn / lesson / Daily 10 / flashcards" tick on any learning day.
  - Fog boss: quiz 2, 5+ flashcards 2, teach-back 3, proof of skill 8 (crit).
  - Home shows one Daily 10 line (+ cards due); Life → Next up opens the next step of whatever you were last on; the weekly recap shows on Learning on Sunday (this week) and Monday (last week).
- Talent trees (b325): the character's skill tree. 7 areas × (3 specializations × 4 tiers + capstone).
  - Points per area come only from that area's feats (the milestone trees, which light up by themselves) — up to 40 per area. You choose where they go; every node also needs a real deed (a skMetrics number), tier gates (2/4/7 points in the tree, capstone 12) and the node above it.
  - Effects plug into the existing day XP (rpgFx multipliers, rpgAdj flat XP), debuffs (immunity), boss damage (aBossEvents), shields (cap + ability shields). Every talent is dated: it only counts from the day you take it, and a reset (shop item / once a quarter) never reaches back.
  - Old stat-point perks were carried over once as free nodes (dated before the game started, so past XP is unchanged). Stats now = real-life base + talents in that area. Classes already picked keep their quarter; later quarters use specializations.
  - New talents follow the same rule as everything else: tie them to a real number, never to a tap.
- Character screen (b326): one home for everything about you — Overview (level, XP, one row per area: level + stat + last 30 days + talent points), Skills (talent tree on the page, areas as tabs, feats a tap away), Look (build, style), Collection (cards & loot, trophies & titles, quest log, shop, season, bosses, City). Avatar, Lv pill, every area chip and old links land here. Streak / shields / gold / season live only in the top pills.
