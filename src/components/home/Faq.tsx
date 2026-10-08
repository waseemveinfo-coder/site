import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const faqs = [
  {
    q: "العميل لازم يحمّل تطبيق جديد؟",
    a: "لا. العميل بيحكي مع شركتك على واتساب العادي، ومن نفس الرقم اللي بيعرفه. ما بيتغيّر عليه شي.",
  },
  {
    q: "الموظف بيقدر يعرف رقم العميل بأي طريقة جوّا ديرلي؟",
    a: "لا. رقم العميل بيظهر للموظف بأول رقمين وآخر رقمين بس، والرقم الكامل بيضل عند الإدارة.",
  },
  {
    q: "مين بيشوف الرقم الكامل؟",
    a: "الإدارة، أو مين بتعطيه أنت الصلاحية. وكل كشف للرقم بينسجّل بسجل النشاط.",
  },
  {
    q: "شو بيصير لما موظف يترك الشغل؟",
    a: "محادثاته وملفاته وعملاؤه بيضلّوا بالشركة جوّا ديرلي، لأنها أصلاً ما كانت على جواله. وبضغطة «تحويل» بتنقل تذاكره لزميل أو قسم، مع تاريخ المحادثة كامل.",
  },
  {
    q: "كيف بربط رقم الواتساب تبع شركتي؟",
    a: "بطريقتين: الربط الرسمي عن طريق WhatsApp Business API، وهو المنصح فيه للشركات وللرسائل الجماعية. أو الربط السريع بمسح رمز QR متل واتساب ويب، ومناسب للبداية.",
  },
  {
    q: "بقدر أرد على العملاء من جوالي؟",
    a: "إي. ديرلي بتشتغل على الجوال، وفيك تثبّتها على الشاشة الرئيسية متل أي تطبيق.",
  },
  {
    q: "كم رقم واتساب بقدر اربط؟",
    a: "حسب الخطة، من رقم واحد لـ 3 أرقام، وأكتر بالخطة المخصصة. وكل رقم بيشتغل لحاله.",
  },
  {
    q: "ديرلي بتناسب شركتي؟",
    a: "إذا عندك فريق، حتى لو موظفين اتنين، بيحكوا مع عملاء على واتساب، فديرلي معمولة إلك. اطلب عرض تجريبي ومنوريك ياها على شغلك أنت.",
  },
];

export function Faq({
  items = faqs,
  title = "أسئلة بتنسأل كتير",
}: {
  items?: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section aria-labelledby="faq-title" className="py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeader id="faq-title" title={title} align="start" />
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-xl leading-none text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[16px] leading-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
