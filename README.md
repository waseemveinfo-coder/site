# موقع ديرلي (Derlly)

موقع تسويقي عربي لمنصة ديرلي، مبني بـ Next.js 16 و Tailwind 4.

## التشغيل على جهاز جديد

1. ثبّت Node.js (نسخة 20 أو أحدث) من nodejs.org
2. افتح الطرفية جوّا مجلد المشروع ونفّذ:

```bash
npm install
```

3. شغّل الموقع:

```bash
npm run dev
```

4. افتح المتصفح على `http://localhost:3000`

## بناء نسخة الإنتاج

```bash
npm run build
npm start
```

## وين بلاقي الأشياء

| الشي | المكان |
|---|---|
| نصوص صفحات الميزات | `src/lib/products.ts` |
| نصوص صفحات القطاعات | `src/lib/solutions.ts` |
| الأسعار | `src/components/home/PricingTeaser.tsx` |
| روابط التواصل والقائمة | `src/lib/site.ts` |
| الصفحات القانونية | `src/lib/legal.ts` |
| الصور | `public/photos` (المعالجة: `node scripts/process-photos.mjs <مجلد الصور الأصلية>`) |
| مشاهد الهيرو المتحركة | `src/components/demo` |
| الألوان والخطوط | `src/app/globals.css` |
