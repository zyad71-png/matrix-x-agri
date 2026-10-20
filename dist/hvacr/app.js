(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const tabs=$$('[data-month]'),panels=$$('.month-panel');
function choose(code,{focus=false,updateHash=false}={}){
 const selected=tabs.find(t=>t.dataset.month===code);if(!selected)return;
 tabs.forEach(t=>{const active=t===selected;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});
 panels.forEach(p=>p.hidden=p.id!==code);
 if(focus)selected.focus();
 if(updateHash)history.replaceState(null,'','#'+code);
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>choose(tab.dataset.month,{updateHash:true}));
 tab.addEventListener('keydown',e=>{let index;if(e.key==='Home')index=0;else if(e.key==='End')index=tabs.length-1;else if(e.key==='ArrowLeft')index=(i+1)%tabs.length;else if(e.key==='ArrowRight')index=(i+tabs.length-1)%tabs.length;else return;e.preventDefault();choose(tabs[index].dataset.month,{focus:true,updateHash:true})});
});
document.addEventListener('plan:reveal',e=>{const panel=e.detail.target.closest('.month-panel');if(panel)choose(panel.id)});
const initial=panels.find(p=>p.id===location.hash.slice(1));choose(initial?.id||tabs[0].dataset.month);
const dialog=$('#evidence-dialog');let opener=null;
$$('[data-evidence]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;
 const image=button.querySelector('img');$('#dialog-image').src=image.src;$('#dialog-image').alt=image.alt;
 $('#evidence-caption').textContent=button.closest('figure').querySelector('figcaption strong').textContent+' · رصد ٢١ أكتوبر ٢٠٢٦';
 dialog.showModal();
}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>opener?.focus());
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
})();
