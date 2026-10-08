import type { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { legalPages, type LegalKey } from "@/lib/legal";
import { site } from "@/lib/site";

export function legalMetadata(key: LegalKey): Metadata {
  return { title: legalPages[key].title, alternates: { canonical: `/${key}` } };
}

// Static, owner-authored HTML from src/lib/legal.ts (no user input).
export function LegalPage({ page }: { page: LegalKey }) {
  const { title, html } = legalPages[page];
  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <Container className="py-14 sm:py-20">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">آخر تحديث: {site.legalUpdated}</p>
        <div
          className="mt-10 max-w-[70ch] text-[16px] leading-8 text-muted [&_a]:font-semibold [&_a]:text-brand-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:ps-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </>
  );
}
