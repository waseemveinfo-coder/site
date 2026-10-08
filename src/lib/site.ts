// Single source of truth for navigation. Header mega-menu, footer and
// (later) product/solution pages all read from here.

import type { IconName } from "@/components/ui/Icon";

export const site = {
  name: "ديرلي",
  latinName: "Derlly",
  url: "https://derlly.com",
  tagline: "أمان محادثات واتساب بين عملائك وموظفينك",
  description:
    "ديرلي بتخلّي فريقك يخدم العملاء على واتساب وأرقامهم محجوبة عن الموظفين، مع تذاكر ومهام وتقارير ورد آلي مدرّب على بيانات شغلك. لكل شركة عندها فريق بيحكي مع عملاء.",
  demoHref: "/demo",
  demoLabel: "اطلب عرضاً تجريبياً",
  // From the current derlly.com (owner's own published details).
  loginHref: "https://app.derlly.com" as string | null,
  trialHref: "https://app.derlly.com",
  whatsappHref: "https://wa.me/970592356941" as string | null,
  whatsappDisplay: "+970 59 235 6941",
  email: "support@derlly.com" as string | null,
  legalUpdated: "يناير 2026",
};

export type NavLink = {
  href: string;
  label: string;
  desc?: string;
  icon?: IconName;
};

export const productLinks: NavLink[] = [
  {
    href: "/product/privacy",
    label: "سرية مطلقة",
    desc: "الموظف يخدم العميل بدون ما يشوف رقمه",
    icon: "shield",
  },
  {
    href: "/product/tickets",
    label: "نظام التذاكر",
    desc: "كل محادثة إلها مسؤول وحالة وأولوية",
    icon: "ticket",
  },
  {
    href: "/product/chat-to-task",
    label: "من رسالة إلى مهمة",
    desc: "حوّل أي رسالة لمهمة بضغطة وحدة",
    icon: "task",
  },
  {
    href: "/product/reports",
    label: "التقارير الدورية",
    desc: "مين أنشط موظف، وأوقات الذروة، ومين مقصّر",
    icon: "chart",
  },
  {
    href: "/product/workflow",
    label: "باني المسارات",
    desc: "قواعد إذا صار كذا، اعمل كذا",
    icon: "flow",
  },
  {
    href: "/product/ai-bot",
    label: "الرد الآلي الذكي",
    desc: "بوت يتعلّم من بيانات شغلك ويرد عنك",
    icon: "bot",
  },
  {
    href: "/product/storage",
    label: "تخزين آمن للملفات",
    desc: "العقود والصور والمخططات بمكان واحد",
    icon: "folder",
  },
  {
    href: "/product/broadcast",
    label: "الرسائل الجماعية",
    desc: "رسالة وحدة لقوائمك، بجدولة وإرسال متدرّج",
    icon: "broadcast",
  },
  {
    href: "/product/internal-chat",
    label: "الدردشة الداخلية",
    desc: "فريقك بينسّق جوّا ديرلي، مش بجروبات شخصية",
    icon: "chat",
  },
  {
    href: "/product/quick-replies",
    label: "الردود الجاهزة",
    desc: "الرد اللي بتكتبه كل يوم، صار بكلمة",
    icon: "zap",
  },
  {
    href: "/product/out-of-hours",
    label: "الرد خارج الدوام",
    desc: "العميل بيعرف إيمتى الفريق راجع",
    icon: "clock",
  },
];

export const solutionLinks: NavLink[] = [
  {
    href: "/solutions/real-estate",
    label: "المكاتب العقارية",
    desc: "العميل يضل عميل المكتب، مش عميل الموظف",
    icon: "building",
  },
  {
    href: "/solutions/engineering",
    label: "الهندسة والمقاولات",
    desc: "عروض أسعار ومخططات ومتابعة كل مشروع",
    icon: "helmet",
  },
  {
    href: "/solutions/sales",
    label: "فرق المبيعات",
    desc: "توزيع عادل للعملاء وقياس أداء كل بائع",
    icon: "users",
  },
  {
    href: "/solutions/clinics",
    label: "العيادات والمراكز الطبية",
    desc: "حجوزات ومتابعة مرضى، وخصوصية بياناتهم محفوظة",
    icon: "clinic",
  },
  {
    href: "/solutions/retail",
    label: "المتاجر والتجارة الإلكترونية",
    desc: "طلبات واستفسارات كثيرة، وفريق واحد يرد بسرعة",
    icon: "store",
  },
  {
    href: "/solutions/services",
    label: "شركات الخدمات",
    desc: "صيانة وتوصيل واستشارات: كل طلب إله متابع",
    icon: "briefcase",
  },
];

export const resourceLinks: NavLink[] = [
  { href: "/help", label: "مركز المساعدة", desc: "شروحات خطوة بخطوة", icon: "help" },
  { href: "/blog", label: "المدوّنة", desc: "أفكار عملية لإدارة فريق المبيعات", icon: "doc" },
  { href: "/security", label: "الأمان والخصوصية", desc: "كيف نحمي بياناتك وبيانات عملائك", icon: "lock" },
  { href: "/support", label: "الدعم الفني", desc: "فريق يرد عليك بالعربي", icon: "support" },
];

export type MainNavItem =
  | { kind: "menu"; id: string; label: string; links: NavLink[]; aside?: NavLink }
  | { kind: "link"; href: string; label: string };

export const mainNav: MainNavItem[] = [
  {
    kind: "menu",
    id: "product",
    label: "المنتج",
    links: productLinks,
    // Keep this desc generic until the owner confirms which security features exist.
    aside: { href: "/security", label: "الأمان", desc: "كيف نحمي بياناتك وبيانات عملائك" },
  },
  { kind: "menu", id: "solutions", label: "الحلول", links: solutionLinks },
  { kind: "link", href: "/pricing", label: "الأسعار" },
  { kind: "menu", id: "resources", label: "المصادر", links: resourceLinks },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  { title: "المنتج", links: productLinks },
  {
    title: "الحلول",
    links: [...solutionLinks, { href: "/pricing", label: "الأسعار" }],
  },
  { title: "المصادر", links: resourceLinks },
  {
    title: "الشركة",
    links: [
      { href: "/demo", label: "اطلب عرضاً تجريبياً" },
      // Legal text carried over from the current derlly.com.
      { href: "/terms", label: "الشروط والأحكام" },
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/refund", label: "سياسة الإلغاء والاسترداد" },
      { href: "/delivery", label: "سياسة تسليم الخدمة" },
    ],
  },
];
