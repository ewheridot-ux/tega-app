import fs from 'node:fs';
const src = fs.readFileSync('scripts/build-www.mjs','utf8')
  .replace(/^import \{ build \} from 'esbuild';$/m, '')
  .replace(/await build\(\{[^\n]*\n/, "fs.copyFileSync('test/native.test.js', path.join(www,'native.js'));\n");
fs.writeFileSync('test/_build.mjs', src.replace("path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')", "process.cwd()"));
