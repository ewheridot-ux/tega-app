# Creates an internal TestFlight group "Me" with access to every build and adds the account holder to it.
import os, time, json, urllib.request, urllib.error, jwt
KID, ISS, KEY = os.environ['KID'], os.environ['ISS'], os.environ['KEY']
BID = 'com.ewheridot.tegaexe'
out = []
def log(*a): s=' '.join(str(x) for x in a); print(s); out.append(s)
def tok(): return jwt.encode({'iss': ISS, 'iat': int(time.time()), 'exp': int(time.time()) + 1100, 'aud': 'appstoreconnect-v1'}, KEY, algorithm='ES256', headers={'kid': KID, 'typ': 'JWT'})
def api(method, path, body=None):
    req = urllib.request.Request('https://api.appstoreconnect.apple.com' + path, method=method, data=json.dumps(body).encode() if body else None, headers={'Authorization': 'Bearer ' + tok(), 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r: t = r.read(); return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        log(f'{method} {path} -> {e.code} {e.read().decode()[:600]}'); return None
try:
    apps = api('GET', f'/v1/apps?filter[bundleId]={BID}')
    if not apps or not apps['data']: log('App not found in App Store Connect'); raise SystemExit
    app = apps['data'][0]['id']; log('App:', apps['data'][0]['attributes']['name'], app)
    b = api('GET', f'/v1/builds?filter[app]={app}&sort=-uploadedDate&limit=5') or {'data': []}
    for x in b['data']: a = x['attributes']; log('Build', a['version'], a['processingState'], a.get('uploadedDate'))
    g = api('GET', f'/v1/betaGroups?filter[app]={app}&limit=50') or {'data': []}
    grp = next((x for x in g['data'] if x['attributes'].get('isInternalGroup')), None)
    if grp: log('Internal group exists:', grp['attributes']['name'])
    else:
        r = api('POST', '/v1/betaGroups', {'data': {'type': 'betaGroups', 'attributes': {'name': 'Me', 'isInternalGroup': True, 'hasAccessToAllBuilds': True}, 'relationships': {'app': {'data': {'type': 'apps', 'id': app}}}}})
        grp = r and r['data']; log('Created internal group:', bool(grp))
    u = api('GET', '/v1/users?limit=50') or {'data': []}
    me = next((x for x in u['data'] if 'ACCOUNT_HOLDER' in x['attributes'].get('roles', [])), u['data'][0] if u['data'] else None)
    if me and grp:
        a = me['attributes']; email = a.get('username') or a.get('email'); log('Adding tester:', email)
        r = api('POST', '/v1/betaTesters', {'data': {'type': 'betaTesters', 'attributes': {'email': email, 'firstName': a.get('firstName', ''), 'lastName': a.get('lastName', '')}, 'relationships': {'betaGroups': {'data': [{'type': 'betaGroups', 'id': grp['id']}]}}}})
        if r: log('Tester added. TestFlight invite sent to', email)
        else:
            t = api('GET', f"/v1/betaTesters?filter[email]={email}")
            if t and t['data']:
                api('POST', f"/v1/betaGroups/{grp['id']}/relationships/betaTesters", {'data': [{'type': 'betaTesters', 'id': t['data'][0]['id']}]}); log('Existing tester linked to the group')
finally:
    open('ci/testflight-status.md', 'w').write('# TestFlight setup\n\n```\n' + '\n'.join(out) + '\n```\n')
