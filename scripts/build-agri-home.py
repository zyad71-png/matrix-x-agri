from pathlib import Path
from PIL import Image
import re,json,html
root=Path('dist/agri');out=root/'assets/two-weeks';out.mkdir(exist_ok=True)
assets={
 'design01':'/tmp/agri-review/designs/agri-1 (6).png',
 'design02':'/tmp/agri-review/designs/agri-1 (4).png',
 'design04':'/tmp/agri-review/designs/agri-1 (3).png',
 'design03':'/tmp/agri-review/designs/agri-1 (2).png',
 'extra':'/tmp/agri-review/designs/agri-1.png',
 'cover':'/tmp/agri-review/designs/agri-1-(5).png'}
files=['04_12_08 AM-4','04_11_45 AM-5','04_12_03 AM-2','04_12_06 AM-3','04_12_00 AM-1']
for n,pattern in enumerate(files,1):assets['product'+str(n)]=str(next(Path('/tmp/agri-review/carousel').rglob('*'+pattern+'.png'),Path('/missing')))
for name,p in assets.items():
 if not Path(p).exists():
  assert (out/(name+'.jpg')).exists(), name
  continue
 im=Image.open(p).convert('RGB');im.thumbnail((1300,1600));im.save(out/(name+'.jpg'),quality=89,optimize=True)
src=Path('content/agri-two-weeks/source.md').read_text()
e=lambda s:html.escape(str(s),quote=True)
def inline(s):
 s=e(s);s=re.sub(r'\[([^\]]+)\]\((https?[^)]+)\)',r'<a href="\2" target="_blank" rel="noopener">\1 ↗</a>',s)
 s=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
 s=re.sub(r'(?<!["=])(https://www\.agriexpo-eg\.com/[^\s<]*)',r'<a href="\1" target="_blank" rel="noopener">\1</a>',s)
 return s
# Source tables become labelled cards rather than horizontal scrolling tables.
def md(s):
 lines=s.strip().splitlines();res=[];i=0
 while i<len(lines):
  line=lines[i].strip()
  if not line or line=='---':i+=1;continue
  if line.startswith('|'):
   rows=[]
   while i<len(lines) and lines[i].strip().startswith('|'):
    rows.append([x.strip() for x in lines[i].strip().strip('|').split('|')]);i+=1
   heads=rows[0];res.append('<div class="source-rows">')
   for row in rows[2:]:res.append('<article>'+''.join('<p><b>'+inline(h)+'</b><span>'+inline(v)+'</span></p>' for h,v in zip(heads,row))+'</article>')
   res.append('</div>');continue
  if line.startswith('#'):
   res.append('<h3>'+inline(re.sub(r'^#+\s*','',line))+'</h3>');i+=1;continue
  if re.match(r'^[-\d]+[.)]?\s',line):res.append('<p class="source-list">'+inline(line)+'</p>');i+=1;continue
  para=[]
  while i<len(lines) and lines[i].strip() and not lines[i].startswith(('#','|')) and lines[i]!='---':para.append(lines[i].strip());i+=1
  res.append('<p>'+ '<br>'.join(inline(x) for x in para)+'</p>')
 return ''.join(res)
chunks=re.split(r'^### (W[12]-\d+[^\n]*)\n',src,flags=re.M);items=[]
keys=['design01','design02',None,'cover','design04',None,'design03',None]
for j in range(1,len(chunks),2):
 title=chunks[j];body=re.split(r'^## ',chunks[j+1],flags=re.M)[0].strip();idx=len(items);caption=body.split('#### الكابشن',1);fields={}
 for key in ['الفكرة','الرسالة','الجمهور','الهدف']:
  m=re.search(r'\*\*'+key+r':\*\*\s*(.*)',body);fields[key]=m.group(1).strip() if m else ''
 name=title.split('—',1)[1].strip();kind='كاروسيل' if idx==3 else ('ريل · تصوير جديد' if keys[idx] is None else 'تصميم ثابت')
 items.append(dict(id='piece-'+str(idx+1),title=name,kind=kind,week=1 if idx<4 else 2,day=[1,3,5,7,8,10,12,14][idx],key=keys[idx],fields=fields,body=md(caption[0]),caption=md(caption[1] if len(caption)>1 else '')))
