# Tega.exe — notes for Claude sessions

## Private data is NOT in web/app.html
The repo is public. Everything personal (modeling history, agents, ONE statement, bank seeds, bills, events) sits between
`/*SEED:BEGIN*/` and `/*SEED:END*/`. In the repo that block is a **stub** (`SEED_STUB=1`); the real block is sealed in `ci/seed.bin`.

- iPhone build (ios.yml) injects the real block with the Supabase key before building, and refuses to build without it.
- **Publishing the web copy (artifact TvPMmYZGiDdFeLaHdWBNVs):** never publish the stub. Read the live artifact first
  (Artifact read → saved file), then:
  `python3 scripts/seed.py take <saved-live.html> web/app.html /tmp/publish.html` and publish `/tmp/publish.html`.
  If you changed the seed data itself, edit it in that full copy, then `cp` it over web/app.html and run
  `python3 scripts/seed.py split web/app.html` (re-seals ci/seed.bin and puts the stub back). Commit both.
- The app shows a warning toast if it ever runs with the stub.

## Checks
`node tests/run.mjs [file]` — boots the app, renders every page, XP never drops, booking parser, yoga timer. Runs in ios.yml before every build.

## Sync
- Gmail/Instagram: scheduled task "Tega.exe daily sync" (6:46am, 1:46pm, 7:46pm CT) seals a feed → ci/feed/feed.bin → feed.yml → Supabase `feed/latest`.
  Booking email bodies arrive as `gmail_bodies`. Each source's arrival time is in `feed/latest.stamps` (Settings → Sync status).
- Bank: bank.yml every 3h. Morning brief = the phone's own 9am notification (`window.tegaBrief`). The old Claude morning brief task is disabled because it read the web copy's database, not the phone's.
