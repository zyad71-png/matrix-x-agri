from lxml import html as H
from pathlib import Path
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());plans=d.get_element_by_id('price-cards');plans.addprevious(H.fragment_fromstring('<div class="plan-switch" role="tablist" aria-label="اختيار خطة المحتوى"><button type="button" role="tab" aria-selected="true" aria-controls="plan-essential" data-plan="plan-essential">STANDARD <span>الأساسية</span></button><button type="button" role="tab" aria-selected="false" aria-controls="plan-expanded" data-plan="plan-expanded">PLUS <span>الموسعة</span></button></div>'))
for card in plans.xpath('./article'):
 card.set('role','tabpanel')
 if card.get('id')=='plan-expanded':card.set('hidden','hidden');card.xpath('./p[contains(@class,"plan-summary")]')[0].text='تشمل كل ما في خطة المحتوى الأساسية، مع حجم إنتاج أكبر.'
 else:
  inc=H.fragment_fromstring('<details class="plan-included"><summary>الخدمات المشمولة</summary><p>التخطيط الشهري للمحتوى، الكتابة الإبداعية، إنتاج المحتوى، أغلفة الريلز، جدول نشر المحتوى، والمراجعة والتسليم.</p></details>');card.append(inc)
 for group in card.xpath('./div[contains(@class,"plan-group")]'):
  detail=H.Element('details',{'class':'plan-detail'});h=group.xpath('./h4')[0];summary=H.Element('summary');summary.text=h.text_content();detail.append(summary);group.remove(h)
  for child in list(group):detail.append(child)
  group.addprevious(detail);card.remove(group)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
