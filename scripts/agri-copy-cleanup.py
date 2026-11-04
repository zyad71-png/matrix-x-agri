from pathlib import Path
from lxml import html as H
import re,json
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text())
def clean(s):
 if not s:return s
 s=s.replace(' اسحب الصور جوّه العرض عشان تستكشف التفاصيل.','')
 return re.sub(r'(?<![اأإآٱ])[\u064b-\u065f\u0670]', '', s)
for el in d.iter():
 if el.tag=='script':
  if el.get('id')=='pieces':
   obj=json.loads(el.text)
   def walk(x):
    if isinstance(x,str):return clean(x)
    if isinstance(x,list):return [walk(y) for y in x]
    if isinstance(x,dict):return {k:walk(v) for k,v in x.items()}
    return x
   el.text=json.dumps(walk(obj),ensure_ascii=False).replace('<','\\u003c')
  continue
 el.text=clean(el.text);el.tail=clean(el.tail)
 for k in ('aria-label','alt','title'): 
  if el.get(k):el.set(k,clean(el.get(k)))
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
