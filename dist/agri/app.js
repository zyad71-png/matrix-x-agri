(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], number=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
let less=motionQuery.matches;
document.documentElement.classList.toggle('less-motion',less);
if('IntersectionObserver' in window){document.documentElement.classList.add('motion-enabled');const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.06});$$('.reveal').forEach(e=>o.observe(e))}
const menu=$('#menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));$('#main-nav').classList.toggle('is-open',open)});$$('#main-nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');$('#main-nav').classList.remove('is-open')}));addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');$('#main-nav').classList.remove('is-open')}});
function animate(e){e.classList.remove('panel-changing');void e.offsetWidth;e.classList.add('panel-changing')}
function active(selector,index){$$(selector).forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1})}
function keys(selector,vertical=false){const tabs=$$(selector);tabs.forEach((b,i)=>b.addEventListener('keydown',e=>{let next;if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else if((vertical&&e.key==='ArrowDown')||(!vertical&&e.key==='ArrowLeft'))next=(i+1)%tabs.length;else if((vertical&&e.key==='ArrowUp')||(!vertical&&e.key==='ArrowRight'))next=(i-1+tabs.length)%tabs.length;else return;e.preventDefault();tabs[next].focus();tabs[next].click()}))}
const audits=[{"image":"../assets/evidence-0.webp","label":"إنستجرام · شبكة منشورات AGRI","alt":"شبكة منشورات حساب AGRI Expo","fact":"المعرض يجمع شركات ومنتجات وخبرات وتجربة مهنية. الفرصة هي تقديم هذه العناصر كحكاية متكاملة يفهم منها الجمهور ما الذي يميز AGRI Expo.","fix":"نربط ظهور المشاركين والمنتجات واللقاءات بهوية المعرض وقيمته، حتى تتراكم الرسائل في اتجاه واحد.","title":"قيمة أكبر من أخبار المشاركين","source":"https://www.instagram.com/agri.expo.eg/","context":"مرجع من حساب المعرض لربط أخبار المشاركين بحكاية AGRI ككل."},{"image":"../assets/evidence-4.webp","label":"إنستجرام · تقديم المعرض","alt":"منشور من حساب AGRI يقدّم المعرض","fact":"العارض يريد فهم قيمة وجود شركته، والراعي يقيّم ارتباط الرعاية بهدفه، والزائر يريد معرفة ما الذي سيكتشفه أو يناقشه.","fix":"نصوغ رسائل منفصلة للمشاركة والرعاية والزيارة، تبدأ باحتياج الجمهور وتنتهي بخطوة تناسبه.","title":"سبب يخص كل فئة","source":"https://www.instagram.com/p/DeJzDDblQdm/","context":"مرجع لطريقة تقديم المعرض؛ نقترح تطوير رسائل تشرح ما يخص كل فئة من الجمهور."},{"image":"../assets/evidence-1.webp","label":"فيسبوك · تجربة المعرض","alt":"غلاف حساب AGRI يتضمن صورة من المعرض","fact":"ظهور الشركة يمكن أن يوضح للجمهور ما الذي سيجده داخل المعرض، من خلال تخصصها ومنتجاتها والخبرة التي تستطيع شرحها.","fix":"مثال مقترح: نقدّم شركة من خلال منتج وتطبيقه والسؤال الذي يمكن للزائر مناقشته معها، بدل الاكتفاء بخبر انضمامها.","title":"المشارك دليل على قيمة المعرض","source":"https://www.facebook.com/Agri.Expo.Eg","context":"صورة من التجربة يمكن البناء على حضورها البصري لتقديم اللقاءات والشركات والمنتجات."},{"image":"../assets/evidence-3.webp","label":"إنستجرام · دعوة للزيارة","alt":"منشور AGRI لدعوة الجمهور إلى التسجيل","fact":"نبدأ بسؤال أو احتياج، ونوضح القيمة بمثال أو تجربة موثقة، ثم نوجّه المهتم إلى تفاصيل المشاركة أو الرعاية أو الزيارة.","fix":"نربط كل مادة برسالة ودليل وخطوة تالية واضحة، ونطوّر المحتوى وفق الأسئلة والاستجابات المتاحة.","title":"رحلة من الاهتمام إلى الاستفسار","source":"https://www.instagram.com/p/DeZIYIeoIE2/","context":"مثال لدعوة الزيارة ضمن رحلة التواصل، وليس تقييمًا لعمل التسجيل أو لأداء التحويل."}];
let audit=0;
function showAudit(i){audit=i;active('.audit-tab',i);$('#audit-panel').style.setProperty('--audit-order',String(i*2+1));const d=audits[i];$('#opportunity-title').textContent=d.title;$('#audit-panel').setAttribute('aria-labelledby','audit-tab-'+i);$('#evidence-image').src=d.image;$('#evidence-image').alt=d.alt;$('#evidence-label').textContent=d.label;$('#evidence-fact').textContent=d.fact;$('#evidence-fix').textContent=d.fix;$('#evidence-source').href=d.source;$('#evidence-context').textContent=d.context;animate($('#audit-panel'))}
$$('.audit-tab').forEach(b=>b.addEventListener('click',()=>showAudit(+b.dataset.audit)));keys('.audit-tab',true);
function lightbox(){const d=audits[audit];$('#lightbox-image').src=d.image;$('#lightbox-image').alt=d.alt;$('#lightbox-caption').textContent=d.label;$('#lightbox').showModal()}
$('#expand-evidence').addEventListener('click',lightbox);$('#evidence-open').addEventListener('click',lightbox);
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}));
const audience=[["ليه أعرض عندكم؟","نوريه شكل المشاركة، ونوع المنتجات والقطاعات الموجودة، وتجارب سابقة تساعده يتخيّل مكان شركته في المعرض.","مثال: شركة بتشرح منتجها من جناحها في دورة سابقة."],["ليه أرعى عندكم؟","نوريه الجمهور اللي تقدر الرعاية توصله، وإزاي حقوق الرعاية ترتبط بهدف شركته، مع مثال موثق لحق رعاية عند توفره.","مثال: علامة راعٍ داخل تجربة دورة سابقة."],["ليه أزور عندكم؟","نوريه المنتجات والشركات اللي يقدر يتعرّف عليها ويناقشها، والأسئلة اللي يحملها معاه لزيارته.","مثال: زائر بيسأل ممثل شركة عن منتج في دورة سابقة."]];
$$('[data-audience]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.audience,d=audience[i];active('[data-audience]',i);$('#audience-panel').setAttribute('aria-labelledby','audience-tab-'+i);['question','answer','example'].forEach((k,j)=>$('#audience-'+k).textContent=d[j]);animate($('#audience-panel'))}));keys('[data-audience]');
const months=[{"label":"نوفمبر / بداية الحكاية","title":"المعرض راجع. وده سبب اهتمامك.","description":"نعلن عن الدورة الجديدة ومعلوماتها، ونفتكر التجربة السابقة بلقطات توضّح طبيعة المعرض وقيمته.","items":[["إعلان الدورة الجديدة","رسالة تعرّف بالمعرض وتعلن موعده ومكانه."],["من الدورات السابقة","لحظات حقيقية من الأجنحة والمنتجات واللقاءات."],["شخص يشرح المعرض","فيديوهات مباشرة: المعرض بيقدّم إيه؟ وليه تعرض فيه؟"]],"outcome":"«عرفت المعرض، وفهمت ليه أتابع أخباره.»"},{"label":"ديسمبر / نعمّق ونربط","title":"الشركات والمنتجات… وسبب الاهتمام.","description":"نعرّف بالمشاركين من خلال ما يقدّمونه، ونربط كل فئة من الجمهور بما يهمها.","items":[["مشاركون بتخصصهم","كل شركة تتقدّم بما تقدّمه، وإيه اللي تقدر تتعرّف عليه عندها."],["سؤال من السوق","مختص يجيب عن سؤال واحد في الاستخدام أو الملاءمة الفنية، مع بيان السياق والمصدر."],["الرعاية تبدأ بالجمهور","ريل الرعاية، ومثال موثق لحق رعاية عند توفره."]],"outcome":"«عرفت مين هيبقى في المعرض، وإيه اللي أقدر أتعرّف عليه عنده.»"},{"label":"يناير / نجهّز ونوجّه","title":"قرّب الموعد. جهّز زيارتك.","description":"نقدّم معلومات الاستعداد، ونساعد كل فئة تحدد أولوياتها قبل الافتتاح.","items":[["معلومات الزيارة","الموعد والمكان والوصول، والتسجيل عند إتاحته."],["أولويات الزيارة","الشركات والمنتجات والأسئلة اللي تستاهل وقتك."],["تجهيزات المعرض","لقطات من أرض المعرض عند بدء التنفيذ الفعلي، واستعدادات المشاركين."]],"outcome":"«عارف أروح فين، وأمتى، وأسأل مين عن إيه.»"}];
$$('[data-month]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.month,d=months[i];active('[data-month]',i);$('#month-panel').setAttribute('aria-labelledby','month-tab-'+i);['label','title','description','outcome'].forEach(k=>$('#month-'+k).textContent=d[k]);$('#month-title').style.whiteSpace='pre-line';$('#month-number').textContent=number(String(i+1).padStart(2,'0'));$('#month-items').replaceChildren(...d.items.map(([h,p],j)=>{const a=document.createElement('article'),n=document.createElement('span'),wrap=document.createElement('div'),title=document.createElement('h4'),copy=document.createElement('p');n.textContent=number(String(j+1).padStart(2,'0'));title.textContent=h;copy.textContent=p;wrap.append(title,copy);a.append(n,wrap);return a}));animate($('#month-panel'))}));keys('[data-month]');
$('#next-step').addEventListener('click',()=>{const open=$('#next-step').getAttribute('aria-expanded')!=='true';$('#next-step').setAttribute('aria-expanded',String(open));$('#next-panel').hidden=!open;if(open){animate($('#next-panel'));$('#next-panel').scrollIntoView({block:'nearest',behavior:less?'auto':'smooth'})}});
const chapters=$$('.chapter');let queued=false,needsMeasure=true;
const scenes=chapters.map(section=>({section,anchor:document.getElementById(section.dataset.chapter),layers:[...section.querySelectorAll('[data-depth]')]}));
const stage=$('.brand-stage');let pointerX=0,pointerY=0;
let barHeight=0;
function measure(){
 barHeight=$('.header').getBoundingClientRect().height;
 document.documentElement.style.setProperty('--bar-height',`${barHeight}px`);
 scenes.forEach(({section},i)=>{
  section.style.zIndex=String(i+1);
  // A tall page scrolls to its bottom before it pins; short pages fill the viewport.
  section.style.setProperty('--stack-top',`${Math.min(barHeight,innerHeight-section.offsetHeight)}px`);
 });
 document.documentElement.classList.toggle('stack-enabled',!less);
 needsMeasure=false;
}
function sync(){
 if(needsMeasure)measure();
 const height=innerHeight,range=document.documentElement.scrollHeight-height;
 $('.progress i').style.transform=`scaleX(${range>0?Math.min(1,Math.max(0,scrollY/range)):0})`;
 const rects=scenes.map(({section})=>section.getBoundingClientRect());
 let current=0;
 scenes.forEach(({section,anchor,layers},i)=>{
  const r=rects[i];
  if(anchor.getBoundingClientRect().top<height*.4)current=i;
  const covered=!less&&i<scenes.length-1&&rects[i+1].top<=barHeight+1;
  section.inert=covered;
  section.classList.toggle('is-covered',covered);
  if(less||covered||r.bottom<0||r.top>height)return;
  const offset=Math.max(-height,Math.min(height,height*.5-(r.top+r.height*.5)));
  const strength=(innerWidth<801?.45:1)*.3;
  layers.forEach(layer=>layer.style.setProperty('--depth-y',`${(offset*Number(layer.dataset.depth)*strength).toFixed(2)}px`));
 });
 $$('.chapter-nav a').forEach((a,i)=>a.classList.toggle('active',i===current));
 $$('.header nav a').forEach(a=>a.classList.toggle('current',a.hash==='#'+chapters[current].dataset.chapter));
 if(stage){stage.style.setProperty('--pointer-x',`${pointerX.toFixed(2)}px`);stage.style.setProperty('--pointer-y',`${pointerY.toFixed(2)}px`)}
 queued=false;
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(sync)}}
function resized(){needsMeasure=true;schedule()}
function preference(){
 less=motionQuery.matches;document.documentElement.classList.toggle('less-motion',less);
 if(less){scenes.forEach(({section,layers})=>{section.inert=false;section.classList.remove('is-covered');layers.forEach(layer=>layer.style.setProperty('--depth-y','0px'))});pointerX=pointerY=0}
 resized();
}
motionQuery.addEventListener('change',preference);
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',resized);
if('ResizeObserver' in window){const resizeObserver=new ResizeObserver(resized);chapters.forEach(c=>resizeObserver.observe(c));resizeObserver.observe($('.header'))}
if(document.fonts)document.fonts.ready.then(resized);
addEventListener('load',resized,{once:true});
// Anchor jumps use the flow marker rather than a section's pinned visual position.
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const anchor=document.getElementById(a.hash.slice(1));if(!anchor?.classList.contains('chapter-anchor'))return;
 e.preventDefault();
 const target=anchor.getBoundingClientRect().top+scrollY-barHeight;
 const targetIndex=scenes.findIndex(scene=>scene.anchor===anchor);
 // A formerly covered section must be focusable as soon as navigation begins.
 if(targetIndex>=0){chapters[targetIndex].inert=false;chapters[targetIndex].classList.remove('is-covered')}
 window.scrollTo({top:Math.max(0,target),behavior:less?'instant':'smooth'});
 history.pushState(null,'',a.hash);
}));
if(stage){stage.addEventListener('pointermove',e=>{if(less||e.pointerType!=='mouse')return;const r=stage.getBoundingClientRect();pointerX=((e.clientX-r.left)/r.width-.5)*12;pointerY=((e.clientY-r.top)/r.height-.5)*10;schedule()},{passive:true});stage.addEventListener('pointerleave',()=>{pointerX=pointerY=0;schedule()})}
document.querySelector('[data-audience="0"]').click();
document.querySelector('[data-month="0"]').click();
function restoreSamples(){
 if(location.hash!=='#execution-samples')return;
 const target=document.getElementById('execution-samples'),section=target?.closest('.chapter');if(!section)return;
 const marker=document.getElementById(section.dataset.chapter);
 section.inert=false;section.classList.remove('is-covered');
 requestAnimationFrame(()=>{const relative=target.getBoundingClientRect().top-section.getBoundingClientRect().top;window.scrollTo({top:Math.max(0,marker.getBoundingClientRect().top+scrollY+relative-barHeight-20),behavior:'instant'});schedule()});
}
addEventListener('load',restoreSamples);addEventListener('hashchange',restoreSamples);if(document.fonts)document.fonts.ready.then(restoreSamples);
sync();
})();
