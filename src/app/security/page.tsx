import type { Metadata } from "next";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { PrivacyView } from "@/components/home/featureViews";
import { Security } from "@/components/home/Security";
import { Faq, faqs } from "@/components/home/Faq";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaPair } from "@/components/ui/CtaPair";

// Technical list comes from the current derlly.com privacy policy and FAQ.
// Still unconfirmed (keep off): hosting location, backups, 2FA, IP limits.

const tech = [
  { title: "كلمات المرور", text: "مشفّرة بـ bcrypt." },
  { title: "الجلسات", text: "محمية بـ JWT." },
  { title: "الهجمات", text: "حماية من هجمات DDoS ومن محاولات تخمين كلمات المرور." },
  { title: "الملفات", text: "بمساحة تخزين خاصة بشركتك، مشفّرة، وأنواع وأحجام الملفات محدودة." },
];

export const metadata: Metadata = {
  title: "الأمان والخصوصية",
  description:
    "كيف بتحمي ديرلي بيانات عملائك: أرقام العملاء محجوبة عن الموظفين، الرقم الكامل للإدارة بس، سجل نشاط، وملفات محفوظة باسم الشركة.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الأمان والخصوصية" }]} />
      <StoryHero
        story="تسريب العملاء ما بيحتاج هكر. بيكفي موظف عنده أرقامهم على جواله."
        title="أمان بيانات عملائك بديرلي"
        lead={
          <p>
            ديرلي انبنت على فكرة وحدة: الموظف بيشتغل مع العميل، بدون ما يملك بياناته. كل شي تاني بالمنصة مبني فوق هالفكرة.
          </p>
        }
        points={[
          "رقم العميل محجوب عن الموظف.",
          "الرقم الكامل لصاحب الصلاحية بس.",
          "كل كشف للرقم موثّق بالاسم والوقت.",
        ]}
        actions={<CtaPair />}
        visual={<PrivacyView />}
        caption="مثال توضيحي. الأرقام غير حقيقية."
      />
      <Security />
      <section aria-labelledby="tech-title" className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeader id="tech-title" title="الحماية التقنية" />
          <dl className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((t) => (
              <div key={t.title} className="border-b border-line py-5 sm:pe-6 lg:border-b-0 lg:border-e lg:px-6 lg:first:ps-0 lg:last:border-e-0">
                <dt className="font-display text-lg font-bold">{t.title}</dt>
                <dd className="mt-1 text-[16px] leading-8 text-ink/70">{t.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <Faq items={faqs.slice(1, 4)} title="أسئلة عن الأمان" />
    </>
  );
}
