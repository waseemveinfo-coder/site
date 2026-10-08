import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaPair } from "@/components/ui/CtaPair";
import { footerColumns, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-invert-bg text-invert-ink">
      {/* Repeated single CTA */}
      <div className="border-b border-invert-line">
        <Container className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold sm:text-2xl">فريقك بيشتغل، وعملاؤك بيضلّوا إلك</p>
            <p className="mt-1 text-invert-muted">عندك سؤال؟ في حدا حقيقي رح يرد عليك، 24/7. أو احجز جلسة نوريك فيها ديرلي على شغلك أنت.</p>
          </div>
          <CtaPair invert />
        </Container>
      </div>

      <Container className="grid gap-10 py-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <p className="font-display text-2xl font-extrabold">{site.name}</p>
          <p className="mt-3 max-w-[30ch] text-sm leading-7 text-invert-muted">{site.description}</p>
          <ul className="mt-5 space-y-2 text-[15px]">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="hover:underline" dir="ltr">
                  {site.email}
                </a>
              </li>
            )}
            {site.whatsappHref && (
              <li>
                <a href={site.whatsappHref} className="hover:underline">
                  الدعم على واتساب (24/7): <bdi dir="ltr">{site.whatsappDisplay}</bdi>
                </a>
              </li>
            )}
          </ul>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-display text-sm font-semibold text-invert-muted">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-invert-ink hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-invert-line">
        <Container className="flex flex-col gap-2 py-5 text-sm text-invert-muted sm:flex-row sm:justify-between">
          <p>© {year} {site.name} ({site.latinName}). جميع الحقوق محفوظة.</p>
          <p>{site.tagline}</p>
        </Container>
        {/* Trademark disclaimer, carried over from the current derlly.com */}
        <Container className="pb-6 text-[12px] leading-6 text-invert-muted">
          <p>
            ديرلي منصة مستقلة لإدارة علاقات العملاء، وما إلها علاقة بشركة WhatsApp Inc. أو Meta Platforms, Inc.، ولا معتمدة
            منهم. اسم «واتساب» مستعمل للتوضيح بس.
          </p>
        </Container>
      </div>
    </footer>
  );
}
