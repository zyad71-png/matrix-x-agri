from pathlib import Path
from lxml import html as H,etree
import json,re,html
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());e=html.escape
# Hide the pending-data section without removing the source record.
for h in d.xpath('//h3[contains(text(),"البيانات المطلوب استكمالها")]'):
 following=h.getnext();h.getparent().remove(h)
 if following is not None and 'source-rows' in following.get('class',''):following.getparent().remove(following)
for det in d.xpath('//details[summary[contains(text(),"المراحل والمحاور من الخطة السابقة")]]'):det.getparent().remove(det)
nav=d.xpath('//header/nav')[0];nav.append(H.fragment_fromstring('<a href="/agri/strategy.html">استراتيجية</a>'))
# Week value stays visible above the image-only grid.
for n,title,desc in [(1,'الأسبوع الأول','قيمة المعرض وتجربة المشاركة'),(2,'الأسبوع الثاني','من التعريف إلى الحوار')]:
 panel=d.get_element_by_id('week'+str(n));panel.set('class','week-panel');cards=list(panel);panel.clear();panel.set('class','week-panel');panel.set('id','week'+str(n));panel.set('role','tabpanel');panel.set('aria-labelledby','tab'+str(n));
 if n==2:panel.set('hidden','')
 panel.append(H.fragment_fromstring('<div class="week-intro"><h3>'+title+'</h3><p>'+desc+'</p><small>٤ قطع محتوى · اضغط على أي قطعة لاستعراضها</small></div>'))
 grid=H.fragment_fromstring('<div class="post-grid"></div>');panel.append(grid)
 for card in cards:
  card.set('aria-label','عرض تفاصيل '+card.xpath('.//h3')[0].text_content())
  copy=card.xpath('./div[@class="post-copy"]')[0];card.remove(copy);grid.append(card)
  badge=card.xpath('.//span[@class="post-mark"]')[0];badge.text='▣' if card.get('data-piece')=='piece-4' else ('▶' if card.xpath('.//div[@class="reel-tile"]') else '')
  if not badge.text:badge.getparent().remove(badge)
  elif badge.text=='▶':badge.text='';badge.set('class','post-mark reel-mark')
  else:badge.text='';badge.set('class','post-mark carousel-mark')
  for play in card.xpath('.//div[@class="reel-tile"]/span'):play.text='';play.set('class','play-glyph')
# Production workflow pulled from the approved document.
source=Path('content/agri-two-weeks/source.md').read_text();block=source.split('## كيف نجهّز الخطة للنشر؟')[1].split('الريلز الثلاثة')[0];rows=[line for line in block.splitlines() if line.startswith('|')][2:]
steps=''.join('<article><span>'+str(i+1).zfill(2)+'</span><h3>'+e(c[0])+'</h3><p>'+e(c[1])+'</p><small>'+e(c[2])+'</small></article>' for i,line in enumerate(rows) for c in [[x.strip() for x in line.strip('|').split('|')]])
# Remove the duplicated preparation table from introductory details.
for heading in d.xpath('//section[@id="start"]//h3[contains(text(),"كيف نجهّز") ]'):
 nxt=heading.getnext();heading.getparent().remove(heading)
 if nxt is not None and 'source-rows' in nxt.get('class',''):nxt.getparent().remove(nxt)
workflow=H.fragment_fromstring('<section id="workflow"><div class="section-title"><span>من الفكرة إلى التسليم</span><h2>كيف نعمل؟</h2></div><div class="work-steps">'+steps+'</div></section>');pricing=d.get_element_by_id('pricing');pricing.addprevious(workflow)
c=json.loads(Path('content/content-plans/ar.json').read_text());old=pricing.xpath('./details')[0];pricing.remove(old)
comparison='<div class="comparison"><h3>قارن بين الخطتين</h3><div class="compare-head"><strong>خطة المحتوى الأساسية</strong><strong>خطة المحتوى الموسّعة</strong></div>'
for r in c['compare']['rows']:
 if r['label']=='الخدمات الاختيارية':continue
 if r['essential']==r['expanded']:comparison+='<div class="shared-row"><span>'+e(r['label'])+'</span><b>متاحة ضمن الباقتين</b></div>'
 else:comparison+='<article class="compare-pair"><h4>'+e(r['label'].replace('↳ ',''))+'</h4><div><span>'+e(r['essential'])+'</span><span>'+e(r['expanded'])+'</span></div></article>'
comparison+='</div>';pricing.append(H.fragment_fromstring(comparison))
planning=c['planning'];planninghtml='<section id="deliverables"><div class="section-title"><span>ما تستلمونه منّا</span><h2>التخطيط الشهري للمحتوى</h2><p>'+e(planning['lead'])+'</p></div><div class="deliverables-grid">'+''.join('<article><span>'+str(i+1).zfill(2)+'</span><h3>'+e(r['label'])+'</h3><p>'+e(r['text'])+'</p></article>' for i,r in enumerate(planning['rows']))+'</div></section>'
optional='<section id="optional"><div class="section-title"><span>حسب نطاق الاتفاق</span><h2>خدمات اختيارية</h2><p>'+e(c['optional']['lead'])+'</p></div><div class="optional-grid">'+''.join('<article><h3>'+e(r['label'])+'</h3><p>'+e(r.get('text',''))+'</p><span class="available">متاحة</span></article>' for r in c['optional']['items'])+'</div></section>'
pricing.addnext(H.fragment_fromstring(planninghtml));d.get_element_by_id('deliverables').addnext(H.fragment_fromstring(optional))
result=H.tostring(d,encoding='unicode',method='html');result=result.replace('الاحتياجات','الأولويات').replace('احتياجات','أولويات').replace('احتياج','متطلب').replace('منطوق','نص المتحدث');p.write_text('<!doctype html>'+result)
# The original strategic site retains its layout and interactivity; execution samples move to the new home only.
s=H.fromstring(Path('content/agri-two-weeks/previous-home.html').read_text());s.xpath('//title')[0].text='أجري إكسبو — استراتيجية'
for el in s.xpath('//*[@id="execution-samples"]'):
 el.getparent().remove(el)
for el in s.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," sample-showcase ")]'):
 if el.getparent() is not None:el.getparent().remove(el)
for a in s.xpath('//a[@href]'):
 href=a.get('href')
 if 'execution-samples' in href:a.set('href','/agri/#samples')
 if 'content-plans/' in href:a.set('href','/agri/#pricing')
head=s.xpath('//head')[0];head.append(H.fragment_fromstring('<link rel="stylesheet" href="/agri/strategy-page.css">'))
s.xpath('//header')[0].append(H.fragment_fromstring('<a class="strategy-back" href="/agri/">العودة للرئيسية ↗</a>'))
Path('dist/agri/strategy.html').write_text('<!doctype html>'+H.tostring(s,encoding='unicode',method='html'))
