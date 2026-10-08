// Stock photos (Freepik, non-AI, free licence), processed by
// scripts/process-photos.mjs: 3:2, 1800x1200, one shared grade.
// Content rule from the owner: men, or women in hijab, modest dress only.

export type PhotoKey = "homeTeam" | "realEstate" | "engineering" | "sales" | "clinics" | "retail" | "services" | "support";

export const photos: Record<PhotoKey, { src: string; alt: string }> = {
  realEstate: { src: "/photos/real-estate.jpg", alt: "وسيط عقاري عم يسلّم مفاتيح الشقة ويصافح العميل" },
  homeTeam: { src: "/photos/home-team.jpg", alt: "زميلتين محجبات عم يراجعوا أوراق شغل سوا" },
  engineering: { src: "/photos/engineering.jpg", alt: "مهندس بخوذة بيقرا مخطط مشروع قدّام مبنى قيد الإنشاء" },
  sales: { src: "/photos/sales.jpg", alt: "رجل أعمال بالشماغ عم يتابع عميل على جواله بالمكتب" },
  clinics: { src: "/photos/clinics.jpg", alt: "دكتورة محجبة عم تسجّل ملاحظات على ملف بالعيادة" },
  retail: { src: "/photos/retail.jpg", alt: "صاحبة متجر محجبة عم تراجع الطلبات بين طرود الشحن" },
  services: { src: "/photos/services.jpg", alt: "فني عم يصلّح مكيّف عند عميل" },
  support: { src: "/photos/support.jpg", alt: "موظف دعم بسماعة عم يساعد عميل" },
};
