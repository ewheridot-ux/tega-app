# Before signing: make sure the app ID has HealthKit on, and the widget / share extension IDs exist.
import os, time, json, urllib.request, urllib.error, jwt
KID, ISS, KEY = os.environ['KID'], os.environ['ISS'], os.environ['KEY']
def tok(): return jwt.encode({'iss': ISS, 'iat': int(time.time()), 'exp': int(time.time()) + 1100, 'aud': 'appstoreconnect-v1'}, KEY, algorithm='ES256', headers={'kid': KID, 'typ': 'JWT'})
def api(method, path, body=None):
    req = urllib.request.Request('https://api.appstoreconnect.apple.com' + path, method=method, data=json.dumps(body).encode() if body else None, headers={'Authorization': 'Bearer ' + tok(), 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r: t = r.read(); return json.loads(t) if t else {}
    except urllib.error.HTTPError as e:
        print(f'{method} {path} -> {e.code} {e.read().decode()[:400]}'); return None
def bundle(ident, name):
    r = api('GET', f'/v1/bundleIds?filter[identifier]={ident}&include=bundleIdCapabilities')
    hit = [x for x in (r or {}).get('data', []) if x['attributes']['identifier'] == ident]
    if hit: return hit[0], [x['attributes']['capabilityType'] for x in r.get('included', []) if x['type'] == 'bundleIdCapabilities']
    r = api('POST', '/v1/bundleIds', {'data': {'type': 'bundleIds', 'attributes': {'identifier': ident, 'name': name, 'platform': 'IOS'}}})
    print('registered', ident, bool(r)); return (r or {}).get('data'), []
main, caps = bundle('com.ewheridot.tegaexe', 'Tega.exe')
print('app capabilities:', caps)
if main and 'HEALTHKIT' not in caps:
    r = api('POST', '/v1/bundleIdCapabilities', {'data': {'type': 'bundleIdCapabilities', 'attributes': {'capabilityType': 'HEALTHKIT'}, 'relationships': {'bundleId': {'data': {'type': 'bundleIds', 'id': main['id']}}}}})
    print('HealthKit turned on:', bool(r))
for ident, name in [('com.ewheridot.tegaexe.widgets', 'Tega.exe Widgets'), ('com.ewheridot.tegaexe.share', 'Tega.exe Share')]:
    b, _ = bundle(ident, name); print(ident, 'ok' if b else 'MISSING')
