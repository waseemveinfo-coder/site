import type { Metadata } from "next";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { CheckList } from "@/components/ui/Check";

export const metadata: Metadata = {
  title: "المدوّنة",
  description: "أفكار عملية لإدارة فريق المبيعات وخدمة العملاء على واتساب، وحماية بيانات عملائك.",
  alternates: { canonical: "/blog" },
};

// Planned topics only. Real posts replace this list as they're published.
const topics = [
  "كيف بتحمي قائمة عملائك لما موظف يترك الشغل",
  "رقم واحد للشركة وعشرة موظفين: كيف بتنظّمهم",
  "شو لازم تقيس بفريق المبيعات كل شهر",
  "الرد الآلي: شو بيعمل منيح، وشو لازم يضل للبشر",
  "الرسائل الجماعية على واتساب بدون ما تزعج عملاءك",
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "المدوّنة" }]} />
      <StoryHero
        story="منشتغل كل يوم مع فرق بتحكي مع عملائها على واتساب. اللي منتعلّمه منهم، منكتبه هون."
        title="أفكار عملية من شغل حقيقي مع فرق المبيعات"
        lead={<p>مقالات قصيرة عن إدارة الفرق وخدمة العملاء وحماية البيانات. أول المقالات قريباً.</p>}
      />
      <section aria-labelledby="soon-title" className="py-14 sm:py-20">
        <Container>
          <h2 id="soon-title" className="text-2xl font-bold sm:text-3xl">
            عم نكتب عن
          </h2>
          <CheckList className="mt-8" items={topics} />
        </Container>
      </section>
    </>
  );
}
