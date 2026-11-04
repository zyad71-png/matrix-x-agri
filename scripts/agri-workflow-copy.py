from lxml.etree import SubElement
from lxml import html as H
from pathlib import Path
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());w=d.get_element_by_id('workflow').xpath('.//div[contains(@class,"work-steps")]')[0]
for a in list(w):w.remove(a)
steps=[('01','التنسيق','نحدد أهداف المحتوى والرسائل والأفكار، ونتفق على متطلبات التصوير والشركات والمتحدثين ومواعيد التنفيذ.','النتيجة: أهداف ورسائل واضحة ومتطلبات تصوير محددة.'),('02','التخطيط والإنتاج','نجهز خطة المحتوى، نعمل على التصميمات والكاروسيل والموشن جرافيك، ونصور الريلز ونجمع مواد الأرشيف.','النتيجة: خطة محتوى ومواد إنتاج جاهزة للتنفيذ.'),('03','التنفيذ والتسليم','نستكمل تنفيذ المحتوى ومراجعته، نسلم الملفات النهائية الجاهزة للنشر.','النتيجة: ملفات نهائية، وأغلفة الريلز، وكابشنات المحتوى.'),('04','توزيع المحتوى','نجهز جدول نشر بيوضح توزيع قطع خطة المحتوى وتسلسلها ومواعيدها، بالتنسيق مع فريق المعرض.','النتيجة: جدول نشر وتوزيع للمحتوى.')]
for n,h,t,r in steps:
 a=H.Element('article');SubElement(a,'span').text=n;SubElement(a,'h3').text=h;SubElement(a,'p').text=t;SubElement(a,'small').text=r;w.append(a)
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
