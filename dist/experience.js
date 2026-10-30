(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const chapters=$$('.chapter'),header=$('.site-header'),nav=$('#main-nav'),menu=$('.menu-toggle');
const motion=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width: 1100px), (pointer: coarse)');let less=motion.matches||compact.matches,queued=false,needsMeasure=true,bar=96;
const scenes=chapters.map(section=>({section,anchor:document.getElementById(section.dataset.chapter)}));
function measure(){
 bar=header.getBoundingClientRect().height;
 document.documentElement.style.setProperty('--bar-height',`${bar}px`);
 scenes.forEach(({section},i)=>{section.style.zIndex=String(i+1);section.style.setProperty('--stack-top',`${Math.min(bar,innerHeight-section.offsetHeight)}px`)});
 document.documentElement.classList.toggle('stack-enabled',!less);needsMeasure=false;
}
function sync(){
 if(needsMeasure)measure();
 const rects=chapters.map(s=>s.getBoundingClientRect());let current=0;
 scenes.forEach(({section,anchor},i)=>{
  if((anchor||section).getBoundingClientRect().top<innerHeight*.4)current=i;
  const covered=!less&&i<chapters.length-1&&rects[i+1].top<=bar+1;
  if(section.inert!==covered)section.inert=covered;if(section.classList.contains('is-covered')!==covered)section.classList.toggle('is-covered',covered);
 });
 const id=chapters[current].dataset.chapter;
 $$('#main-nav a').forEach(a=>{const selected=a.hash==='#'+id||(a.hash==='#review'&&id==='strengths')||(a.hash==='#during'&&id==='after')||(a.hash==='#execution'&&id==='channels');if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 const range=document.documentElement.scrollHeight-innerHeight;
 $('.reading-progress i').style.transform=`scaleX(${range>0?Math.min(1,Math.max(0,scrollY/range)):0})`;
 queued=false;
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(sync)}}
function resized(){needsMeasure=true;schedule()}
function preference(){less=motion.matches||compact.matches;document.documentElement.classList.toggle('less-motion',less);if(less){chapters.forEach(c=>{c.inert=false;c.classList.remove('is-covered')})}resized()}
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
function revealTarget(target){
 document.dispatchEvent(new CustomEvent('plan:reveal',{detail:{target}}));
 for(let parent=target.parentElement;parent;parent=parent.parentElement){if(parent.tagName==='DETAILS')parent.open=true}
 if(target.tagName==='DETAILS')target.open=true;
 const section=target.closest('.chapter');if(section){section.inert=false;section.classList.remove('is-covered')}
 resized();
}
function navigate(target,behavior){
 revealTarget(target);
 requestAnimationFrame(()=>{if(needsMeasure)measure();window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-bar),behavior});schedule()});
}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const target=document.getElementById(a.hash.slice(1));if(!target)return;
 // Keep the standard skip-link focus behaviour.
 if(a.classList.contains('skip'))return;
 e.preventDefault();closeMenu();history.pushState(null,'',a.hash);navigate(target,less?'instant':'smooth');
}));
function restoreHash(){const target=document.getElementById(location.hash.slice(1));if(target)navigate(target,'instant')}
addEventListener('popstate',restoreHash);addEventListener('hashchange',restoreHash);
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',resized);motion.addEventListener('change',preference);compact.addEventListener('change',preference);
if('ResizeObserver' in window){const observer=new ResizeObserver(resized);chapters.forEach(c=>observer.observe(c));observer.observe(header)}
$$('details').forEach(d=>d.addEventListener('toggle',resized));
if(document.fonts)document.fonts.ready.then(resized);
addEventListener('load',()=>{resized();restoreHash()},{once:true});
if('IntersectionObserver' in window){document.documentElement.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('waiting');observer.unobserve(entry.target)}}),{threshold:.04});$$('.reveal').forEach(el=>{el.classList.add('waiting');observer.observe(el)})}
let printState=[];
addEventListener('beforeprint',()=>{printState=$$('details,.month-panel').map(el=>({el,open:el.open,hidden:el.hidden}));printState.forEach(({el})=>{if(el.tagName==='DETAILS')el.open=true;el.hidden=false});chapters.forEach(c=>{c.inert=false});document.documentElement.classList.remove('stack-enabled')});
addEventListener('afterprint',()=>{printState.forEach(({el,open,hidden})=>{if(el.tagName==='DETAILS')el.open=open;el.hidden=hidden});resized()});
preference();sync();requestAnimationFrame(restoreHash);
})();
