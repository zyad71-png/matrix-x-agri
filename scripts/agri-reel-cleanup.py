from pathlib import Path
from lxml import html as H
import json
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());script=d.get_element_by_id('pieces');items=json.loads(script.text)
for x in items:
 if x['id']!='piece-6':continue
 box=H.fragment_fromstring('<div>'+x['body']+'</div>')
 for el in box.xpath('.//p'):
  text=' '.join(el.text_content().split())
  if text.startswith('توجيه التنفيذ: أداء هادئ'):
   el.getparent().remove(el)
  elif text.startswith('مرجع بصري سابق للمكتب والبروشور'):
   el.text='مراجع بصرية للـStoryboard.'
 x['body']=(box.text or '')+''.join(H.tostring(c,encoding='unicode') for c in box)
script.text=json.dumps(items,ensure_ascii=False).replace('<','\\u003c');p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
