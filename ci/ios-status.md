# iPhone build #167 — failure

Wed Nov 18 16:50:18 UTC 2026

```
✓ undoing a lesson takes today’s XP back — {"bad":[],"lesson":true,"inspo":true,"kr":true,"area":true,"back":true}
✓ old tax bills: amounts add up
✓ old tax bills: checks pay them after the cards, investing waits
✓ old tax bills: a payment plan counts as a bill — {"total":true,"rows":21,"paysOld":true,"investWaits":true,"planIsBill":true,"calendar":true,"oldestFirst":true,"xp":true,"kr":true,"undo":true,"card":true}
✓ old tax bills: filing + plan dates show on the calendar — {"total":true,"rows":21,"paysOld":true,"investWaits":true,"planIsBill":true,"calendar":true,"oldestFirst":true,"xp":true,"kr":true,"undo":true,"card":true}
✓ old tax bills: paid oldest first, earn XP, count for KRs, undo cleanly — {"total":true,"rows":21,"paysOld":true,"investWaits":true,"planIsBill":true,"calendar":true,"oldestFirst":true,"xp":true,"kr":true,"undo":true,"card":true}
✓ old tax bills: card shows on Money → Taxes — {"total":true,"rows":21,"paysOld":true,"investWaits":true,"planIsBill":true,"calendar":true,"oldestFirst":true,"xp":true,"kr":true,"undo":true,"card":true}
✓ piece board: reference and your photo side by side — {"kr":true,"side":true,"slide":true,"cut":true,"armed":true,"removed":true}
✓ piece board: slide mode compares on one picture — {"kr":true,"side":true,"slide":true,"cut":true,"armed":true,"removed":true}
✓ piece board: remove takes two taps and keeps a copy — {"kr":true,"side":true,"slide":true,"cut":true,"armed":true,"removed":true}
✓ piece board: references count for the "References pinned" KR — {"kr":true,"side":true,"slide":true,"cut":true,"armed":true,"removed":true}
✓ piece design: unattached sketches no longer repeat on every piece — {"noRepeat":true,"design":true,"clear":true,"attach":true,"detach":true,"picker":true,"fromDatum":true}
✓ piece design: change or clear the design after creating a piece — {"noRepeat":true,"design":true,"clear":true,"attach":true,"detach":true,"picker":true,"fromDatum":true}
✓ piece design: attach and detach a sketch — {"noRepeat":true,"design":true,"clear":true,"attach":true,"detach":true,"picker":true,"fromDatum":true}
✓ piece design: add a new sketch from Datum, already on the piece — {"noRepeat":true,"design":true,"clear":true,"attach":true,"detach":true,"picker":true,"fromDatum":true}
✓ Life long-press menu uses the Life look — {"hl":"street"}
✓ pictures: Art and Datum pictures respond to press and hold — {"tagged":true,"sheet":true,"gone":true,"kept":true,"fold":true,"back":true,"xp":true}
✓ pictures: delete moves to Recently deleted, nothing wiped — {"tagged":true,"sheet":true,"gone":true,"kept":true,"fold":true,"back":true,"xp":true}
✓ pictures: Restore puts every kind back — {"tagged":true,"sheet":true,"gone":true,"kept":true,"fold":true,"back":true,"xp":true}
✓ no function is defined twice
✓ add art: picking photos works and Post saves it — {"noKinds":true,"picked":true,"saved":true,"wall":true}
✓ add art: one wall, no Procreate / Paper split — {"noKinds":true,"picked":true,"saved":true,"wall":true}
✓ hold menus: wins, ideas, quests, transactions, Top 3 — {"menus":true,"gone":true,"card":true,"back":true,"txn":true,"t3":true,"moved":true}
✓ hold delete is soft: Recently deleted + restore in the same spot — {"menus":true,"gone":true,"card":true,"back":true,"txn":true,"t3":true,"moved":true}
✓ hold: move a Top 3 to tomorrow — {"menus":true,"gone":true,"card":true,"back":true,"txn":true,"t3":true,"moved":true}
✓ deleted transactions stay deleted after bank syncs and imports — {"in":true,"stayGone":true,"importGone":true,"undo":true,"migrated":true}
✓ undo a deleted transaction lets it back in; ones that came back before the fix are removed — {"in":true,"stayGone":true,"importGone":true,"undo":true,"migrated":true}
✓ character line is a quote with its author; tap for the next one — {"quote":true,"next":true,"menu":true,"saved":true,"hidden":true}
✓ hold a quote: save it (Settings) or never see it again — {"quote":true,"next":true,"menu":true,"saved":true,"hidden":true}
✓ YouTube on the phone plays through the https video page; web keeps the direct player — {"web":true,"phone":true,"sheet":true}
✓ video page builds the YouTube player and ignores bad links — https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=0&start=9&loop=1&playlist=dQw4w9WgXcQ&mute=1 bad=0
✓ no errors anywhere

all checks passed
testing app.html · engine chromium
fixture {"days":60,"txns":2183,"gym":24}
✓ avatar gets baked and saved on the phone
✓ avatar is a real picture on the first render (not a placeholder), cloud still loading
✓ avatar painted within 300 ms of the app's first frame — -206 ms
page-change render ms today:38 week:24 quests:21 model:50 content:17 datum:23 gym:18 money:48 social:28 hustle:26 learn:25 city:39 evolve:39
after-data-change render ms today:53 week:32 quests:37 model:83 content:31 datum:32 gym:28 money:73 social:53 hustle:36 learn:38 city:71 evolve:77
✓ render today < 100 ms — 38 ms
✓ render week < 100 ms — 24 ms
✓ render quests < 100 ms — 21 ms
✓ render model < 100 ms — 50 ms
✓ render content < 100 ms — 17 ms
✓ render datum < 100 ms — 23 ms
✓ render gym < 100 ms — 18 ms
✓ render money < 100 ms — 48 ms
✓ render social < 100 ms — 28 ms
✓ render hustle < 100 ms — 26 ms
✓ render learn < 100 ms — 25 ms
✓ render city < 100 ms — 39 ms
✓ render evolve < 100 ms — 39 ms
✗ a tap that saves data (commit) on Today < 200 ms — 385 ms
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
✓ swipe hustle: page never blank — min opacity 1.00 over 35 frames
✓ swipe hustle: one #view — 1
✓ swipe hustle: no transform left on #view
✓ swipe hustle: moved to next tab
✓ swipe hustle: header and tab bar hold still — 0 px
✓ swipe hustle: the tab's content slides — 390 px
✓ swipe today: page never blank — min opacity 1.00 over 41 frames
✓ swipe today: one #view — 1
✓ swipe today: no transform left on #view
✓ swipe today: moved to next tab
✓ swipe today: header and tab bar hold still — 0 px
✓ swipe today: the tab's content slides — 390 px
✓ swipe money: page never blank — min opacity 1.00 over 29 frames
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
✓ lost finger-lift: a new touch settles the half-way swipe
✓ lost finger-lift: redraws are not held afterwards
✓ lost finger-lift: with no new touch, it settles by itself (past a quarter → next tab)
✓ tab highlight slides to the new tab
✓ tab highlight cleans up after the slide
✓ changing section: the old page dissolves over the new one
✓ changing section: nothing left behind
✓ start: the avatar-style library is not loaded (your pixel avatar doesn't need it)
✓ no page errors
1 check(s) failed
```
