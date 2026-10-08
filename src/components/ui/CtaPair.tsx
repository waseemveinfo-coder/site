import Link from "next/link";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { site } from "@/lib/site";

// The one call to action used across the site: start the free trial,
// or ask for a guided demo.
export function CtaPair({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={site.trialHref} className={buttonClass("primary", "lg")}>
        {site.trialLabel}
        <span className="font-sans text-[13px] font-normal opacity-85">· 7 أيام</span>
      </a>
      {invert ? (
        <Link
          href={site.demoHref}
          className="inline-flex h-12 items-center rounded-md border border-invert-line px-6 font-display text-base font-semibold text-invert-ink hover:border-invert-ink"
        >
          {site.demoLabel}
        </Link>
      ) : (
        <ButtonLink href={site.demoHref} variant="secondary" size="lg">
          {site.demoLabel}
        </ButtonLink>
      )}
    </div>
  );
}
