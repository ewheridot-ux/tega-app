# Used by the daily Claude sync: encrypt the feed for the GitHub job (only it can open it).
# usage: python3 scripts/feed_seal.py feed.json > ci/feed/feed.bin
# Needs only the `cryptography` package (already installed in Claude's workspace; no pip needed).
# v2 format: "v2:" + base64(ephemeral X25519 public key | 12-byte nonce | ChaCha20-Poly1305 ciphertext)
import sys, os, base64
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey, X25519PublicKey
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305
raw = lambda k: k.public_bytes(serialization.Encoding.Raw, serialization.PublicFormat.Raw)
pk = base64.b64decode(open('ci/feed/pubkey.txt').read().strip())
ek = X25519PrivateKey.generate(); epk = raw(ek.public_key())
key = HKDF(hashes.SHA256(), 32, salt=epk + pk, info=b'tega-feed v2').derive(ek.exchange(X25519PublicKey.from_public_bytes(pk)))
nonce = os.urandom(12)
ct = ChaCha20Poly1305(key).encrypt(nonce, open(sys.argv[1], 'rb').read(), None)
sys.stdout.write('v2:' + base64.b64encode(epk + nonce + ct).decode())
