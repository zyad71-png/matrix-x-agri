from pathlib import Path
from lxml import html as H
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());s=d.get_element_by_id('optional');rail=d.get_element_by_id('optional-rail');rail.set('class','optional-bento');rail.attrib.pop('tabindex',None);rail.attrib.pop('aria-label',None)
for el in s.xpath('./div[contains(concat(" ",normalize-space(@class)," ")," rail-tools ")]'):s.remove(el)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
