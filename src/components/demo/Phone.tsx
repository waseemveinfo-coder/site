import type { ReactNode } from "react";

// Shared phone-number masking for every illustrative UI on the site.
// Product rule: keep the first 2 and last 2 digits, hide the rest.

const NUMBER_IN_TEXT = /(0\d{9})/;

export function mask(n: string) {
  return n.slice(0, 2) + "•".repeat(n.length - 4) + n.slice(-2);
}

export function Phone({ value, masked }: { value: string; masked: boolean }) {
  if (!masked) {
    return (
      <bdi dir="ltr" className="font-mono text-[0.95em] tracking-wide whitespace-nowrap">
        {value}
      </bdi>
    );
  }
  return (
    <bdi dir="ltr" className="font-mono text-[0.95em] tracking-wide whitespace-nowrap">
      {/* Mounts fresh each time the number becomes masked, so the sweep replays */}
      <span className="redact" aria-label={`رقم محجوب، يبدأ بـ ${value.slice(0, 2)} وينتهي بـ ${value.slice(-2)}`}>
        <span aria-hidden>{mask(value)}</span>
      </span>
    </bdi>
  );
}

// Splits message text so any phone number inside it gets masked too.
export function MessageText({ text, masked }: { text: string; masked: boolean }): ReactNode {
  return text
    .split(NUMBER_IN_TEXT)
    .map((part, i) => (NUMBER_IN_TEXT.test(part) ? <Phone key={i} value={part} masked={masked} /> : part));
}
