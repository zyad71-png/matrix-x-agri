(() => {
  'use strict';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const top = () => { if (!location.hash) window.scrollTo({top:0,left:0,behavior:'instant'}); };
  top(); addEventListener('pageshow',top); addEventListener('load',top,{once:true});
  addEventListener('popstate',top);
  // SVG paths avoid platform-dependent emoji arrows.
  const rotations={'↗':0,'↙':180,'↘':90,'↖':270,'↑':315,'↓':135,'←':225,'→':45};
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const texts=[];while(walker.nextNode()){const node=walker.currentNode;if(/[↗↙↘↖↑↓←→]/.test(node.data)&&!node.parentElement.closest('script,style,textarea,svg'))texts.push(node);}
  for(const node of texts){const fragment=document.createDocumentFragment();for(const part of node.data.split(/([↗↙↘↖↑↓←→])/)){if(!(part in rotations)){fragment.append(document.createTextNode(part));continue;}const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','ui-arrow');svg.setAttribute('aria-hidden','true');svg.style.transform=`rotate(${rotations[part]}deg)`;svg.innerHTML='<path d="M5 19 19 5M5 5h14v14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';fragment.append(svg);}node.replaceWith(fragment);}
  // A restored page must never retain a transition veil.
  addEventListener('pageshow',()=>{document.body.classList.remove('is-entering');document.querySelectorAll('.section-gateway.active').forEach(el=>el.classList.remove('active'));});
})();
