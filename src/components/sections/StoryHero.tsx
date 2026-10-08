import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Check, fragment } from "@/components/ui/Check";

// Every page opens with the claim, then the story behind it in plain prose,
// a short checklist, and a real product view beside it.
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
  const at = (i: number) => ({ "--i": i }) as CSSProperties;
  return (
    <section className="border-b border-line bg-surface">
      <Container
        className={`grid items-start gap-10 py-10 sm:py-14 lg:gap-14 lg:py-16 ${visual ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]" : ""}`}
      >
        <div className={visual ? "lg:pt-4" : "mx-auto max-w-[780px] text-center"}>
          <h1
            style={at(0)}
            className="hero-in text-[2rem] leading-[1.35] font-bold sm:text-[2.6rem] lg:text-[2.35rem] xl:text-[2.55rem]"
          >
            {title}
          </h1>
          <div style={at(1)} className="hero-in mt-5 space-y-3 text-[18px] leading-[1.9]">
            <p className="text-ink">{story}</p>
            <div className="text-ink/75">{lead}</div>
          </div>

          {points && (
            <ul className={`mt-6 space-y-2.5 ${visual ? "" : "inline-block text-start"}`}>
              {points.map((p, i) => (
                <li key={i} style={at(2 + i)} className="hero-in flex gap-2.5 text-[17px] leading-8">
                  <Check />
                  <span>{fragment(p)}</span>
                </li>
              ))}
            </ul>
          )}

          {actions && (
            <div style={at(2 + (points?.length ?? 0))} className={`hero-in mt-8 flex flex-wrap gap-3 ${visual ? "" : "justify-center"}`}>
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
