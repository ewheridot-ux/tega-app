# GitHub job: once a day, Claude searches the web for today's news and for things worth learning,
# shaped by the categories and goals in the app, and saves them for the Learning page (docs: news/latest).
# Never prints app data or headlines — only counts.
import os, sys, json, re, datetime, requests
KEY = os.environ.get('SUPA_SERVICE', ''); URL = os.environ.get('SUPA_URL', '').rstrip('/'); AK = os.environ.get('ANTHROPIC_API_KEY', '')
MODEL = os.environ.get('CLAUDE_MODEL', 'claude-sonnet-5-5')
if not KEY or not AK: print('missing secret:', 'SUPABASE_SERVICE_ROLE_KEY' if not KEY else 'ANTHROPIC_API_KEY'); sys.exit(0)
H = {'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json'}
rows = requests.get(f'{URL}/rest/v1/docs?select=user_id,data&path=eq.okr/state', headers=H, timeout=60).json()
if not rows: print('no app state yet'); sys.exit(0)
uid = rows[0]['user_id']; st = rows[0].get('data') or {}

# what the app knows you care about — categories, this quarter's goals, where you are in Datum, what you've been learning
def quarter_goals():
    Q = st.get('quarters') or {}
    if not Q: return []
    k = sorted(Q.keys())[-1]
    return [f"{o.get('track','')}: {o.get('title','')}" for o in (Q[k].get('objectives') or [])][:14]
learned = [l.get('skill', '') for l in ((st.get('datum') or {}).get('learning') or [])][-10:]
hustle = (st.get('hustle') or {}).get('name') or 'side hustle'
seen = [x.get('t', '') for x in ((st.get('newsSeen') or {}).get('learn') or [])][-30:]
profile = {
    'who': 'Full-time fashion model (agency in NYC, lives in Chicago), building a custom grillz / dental-jewelry brand called Datum (wax carving, casting, finishing), posts content, plays guitar, learning to draw, lifts, self-employed so taxes/SEP-IRA matter.',
    'categories': ['Modeling', 'Datum Grillz', 'Content', 'Financial', 'Personal', 'Relationships', 'Fitness', 'Learning', hustle],
    'goals_this_quarter': quarter_goals(),
    'recently_learned': learned,
    'already_suggested': seen,
}
today = datetime.date.today().isoformat()
prompt = f"""Today is {today}. Use web search to build a short daily briefing for this person. Profile (JSON): {json.dumps(profile)}

Return ONLY JSON, no prose, in this shape:
{{"top":[{{"h":"headline in plain words, max 90 chars","sum":"one or two sentences: what happened and why it matters, plain language","src":"outlet","url":"https://..."}}],
 "yours":[{{"tag":"one of: Fashion, Jewelry, Money, Creators, Chicago, NYC, Music, Art, Tech, Health","h":"...","sum":"...","why":"one short line on why it matters to this person","src":"...","url":"https://..."}}],
 "learn":[{{"t":"a skill or topic to learn, 2-6 words","why":"one line tying it to their goals or what they're doing","first":"the first concrete step (a specific free video, article or exercise)","url":"https://... link to that first step","mins":15}}]}}

Rules: top = the 5 most important general news stories today (US and world), from reputable outlets, published in the last 24-36 hours. yours = 6 stories from the last few days in this person's worlds (fashion/modeling industry, jewelry/grillz/dental, self-employed money and taxes, creator economy, Chicago, music/art), each with a real why. learn = 5 things they'd likely enjoy or benefit from learning that are NOT in already_suggested and not already covered by recently_learned; mix practical (business, money, craft) with curiosity. Every url must be a real page you found. No duplicates across sections."""
r = requests.post('https://api.anthropic.com/v1/messages', headers={'x-api-key': AK, 'anthropic-version': '2023-06-01', 'content-type': 'application/json'},
    json={'model': MODEL, 'max_tokens': 6000, 'tools': [{'type': 'web_search_20250305', 'name': 'web_search', 'max_uses': 12}], 'messages': [{'role': 'user', 'content': prompt}]}, timeout=600)
if r.status_code != 200: print('claude error', r.status_code); sys.exit(1)
txt = ''.join(b.get('text', '') for b in r.json().get('content', []) if b.get('type') == 'text')
m = re.search(r'\{.*\}', txt, re.S)
try: out = json.loads(m.group(0)) if m else None
except Exception: out = None
if not out: print('no json in reply'); sys.exit(1)
ok = lambda u: isinstance(u, str) and u.startswith('http')
data = {'at': datetime.datetime.utcnow().isoformat(timespec='seconds') + 'Z', 'day': today,
        'top': [x for x in out.get('top', []) if x.get('h') and ok(x.get('url'))][:6],
        'yours': [x for x in out.get('yours', []) if x.get('h') and ok(x.get('url'))][:8],
        'learn': [x for x in out.get('learn', []) if x.get('t')][:6]}
w = requests.post(f'{URL}/rest/v1/docs?on_conflict=user_id,path', headers={**H, 'Prefer': 'resolution=merge-duplicates,return=minimal'},
                  json=[{'user_id': uid, 'path': 'news/latest', 'data': data}], timeout=60)
print('saved' if w.status_code < 300 else f'save failed {w.status_code}', len(data['top']), len(data['yours']), len(data['learn']))
