from pathlib import Path
from lxml import html as H
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());grid=d.xpath('//*[contains(concat(" ",@class," ")," exhibition-grid ")]')[0];cards=list(grid);order=['piece-7','piece-3','piece-2','piece-4','piece-6','piece-1','extra','piece-8','piece-5'];lookup={x.get('data-piece'):x for x in cards};assert set(lookup)==set(order)
for x in cards:grid.remove(x)
for key in order:grid.append(lookup[key])
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
