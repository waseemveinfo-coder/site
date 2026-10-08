import type { Metadata } from "next";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { DemoForm } from "./DemoForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { CheckList } from "@/components/ui/Check";

export const metadata: Metadata = {
  title: "اطلب عرضاً تجريبياً",
  description: "جلسة مع فريق ديرلي منوريك فيها كيف بتحمي أرقام عملائك وبتنظّم شغل فريقك على واتساب، بأمثلة من قطاعك.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "اطلب عرضاً تجريبياً" }]} />
      <StoryHero
        story="ما رح نعرضلك شرائح عامة. رح نقعد معك، نفهم شغلك، ونوريك ديرلي كأنها شغّالة عندك من سنة."
        title="شوف ديرلي على شغلك أنت"
        lead={<p>عبّي النموذج وابعته على واتساب، ومنرجعلك لنتفق على موعد. بالجلسة منمشي معك خطوة بخطوة بأمثلة من قطاعك.</p>}
        points={[
          "منفهم فريقك وطريقة شغلك.",
          "منوريك كيف بينحجب الرقم عند موظفينك، على محادثة متل محادثاتك.",
          "بتطلع بصورة واضحة، وبدون أي التزام.",
        ]}
        visual={<DemoForm />}
      />
      <section aria-labelledby="after-title" className="py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Photo name="demoAbaya" />
          <div>
            <SectionHeader id="after-title" align="start" title="شو بيصير بعد ما تبعت طلبك" />
            <CheckList
              className="mt-6"
              items={[
                "منرد عليك على واتساب ومنتفق على موعد يناسبك",
                "منسمع منك كيف بيشتغل فريقك مع العملاء اليوم",
                "منوريك ديرلي على محادثات متل محادثاتك",
                "إذا عجبتك، بتبلّش تجربتك المجانية بنفس اليوم",
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
