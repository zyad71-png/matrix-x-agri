(()=>{
 const cards=[...document.querySelectorAll('.script-card')];
 const expand=document.querySelector('#expand-scripts');
 const update=()=>{expand.textContent=cards.every(c=>c.open)?'إغلاق السكريبتات كلها':'فتح السكريبتات كلها';};
 expand.addEventListener('click',()=>{const open=!cards.every(c=>c.open);cards.forEach(c=>c.open=open);update();});
 cards.forEach(card=>{
  card.addEventListener('toggle',update);
  card.querySelector('.close-script').addEventListener('click',()=>{card.open=false;card.querySelector('summary').focus();});
 });
 const revealHash=()=>{const node=document.getElementById(location.hash.slice(1));if(node?.tagName==='DETAILS')node.open=true;};
 revealHash();window.addEventListener('hashchange',revealHash);
 if('IntersectionObserver' in window){
  const links=[...document.querySelectorAll('.section-nav a')];
  const active=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -60% 0px'});
  document.querySelectorAll('main>section').forEach(s=>active.observe(s));
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-ready');reveal.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.section-heading,.idea-card').forEach(s=>reveal.observe(s));}
 }
 document.querySelector('#download-notes').addEventListener('click',()=>{
  const value=document.querySelector('#notes-text').value.trim(),status=document.querySelector('#notes-status');
  if(!value){status.textContent='اكتب ملاحظاتك أولًا.';document.querySelector('#notes-text').focus();return;}
  const url=URL.createObjectURL(new Blob(['HVAC-R Egypt Expo — ملاحظات المراجعة\n\n'+value],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='HVACR-review-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='تم تجهيز ملف الملاحظات للتنزيل.';
 });
 let printState=[];window.addEventListener('beforeprint',()=>{printState=cards.map(c=>c.open);cards.forEach(c=>c.open=true);});window.addEventListener('afterprint',()=>cards.forEach((c,i)=>c.open=printState[i]));
})();
