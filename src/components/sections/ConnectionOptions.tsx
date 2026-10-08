// The two ways to connect a WhatsApp number (confirmed by the owner):
// the official WhatsApp Business API (recommended) and a quick QR link.
const options = [
  {
    name: "الربط الرسمي",
    tag: "منصح فيه",
    via: "WhatsApp Business API",
    text: "ربط رسمي 100% عن طريق واتساب. الأنسب للشركات وللرسائل الجماعية، والأأمن على رقمك.",
    recommended: true,
  },
  {
    name: "الربط السريع",
    tag: "للبداية",
    via: "رمز QR",
    text: "بتمسح رمز QR متل واتساب ويب، وبتبلّش بدقايق. مناسب للتجربة، والأفضل تنتقل للربط الرسمي لما يكبر شغلك.",
    recommended: false,
  },
];

export function ConnectionOptions() {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold">طريقتين لربط رقمك</h3>
      <div className="mt-4 grid overflow-hidden rounded-md border border-line-strong bg-surface md:grid-cols-2">
        {options.map((o, i) => (
          <div key={o.name} className={`p-5 ${i > 0 ? "border-t border-line md:border-t-0 md:border-s" : ""}`}>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-lg font-bold">{o.name}</p>
              <span
                className={`rounded-[4px] px-2 py-0.5 text-[11px] font-semibold ${o.recommended ? "bg-brand-tint text-brand-ink" : "bg-surface-2 text-muted"}`}
              >
                {o.tag}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-muted" dir="auto">
              {o.via}
            </p>
            <p className="mt-3 text-[15px] leading-7 text-muted">{o.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
