from pathlib import Path
from lxml import html as H
import json
p=Path('dist/agri/index.html');d=H.fromstring(p.read_text());j=d.get_element_by_id('pieces');items=json.loads(j.text)
for x in items:
 if x['id']=='piece-7':
  x['title']='محاضرات وخبرات';x['body']=x['body'].replace('جلسات علمية','محاضرات').replace('الجلسات العلمية','المحاضرات');x['caption']=x['caption'].replace('جلسات علمية','محاضرات').replace('الجلسات العلمية','المحاضرات')
 if x['id']=='extra':
  idea='لقاء أعمال حول طاولة يوضح التواصل المباشر بين الزوار وممثلي الشركات.';message='تتيح زيارة أجري إكسبو التواصل مع الشركات والمتخصصين والتعرّف على منتجاتهم ومناقشة فرص التعاون مباشرة.'
  x['fields']={'الفكرة':idea,'الجمهور':'الزوار والمتخصصون وأصحاب الأعمال المهتمون بالقطاع الزراعي.','الهدف':'تشجيع تسجيل الزيارة، وإبراز فرصة لقاء الشركات ومناقشة فرص التعاون.','الرسالة':message}
  x['body']='<p><strong>الفكرة:</strong> '+idea+'<br><strong>الرسالة:</strong> '+message+'<br><strong>التصميم:</strong> تصميم «استثمر زيارتك».<br><strong>النص على التصميم:</strong> استثمر زيارتك<br>في لقاءات أعمال مباشرة<br><strong>الدعوة للإجراء:</strong> خطّط لزيارتك.</p>'
  x['caption']='''<p>استثمر زيارتك في لقاءات تقرّبك من السوق الزراعي.</p><p>في أجري إكسبو، تتواصل مع الشركات والمتخصصين، وتتعرّف على منتجاتهم، وتناقش فرص التعاون وجهًا لوجه.</p><p>خطّط لزيارتك، وابدأ محادثات جديدة خلال أيام المعرض.</p><p>📅 ٣٠ يناير – ١ فبراير ٢٠٢٧<br>📍 مركز القاهرة الدولي للمؤتمرات – مدينة نصر<br>سجّل زيارتك الآن: <a href="https://www.agriexpo-eg.com/register" target="_blank" rel="noopener">https://www.agriexpo-eg.com/register</a></p><p>Make the most of your visit through conversations that bring you closer to the agricultural market.</p><p>At Agri Expo, connect with companies and professionals, discover their products, and discuss opportunities for collaboration face to face.</p><p>Plan your visit and start new conversations during the exhibition.</p><p>📅 30 January – 1 February 2027<br>📍 Cairo International Convention Centre, Nasr City<br>Register to visit: <a href="https://www.agriexpo-eg.com/register" target="_blank" rel="noopener">https://www.agriexpo-eg.com/register</a></p><p><strong>دوره في التسلسل:</strong> يوضح قيمة الزيارة من زاوية لقاء الشركات ومناقشة فرص التعاون، ويدعم دعوة الجمهور للتسجيل.</p>'''
j.text=json.dumps(items,ensure_ascii=False).replace('<','\\u003c')
for el in d.xpath('//*[@data-piece="piece-7"]'):
 el.set('aria-label','عرض تفاصيل محاضرات وخبرات')
 for im in el.xpath('.//img'):im.set('alt','محاضرات وخبرات')
p.write_text('<!doctype html>'+H.tostring(d,encoding='unicode',method='html'))
