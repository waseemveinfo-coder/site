import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { StoryHero } from "@/components/sections/StoryHero";
import { Steps } from "@/components/sections/Steps";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Check } from "@/components/ui/Check";
import { CtaPair } from "@/components/ui/CtaPair";
import { PrivacyDemo } from "@/components/demo/PrivacyDemo";
import {
  AiBotView,
  BroadcastView,
  ChatToTaskView,
  InternalChatView,
  OutOfHoursView,
  QuickRepliesView,
  ReportsView,
  StorageView,
  TicketsView,
  WorkflowView,
} from "@/components/home/featureViews";
import { getProduct, products, type ProductVisual } from "@/lib/products";
import { productLinks } from "@/lib/site";

const visuals: Record<ProductVisual, ComponentType> = {
  privacy: PrivacyDemo,
  tickets: TicketsView,
  task: ChatToTaskView,
  reports: ReportsView,
  workflow: WorkflowView,
  bot: AiBotView,
  storage: StorageView,
  broadcast: BroadcastView,
  "internal-chat": InternalChatView,
  "quick-replies": QuickRepliesView,
  "out-of-hours": OutOfHoursView,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: `/product/${p.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const Visual = visuals[p.visual];
  const related = p.related
    .map((s) => productLinks.find((l) => l.href === `/product/${s}`))
    .filter((l) => l !== undefined);

  return (
    <>
      <Breadcrumb items={[{ label: "المنتج" }, { label: p.name }]} />

      <StoryHero
        story={p.hero.story}
        title={p.hero.title}
        lead={<p>{p.hero.lead}</p>}
        points={p.hero.points}
        actions={<CtaPair />}
        visual={<Visual />}
        caption="مثال توضيحي. الأسماء والأرقام غير حقيقية."
      />

      {/* The why: the story behind the feature */}
      <section aria-labelledby="why-title" className="border-b border-line py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <SectionHeader id="why-title" title={p.why.title} align="start" />
          <div className="space-y-5 text-[18px] leading-[1.95] text-ink/80 lg:pt-2">
            {p.why.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Container>
      </section>

      <section id="how" aria-labelledby="how-title" className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeader id="how-title" title={`كيف بتشتغل ${p.name}`} />
          <Steps steps={p.steps} />
        </Container>
      </section>


      <section aria-labelledby="details-title" className="border-b border-line py-14 sm:py-20">
        <Container>
          <SectionHeader id="details-title" title={`${p.name} بالتفصيل`} />
          <ul className="mx-auto mt-10 grid max-w-[1000px] gap-x-12 gap-y-4 md:grid-cols-2">
            {p.details.map((d) => (
              <li key={d.title} className="flex gap-2.5 text-[17px] leading-8">
                <Check />
                <span>
                  <strong className="font-bold">{d.title}:</strong> <span className="text-ink/75">{d.text}</span>
                </span>
              </li>
            ))}
          </ul>
          {p.note && <p className="mt-6 border-s-2 border-warn ps-3 text-[16px] leading-8 text-ink/70">{p.note}</p>}
        </Container>
      </section>

      <section aria-labelledby="related-title" className="py-14 sm:py-16">
        <Container>
          <h2 id="related-title" className="text-xl font-bold sm:text-2xl">
            بيشتغل مع
          </h2>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {related.map((l) => (
              <li key={l.href} className="bg-surface">
                <Link href={l.href} className="group flex h-full gap-3 p-5 hover:bg-surface-2">
                  {l.icon && <Icon name={l.icon} className="mt-1 shrink-0 text-brand-ink" />}
                  <span>
                    <span className="flex items-center gap-1 font-display font-bold group-hover:text-brand-ink">
                      {l.label}
                      <Icon name="arrow" size={16} />
                    </span>
                    {l.desc && <span className="mt-1 block text-[16px] leading-8 text-ink/70">{l.desc}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
