from pathlib import Path
from lxml import html as H
import json,html
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());e=html.escape
for el in d.cssselect('.hero-links'):el.getparent().remove(el)
hero=d.get_element_by_id('home');hero.insert(1,H.fragment_fromstring('<span class="hero-kicker">AGRI EXPO 2027 / خطة المحتوى</span>'))
hero.insert(3,H.fragment_fromstring('<p class="hero-purpose">نحوّل قيمة المعرض إلى قصص تُرى، ومنتجات تُكتشف، وأسباب واضحة للمشاركة والزيارة.</p>'))
start=d.get_element_by_id('start');start.cssselect('h2')[0].text='ماذا سنقدّم؟ ولمن؟'
for br in start.cssselect('h2 br'):br.getparent().remove(br)
start.cssselect('.brief-grid')[0].set('class','brief-grid client-brief')
start.cssselect('.plan-overview summary')[0].text='الجمهور والخطوة التي نستهدفها'
samples=d.get_element_by_id('samples');samples.cssselect('.section-title')[0].append(H.fragment_fromstring('<p class="explore-hint">اختر أي نموذج لتشاهد فكرته، هدفه، ونصوصه. اسحب الصور داخل العرض لاستكشاف التفاصيل.</p>'))
week=H.fragment_fromstring('<div class="week-story"><article><span>الأسبوع الأول</span><h3>نفتح باب التعارف والمشاركة.</h3><p>شبكة الأعمال، لقاء الشركات، تجربة مشارك، ومنتجات الراعي الماسي.</p></article><article><span>الأسبوع الثاني</span><h3>نقرّب تجربة المعرض للجمهور.</h3><p>عرض الشركات، الحوار داخل المعرض، الجلسات العلمية، والمنتجات.</p></article></div>');samples.insert(1,week)
for sec in ['deliverables','optional']:
 d.get_element_by_id(sec).cssselect('.rail-tools')[0].insert(0,H.fragment_fromstring('<small class="swipe-hint">اسحب أو مرّر لاستكشاف البطاقات</small>'))
for i,a in enumerate(d.cssselect('#optional .card-rail article')):a.insert(0,H.fragment_fromstring('<span class="service-number">0'+str(i+1)+'</span>'))
for a in d.cssselect('.fit'):
 a.text=a.text_content().replace('العلامات التجارية التي تتطلب إلى','المعرض عند الرغبة في')
# Keep exact comparison values, but move the lengthy breakdown behind an explicit control.
comparison=d.cssselect('.comparison')[0];wrap=H.fragment_fromstring('<details class="comparison-wrap"><summary>قارن تفاصيل الخطتين</summary></details>');comparison.addprevious(wrap);wrap.append(comparison)
# Add compact visible distribution to financial cards.
for card,label in zip(d.cssselect('.legacy-plan'),['10 بوستات · 8 ريلز','15 بوستًا · 14 ريلز']):
 card.cssselect('.pieces')[0].addnext(H.fragment_fromstring('<p class="plan-distribution">'+label+'</p>'))
for s,label in [('workflow','03 / طريقة العمل'),('deliverables','04 / المخرجات الشهرية'),('pricing','05 / خطط الأسعار'),('optional','06 / خدمات إضافية')]:d.get_element_by_id(s).cssselect('.section-title > span')[0].text=label
# Clear client presentation section navigation.
nav=d.cssselect('header nav')[0]
nav.clear()
for target,label in [('start','الخطة'),('samples','النماذج'),('workflow','كيف نعمل؟'),('pricing','الأسعار')]:nav.append(H.fragment_fromstring('<a href="#'+target+'">'+label+'</a>'))
d.cssselect('head')[0].append(H.fragment_fromstring('<link rel="stylesheet" href="/agri/client.css">'))
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))

import runpy
runpy.run_path("scripts/restore-pricing-view.py")

import runpy
runpy.run_path("scripts/optional-bento.py")

import runpy
runpy.run_path("scripts/agri-egyptian-copy.py")

import runpy
runpy.run_path("scripts/agri-hero-cleanup.py")

import runpy
runpy.run_path("scripts/agri-copy-cleanup.py")
