import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

// Every page opens with one of these: a short story line, the claim, and a
// real product view beside it. Text sits at the reading start (right in RTL);
// the visual sits at the end, never centered.
export function StoryHero({
  story,
  title,
  lead,
  points,
  actions,
  visual,
  caption,
}: {
  story: string;
  title: ReactNode;
  lead: ReactNode;
  points?: ReactNode[];
  actions?: ReactNode;
  visual?: ReactNode;
  caption?: string;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <Container className={`grid items-start gap-10 py-10 sm:py-14 lg:gap-14 lg:py-20 ${visual ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]" : ""}`}>
        <div className={visual ? "lg:pt-6" : "max-w-[760px]"}>
          <p className="hero-in border-s-2 border-brand ps-3 text-[15px] leading-7 text-muted" style={{ "--i": 0 } as CSSProperties}>
            {story}
          </p>
          <h1 style={{ "--i": 1 } as CSSProperties} className="hero-in mt-5 text-[2rem] leading-[1.3] font-extrabold sm:text-5xl sm:leading-[1.25] lg:text-[2.35rem] xl:text-[2.5rem]">{title}</h1>
          <div style={{ "--i": 2 } as CSSProperties} className="hero-in mt-5 max-w-[54ch] text-[17px] leading-8 text-muted">
            {lead}
          </div>

          {points && (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {points.map((p, i) => (
                <li key={i} style={{ "--i": 3 + i } as CSSProperties} className="hero-in flex gap-3 py-3 text-[15px] leading-7">
                  <span aria-hidden className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {actions && (
            <div style={{ "--i": 3 + (points?.length ?? 0) } as CSSProperties} className="hero-in mt-8 flex flex-wrap gap-3">
              {actions}
            </div>
          )}
        </div>

        {visual && (
          <figure className="hero-visual min-w-0">
            {visual}
            {caption && <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>}
          </figure>
        )}
      </Container>
    </section>
  );
}
