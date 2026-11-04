from pathlib import Path
from lxml import html as H
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());nav=d.xpath('//header/nav')[0];nav.clear();nav.set('aria-label','أقسام الخطة')
for target,label in [('samples','نماذج'),('start','الخطة'),('workflow','طريقة العمل'),('pricing','خطط الأسعار')]:
 a=H.Element('a',href='#'+target);a.text=label;nav.append(a)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
