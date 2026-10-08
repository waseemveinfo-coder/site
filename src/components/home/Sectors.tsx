"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { CheckList } from "@/components/ui/Check";
import { Icon } from "@/components/ui/Icon";
import { solutions } from "@/lib/solutions";

// "Something for every team": one tab per sector, each with a photo,
// the sector's headline, four concrete wins and a link to its page.
export function Sectors({ as = "h2" }: { as?: "h1" | "h2" }) {
  const [active, setActive] = useState(0);
  const s = solutions[active];

  return (
    <section aria-labelledby="sectors-title" className="border-b border-line bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader
          id="sectors-title"
          as={as}
          title="ديرلي لكل شركة عندها فريق بيحكي مع عملاء"
          lead="اختار قطاعك، وشوف كيف بيتغيّر يوم الشغل عندك."
        />

        <div role="tablist" aria-label="القطاعات" className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:justify-center">
          {solutions.map((x, i) => (
            <button
              key={x.slug}
              role="tab"
              type="button"
              id={`sector-tab-${x.slug}`}
              aria-selected={i === active}
              aria-controls="sector-panel"
              onClick={() => setActive(i)}
              className="shrink-0 rounded-full border border-line-strong px-4 py-2 text-[15px] font-semibold whitespace-nowrap text-ink/75 transition-colors hover:border-ink hover:text-ink aria-selected:border-ink aria-selected:bg-ink aria-selected:text-bg"
            >
              {x.name}
            </button>
          ))}
        </div>

        <div
          key={s.slug}
          id="sector-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${s.slug}`}
          className="msg-in mt-8 grid items-center gap-8 rounded-md border border-line bg-bg p-5 sm:p-8 lg:grid-cols-2 lg:gap-12"
        >
          {s.photo ? <Photo name={s.photo} /> : <div className="aspect-[3/2] rounded-md bg-surface-2" />}
          <div>
            <h3 className="text-[1.5rem] leading-[1.5] font-bold sm:text-[1.75rem]">{s.hero.title}</h3>
            <p className="mt-3 text-[17px] leading-8 text-ink/75">{s.hero.story}</p>
            <CheckList className="mt-5" items={s.compare.map((c) => c.with)} />
            <Link
              href={`/solutions/${s.slug}`}
              className="mt-7 inline-flex items-center gap-1.5 text-[16px] font-semibold text-brand-ink hover:underline"
            >
              شوف حل {s.name}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