extra=src.split('## محتوى إضافي جاهز للتوزيع — استثمر زيارتك',1)[1].split('## كيف نجهّز',1)[0];cap=extra.split('#### الكابشن');items.append(dict(id='extra',title='استثمر زيارتك',kind='نموذج إضافي · خارج القطع الثماني',week=0,day=0,key='extra',fields={'الفكرة':'لقاء أعمال حول طاولة.','الرسالة':'الزيارة فرصة للقاء الشركات والمتخصصين ومناقشة فرص التعاون.','الهدف':'التخطيط للزيارة.'},body=md(cap[0]),caption=md(cap[1])))
for item in items:
 key=item['key'];
 if key:item['body']=re.sub(r'href="https://chatgpt.com/library[^"]*"', 'href="/agri/assets/two-weeks/'+key+'.jpg"',item['body'])
 item['slides']=[{'image':'/agri/assets/two-weeks/'+key+'.jpg','alt':item['title']}] if key else []
 if item['id']=='piece-4':item['slides'] +=[{'image':'/agri/assets/two-weeks/product'+str(n)+'.jpg','alt':v} for n,v in enumerate(['فوس زنك أديشن','فان جيب','زولا سيف','فان جيب بلس','بروبيكا'],1)]
 elif key:item['slides'].append({'card':item['fields']})
prices=json.loads(Path('content/content-plans/ar.json').read_text())
# Keep quantities and prices from the existing financial source. Archive responsibility follows the current brief.
plans=[]
for p in prices['plans']['items']:
 detail=''
 for group in p['groups']:
  detail+='<h4>'+e(group['title'])+'</h4>'
  for x in group['items']:
   text='اختيار وإخراج مواد الأرشيف لدى فريق المعرض، وتُنسّق توقيتاتها داخل التقويم.' if 'الأرشيف' in x['label'] else x['text']
   detail+='<p><b>'+e(x['label'])+'</b> '+e(text)+'</p>'
 plans.append('<article class="plan"><h3>'+e(p['name'])+'</h3><p class="price">'+e(p['price'])+'</p><p>'+e(p['pieces'])+'</p><p>'+e(' · '.join(g['title'] for g in p['groups']))+'</p><p>'+e(p['summary'])+'</p><details><summary>تفاصيل الخطة</summary>'+detail+'</details></article>')
