// Checkmark used in every feature list (Bitrix-style ✓ lists instead of dots).
export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`mt-1.5 shrink-0 text-brand ${className}`}
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

// List items read as fragments, so a trailing full stop is dropped.
export const fragment = (it: React.ReactNode) => (typeof it === "string" ? it.replace(/[.。]\s*$/, "") : it);

// A checklist of short, concrete items.
export function CheckList({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-[17px] leading-8">
          <Check />
          <span>{fragment(it)}</span>
        </li>
      ))}
    </ul>
  );
}
