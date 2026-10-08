import { StoryHero } from "@/components/sections/StoryHero";
import { Steps } from "@/components/sections/Steps";
import { ConnectionOptions } from "@/components/sections/ConnectionOptions";
import { PrivacyDemo } from "@/components/demo/PrivacyDemo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
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
    text: "على رقم شركتك، من تطبيقه العادي. ما بيحمّل شي وما بيتغيّر عليه شي.",
  },
  {
    title: "ديرلي بتستلم وبتوزّع",
    text: "كل رسالة بتوصل لصندوق واحد، وبتنسلّم للموظف المسؤول عنها.",
  },
  {
    title: "الموظف بيرد والرقم مخفي",
    text: "بيشوف أول رقمين وآخر رقمين بس، حتى لو العميل كتب رقم جوّا الرسالة.",
  },
  {
    title: "الإدارة بتشوف كل شي",
    text: "المحادثات كاملة، والأرقام كاملة، ومين ردّ على مين وأمتى.",
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
            حتى لو الموظف راح.
          </>
        }
        lead={
          <p>
            العميل بيحكي مع شركتك على واتساب متل كل يوم. موظفك بيرد عليه من جوّا ديرلي، والرقم قدّامه هيك: {masked}.
            بيخدمه وبيتابعه وبيبيعه، بس ما بياخد رقمه معه.
          </p>
        }
        points={[
          "ما في تطبيق جديد للعميل. واتساب نفسه، ورقم شركتك نفسه.",
          "حتى لو الرقم انكتب جوّا نص الرسالة، بينحجب.",
          "الرقم الكامل بيظهر للإدارة بس.",
        ]}
        actions={
          <>
            <ButtonLink href={site.demoHref}>{site.demoLabel}</ButtonLink>
            <ButtonLink href="#how" variant="secondary">
              كيف بيشتغل
            </ButtonLink>
          </>
        }
        visual={<PrivacyDemo />}
        caption="مثال توضيحي. الأسماء والأرقام غير حقيقية."
      />

      <section id="how" aria-labelledby="how-title" className="py-14 sm:py-20">
        <Container>
          <p className="text-sm font-semibold text-brand-ink">كيف بيشتغل</p>
          <h2 id="how-title" className="mt-2 max-w-[24ch] text-2xl font-extrabold sm:text-4xl">
            واتساب من جهة العميل، وديرلي من جهة فريقك.
          </h2>

          <Steps steps={steps} />
          <ConnectionOptions />
        </Container>
      </section>

      <PeopleBand />
      <MaskSpotlight />
      <FeatureExplorer />
      <Sectors />
      <Security />
      <PricingTeaser />
      <TeamNote />
      <Faq />
    </>
  );
}
