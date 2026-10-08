import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/Button";
import { site } from "@/lib/site";

// Plans and limits from the current derlly.com (USD, monthly). Owner chose the
// higher list prices for now; the yearly discount is postponed. Number masking
// is in every plan for now (owner decision); advanced parts may be tiered later.
const maskingItem = "حجب أرقام العملاء عن الموظفين";
const plans: { name: string; who: string; price: string; unit: string; items: string[]; cta: string }[] = [
  {
    name: "التجربة المجانية",
    who: "جرّب كل شي على شغلك قبل ما تدفع.",
    price: "مجاناً",
    unit: "لمدة 7 أيام",
    items: ["رقم واتساب واحد", "موظفين اتنين", "مساحة 100 ميجابايت", "ذكاء اصطناعي أساسي", "ردود تلقائية وتقارير", "إدارة المهام ودردشة داخلية", "لحد قسمين"],
    cta: "ابدأ التجربة",
  },
  {
    name: "الأساسية",
    who: "للشركات الصغيرة.",
    price: "$15",
    unit: "بالشهر",
    items: ["3 موظفين", "ردود تلقائية", "لحد 5 أقسام", "مساحة 2 جيجابايت", "بث جماعي: 500 رسالة بالشهر"],
    cta: "ابدأ بالأساسية",
  },
  {
    name: "الاحترافية",
    who: "للشركات المتوسطة.",
    price: "$36",
    unit: "بالشهر",
    items: [
      "رقمين واتساب",
      "5 موظفين",
      "ذكاء اصطناعي متقدم",
      "أتمتة كاملة: ترحيب، خارج الدوام، وأوقات الراحة",
      "تقارير مفصلة وسرعة الرد",
      "لحد 10 أقسام",
      "مساحة 5 جيجابايت",
      "بث جماعي: 5,000 رسالة بالشهر",
    ],
    cta: "ابدأ بالاحترافية",
  },
  {
    name: "الفائقة",
    who: "لفرق أكبر بدها تحكم كامل.",
    price: "$74",
    unit: "بالشهر",
    items: [
      "3 أرقام واتساب",
      "10 موظفين",
      "تقارير شاملة: الذكاء الاصطناعي، الموظفين، سرعة الرد، الرسائل",
      "أقسام بلا حدود",
      "مساحة 10 جيجابايت",
      "بث جماعي: 20,000 رسالة بالشهر",
      "أتمتة كاملة وربط API خارجي",
    ],
    cta: "ابدأ بالفائقة",
  },
];

export function PricingTeaser() {
  return (
    <section id="plans" aria-labelledby="pricing-title" className="border-b border-line bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader
          id="pricing-title"
          title="أسعار واضحة على قد فريقك"
          lead="حجب أرقام العملاء موجود بكل الخطط، حتى بالتجربة المجانية. ابدأ 7 أيام مجاناً، وبعدها اختار الخطة اللي بتناسبك. الأسعار بالدولار، شهرياً، وبدون رسوم ربط."
        />

        <div className="mt-10 grid overflow-hidden rounded-md border border-line-strong md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`flex flex-col p-6 ${i > 0 ? "border-t border-line" : ""} ${i === 1 ? "md:border-t-0 md:border-s" : ""} ${i === 3 ? "md:border-s" : ""} ${i >= 2 ? "xl:border-t-0 xl:border-s" : ""}`}
            >
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="mt-1 text-[14px] text-muted">{p.who}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold" dir="ltr">
                  {p.price}
                </span>
                <span className="text-[14px] text-muted">{p.unit}</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-[14px] leading-6">
                <li className="flex gap-2 font-semibold text-brand-ink">
                  <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" />
                  {maskingItem}
                </li>
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" />
                    {it}
                  </li>
                ))}
              </ul>
              <a href={site.trialHref} className={buttonClass(i === 0 ? "primary" : "secondary", "md", "mt-6")}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-md border border-line-strong p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold">الخطة المخصصة</p>
            <p className="text-[15px] text-muted">للمشاريع الكبيرة والشركات اللي إلها احتياجات خاصة. منصمّملك خطة على قدّك.</p>
          </div>
          <Link href={site.demoHref} className={buttonClass("secondary", "md", "shrink-0")}>
            احكي معنا
          </Link>
        </div>
      </Container>
    </section>
  );
}
