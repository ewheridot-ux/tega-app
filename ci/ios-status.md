# iPhone build #159 — failure

Wed Nov  4 23:31:03 UTC 2026

```
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 30 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe hustle: page never blank — min opacity 1.00 over 37 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 36 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 39 frames
✓ swipe money: one #view — 1
✓ swipe money: no transform left on #view
✓ swipe money: moved to next tab
✓ swipe money: header and tab bar hold still — 0 px
✓ swipe money: the tab's content slides — 390 px
· gym: no tab bar
✓ swipe social: next tab keeps your scroll — was 500 → 500
✓ swipe today: next tab keeps your scroll — was 500 → 500
✓ swipe money: next tab keeps your scroll — was 500 → 500
✓ drag social (scrolled 300): next tab shows beside your finger, no gap
✓ drag social: scroll holds while dragging
✓ drag social: let go early → back on the same tab
✓ drag social: long drag → next tab, same height
✓ drag social: nothing left transformed
✓ drag today (scrolled 300): next tab shows beside your finger, no gap
✓ drag today: scroll holds while dragging
✓ drag today: let go early → back on the same tab
✓ drag today: long drag → next tab, same height
✓ drag today: nothing left transformed
✓ drag money (scrolled 300): next tab shows beside your finger, no gap
✓ drag money: scroll holds while dragging
✓ drag money: let go early → back on the same tab
✓ drag money: long drag → next tab, same height
✓ drag money: nothing left transformed
✓ swipe to a seen tab (social): its copy is right beside your finger
✓ swipe to a seen tab (social): no redraw while dragging — 0 redraws
✓ swipe to a seen tab (social): let go early → nothing redrawn, same tab — 0 redraws
✓ swipe to a seen tab (social): lands with one redraw, same height — 1 redraws
✓ swipe to a seen tab (money): its copy is right beside your finger
✓ swipe to a seen tab (money): no redraw while dragging — 0 redraws
✓ swipe to a seen tab (money): let go early → nothing redrawn, same tab — 0 redraws
✓ swipe to a seen tab (money): lands with one redraw, same height — 1 redraws
✓ tab highlight slides to the new tab
✓ tab highlight cleans up after the slide
✓ changing section: the old page dissolves over the new one
✓ changing section: nothing left behind
✓ start: the avatar-style library is not loaded (your pixel avatar doesn't need it)
✓ no page errors
all perf checks passed
testing app.html · engine webkit
fixture {"days":60,"txns":2183,"gym":24}
✓ avatar gets baked and saved on the phone
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✗ avatar painted within 300 ms of the app's first frame — 354 ms
page-change render ms today:42 week:23 quests:18 model:31 content:18 datum:21 gym:12 money:33 social:16 hustle:12 learn:17 city:27 evolve:28
after-data-change render ms today:58 week:27 quests:21 model:55 content:22 datum:22 gym:23 money:47 social:18 hustle:20 learn:30 city:43 evolve:52
✓ render today < 100 ms — 42 ms
✓ render week < 100 ms — 23 ms
✓ render quests < 100 ms — 18 ms
✓ render model < 100 ms — 31 ms
✓ render content < 100 ms — 18 ms
✓ render datum < 100 ms — 21 ms
✓ render gym < 100 ms — 12 ms
✓ render money < 100 ms — 33 ms
✓ render social < 100 ms — 16 ms
✓ render hustle < 100 ms — 12 ms
✓ render learn < 100 ms — 17 ms
✓ render city < 100 ms — 27 ms
✓ render evolve < 100 ms — 28 ms
✓ a tap that saves data (commit) on Today < 200 ms — 78 ms
✓ Life look via #life — study/street
✓ Life look via #social — study/street
✓ Life look via #hustle — study/street
✓ Life look via #learn — study/street
✓ swipe social: page never blank — min opacity 1.00 over 54 frames
✓ swipe social: one #view — 1
✓ swipe social: no transform left on #view
✓ swipe social: moved to next tab
✓ swipe social: header and tab bar hold still — 0 px
✓ swipe social: the tab's content slides — 390 px
✓ swipe hustle: page never blank — min opacity 1.00 over 49 frames
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
✓ swipe money: page never blank — min opacity 1.00 over 39 frames
✓ swipe money: one #view — 1
✓ swipe money: no transform left on #view
✓ swipe money: moved to next tab
✓ swipe money: header and tab bar hold still — 0 px
✓ swipe money: the tab's content slides — 390 px
· gym: no tab bar
✓ swipe social: next tab keeps your scroll — was 500 → 500
✓ swipe today: next tab keeps your scroll — was 500 → 500
✓ swipe money: next tab keeps your scroll — was 500 → 500
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

page.evaluate: TypeError: Illegal constructor
    at /Users/runner/work/tega-app/tega-app/tests/perf.mjs:128:24

Node.js v20.20.2
```
