import type { Metadata } from "next";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Steps } from "@/components/sections/Steps";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { Faq } from "@/components/home/Faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "الأسعار والخطط",
  description:
    "خطط ديرلي من 15 دولار بالشهر، مع تجربة مجانية 7 أيام وبدون رسوم ربط. أرقام واتساب، موظفين، ذكاء اصطناعي، بث جماعي، وتقارير حسب الخطة.",
  alternates: { canonical: "/pricing" },
};

const steps = [
  { title: "ابدأ التجربة", text: "7 أيام مجاناً، على شغلك الحقيقي." },
  { title: "اختار خطتك", text: "حسب عدد موظفينك وأرقام الواتساب اللي بدك تربطها." },
  { title: "احتجت أكتر؟", text: "منعملك خطة مخصصة على قد شركتك." },
];

// Answers taken from the current derlly.com terms, refund and FAQ.
const pricingFaqs = [
  {
    q: "في رسوم مخفية أو رسوم ربط؟",
    a: "لا. التجربة مجانية، والدفع شهري، وكل شي واضح من الأول.",
  },
  {
    q: "حجب الأرقام موجود بكل الخطط؟",
    a: "إي. حجب أرقام العملاء عن الموظفين موجود بكل الخطط، حتى بالتجربة المجانية.",
  },
  {
    q: "كم رقم واتساب بقدر اربط؟",
    a: "حسب الخطة: رقم بالتجربة، رقمين بالاحترافية، و3 بالفائقة. وكل رقم بيشتغل لحاله.",
  },
  {
    q: "كيف بدفع؟",
    a: "عن طريق بوابة دفع إلكترونية آمنة، وبيتفعّل حسابك فوراً بعد الدفع.",
  },
  {
    q: "شو الفرق بين الربط الرسمي والربط بـ QR؟",
    a: "الربط الرسمي عن طريق WhatsApp Business API، وهو المنصح فيه للشركات وللرسائل الجماعية. الربط بـ QR أسرع للبداية، متل واتساب ويب.",
  },
  {
    q: "بقدر ألغي وقت ما بدي؟",
    a: "إي. بتلغي تجديد الاشتراك من لوحة التحكم بأي وقت، وما بينسحب منك شي بالفترات اللي بعدها.",
  },
  {
    q: "شو سياسة الاسترداد؟",
    a: "الاسترداد متاح بأول 7 أيام من أول اشتراك، إذا في مشكلة تقنية بتمنعك من الاستعمال وما قدر فريق الدعم يحلها خلال 48 ساعة. التفاصيل بصفحة سياسة الإلغاء والاسترداد.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الأسعار" }]} />
      <StoryHero
        story="ما منحب نبيعك خطة أكبر من حاجتك. مكتب فيه تلات موظفين غير شركة فيها خمسين."
        title="أسعار ديرلي"
        lead={<p>ابدأ بتجربة مجانية 7 أيام، وبعدها اختار الخطة اللي بتناسب عدد موظفينك وأرقامك. بدون رسوم ربط، وبدون مفاجآت.</p>}
        actions={
          <>
            <a href={site.trialHref} className={buttonClass("primary")}>
              ابدأ تجربتك المجانية
            </a>
            <ButtonLink href="#plans" variant="secondary">
              شوف الخطط
            </ButtonLink>
          </>
        }
      />
      <PricingTeaser />
      <section aria-labelledby="quote-title" className="border-b border-line py-14 sm:py-20">
        <Container>
          <SectionHeader id="quote-title" title="كيف بتبلّش مع ديرلي" />
          <Steps steps={steps} />
        </Container>
      </section>
      <Faq items={pricingFaqs} title="أسئلة عن الأسعار" />
    </>
  );
}
