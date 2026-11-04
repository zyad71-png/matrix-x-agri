from pathlib import Path
from lxml import html as H
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text())
for id,posts,motion,design,reels,archive,new,session in [('plan-essential',10,3,7,8,5,3,True),('plan-expanded',15,6,9,14,8,6,False)]:
 card=d.get_element_by_id(id)
 for el in card.xpath('./h3|./p[contains(@class,"alternate")]|./details'):card.remove(el)
 summary=card.xpath('./p[contains(@class,"plan-summary")]')[0]
 if id=='plan-expanded':summary.text='تشمل جميع الخدمات المشمولة، مع حجم إنتاج أكبر.'
 data=[('الاستراتيجية وخطة المحتوى الشهرية',None),('صناعة المحتوى',None),(f'{posts} بوستات — شهريًا',[f'{motion} بوستات موشن جرافيك',f'{design} بوستات تصميم (تصميمات، صور، كاروسيل)']),('جلسة تصوير واحدة — شهريًا' if session else 'جلسة تصوير واحدة — شهريًا',None),(f'{reels} ريلز — شهريًا',[f'{archive} ريلز من أرشيف المعرض — اختيار وإخراج مواد الأرشيف لدى فريق المعرض وفق الاتفاق.',f'{new} ريلز بتصوير جديد','أغلفة الريلز']),('إنتاج وتنفيذ المحتوى',None),('جدول نشر منظم',None),('مراجعة وتسليم',None)]
 box=H.Element('div',{'class':'plan-breakdown'})
 for title,children in data:
  if children:
   item=H.Element('details',{'class':'plan-detail'});sm=H.Element('summary');sm.text=title;item.append(sm);ul=H.Element('ul')
   for txt in children:li=H.Element('li');li.text=txt;ul.append(li)
   item.append(ul)
  else:item=H.Element('div',{'class':'plan-line'});item.text=title
  box.append(item)
 card.append(box)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
