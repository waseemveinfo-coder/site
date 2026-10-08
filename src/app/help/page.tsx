import type { Metadata } from "next";
import Link from "next/link";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Faq, faqs } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "مركز المساعدة",
  description: "شروحات خطوة بخطوة لاستعمال ديرلي: البداية، المحادثات والتذاكر، السرية، التقارير، المسارات والبوت.",
  alternates: { canonical: "/help" },
};

// Topics are the planned structure; articles get linked as they're written.
const topics: { icon: IconName; title: string; text: string; href?: string }[] = [
  { icon: "users", title: "البداية", text: "ربط رقم الشركة (رسمي أو QR)، وإضافة الموظفين، وأول محادثة." },
  { icon: "ticket", title: "المحادثات والتذاكر", text: "استلام المحادثات وتوزيعها ومتابعتها لآخرها." },
  { icon: "shield", title: "السرية وكشف الأرقام", text: "كيف بينحجب الرقم، ومين بيقدر يكشفه.", href: "/product/privacy" },
  { icon: "chart", title: "التقارير", text: "قراءة التقارير الشهرية وأداء الفريق." },
  { icon: "flow", title: "المسارات والرد الآلي", text: "بناء قواعد تلقائية، وتدريب البوت على بياناتك." },
  { icon: "broadcast", title: "الرسائل الجماعية", text: "تجهيز القوائم وإرسال الرسائل بالطريقة الصحيحة." },
];

export default function HelpPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "مركز المساعدة" }]} />
      <StoryHero
        story="كل سؤال بيوصلنا من عميل، بنكتب جوابه هون، كرمال العميل اللي بعده ما يحتاج يسأل."
        title="كيف بتعمل أي شي بديرلي."
        lead={<p>شروحات قصيرة وواضحة، مرتبة حسب الموضوع. وإذا ما لقيت جوابك، فريق الدعم موجود.</p>}
      />
      <section aria-labelledby="topics-title" className="border-b border-line py-14 sm:py-20">
        <Container>
          <h2 id="topics-title" className="text-2xl font-extrabold sm:text-3xl">
            المواضيع
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => {
              const body = (
                <>
                  <Icon name={t.icon} className="text-brand-ink" />
                  <span className="mt-3 block font-display text-lg font-bold">{t.title}</span>
                  <span className="mt-1 block text-[15px] leading-7 text-muted">{t.text}</span>
                  <span className="mt-3 block text-[13px] text-muted">{t.href ? "اقرأ أكتر" : "الشروحات قيد الكتابة"}</span>
                </>
              );
              return (
                <li key={t.title} className="bg-surface">
                  {t.href ? (
                    <Link href={t.href} className="block h-full p-5 hover:bg-surface-2">
                      {body}
                    </Link>
                  ) : (
                    <div className="h-full p-5">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-[15px] text-muted">
            ما لقيت جوابك؟{" "}
            <Link href="/support" className="font-semibold text-brand-ink hover:underline">
              تواصل مع الدعم الفني
            </Link>
          </p>
        </Container>
      </section>
      <Faq items={faqs} title="أكتر الأسئلة تكراراً." />
    </>
  );
}
