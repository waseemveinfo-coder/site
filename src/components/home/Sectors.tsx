import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { solutionLinks } from "@/lib/site";

// Problem line + "with Derlly" line per sector, keyed by solution href.
const stories: Record<string, { pain: string; fix: string }> = {
  "/solutions/real-estate": {
    pain: "الوسيط بيترك المكتب، والعملاء بيلحقوه.",
    fix: "العميل بيضل يحكي مع رقم المكتب، والوسيط الجديد بيكمّل من وين وقف اللي قبله.",
  },
  "/solutions/engineering": {
    pain: "مخططات وعروض أسعار ضايعة بين جوالات المهندسين.",
    fix: "كل ملف وكل مهمة مربوطة بمحادثتها، ومحفوظة باسم الشركة.",
  },
  "/solutions/sales": {
    pain: "ما بتعرف مين عم يشتغل، ومين عم يأجّل.",
    fix: "كل عميل إله بائع مسؤول، وتقرير شهري بيوريك أداء كل واحد.",
  },
  "/solutions/clinics": {
    pain: "أرقام المرضى بين إيدين كل موظفي الاستقبال.",
    fix: "الاستقبال بيحجز وبيتابع مع المريض، ورقمه محجوب.",
  },
  "/solutions/retail": {
    pain: "نفس الأسئلة كل يوم، والرد بيتأخر.",
    fix: "البوت بيرد على المتكرر، والفريق بيتفرّغ للطلبات الحقيقية.",
  },
  "/solutions/services": {
    pain: "طلبات صيانة وتوصيل بتنتسى بين الرسائل.",
    fix: "كل طلب بيصير تذكرة أو مهمة، إلها مسؤول وموعد.",
  },
};

export function Sectors({ as = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section aria-labelledby="sectors-title" className="border-b border-line bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader
          id="sectors-title"
          as={as}
          kicker="الحلول"
          title="لكل شركة عندها فريق بيحكي مع عملاء."
          lead="المشكلة نفسها بكل قطاع: العميل بيحكي مع الموظف، والشركة بتخسره لما الموظف يمشي. الحل نفسه، بتفاصيل على قد شغلك."
        />

        <ul className="mt-10 grid border-t border-line md:grid-cols-2">
          {solutionLinks.map((s, i) => {
            const story = stories[s.href];
            return (
              <li key={s.href} className={`border-b border-line ${i % 2 === 0 ? "md:border-e md:pe-8" : "md:ps-8"}`}>
                <Link href={s.href} className="group grid grid-cols-[auto_1fr] gap-x-4 py-6">
                  <span className="mt-1 grid size-10 place-items-center rounded-md border border-line text-brand-ink group-hover:border-brand">
                    <Icon name={s.icon ?? "building"} />
                  </span>
                  <span>
                    <span className="flex items-center gap-1 font-display text-lg font-bold group-hover:text-brand-ink">
                      {s.label}
                      <Icon name="arrow" size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    {story && (
                      <>
                        <span className="mt-1.5 block text-[15px] leading-7 text-muted">{story.pain}</span>
                        <span className="mt-1 block text-[15px] leading-7">
                          <span className="font-semibold text-brand-ink">مع ديرلي: </span>
                          {story.fix}
                        </span>
                      </>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
