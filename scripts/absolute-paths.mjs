import fs from 'node:fs';import path from 'node:path';
export function absolutePaths(html,file){
 const folder=path.relative('dist',path.dirname(file)).replaceAll('\\','/');
 const base='https://site.invalid/'+(folder?folder+'/':'');
 return html.replace(/\b(href|src|poster|action)=("|')([^"']*)\2/g,(all,attr,quote,value)=>{
  if(!value||/^(?:#|\/|[a-z][a-z\d+.-]*:)/i.test(value))return all;
  const u=new URL(value,base);return `${attr}=${quote}${u.pathname}${u.search}${u.hash}${quote}`;
 });
}
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(file.endsWith('.html'))fs.writeFileSync(file,absolutePaths(fs.readFileSync(file,'utf8'),file));}}
walk('dist');
