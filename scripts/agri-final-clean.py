from pathlib import Path
from lxml import html as H
import json,re
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text())
for e in d.xpath('//main//div[contains(concat(" ",@class," ")," section-title ")]/span'):
 if e.text:e.text=re.sub(r'^\s*[0-9٠-٩]+\s*/\s*','',e.text)
s=d.get_element_by_id('samples');title=s.xpath('./div[contains(@class,"section-title")]')[0];ps=title.xpath('./p');ps[0].text='٦ تصميمات من ضمنها كاروسيل واحد، و٣ ريلز بتصوير جديد';hint=ps[1];hint.text='اختار أي نموذج وشوف فكرته وهدفه ومحتواه.';title.remove(hint);s.xpath('./div[contains(@class,"week-story")]')[0].addnext(hint)
s.xpath('./div[contains(@class,"week-story")]/article[2]/p')[0].text='عرض الشركات، التعاقدات والاجتماعات داخل المعرض، المحاضرات، المنتجات.'
data=d.get_element_by_id('pieces');items=json.loads(data.text)
for item in items:item['slides']=[slide for slide in item.get('slides',[]) if not slide.get('card')]
data.text=json.dumps(items,ensure_ascii=False).replace('<','\\u003c');p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
