import { site } from "@/lib/site";

// Floating "talk to a real person" button: a human is on the other end, 24/7.
export function TalkToHuman() {
  if (!site.whatsappHref) return null;
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener"
      className="fixed bottom-4 end-4 z-40 flex items-center gap-2 rounded-full border border-line-strong bg-surface py-2 ps-2 pe-4 text-[14px] font-semibold text-ink hover:border-brand"
    >
      <span className="relative grid size-8 place-items-center rounded-full bg-brand font-display text-on-brand" aria-hidden>
        د
        <span className="absolute -bottom-0.5 -end-0.5 size-2.5 rounded-full border-2 border-surface bg-[#25D366]" />
      </span>
      <span>
        احكي مع إنسان
        <span className="hidden text-[12px] font-normal text-muted sm:block">فريقنا بيرد عليك 24/7</span>
      </span>
    </a>
  );
}
