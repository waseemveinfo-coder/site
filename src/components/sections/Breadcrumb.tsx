import Link from "next/link";
import { Container } from "@/components/ui/Container";

// Trail of {label, href?}; the last item is the current page.
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="مسار التصفح" className="border-b border-line bg-surface">
      <Container className="py-2.5 text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink hover:underline">
              الرئيسية
            </Link>
          </li>
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {it.label}
                  </span>
                ) : it.href ? (
                  <Link href={it.href} className="hover:text-ink hover:underline">
                    {it.label}
                  </Link>
                ) : (
                  <span>{it.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
