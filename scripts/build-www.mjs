// Builds www/ for Capacitor: the same Tega.exe page as the Claude version, plus the native layer.
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const www = path.join(root, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });

await build({ entryPoints: [path.join(root, 'src/native.js')], bundle: true, format: 'iife', target: ['safari15'], outfile: path.join(www, 'native.js'), minify: true });

const pub = JSON.parse(fs.readFileSync(path.join(root, 'config/public.json'), 'utf8'));
const cfg = { url: process.env.SUPABASE_URL || pub.supabaseUrl || '', anon: process.env.SUPABASE_ANON_KEY || pub.supabaseAnonKey || '' };
const app = fs.readFileSync(path.join(root, 'web/app.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src/native.css'), 'utf8');
const head = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="format-detection" content="telephone=no">
<style>:root{color-scheme:dark;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;padding:0;font:14px -apple-system,sans-serif;background:#000;color:#fff;-webkit-tap-highlight-color:transparent}img{max-width:100%}[hidden]{display:none!important}${css}</style>
<script>window.TEGA_CONFIG=${JSON.stringify(cfg)};</script>
<script src="native.js"></script>
</head><body>`;
fs.writeFileSync(path.join(www, 'index.html'), head + app + '</body></html>');
if (fs.existsSync(path.join(root, 'web/ex'))) fs.cpSync(path.join(root, 'web/ex'), path.join(www, 'ex'), { recursive: true });
fs.cpSync(path.join(root, 'fonts'), path.join(www, 'fonts'), { recursive: true });

// one-time import bundle (the Claude version's data + files)
const mig = path.join(root, 'migration');
if (fs.existsSync(mig)) {
  fs.cpSync(mig, path.join(www, 'migration'), { recursive: true });
  fs.cpSync(path.join(root, 'fonts'), path.join(www, 'fonts'), { recursive: true });
  const assets = JSON.parse(fs.readFileSync(path.join(mig, 'assets.json'), 'utf8'));
  const docs = fs.readdirSync(path.join(mig, 'db/okr')).filter(f => f.endsWith('.json')).map(f => 'okr/' + f.replace(/\.json$/, ''));
  fs.writeFileSync(path.join(www, 'migration/manifest.json'), JSON.stringify({ assets, docs }));
}
console.log('www built', cfg.url ? 'with Supabase config' : '(no Supabase config yet)');
