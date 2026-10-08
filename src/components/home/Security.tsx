import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Phone } from "@/components/demo/Phone";

const controls = [
  { title: "رقم العميل محجوب", text: "الموظف بيشوف أول رقمين وآخر رقمين بس، بقائمة المحادثات وبراس المحادثة." },
  { title: "الكشف للإدارة بس", text: "الرقم الكامل بيظهر لصاحب الصلاحية، مش لكل الفريق." },
  { title: "سجل نشاط", text: "كل كشف رقم موثّق: مين كشفه، وأمتى." },
  { title: "بياناتك عندك", text: "ما منخزّن محادثاتك أو ملفاتك عندنا. كل شي بمساحة شركتك الخاصة، مش على جوال حدا." },
];

const log = [
  { who: "المدير", what: "كشف رقم العميل", num: "0591234789", time: "4:12 م" },
  { who: "سارة", what: "استلمت محادثة #1042", time: "4:03 م" },
  { who: "أحمد", what: "حوّل رسالة لمهمة", time: "3:47 م" },
  { who: "ليان", what: "أغلقت تذكرة #1039", time: "3:20 م" },
];

export function Security() {
  return (
    <section aria-labelledby="security-title" className="border-b border-line py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeader
            id="security-title"
            title="بيانات عملائك بتضل بالشركة"
            align="start"
            lead="الأمان بديرلي مش إعداد إضافي بتفعّله. هو الأساس اللي انبنت عليه المنصة."
          />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {controls.map((c) => (
              <li key={c.title} className="grid grid-cols-[auto_1fr] gap-x-3 py-4">
                <Icon name="lock" size={18} className="mt-1 text-brand-ink" />
                <div>
                  <h3 className="text-base font-bold">{c.title}</h3>
                  <p className="mt-0.5 text-[16px] leading-8 text-ink/70">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/security" className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-ink hover:underline">
            كل تفاصيل الأمان
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        <figure className="self-center">
          <div className="overflow-hidden rounded-md border border-line-strong bg-surface text-[13px]">
            <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2 text-[12px] text-muted">
              <span className="font-display font-bold text-ink">ديرلي · سجل النشاط</span>
              <span>اليوم</span>
            </div>
            <ol className="divide-y divide-line">
              {log.map((l) => (
                <li key={l.what} className="flex items-center justify-between gap-3 px-4 py-3">
                  <p>
                    <span className="font-semibold">{l.who}</span> {l.what}
                    {l.num && (
                      <>
                        {" "}
                        <Phone value={l.num} masked />
                      </>
                    )}
                  </p>
                  <span className="shrink-0 text-[12px] text-muted">{l.time}</span>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className="mt-3 text-[13px] text-muted">مثال توضيحي.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
