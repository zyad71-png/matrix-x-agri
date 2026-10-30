import fs from 'node:fs';import path from 'node:path';
function walk(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,x.name);if(x.isDirectory())walk(p);else if(p.endsWith('.html')){let s=fs.readFileSync(p,'utf8');const rel=path.relative(path.dirname(p),'dist').replaceAll('\\','/');const base=rel?rel+'/':'';if(!s.includes('navigation-ui.js'))s=s.replace('</head>',`<link rel="stylesheet" href="${base}mobile-performance.css"><script src="${base}navigation-ui.js" defer></script><script>if('scrollRestoration' in history)history.scrollRestoration='manual';</script></head>`);s=s.replace(/width="9501" height="8321"/g,'width="320" height="280"');fs.writeFileSync(p,s)}}}
walk('dist');

await import('./absolute-paths.mjs');
