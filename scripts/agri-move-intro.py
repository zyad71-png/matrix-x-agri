from pathlib import Path
from lxml import html as H
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());start=d.get_element_by_id('start');samples=d.get_element_by_id('samples');samples.addnext(start)
for e in start.xpath('./div[contains(concat(" ",@class," ")," section-title ")]/span'):
 if 'البداية' in e.text_content():e.getparent().remove(e)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
