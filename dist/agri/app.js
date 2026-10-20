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
const audits=[
{image:'../assets/evidence-0.webp',label:'إنستجرام / صورة الحساب وقت المراجعة',alt:'لقطة من شبكة منشورات حساب أجري إكسبو',fact:'حضور أخبار المشاركين واضح، وفي فرصة أكبر لإظهار هوية المعرض وتجربته ككل.',fix:'نربط أخبار المشاركين بحكاية المعرض: إيه اللي هتشوفه؟ وليه وجودك مهم؟',source:'https://www.instagram.com/agri.expo.eg/'},
{image:'../assets/evidence-4.webp',label:'إنستجرام / منشور شرائح / ٦ أكتوبر ٢٠٢٦',alt:'مثال لمنشور شرائح يقدّم معلومات عن المعرض',fact:'المنشور بيشرح المعرض بشكل عام؛ وربط الفايدة باحتياج فئة محددة محتاج يبقى أوضح.',fix:'كل منشور يجاوب سؤالًا محددًا: كعارض هتقدّم إيه؟ وكزائر إيه اللي يستاهل تشوفه؟',source:'https://www.instagram.com/p/DeJzDDblQdm/'},
{image:'../assets/evidence-3.webp',label:'إنستجرام / دعوة للتسجيل / ١٢ أكتوبر ٢٠٢٦',alt:'منشور يدعو للتسجيل مع ذكر رابط في الوصف',fact:'دعوة التسجيل بتشير لرابط في الوصف، والوصول للخطوة التالية على إنستجرام محتاج يبقى أسهل.',fix:'نستخدم توجيهًا واحدًا واضحًا، مع رابط متاح من البايو أو الستوري حسب نوع المنشور. دي ملاحظة عن وضوح الطريق، مش دليل إن التسجيل متعطّل.',source:'https://www.instagram.com/p/DeZIYIeoIE2/'},
{image:'../assets/evidence-1.webp',label:'فيسبوك / غلاف الصفحة وقت المراجعة',alt:'غلاف صفحة فيسبوك مع صورة من المعرض ومعلومات الزيارة',fact:'غلاف فيسبوك بيعرض صورة فعلية للمعرض ومعلوماته؛ وده أساس بصري نقدر نستفيد منه في المحتوى اليومي.',fix:'نوسّع مساحة صور التجربة واللقاءات والمنتجات، ونحافظ على وضوح المعلومات في كل منشور.',source:'https://www.facebook.com/Agri.Expo.Eg'}];
let audit=0;
function showAudit(i){audit=i;active('.audit-tab',i);const d=audits[i];$('#audit-panel').setAttribute('aria-labelledby','audit-tab-'+i);$('#evidence-image').src=d.image;$('#evidence-image').alt=d.alt;$('#evidence-label').textContent=d.label;$('#evidence-fact').textContent=d.fact;$('#evidence-fix').textContent=d.fix;$('#evidence-source').href=d.source;animate($('#audit-panel'))}
$$('.audit-tab').forEach(b=>b.addEventListener('click',()=>showAudit(+b.dataset.audit)));keys('.audit-tab',true);
function lightbox(){const d=audits[audit];$('#lightbox-image').src=d.image;$('#lightbox-image').alt=d.alt;$('#lightbox-caption').textContent=d.label;$('#lightbox').showModal()}
$('#expand-evidence').addEventListener('click',lightbox);$('#evidence-open').addEventListener('click',lightbox);
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}));
const audience=[['ليه أعرض عندكم؟','نوريه شكل المشاركة، ونوع المنتجات والقطاعات الموجودة، وتجارب سابقة تساعده يتخيّل مكان شركته في المعرض.','مثال: شركة بتشرح منتجها من جناحها في دورة سابقة.'],['رعايتي هتظهر بقيمة إزاي؟','نوضّح دور الراعي داخل تجربة المعرض، ونقدّم مشاركته في محتوى مفيد للجمهور، بجانب التعريف باسمه.','مثال: نعرّف الجمهور بالخدمة أو الخبرة اللي بيضيفها الراعي.'],['ليه أحضر؟ وإيه اللي يهمني؟','نقرّب له القطاعات والمنتجات اللي تهمّه، ونساعده يرتّب زيارته بمعلومات واضحة وسهلة.','مثال: دليل مختصر يساعد الزائر يعرف يدور على إيه أثناء الزيارة.']];
$$('[data-audience]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.audience,d=audience[i];active('[data-audience]',i);$('#audience-panel').setAttribute('aria-labelledby','audience-tab-'+i);['question','answer','example'].forEach((k,j)=>$('#audience-'+k).textContent=d[j]);animate($('#audience-panel'))}));keys('[data-audience]');
const months=[
{label:'نوفمبر / بداية الحكاية',title:'المعرض راجع.\nوده سبب اهتمامك.',description:'نعلن عن الدورة الجديدة ومعلوماتها المعتمدة، ونفتكر التجربة السابقة بلقطات توضّح طبيعة المعرض وقيمته.',items:[['إعلان الدورة الجديدة','رسالة تعرّف بالمعرض وتعلن موعده ومكانه بالمعلومات المعتمدة.'],['من الدورات السابقة','لحظات حقيقية من الأجنحة والمنتجات واللقاءات.'],['شخص يشرح المعرض','فيديوهات مباشرة: المعرض بيقدّم إيه؟ وليه تعرض فيه؟']],outcome:'عرفت المعرض، وفهمت ليه أتابع أخباره.'},
{label:'ديسمبر / قيمة أقرب لكل فئة',title:'كل مشاركة\nوراها قيمة.',description:'ننتقل من التعريف العام لتفاصيل تخص العارض والراعي والزائر، بأمثلة من التجربة والمشاركين.',items:[['منتجات وقطاعات تهمّ الجمهور','نربط كل قطاع باحتياج واضح، ونشرح إيه اللي ممكن تتعرّف عليه في المعرض.'],['أشخاص وتجارب موثّقة','نقدّم المشاركين بقيمة وجودهم، ونستخدم شهادات حقيقية وأرشيفًا مرتبطًا بالرسالة.'],['من داخل شركة التنظيم','نظهر التحضير والتنسيق ومراجعة التفاصيل من داخل الشركة، قبل تركيب الأجنحة.']],outcome:'فهمت المعرض ممكن يهمّني في إيه، وشفت أمثلة تقرّب لي التجربة.'},
{label:'يناير / الاستعداد للحضور',title:'قربنا نفتح.\nخلّي زيارتك أوضح.',description:'نركّز على المعلومات العملية، ونوضّح للجمهور يشوف إيه ويستعد إزاي، مع آخر المستجدات المعتمدة.',items:[['معلومات الزيارة في مكان واضح','الموعد والمكان وطريقة الوصول وخطوات التسجيل أو التواصل، حسب المعلومات المعتمدة.'],['مشاركون وتفاصيل مؤكدة','نقدّم الأسماء والقطاعات وتفاصيل البرنامج المعتمدة، ونردّ على الأسئلة المتكررة.'],['قبل الافتتاح بأيام','نظهر تجهيزات الأجنحة وقت حدوثها على أرض المعرض، ونربطها بالتجربة المنتظرة.']],outcome:'عرفت اللي يهمّني، وعارف أستعد وأوصل وأتابع الخطوة التالية.'}];
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
sync();
})();
