(()=>{'use strict';const legacy=new Set(['intro','review','idea','plan','content','together','main']);function redirect(){if(legacy.has(location.hash.slice(1))){document.documentElement.classList.add('redirecting');location.replace(new URL('agri/'+location.hash,location.href).href)}}redirect();addEventListener('hashchange',redirect)})();
(()=>{
const body=document.body,prompt=document.querySelector('.portal-prompt'),overlay=document.querySelector('.portal-transition');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const dialog=document.querySelector('.world-dialog');let selected='',base='',trigger;
function openWorld(card,agri){
 trigger=card;base=card.href;selected='';dialog.dataset.world=agri?'agri':'hvacr';
 dialog.querySelector('.world-logo').src=card.querySelector('img').src;dialog.querySelector('.world-logo').alt=agri?'AGRI Expo':'HVAC-R Egypt Expo';
 dialog.querySelector('.world-launch').disabled=true;dialog.querySelector('.world-selection').textContent='اختار نقطة البداية.';
 const routes=agri?[['الفكرة الكبيرة','نفهم الجمهور والرسالة معًا.','idea'],['من الفكرة للتنفيذ','نستكشف الريل والتصميمات.','execution-samples'],['الخطة خطوة بخطوة','نشوف مراحل الخطة.','plan']]:[['الفكرة الكبيرة','نكتشف الرؤية والجمهور.','vision'],['الأفكار','نشوف أفكار المحتوى.','ideas'],['السكريبتات','نقرأ النصوص الكاملة.','scripts']];
 const choices=dialog.querySelector('.world-choices');choices.replaceChildren();routes.forEach(([title,desc,hash],i)=>{const button=document.createElement('button');button.className='world-choice';button.type='button';button.setAttribute('aria-pressed','false');button.innerHTML='<span class="world-shape shape-'+i+'" aria-hidden="true"><span>0'+(i+1)+'</span></span><strong>'+title+'</strong><small>'+desc+'</small>';button.addEventListener('click',()=>{choices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));selected=base+'#'+hash;dialog.querySelector('.world-selection').textContent='بدايتك: '+title+' — جاهز نكتشفها؟';dialog.querySelector('.world-launch').disabled=false;});choices.append(button);});
 dialog.showModal();
}
function launch(url,button){if(reduce.matches){location.assign(url);return;}const rect=button.getBoundingClientRect();overlay.style.setProperty('--entry-x',(rect.left+rect.width/2)+'px');overlay.style.setProperty('--entry-y',(rect.top+rect.height/2)+'px');overlay.querySelector('span').textContent=selected&&url===selected?dialog.querySelector('.world-choice[aria-pressed="true"] strong').textContent:'نبدأ من البداية';dialog.close();body.classList.add('is-entering');setTimeout(()=>location.assign(url),350);}
dialog.querySelector('.world-launch').addEventListener('click',e=>{if(selected)launch(selected,e.currentTarget);});dialog.querySelector('.world-whole').addEventListener('click',e=>launch(base,e.currentTarget));dialog.querySelector('.world-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{dialog.classList.remove('departing');body.classList.remove('is-entering');trigger?.focus();});
addEventListener('pageshow',()=>{dialog.classList.remove('departing');if(dialog.open)dialog.close();});
document.querySelectorAll('.exhibition-option').forEach(card=>{
 const agri=card.classList.contains('agri-option');
 const activate=()=>{body.dataset.world=agri?'agri':'hvacr';prompt.textContent=agri?'هنا الأفكار بتكبر. ندخل عالم AGRI؟':'من سؤال مهني لفكرة مؤثرة. ندخل عالم HVAC-R؟';};
 const reset=()=>{card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');};
 card.addEventListener('pointerenter',activate);card.addEventListener('focus',activate);
 card.addEventListener('pointermove',e=>{if(reduce.matches||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*7}deg`);card.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*7}deg`);});
 card.addEventListener('pointerleave',reset);card.addEventListener('blur',reset);
 card.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();openWorld(card,agri);});
});
addEventListener('pageshow',()=>body.classList.remove('is-entering'));
})();
