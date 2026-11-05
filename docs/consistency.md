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
