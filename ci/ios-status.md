# iPhone build #158 — failure

Wed Nov  4 22:07:32 UTC 2026

```
✓ each bucket shows its real account vs the plan (ahead / behind) — {"linked":true,"v":500,"plan":1000,"st":"behind","diff":-500}
✓ Datum: bank charges that look like supplies are suggested and count once — {"sug":true,"rows":1,"logged":true,"ret":true}
✓ Datum: logged purchases become write-offs — {"sug":true,"rows":1,"logged":true,"ret":true}
✓ money plan invests the FI plan amount once it starts — {"sug":true,"rows":1,"logged":true,"ret":true}
✓ Datum shopping suggestions add to the list and disappear once added — {"n":6,"added":true,"gone":true}
✓ every KR source returns a number
✓ a lesson done earns XP and moves the Lessons KR — {"bad":[],"lesson":true,"inspo":true,"kr":true,"area":true,"back":true}
✓ saving inspo earns XP — {"bad":[],"lesson":true,"inspo":true,"kr":true,"area":true,"back":true}
✓ undoing a lesson takes today’s XP back — {"bad":[],"lesson":true,"inspo":true,"kr":true,"area":true,"back":true}
✓ no errors anywhere

all checks passed
testing app.html · engine chromium
fixture {"days":60,"txns":2183,"gym":24}
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 111 ms
page-change render ms today:43 week:21 quests:21 model:48 content:19 datum:29 gym:21 money:49 social:30 hustle:18 learn:20 city:46 evolve:44
after-data-change render ms today:57 week:38 quests:34 model:63 content:30 datum:33 gym:28 money:68 social:38 hustle:29 learn:27 city:67 evolve:69
✓ render today < 100 ms — 43 ms
✓ render week < 100 ms — 21 ms
✓ render quests < 100 ms — 21 ms
✓ render model < 100 ms — 48 ms
✓ render content < 100 ms — 19 ms
✓ render datum < 100 ms — 29 ms
✓ render gym < 100 ms — 21 ms
✓ render money < 100 ms — 49 ms
✓ render social < 100 ms — 30 ms
✓ render hustle < 100 ms — 18 ms
✓ render learn < 100 ms — 20 ms
✓ render city < 100 ms — 46 ms
✓ render evolve < 100 ms — 44 ms
✓ a tap that saves data (commit) on Today < 200 ms — 113 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 29 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe hustle: page never blank — min opacity 1.00 over 20 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 27 frames
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
✓ no page errors
all perf checks passed
testing app.html · engine webkit
fixture {"days":60,"txns":2183,"gym":24}
✗ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — 231 ms
page-change render ms today:22 week:8 quests:7 model:22 content:8 datum:13 gym:7 money:20 social:13 hustle:10 learn:11 city:15 evolve:24
after-data-change render ms today:27 week:11 quests:10 model:29 content:12 datum:16 gym:13 money:31 social:14 hustle:14 learn:16 city:33 evolve:32
✓ render today < 100 ms — 22 ms
✓ render week < 100 ms — 8 ms
✓ render quests < 100 ms — 7 ms
✓ render model < 100 ms — 22 ms
✓ render content < 100 ms — 8 ms
✓ render datum < 100 ms — 13 ms
✓ render gym < 100 ms — 7 ms
✓ render money < 100 ms — 20 ms
✓ render social < 100 ms — 13 ms
✓ render hustle < 100 ms — 10 ms
✓ render learn < 100 ms — 11 ms
✓ render city < 100 ms — 15 ms
✓ render evolve < 100 ms — 24 ms
✓ a tap that saves data (commit) on Today < 200 ms — 63 ms
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
✓ swipe hustle: page never blank — min opacity 1.00 over 51 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 42 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 21 frames
✓ swipe money: one #view — 1
✓ swipe money: no transform left on #view
✓ swipe money: moved to next tab
✓ swipe money: header and tab bar hold still — 0 px
✓ swipe money: the tab's content slides — 390 px
· gym: no tab bar
✓ swipe social: next tab keeps your scroll — was 500 → 500
✓ swipe today: next tab keeps your scroll — was 500 → 500
✓ swipe money: next tab keeps your scroll — was 500 → 500
✓ no page errors
1 check(s) failed
```
