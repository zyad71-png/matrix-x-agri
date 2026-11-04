from lxml import html as H
from pathlib import Path
import base64,html,json,re
root=Path('dist/agri');p=root/'index.html';d=H.fromstring(p.read_text());e=html.escape
# Real vector covers, with the supplied AGRI identity and embedded Arabic font.
font=base64.b64encode(Path('dist/assets/ThmanyahSans-Bold.woff2').read_bytes()).decode();logo=base64.b64encode(Path('dist/assets/agri-logo.png').read_bytes()).decode()
reels={'piece-3':('01',['تجربة شركة','سبق لها المشاركة']), 'piece-6':('02',['وجه المعرض','من الكتالوج إلى الحوار']), 'piece-8':('03',['شركة مشاركة','ومنتجاتها'])}
for key,(n,lines) in reels.items():
 svg='<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><defs><style>@font-face{font-family:A;src:url(data:font/woff2;base64,'+font+')}text{font-family:A,Arial,sans-serif}</style><linearGradient id="g" x2="1" y2="1"><stop stop-color="#193c27"/><stop offset="1" stop-color="#101b15"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/><path d="M-40 100Q390 -20 650 370Q300 520 -40 100ZM900 950Q500 1000 450 650Q800 560 900 950" fill="none" stroke="#8ca363" stroke-opacity=".25" stroke-width="2"/><image href="data:image/png;base64,'+logo+'" x="56" y="55" width="190" height="130"/><text x="740" y="126" fill="#d6e7a8" font-size="25" text-anchor="end">REEL '+n+'</text><line x1="60" x2="740" y1="250" y2="250" stroke="#71855c" stroke-opacity=".5"/>'+''.join('<text x="740" y="'+str(450+i*100)+'" fill="'+('#f5f4ed' if i==0 else '#d6e7a8')+'" font-size="'+('64' if i==0 else '50')+'" text-anchor="start" direction="rtl">'+e(line)+'</text>' for i,line in enumerate(lines))+'<circle cx="106" cy="850" r="44" stroke="#d6e7a8" fill="none"/><path d="M96 832l29 18-29 18Z" fill="#d6e7a8"/><text x="740" y="860" fill="#b7c7b4" font-size="27" text-anchor="start" direction="rtl">تصوير جديد</text></svg>'
 path=root/'assets/two-weeks'/('reel-'+n+'-cover.svg');path.write_text(svg)
 card=d.xpath('//button[@data-piece="'+key+'"]')[0];art=card.xpath('./div')[0]
 for child in list(art):
  if child.get('class')=='reel-tile':art.remove(child)
 art.insert(0,H.fragment_fromstring('<img loading="lazy" src="/agri/assets/two-weeks/reel-'+n+'-cover.svg" alt="'+e(' — '.join(lines))+'">'))
# Delete the helper label and simplify the plan disclosure.
for el in d.xpath('//*[contains(concat(" ",@class," ")," grid-note ")]'):el.getparent().remove(el)
for link in d.xpath('//footer/a'):
 if 'اختيار المعرض' in link.text_content():link.getparent().remove(link)
start=d.get_element_by_id('start');details=start.xpath('./details')[0];start.remove(details)
start.append(H.fragment_fromstring('<details class="plan-overview"><summary>تفاصيل الخطة</summary><div class="plan-outline"><article><span>01</span><h3>للشركات</h3><p>إظهار قيمة المشاركة وعرض المنتجات وفتح التواصل لحجز الأجنحة.</p></article><article><span>02</span><h3>للزوار</h3><p>اكتشاف المنتجات ومقابلة الشركات والمتخصصين والتخطيط للزيارة.</p></article><article><span>03</span><h3>للمشاركين والرعاة</h3><p>تقديم تجارب الشركات ومنتجاتها، ومنها أجرو سيف بصفتها الراعي الماسي.</p></article></div><a class="strategy-link" href="/agri/strategy.html">استعرض الاستراتيجية الكاملة ↗</a></details>'))
# Monthly planning precedes the financial offer.
planning=d.get_element_by_id('deliverables');pricing=d.get_element_by_id('pricing');pricing.addprevious(planning)
pricing.xpath('.//div[@class="section-title"]/h2')[0].text='خطط الأسعار'
# Return to the original pricing-card structure with the current AGRI palette.
old=H.parse('dist/agri/content-plans/ar/index.html');plans=pricing.xpath('./div[@class="plans"]')[0]
for el in list(plans):plans.remove(el)
for card in old.xpath('//article[contains(concat(" ",@class," ")," plan-card ")]'):
 card.set('class','plan legacy-plan');groups=card.xpath('./div[@class="plan-group"]');details=H.fragment_fromstring('<details><summary>تفاصيل الخطة</summary></details>')
 for g in groups:
  for para in g.xpath('.//li[strong[contains(text(),"الأرشيف")]]'):
   label=para.xpath('./strong')[0].text_content();para.clear();para.append(H.fragment_fromstring('<strong>'+e(label)+'</strong>'));para[-1].tail=' اختيار وإخراج مواد الأرشيف لدى فريق المعرض وفق الاتفاق، مع تنسيق التوقيتات داخل التقويم.'
  card.remove(g);details.append(g)
 card.append(details);plans.append(card)
# Native snapping rails, controlled in the same rightward direction as the post viewer.
for id,cls in [('deliverables','deliverables-grid'),('optional','optional-grid')]:
 sec=d.get_element_by_id(id);track=sec.xpath('./div[@class="'+cls+'"]')[0];track.set('class','card-rail');track.set('id',id+'-rail');track.set('tabindex','0');track.set('aria-label','بطاقات '+sec.xpath('.//h2')[0].text_content())
 sec.insert(list(sec).index(track),H.fragment_fromstring('<div class="rail-tools"><button type="button" data-rail-next="'+id+'-rail" aria-label="البطاقة التالية">التالي →</button><span aria-live="polite" data-rail-status="'+id+'-rail">1 / '+str(len(track))+'</span><button type="button" data-rail-prev="'+id+'-rail" aria-label="البطاقة السابقة">← السابق</button></div>'))
result=H.tostring(d,encoding='unicode',method='html');result=result.replace('تصميمات ثابتة','تصميمات').replace('تصميم ثابت','تصميم').replace('احتياجات','أولويات').replace('احتياج','متطلب').replace('منطوق','نص المتحدث').replace('تحتاج','تتطلب').replace('يحتاج','يتطلب');p.write_text('<!doctype html>'+result)
# Hide pricing/exhibition chooser in the full strategy while retaining the page's sections.
sfile=root/'strategy.html';s=H.fromstring(sfile.read_text())
for a in s.xpath('//a[@href]'):
 if 'اختيار المعرض' in a.text_content() or 'خطط الأسعار' in a.text_content() or '#pricing' in a.get('href') or 'content-plans/' in a.get('href'):a.getparent().remove(a)
sfile.write_text('<!doctype html>'+H.tostring(s,encoding='unicode',method='html'))
# Site landing is AGRI; HVAC remains available at its existing URL.
Path('dist/index.html').write_text('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>أجري إكسبو — خطة المحتوى</title><meta http-equiv="refresh" content="0;url=/agri/#home"><script>location.replace("/agri/#home")</script></head><body><a href="/agri/#home">خطة أجري إكسبو</a></body></html>')
