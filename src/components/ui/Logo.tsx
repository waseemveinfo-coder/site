import Link from "next/link";
import { site } from "@/lib/site";

// Text wordmark until the owner supplies the official logo files (SLOT).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`} aria-label={`${site.name}، الصفحة الرئيسية`}>
      <span aria-hidden className="grid size-8 place-items-center rounded-md bg-brand font-display text-lg font-extrabold leading-none text-on-brand">
        د
      </span>
      <span className="font-display text-xl font-extrabold leading-none text-ink">{site.name}</span>
    </Link>
  );
}
