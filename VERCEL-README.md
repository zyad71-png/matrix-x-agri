# نشر الموقع على Vercel

المشروع موقع ثابت ويشمل الصفحة الرئيسية وخطتي AGRI وHVAC-R وصفحات النماذج والأسعار.

1. فك الملف المضغوط وارفع محتوياته إلى مستودع Git، ثم استورد المستودع في Vercel.
2. اختر Other كإطار عمل، واترك Build Command فارغاً. يحدد `vercel.json` مجلد النشر `dist` والمسارات النظيفة تلقائياً.
3. انشر الموقع، واختبر الصفحة الرئيسية ومسارات `/agri/` و`/hvacr/` و`/agri/storyboard` و`/agri/designs` وصفحتي `/agri/content-plans/ar/` و`/agri/content-plans/en/`.
4. بعد تحديد الدومين النهائي، غيّر `SITE_URL` في `content/content-plans/settings.json` إلى عنوانه مع `https://`، ثم شغّل `node scripts/build-content-plans.mjs` وأعد نشر التغييرات، لتحديث روابط canonical وhreflang وOpen Graph لصفحات الأسعار.

مجلد `dist` يحتوي على الملفات الجاهزة للنشر. مجلد `content` يحتوي على نصوص وإعدادات خطط الأسعار، و`scripts` يحتوي على أداة إعادة بناء صفحتي الأسعار؛ يحتاج تشغيلها إلى Node.js. لا يحتاج الموقع إلى قاعدة بيانات أو متغيرات بيئة لتشغيله الحالي.

راجع إعدادات الوصول في حساب Vercel قبل مشاركة الرابط؛ النشر على Vercel مستقل عن صلاحيات الموقع الحالي.

بعد تعديل نصوص خطط الأسعار، شغّل بالتتابع:

```
node scripts/build-content-plans.mjs
node scripts/build-hvacr-plans.mjs
node scripts/prepare-ui.mjs
```

هذه الأوامر تعيد إنشاء صفحات المعرضين وتضيف أدوات التنقل والأسهم المشتركة. النشر المتصل بـ GitHub يتم تلقائيًا بعد دفع تغييرات `main`.
