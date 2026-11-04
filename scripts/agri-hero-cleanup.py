from pathlib import Path
from lxml import html as H
import json
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());hero=d.get_element_by_id('home');h=hero.xpath('.//h1')[0]
for c in list(h):h.remove(c)
h.text='خطة محتوى بتوضح قيمة';br=H.Element('br');br.tail='أجري إكسبو للشركات والزوّار.';h.append(br)
for x in hero.xpath('./p[contains(@class,"hero-purpose") or contains(@class,"date")]'):hero.remove(x)
s=d.get_element_by_id('pieces');pieces=json.loads(s.text)
for item in pieces:
 if item.get('id')!='piece-4':continue
 box=H.fragment_fromstring('<div>'+item['body']+'</div>')
 for strong in box.xpath('.//strong[contains(text(),"تسلسل الكاروسيل المقترح")]'):
  parent=strong.getparent();nxt=parent.getnext()
  if nxt is not None and 'source-rows' in (nxt.get('class') or ''):nxt.getparent().remove(nxt)
  strong.getparent().remove(strong)
 item['body']=(box.text or '')+''.join(H.tostring(c,encoding='unicode') for c in box)
s.text=json.dumps(pieces,ensure_ascii=False).replace('<','\\u003c')
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
