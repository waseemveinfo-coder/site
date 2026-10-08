import type { Metadata } from "next";
import Link from "next/link";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Steps } from "@/components/sections/Steps";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { SupportView } from "@/components/home/featureViews";
import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "الدعم الفني",
  description: "فريق دعم ديرلي متواجد 24/7 على واتساب والإيميل: بيساعدك بالإعداد وتدريب فريقك، وبيضل معك بعد الإطلاق.",
  alternates: { canonical: "/support" },
};

const steps = [
  { title: "الإعداد", text: "منجهّز حسابك وموظفينك معك، ومنتأكد إن الأرقام محجوبة قبل ما يبلّشوا." },
  { title: "تدريب الفريق", text: "منشرح لفريقك كيف يشتغل من ديرلي بدل جواله." },
  { title: "بعد الإطلاق", text: "أي سؤال أو مشكلة، فريقنا موجود 24/7." },
];

export default function SupportPage() {
  const channels = [
    site.whatsappHref && { label: "واتساب الدعم", href: site.whatsappHref },
    site.email && { label: site.email, href: `mailto:${site.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <Breadcrumb items={[{ label: "الدعم الفني" }]} />
      <StoryHero
        story="أول أسبوع مع أي نظام جديد هو الأصعب. ما رح تكون لحالك فيه."
        title="دعم فني بالعربي، 24/7"
        lead={<p>منساعدك بالإعداد وبتدريب فريقك، ومنضل معك بعد الإطلاق. بالعربي، 24/7، ومن ناس بيعرفوا ديرلي من جوّا.</p>}
        points={["دعم 24/7، كل أيام الأسبوع.", "على واتساب وعلى الإيميل.", "مساعدة بالإعداد وتدريب الفريق."]}
        actions={<ButtonLink href="/help">مركز المساعدة</ButtonLink>}
        visual={<SupportView />}
        caption="مثال توضيحي."
      />
      <section aria-labelledby="support-how" className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <SectionHeader id="support-how" title="شو منعمل معك" align="start" lead="فريق دعم بيعرف ديرلي من جوّا، ومتواجد 24/7 على واتساب والإيميل." />
            <Photo name="support" />
          </div>
          <Steps steps={steps} />
        </Container>
      </section>
      <section aria-labelledby="support-contact" className="py-14 sm:py-16">
        <Container>
          <h2 id="support-contact" className="text-xl font-bold sm:text-2xl">
            تواصل مع الدعم
          </h2>
          {channels.length ? (
            <ul className="mt-5 flex flex-wrap gap-3">
              {channels.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="inline-flex rounded-md border border-line bg-surface px-4 py-2.5 font-medium hover:border-ink">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[16px] leading-8 text-muted">
              لسّا مش عميل؟{" "}
              <Link href={site.demoHref} className="font-semibold text-brand-ink hover:underline">
                اطلب عرض تجريبي
              </Link>{" "}
              ومنوريك كيف بيكون الدعم معك.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
