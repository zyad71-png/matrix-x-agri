from pathlib import Path
from lxml import html as H
import json
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());data=d.get_element_by_id('pieces');items=json.loads(data.text)
for item in items:
 box=H.fragment_fromstring('<div>'+item.get('body','')+'</div>')
 for strong in box.xpath('.//strong[contains(text(),"موعدها في الخطة")]'):
  nxt=strong.getnext()
  if nxt is not None and nxt.tag=='br':nxt.getparent().remove(nxt)
  strong.getparent().remove(strong)
 item['body']=(box.text or '')+''.join(H.tostring(c,encoding='unicode') for c in box)
data.text=json.dumps(items,ensure_ascii=False).replace('<','\\u003c')
for el in d.xpath('//footer'):el.getparent().remove(el)
w=d.get_element_by_id('workflow')
for a in w.xpath('.//article'):
 if a.xpath('./h3') and a.xpath('./h3')[0].text_content().strip()=='المتابعة':a.getparent().remove(a)
d.get_element_by_id('samples').xpath('./p[contains(@class,"explore-hint")]')[0].text='النماذج تحتوي على: الفكرة - الهدف - المحتوى'
opt=d.get_element_by_id('optional');labels=[('إدارة صفحات السوشيال ميديا','Social Media Management'),('إدارة المجتمع الرقمي','Community Management'),('شراء المساحات الإعلانية وإدارة الحملات','Media Buying'),('جدولة المحتوى ونشره','Scheduling & Publishing')]
for a,(ar,en) in zip(opt.xpath('.//article'),labels):
 h=a.xpath('./h3')[0];h.text=ar;h.addnext(H.fragment_fromstring('<p class="service-english" lang="en" dir="ltr">'+en+'</p>'))
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
