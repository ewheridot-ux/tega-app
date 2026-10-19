# GitHub job: pull bank data straight from Era's REST API (no Claude run needed) and merge it into the app's feed.
# Never prints amounts, names or descriptions — only counts and field names.
import os, sys, json, datetime, requests
KEY = os.environ.get('ERA_API_KEY', '').strip(); SK = os.environ.get('SUPA_SERVICE', ''); URL = os.environ.get('SUPA_URL', '').rstrip('/')
out = []
def done(msg):
    out.append(msg); open('ci/feed/bank_status.md', 'w').write('\n'.join(out) + '\n'); print('\n'.join(out)); sys.exit(0)
if not KEY: done('waiting for the ERA_API_KEY GitHub secret')
if not SK: done('missing SUPABASE_SERVICE_ROLE_KEY')
E = 'https://forge.era.app/api'; EH = {'X-API-Key': KEY, 'Accept': 'application/json'}
def get(path, **q):
    r = requests.get(E + path, headers=EH, params=q, timeout=60)
    if r.status_code != 200: done(f'era {path}: HTTP {r.status_code} {r.text[:160]}')
    return r.json()
def pick(d, *ks, default=None):
    for k in ks:
        if isinstance(d, dict) and d.get(k) is not None: return d[k]
    return default
acc_raw = get('/banking/accounts')
A = acc_raw if isinstance(acc_raw, list) else pick(acc_raw, 'accounts', 'items', 'data', default=[])
today = datetime.date.today(); frm = (today - datetime.timedelta(days=10)).isoformat()
T = []; page = 1
while page <= 5:
    tr = get('/banking/transactions', fromDate=frm, toDate=today.isoformat(), includePending='true', page=page, pageSize=100, sortBy='transactionDate', sortDirection='desc')
    rows = tr if isinstance(tr, list) else pick(tr, 'transactions', 'items', 'data', default=[])
    T += rows; pg = pick(tr, 'pagination', default={}) if isinstance(tr, dict) else {}
    if not rows or page >= (pg.get('totalPages') or 1): break
    page += 1
names = {pick(a, 'accountGroupKey', 'account_group_key', 'id'): pick(a, 'name', 'accountName') for a in A}
def acc(a):
    bal = pick(a, 'currentBalance', 'balance')
    if isinstance(bal, dict): bal = pick(bal, 'current', 'amount')
    return {'account_group_key': pick(a, 'accountGroupKey', 'account_group_key', 'id'), 'connection_id': pick(a, 'connectionId'), 'name': pick(a, 'name', 'accountName'),
            'institution': pick(a, 'institutionName', 'institution', default=''), 'type': pick(a, 'type', 'accountType', 'subtype', default=''), 'account_mask': pick(a, 'mask', 'accountMask'),
            'balance': {'current': bal, 'currency': pick(a, 'currencyCode', 'currency', default='USD')}, 'balance_as_of': pick(a, 'balanceAsOf', 'asOf'),
            'universal_type': pick(a, 'universalAccountType'), 'credit_limit': pick(a, 'creditLimit'), 'min_due': pick(a, 'nextPaymentMinimumAmount'), 'due_date': pick(a, 'nextPaymentDueDate')}
def tx(t):
    k = pick(t, 'accountGroupKey', 'accountId', 'account_group_key')
    return {'transaction_id': pick(t, 'transactionId', 'id', 'transactionGroupKey', 'key'), 'date': str(pick(t, 'transactionDate', 'date', 'postedDate', default=''))[:10],
            'description': pick(t, 'description', 'originalDescription', 'merchantName', default=''), 'amount': pick(t, 'amount'), 'currency': pick(t, 'currencyCode', default='USD'),
            'account_group_key': k, 'account_name': pick(t, 'accountName', default=names.get(k)), 'is_pending': bool(pick(t, 'isPending', 'pending', default=False))}
feed = {'at': datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'), 'calls': {'era_accounts': {'accounts': [acc(a) for a in A]}, 'era_tx': {'transactions': [tx(t) for t in T]}}}
out.append(f"era: {len(A)} accounts, {len(T)} transactions ({sum(1 for t in T if pick(t,'isPending','pending'))} pending)")
if T:
    ids = sorted({str(pick(t,'id','transactionId',default=''))[:5] for t in T}); out.append('tx id prefixes: ' + ','.join(ids))
    ok = sum(1 for t in T if t.get('isCashOutflow') is not None and (float(t.get('amount') or 0) < 0) == bool(t['isCashOutflow'])); out.append(f'outflow=negative on {ok}/{len(T)}')
if A:
    out.append('account types: ' + ', '.join(sorted({f"{a.get('accountType')}/{a.get('universalAccountType')}" for a in A})))
    out.append(f"cards with min due: {sum(1 for a in A if a.get('nextPaymentMinimumAmount') is not None)} · with due date: {sum(1 for a in A if a.get('nextPaymentDueDate'))}")
if A: out.append('account fields: ' + ','.join(sorted(A[0].keys())))
if T: out.append('tx fields: ' + ','.join(sorted(T[0].keys())))
bad = sum(1 for t in feed['calls']['era_tx']['transactions'] if not t['transaction_id'] or not t['date'] or t['amount'] is None)
if bad: out.append(f'WARNING: {bad} transactions missing id/date/amount — field mapping needs a fix')
H = {'apikey': SK, 'Authorization': 'Bearer ' + SK, 'Content-Type': 'application/json'}
rows = requests.get(f'{URL}/rest/v1/docs?select=user_id&path=eq.okr/state', headers=H, timeout=60).json()
if not rows: done('no app state yet')
uid = rows[0]['user_id']
old = requests.get(f'{URL}/rest/v1/docs?select=data&path=eq.feed/latest&user_id=eq.{uid}', headers=H, timeout=60).json()
oc = ((old[0].get('data') or {}).get('calls') or {}) if old else {}
feed['calls'] = {**oc, **feed['calls']}
r = requests.post(f'{URL}/rest/v1/docs?on_conflict=user_id,path', headers={**H, 'Prefer': 'resolution=merge-duplicates,return=minimal'}, json=[{'user_id': uid, 'path': 'feed/latest', 'data': feed}], timeout=60)
done(f"saved to app: HTTP {r.status_code} at {feed['at']}")
