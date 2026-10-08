import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MessageText } from "@/components/demo/Phone";

// The flagship feature gets its own dark band: a number typed inside a
// message, shown before (what the customer wrote) and after (what reaches
// the employee). Example messages are illustrative.

const examples = [
  "هاد رقمي التاني 0597712345 احكوني عليه بعد الساعة 6",
  "المهندس اللي رح يستلم الموقع رقمه 0781234455",
];

const places = [
  { title: "بقائمة المحادثات", text: "كل محادثة بتظهر بأول رقمين وآخر رقمين." },
  { title: "براس المحادثة", text: "بيانات العميل قدّام الموظف، بدون الرقم الكامل." },
  { title: "جوّا نص الرسالة", text: "أي رقم بيكتبه العميل بالرسالة بينحجب قبل ما يوصل للموظف." },
];

export function MaskSpotlight() {
  return (
    <section aria-labelledby="mask-title" className="bg-invert-bg py-14 text-invert-ink sm:py-20">
      <Container>
        <SectionHeader
          id="mask-title"
          invert
          kicker="الميزة اللي بنينا ديرلي عشانها"
          title="الرقم بينحجب وين ما انكتب."
          lead="إخفاء الرقم من شاشة المحادثة سهل. الصعب لما العميل يكتب رقمه، أو رقم حدا تاني، جوّا الرسالة نفسها. هون ديرلي بتلقط الرقم من النص وبتحجبه قبل ما يوصل لعين الموظف."
        />

        <div className="mt-10 overflow-hidden rounded-md border border-invert-line">
          <div className="hidden grid-cols-2 border-b border-invert-line text-[13px] font-semibold text-invert-muted sm:grid">
            <p className="px-5 py-3">شو كتب العميل على واتساب</p>
            <p className="border-s border-invert-line px-5 py-3">شو وصل للموظف على ديرلي</p>
          </div>
          {examples.map((text) => (
            <div key={text} className="grid border-b border-invert-line last:border-b-0 sm:grid-cols-2">
              <div className="px-5 py-4">
                <p className="mb-1.5 text-[12px] text-invert-muted sm:hidden">شو كتب العميل</p>
                <p className="text-[15px] leading-8">
                  <MessageText text={text} masked={false} />
                </p>
              </div>
              <div className="border-t border-invert-line px-5 py-4 sm:border-s sm:border-t-0">
                <p className="mb-1.5 text-[12px] text-invert-muted sm:hidden">شو وصل للموظف</p>
                <p className="text-[15px] leading-8">
                  <MessageText text={text} masked />
                </p>
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {places.map((p) => (
            <li key={p.title} className="border-t-2 border-brand pt-4">
              <h3 className="text-base font-bold">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-7 text-invert-muted">{p.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[13px] text-invert-muted">الأمثلة توضيحية، والأرقام غير حقيقية.</p>
      </Container>
    </section>
  );
}