frames=[('01','frame-01-new.jpg','افتتاحية المكتب من الخلف'),('02','frame-02-new.jpg','مراجعة بروشور المعرض'),('03','frame-03-new.jpg','العمل على الكمبيوتر'),('04A','frame-04A-new.jpg','بداية الانتقال داخل المعرض'),('04B','frame-04B-new.jpg','نهاية الانتقال في المزرعة'),('05','frame-05-new.jpg','المقدم في المكتب'),('06','frame-06.png','فريم النهاية والهوية')]
framehtml='<details class="story"><summary>شاهد فريمات الـStoryboard</summary><p>مرجع بصري سابق للمكتب والبروشور والهوية. لا يطابق سكريبت Reel 02 كاملًا؛ انتقال المعرض والمزرعة ليس مشهدًا واردًا في السكريبت الجديد. صورتا 04A و04B مرجع لبداية انتقال VFX ونهايته، وليستا فيديو منفّذًا.</p><div class="frames">'+''.join('<figure><button data-zoom="/agri/assets/samples/'+f+'"><img loading="lazy" src="/agri/assets/samples/'+f+'" alt="'+a+'"></button><figcaption>'+n+' · '+a+'</figcaption></figure>' for n,f,a in frames)+'</div></details>'
items[5]['body']+=framehtml
cards=lambda week:''.join('<button class="post" data-piece="'+x['id']+'"><div class="post-art">'+('<img loading="lazy" src="'+x['slides'][0]['image']+'" alt="'+e(x['title'])+'">' if x['slides'] else '<div class="reel-tile"><span>▶</span><b>'+e(x['title'])+'</b><small>تصوير جديد</small></div>')+'<span class="post-mark">'+('▣' if x['key'] else '▶')+'</span></div><div class="post-copy"><small>'+e(x['kind'])+(' · اليوم '+str(x['day']) if x['day'] else '')+'</small><h3>'+e(x['title'])+'</h3><p>'+e(x['fields']['الفكرة'])+'</p><strong>عرض التفاصيل ↗</strong></div></button>' for x in items if x['week']==week)
intro=src.split('## ما الذي نريد تحقيقه؟')[1].split('## تقويم المحتوى')[0]
prep=src.split('## كيف نجهّز الخطة للنشر؟')[1]
# Render the earlier strategic copy as expandable reference paragraphs; no old widgets are reused.
old=Path('content/agri-two-weeks/previous-home.html').read_text();legacy=[]
for tag,text in re.findall(r'<(h[234]|p|td|th|li)\b[^>]*>(.*?)</\1>',old,re.S):
 text=re.sub('<[^>]+>',' ',text);text=html.unescape(text).strip()
 if text and text not in legacy:legacy.append(text)
phase_match=re.search(r'const months=(\[.*?\]);',Path('dist/agri/app.js').read_text())
phasehtml=''
if phase_match:
 for phase in json.loads(phase_match.group(1)):
  phasehtml+='<h3>'+e(phase['label'])+'</h3><p>'+e(phase['title'])+'</p><p>'+e(phase['description'])+'</p>'+''.join('<p><b>'+e(a)+'</b> '+e(b)+'</p>' for a,b in phase['items'])
