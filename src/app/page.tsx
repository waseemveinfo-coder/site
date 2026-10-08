import { StoryHero } from "@/components/sections/StoryHero";
import { Steps } from "@/components/sections/Steps";
import { ConnectionOptions } from "@/components/sections/ConnectionOptions";
import { PrivacyDemo } from "@/components/demo/PrivacyDemo";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaPair } from "@/components/ui/CtaPair";
import { MaskSpotlight } from "@/components/home/MaskSpotlight";
import { PeopleBand } from "@/components/home/PeopleBand";
import { TeamNote } from "@/components/home/TeamNote";
import { FeatureExplorer } from "@/components/home/FeatureExplorer";
import { Sectors } from "@/components/home/Sectors";
import { Security } from "@/components/home/Security";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { Faq } from "@/components/home/Faq";

const masked = (
  <bdi dir="ltr" className="font-mono whitespace-nowrap text-ink">
    05••••••89
  </bdi>
);

const steps = [
  {
    title: "العميل بيراسلك على واتساب",
    text: "على رقم شركتك ومن تطبيقه العادي، بدون ما يحمّل أي شي",
  },
  {
    title: "ديرلي بتستلم الرسالة",
    text: "كل الرسائل بصندوق واحد، وكل رسالة بتنسلّم للموظف المسؤول",
  },
  {
    title: "الموظف بيرد والرقم محجوب",
    text: "بيشوف أول رقمين وآخر رقمين بس، بكل مكان بالمنصة",
  },
  {
    title: "المدير بيشوف كل شي",
    text: "المحادثات كاملة، والأرقام كاملة، ومين ردّ على مين وأمتى",
  },
];

export default function Home() {
  return (
    <>
      <StoryHero
        story="بكل شركة في قصة بتتكرر: موظف بيترك الشغل، وبياخد معه مئات أرقام العملاء على جواله. ديرلي انبنت لتسكّر هالباب."
        title={
          <>
            عميلك بيضلّ عميلك،
            <br />
            حتى لو الموظف راح
          </>
        }
        lead={
          <p>
            العميل بيحكي مع شركتك على واتساب متل كل يوم، وموظفك بيرد عليه من جوّا ديرلي والرقم قدّامه هيك: {masked}
          </p>
        }
        points={["واتساب نفسه ورقم شركتك نفسه، بدون تطبيق جديد للعميل", "الرقم محجوب عن الموظف بكل مكان", "الرقم الكامل والمحادثات كاملة عند الإدارة"]}
        actions={<CtaPair />}
        visual={<PrivacyDemo />}
        caption="مثال توضيحي. الأسماء والأرقام غير حقيقية."
      />

      <FeatureExplorer />

      <section id="how" aria-labelledby="how-title" className="border-b border-line py-14 sm:py-20">
        <Container>
          <SectionHeader
            id="how-title"
            title="كيف بيشتغل ديرلي"
            lead="العميل على واتساب، وفريقك على ديرلي، والإدارة شايفة الصورة كاملة."
          />
          <Steps steps={steps} />
          <ConnectionOptions />
        </Container>
      </section>

      <MaskSpotlight />
      <Sectors />
      <PeopleBand />
      <Security />
      <PricingTeaser />
      <TeamNote />
      <Faq />
    </>
  );
}
