import type { Metadata } from "next";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { DemoForm } from "./DemoForm";

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
    </>
  );
}
