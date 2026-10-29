(()=>{'use strict';const legacy=new Set(['intro','review','idea','plan','content','together','main']);function redirect(){if(legacy.has(location.hash.slice(1))){document.documentElement.classList.add('redirecting');location.replace(new URL('agri/'+location.hash,location.href).href)}}redirect();addEventListener('hashchange',redirect)})();
(()=>{
const body=document.body,prompt=document.querySelector('.portal-prompt'),overlay=document.querySelector('.portal-transition');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.exhibition-option').forEach(card=>{
 const agri=card.classList.contains('agri-option');
 const activate=()=>{body.dataset.world=agri?'agri':'hvacr';prompt.textContent=agri?'هنا الأفكار بتكبر. ندخل عالم AGRI؟':'من سؤال مهني لفكرة مؤثرة. ندخل عالم HVAC-R؟';};
 const reset=()=>{card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');};
 card.addEventListener('pointerenter',activate);card.addEventListener('focus',activate);
 card.addEventListener('pointermove',e=>{if(reduce.matches||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*7}deg`);card.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*7}deg`);});
 card.addEventListener('pointerleave',reset);card.addEventListener('blur',reset);
 card.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0||reduce.matches)return;e.preventDefault();overlay.querySelector('img').src=card.querySelector('img').src;body.classList.add('is-entering');setTimeout(()=>location.assign(card.href),340);});
});
addEventListener('pageshow',()=>body.classList.remove('is-entering'));
})();
