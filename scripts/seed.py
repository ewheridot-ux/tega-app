# Personal seed data (modeling history, agents, statements, travel) lives OUTSIDE the public code.
# web/app.html in the repo carries a stub between /*SEED:BEGIN*/ and /*SEED:END*/; the real block is sealed in ci/seed.bin.
#
#   python3 scripts/seed.py split web/app.html          real block -> sealed ci/seed.bin, stub left in the file (run once, or after editing seed data)
#   python3 scripts/seed.py inject web/app.html OUT     CI only: opens ci/seed.bin with SUPA_SERVICE and writes OUT with the real block
#   python3 scripts/seed.py take LIVE.html web/app.html OUT   Claude sessions (no secret): copy the real block out of the live
#                                                       web copy (Artifact read) into OUT, to publish the artifact without losing data
# Never prints the data.
import sys, os, re, base64, hashlib, subprocess
B, E = '/*SEED:BEGIN*/', '/*SEED:END*/'
STUB = (B + "const SEED_STUB=1, MODEL_SEED=[], MODEL_PAY=[], MODEL_AGENTS=[], MODEL_FIX={}, MODEL_STMT_ADD=[], TRAVEL_ADD=[], HIST_SEED={BofA:[],Discover:[]}, FID_SEED=[], SOCIAL_SEED=[], BILLS=[], GM=id=>'', SEED_BOFA=[], SEED_DISC=[], "
        "ONE_STMT={from:'2026-01-01',asOf:'2026-01-01',balance:0,opening:0,invoiced:0,paid:0,charges:0,check:0,inv:[],pays:[],chg:[],file:''};" + E)

def block(s):
    i, j = s.find(B), s.find(E)
    if i < 0 or j < 0: sys.exit('no SEED markers')
    return s[i:j + len(E)]

def put(s, blk): return s.replace(block(s), blk, 1)

def open_sealed(path):
    from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey, X25519PublicKey
    from cryptography.hazmat.primitives.kdf.hkdf import HKDF
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305
    key = os.environ.get('SUPA_SERVICE', '')
    if not key: sys.exit('SUPA_SERVICE missing')
    sk_raw = hashlib.sha256((key + '|tega-feed').encode()).digest()
    xk = X25519PrivateKey.from_private_bytes(sk_raw)
    pk = xk.public_key().public_bytes(serialization.Encoding.Raw, serialization.PublicFormat.Raw)
    b = base64.b64decode(open(path).read().strip()[3:]); epk, nonce, ct = b[:32], b[32:44], b[44:]
    k = HKDF(hashes.SHA256(), 32, salt=epk + pk, info=b'tega-feed v2').derive(xk.exchange(X25519PublicKey.from_public_bytes(epk)))
    return ChaCha20Poly1305(k).decrypt(nonce, ct, None).decode()

cmd = sys.argv[1] if len(sys.argv) > 1 else ''
if cmd == 'split':
    f = sys.argv[2]; s = open(f).read(); blk = block(s)
    if 'SEED_STUB=1' in blk: sys.exit('already a stub — nothing to split')
    tmp = 'ci/.seed.tmp'; open(tmp, 'w').write(blk)
    out = subprocess.run([sys.executable, 'scripts/feed_seal.py', tmp], capture_output=True, text=True, check=True).stdout
    os.remove(tmp); assert out.startswith('v2:'); open('ci/seed.bin', 'w').write(out)
    open(f, 'w').write(put(s, STUB)); print('sealed', len(blk), 'chars → ci/seed.bin; stub left in', f)
elif cmd == 'inject':
    f, out = sys.argv[2], sys.argv[3]; s = open(f).read(); blk = open_sealed('ci/seed.bin')
    assert blk.startswith(B) and blk.endswith(E) and 'SEED_STUB=0' in blk
    open(out, 'w').write(put(s, blk)); print('seed injected')
elif cmd == 'take':
    live, f, out = sys.argv[2], sys.argv[3], sys.argv[4]; blk = block(open(live).read())
    if 'SEED_STUB=0' not in blk: sys.exit('the live copy has no real seed block — do not publish')
    open(out, 'w').write(put(open(f).read(), blk)); print('seed copied from the live web copy')
else:
    print(__doc__ or 'usage: split | inject | take')
