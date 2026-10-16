import { build } from '/home/claude/.npm-global/lib/node_modules/tsx/node_modules/esbuild/lib/main.js';
const stub = '/home/claude/tega-app/test/stubs/cap.js';
const alias = Object.fromEntries(['app','haptics','share','filesystem','local-notifications','status-bar','splash-screen'].map(p=>['@capacitor/'+p, stub]));
await build({ entryPoints: ['src/native.js'], bundle: true, format: 'iife', target: ['safari15'], outfile: 'test/native.test.js', alias });
console.log('bundled');
