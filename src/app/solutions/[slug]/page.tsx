import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryHero } from "@/components/sections/StoryHero";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectorInbox } from "@/components/home/featureViews";
import { getSolution, solutions } from "@/lib/solutions";
import { productLinks, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/solutions/${s.slug}` },
  };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const others = solutions.filter((x) => x.slug !== s.slug);

  return (
    <>
      <Breadcrumb items={[{ label: "الحلول", href: "/solutions" }, { label: s.name }]} />

      <StoryHero
        story={s.hero.story}
        title={s.hero.title}
        lead={<p>{s.hero.lead}</p>}
        points={s.hero.points}
        actions={
          <>
            <ButtonLink href={site.demoHref}>{site.demoLabel}</ButtonLink>
            <ButtonLink href="#compare" variant="secondary">
              شو بيتغيّر
            </ButtonLink>
          </>
        }
        visual={<SectorInbox title={s.inbox.title} rows={s.inbox.rows} />}
        caption="مثال توضيحي. الأسماء والأرقام غير حقيقية."
      />

      {/* Before / after, row by row */}
      <section id="compare" aria-labelledby="compare-title" className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className={s.photo ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-14" : ""}>
            <SectionHeader id="compare-title" kicker={s.name} title="يوم الشغل، قبل ديرلي وبعدها." />
            {s.photo && <Photo name={s.photo} />}
          </div>
          <div className="mt-10 overflow-hidden rounded-md border border-line-strong bg-surface">
            <div className="hidden grid-cols-2 border-b border-line bg-surface-2 text-[13px] font-semibold sm:grid">
              <p className="px-5 py-3 text-muted">بدون ديرلي</p>
              <p className="border-s border-line px-5 py-3 text-brand-ink">مع ديرلي</p>
            </div>
            {s.compare.map((c) => (
              <div key={c.without} className="grid border-b border-line last:border-b-0 sm:grid-cols-2">
                <p className="px-5 py-4 text-[15px] leading-7 text-muted">
                  <span className="mb-1 block text-[12px] font-semibold sm:hidden">بدون ديرلي</span>
                  {c.without}
                </p>
                <p className="border-t border-line px-5 py-4 text-[15px] leading-7 sm:border-s sm:border-t-0">
                  <span className="mb-1 block text-[12px] font-semibold text-brand-ink sm:hidden">مع ديرلي</span>
                  {c.with}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="tools-title" className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeader id="tools-title" kicker="الأدوات" title={`اللي بيفرق مع ${s.name}.`} />
          <ul className="mt-10 grid border-t border-line md:grid-cols-2">
            {s.features.map((f, i) => {
              const link = productLinks.find((l) => l.href === `/product/${f.slug}`);
              if (!link) return null;
              return (
                <li key={f.slug} className={`border-b border-line ${i % 2 === 0 ? "md:border-e md:pe-8" : "md:ps-8"}`}>
                  <Link href={link.href} className="group grid grid-cols-[auto_1fr] gap-x-4 py-6">
                    <span className="mt-1 grid size-10 place-items-center rounded-md border border-line text-brand-ink group-hover:border-brand">
                      {link.icon && <Icon name={link.icon} />}
                    </span>
                    <span>
                      <span className="flex items-center gap-1 font-display text-lg font-bold group-hover:text-brand-ink">
                        {link.label}
                        <Icon name="arrow" size={16} />
                      </span>
                      <span className="mt-1 block text-[15px] leading-7 text-muted">{f.line}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="others-title" className="py-14 sm:py-16">
        <Container>
          <h2 id="others-title" className="text-xl font-extrabold sm:text-2xl">
            قطاعات تانية
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/solutions/${o.slug}`}
                  className="inline-flex rounded-md border border-line bg-surface px-4 py-2 text-[15px] font-medium hover:border-ink"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
