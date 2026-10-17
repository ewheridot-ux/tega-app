# Used by the daily Claude sync: encrypt the feed for the GitHub job (only it can open it).
# usage: python3 scripts/feed_seal.py feed.json > ci/feed/feed.bin
import sys, base64
from nacl.public import PublicKey, SealedBox
pub = PublicKey(base64.b64decode(open('ci/feed/pubkey.txt').read().strip()))
data = open(sys.argv[1], 'rb').read()
sys.stdout.write(base64.b64encode(SealedBox(pub).encrypt(data)).decode())
