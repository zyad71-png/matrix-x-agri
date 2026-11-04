from lxml import html as H
from pathlib import Path
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());sec=d.get_element_by_id('pricing');title=sec.cssselect('.section-title')[0]
hero=H.fragment_fromstring('''<div class="price-intro"><div class="price-intro-copy"><span>خطط المحتوى الإبداعي</span><h2>خطط الأسعار</h2><p>من الاستراتيجية وخطة المحتوى كاملة إلى التنفيذ: التصميم، التصوير، والإنتاج، بما يناسب الأهداف والجمهور.</p><a href="#price-cards">اختر خطتك <span aria-hidden="true">↓</span></a></div><div class="price-intro-art" aria-label="خطط شهرية من ١٨ أو ٢٩ قطعة"><span>اختر الخطة المناسبة</span><div><small>خطة المحتوى الأساسية</small><p><b>18</b> قطعة محتوى شهريًا</p></div><div><small>خطة المحتوى الموسّعة</small><p><b>29</b> قطعة محتوى شهريًا</p></div></div></div>''');title.addnext(hero);sec.remove(title)
plans=sec.cssselect('.plans')[0];plans.set('id','price-cards');plans.addprevious(H.fragment_fromstring('<h3 class="choose-plan">اختر الخطة المناسبة</h3>'))
for card in plans.cssselect('.legacy-plan'):
 for x in card.cssselect('.plan-distribution,.fit'):x.getparent().remove(x)
 det=card.cssselect('details')[0]
 for group in det.cssselect('.plan-group'):card.insert(card.index(det),group)
 card.remove(det)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
