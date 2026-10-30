import fs from 'node:fs';
const src='dist/agri/content-plans/', dest='dist/hvacr/content-plans/';
fs.cpSync(src,dest,{recursive:true});
const colors={'#163b25':'#102e45','#173c2a':'#102e45','#285333':'#0072bc','#4d614d':'#526677','#50614f':'#526677','#597a3e':'#0072bc','#5e705d':'#526677','#6b8b4d':'#0072bc','#72934d':'#0072bc','#8aa265':'#00adef','#8aa56d':'#00adef','#c6d4b6':'#c7deea','#c9d5b4':'#c7deea','#cbd9be':'#c7deea','#ccd7c0':'#c7deea','#cdd9c0':'#c7deea','#cfdbc3':'#c7deea','#d3ddc6':'#d6e5ee','#d7e0cd':'#d6e5ee','#dbe3d3':'#d6e5ee','#e5ecdb':'#e7f5fc','#e7eddd':'#e7f5fc','#e8efdd':'#e7f5fc','#e9efdf':'#e7f5fc','#eaf0e1':'#e7f5fc','#eaf0e2':'#e7f5fc','#f0f4e9':'#edf7fc','#f6f6f0':'#f5f8fa'};
let css=fs.readFileSync(dest+'plans.css','utf8');for(const [a,b] of Object.entries(colors))css=css.replaceAll(a,b);fs.writeFileSync(dest+'plans.css',css);
for(const lang of ['ar','en']){const path=dest+lang+'/index.html';let s=fs.readFileSync(path,'utf8').replaceAll('/agri/content-plans/','/hvacr/content-plans/').replaceAll('assets/agri-logo.png','assets/hvacr-logo.png').replaceAll('AGRI Expo','HVAC-R Egypt Expo').replaceAll('Back to AGRI','Back to HVAC-R');fs.writeFileSync(path,s)}
console.log('Built HVAC-R pricing pages');