legacyhtml=phasehtml+''.join('<p>'+e(t)+'</p>' for t in legacy)
h='''<!doctype html><html lang="ar" dir="rtl" data-exhibition="agri"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>أجري إكسبو — خطة المحتوى</title><link rel="icon" href="/assets/agri-logo.png"><link rel="stylesheet" href="/agri/home.css"><link rel="stylesheet" href="/english-font.css"><link rel="stylesheet" href="/cursor.css"><script src="/agri/home.js" defer></script></head><body><a class="skip" href="#main">انتقل للمحتوى</a><header><a href="#home" aria-label="البداية"><img src="/assets/agri-logo.png" alt="أجري إكسبو"></a><nav aria-label="أقسام الخطة"><a href="#start">البداية</a><a href="#samples">نماذج التنفيذ</a><a href="#pricing">خطط الأسعار</a></nav></header><main id="main"><section class="hero" id="home"><img class="hero-logo" src="/assets/agri-logo.png" alt="أجري إكسبو"><h1>خطة محتوى تُظهر قيمة أجري إكسبو<br><em>للشركات والزوار.</em></h1><div class="hero-links"><a href="#start">01 <b>البداية</b> ↙</a><a href="#samples">02 <b>نماذج التنفيذ</b> ↙</a><a href="#pricing">03 <b>خطط الأسعار</b> ↙</a></div><p class="date">30 يناير – 1 فبراير 2027 · مركز القاهرة الدولي للمؤتمرات – مدينة نصر</p></section><section id="start"><div class="section-title"><span>01 / البداية</span><h2>رسالة واضحة.<br>للشركات والزوار.</h2></div><div class="brief-grid"><article><span>الهدف</span><h3>إظهار قيمة المعرض</h3><p>تشجيع المشاركة وتسجيل الزيارة، من خلال ما يقدمه المعرض للشركات والزوار.</p></article><article><span>الجمهور</span><h3>ثلاثة مسارات</h3><p>شركات تفكر في المشاركة، وزوار ومتخصصون، ورعاة وشركات مشاركة.</p></article><article><span>اتجاه المحتوى</span><h3>تصميمات وريلز</h3><p>نشرح قيمة المعرض، ونعرض المنتجات، ونقدّم تجارب الشركات.</p></article></div><details><summary>تفاصيل الخطة</summary>'''+md(intro)+md(prep)+'<details><summary>المراحل والمحاور من الخطة السابقة</summary>'+legacyhtml+'''</details></details></section><section id="samples"><div class="section-title"><span>02 / نماذج التنفيذ</span><h2>أول أسبوعين.<br><em>٨ قطع محتوى.</em></h2><p>٤ تصميمات ثابتة، كاروسيل واحد، و٣ ريلز بتصوير جديد.</p></div><div class="week-tabs" role="tablist" aria-label="أسابيع الخطة"><button id="tab1" role="tab" aria-selected="true" aria-controls="week1" data-week="1">الأسبوع الأول <small>قيمة المعرض وتجربة المشاركة</small></button><button id="tab2" role="tab" aria-selected="false" aria-controls="week2" data-week="2" tabindex="-1">الأسبوع الثاني <small>من التعريف إلى الحوار</small></button></div><div class="post-grid" id="week1" role="tabpanel" aria-labelledby="tab1">'''+cards(1)+'''</div><div class="post-grid" id="week2" role="tabpanel" aria-labelledby="tab2" hidden>'''+cards(2)+'''</div><details><summary>نموذج إضافي أو بديل — خارج القطع الثماني</summary><div class="extra-grid">'''+cards(0)+'''</div></details></section><section id="pricing"><div class="section-title"><span>03 / خطط الأسعار</span><h2>اختر إيقاع المحتوى.</h2><p>خطط شهرية. تكلفة أول أسبوعين لا تُستنتج بقسمة سعر الخطة.</p></div><div class="plans">'''+''.join(plans)+'''</div><details><summary>مقارنة مختصرة والخدمات الاختيارية</summary><div class="compare">'''+''.join('<article><h4>'+e(row['label'])+'</h4><p>الأساسية: '+e(row['essential'])+'</p><p>الموسّعة: '+e(row['expanded'])+'</p></article>' for row in prices['compare']['rows'])+'</div><h4>'+e(prices['optional']['title'])+'</h4>'+''.join('<p><b>'+e(x['label'])+'</b> '+e(x.get('text',''))+'</p>' for x in prices['optional']['items'])+'''<p>اختيار وإخراج مواد الأرشيف لدى فريق المعرض وفق الاتفاق. الجدولة والنشر وإدارة الحسابات والإعلانات تُثبت بصورة مستقلة.</p></details></section></main><footer><img src="/assets/agri-logo.png" alt="أجري إكسبو"><p>خطة للمناقشة والمراجعة مع فريق المعرض</p><a href="/">اختيار المعرض ↗</a></footer><dialog id="post-dialog" aria-label="تفاصيل قطعة المحتوى"><button class="close" aria-label="إغلاق">×</button><div id="post-content"></div></dialog><dialog id="zoom-dialog" aria-label="تكبير الصورة"><button class="close" aria-label="إغلاق">×</button><img alt=""></dialog><script id="pieces" type="application/json">'''+json.dumps(items,ensure_ascii=False).replace('<','\\u003c')+'</script></body></html>'
# Required vocabulary guard, including preserved legacy reference copy.
h=h.replace('الاحتياجات','الأولويات').replace('احتياجات','أولويات').replace('احتياج','متطلب').replace('تحتاج','تتطلب').replace('يحتاج','يتطلب').replace('المحتاجة','المطلوبة').replace('المنطوق','نص المتحدث').replace('منطوق','نص المتحدث')
(root/'index.html').write_text(h)
