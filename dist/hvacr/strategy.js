(()=>{
 const menu=document.querySelector('.hvac-menu'),nav=document.querySelector('.section-nav');
 const close=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('menu-open');};
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('menu-open',open);});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 if(!document.querySelector('#scripts')&&/^#(ideas|scripts|performance|script-)/.test(location.hash))location.replace('execution.html'+location.hash);

 const cards=[...document.querySelectorAll('.script-card')];
 const expand=document.querySelector('#expand-scripts');
 const update=()=>{expand.textContent=cards.every(c=>c.open)?'إغلاق السكريبتات كلها':'فتح السكريبتات كلها';};
 expand?.addEventListener('click',()=>{const open=!cards.every(c=>c.open);cards.forEach(c=>c.open=open);update();});
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
 let printState=[];window.addEventListener('beforeprint',()=>{printState=cards.map(c=>c.open);cards.forEach(c=>c.open=true);});window.addEventListener('afterprint',()=>cards.forEach((c,i)=>c.open=printState[i]));
})();
