# Tega.exe — iPhone app

The full Tega.exe life-OS (Today, Goals, Modeling, Datum, Gym, Money, Me) as a native iPhone app.

- **`web/app.html`** — the app itself. It is the same page as the Claude version, so features stay in sync.
- **`src/native.js`** — the iPhone layer: sign-in, cloud sync (Supabase), photo/clip storage, the Claude coach, rest-timer and reminder notifications, haptics, saving to Photos.
- **`supabase/`** — cloud database tables, photo storage, and the `claude` function that calls the Claude API with your key (the key never ships in the app).
- **`migration/`** — a snapshot of your data from the Claude version. The app imports it once, the first time you sign in.
- **`.github/workflows/`** — `iPhone build → TestFlight` builds the app on GitHub's Macs and sends it to TestFlight; `Set up the cloud database` prepares Supabase.

## One-time setup

### 1. Supabase (cloud database)
1. Create a free project at supabase.com. Save the **database password** you pick.
2. Project Settings → **API**: copy the **Project URL** and the **anon public key**.
3. Project Settings → **General**: copy the **Reference ID**.
4. Account → **Access Tokens**: generate a token.

### 2. Apple
1. App Store Connect → **Users and Access → Integrations → App Store Connect API** → generate a key with **Admin** access. Download the `.p8` file once; note the **Key ID** and **Issuer ID**.
2. developer.apple.com → Membership: copy your **Team ID**.
3. App Store Connect → **Apps → + → New App**: iOS, name `Tega.exe`, bundle ID `com.ewheridot.tegaexe` (register it first under Certificates, Identifiers & Profiles if it isn't listed), SKU `tegaexe`.

### 3. GitHub secrets (repo → Settings → Secrets and variables → Actions)
The public Supabase address, anon key and project ref live in `config/public.json`.
| Secret | Value |
|---|---|
| `SUPABASE_ACCESS_TOKEN` | access token |
| `SUPABASE_DB_PASSWORD` | database password |
| `ANTHROPIC_API_KEY` | your Claude API key |
| `APPLE_TEAM_ID` | Team ID |
| `ASC_KEY_ID` | Key ID |
| `ASC_ISSUER_ID` | Issuer ID |
| `ASC_KEY_P8` | full text of the `.p8` file |

### 4. Run
1. Actions → **Set up the cloud database** → Run workflow (or change `ci/run-supabase`). Results are written to `ci/supabase-status.md`; iPhone builds report to `ci/ios-status.md`.
2. Actions → **iPhone build → TestFlight** → Run workflow (it also runs on every push to `main`).
3. Install **TestFlight** on your iPhone; the build appears there ~10–20 minutes after the workflow finishes.
4. Open Tega.exe → **Create account** → your data moves over automatically.

## Notes
- Gmail, bank (Era), Instagram and Yelp pulls use Claude's connectors, so they keep running in the Claude version and its scheduled tasks; the app shows everything else.
- Photos and clips are stored with random 32-character names; anyone with an exact link could open one, nobody can list them.
- Replaced or deleted uploads are never removed from storage.
