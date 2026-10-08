import type { ReactNode } from "react";

export function SectionHeader({
  id,
  kicker,
  title,
  lead,
  invert = false,
  as: Heading = "h2",
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  invert?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-[62ch]">
      <p className={`text-sm font-semibold ${invert ? "text-invert-muted" : "text-brand-ink"}`}>{kicker}</p>
      <Heading id={id} className="mt-2 text-2xl font-extrabold sm:text-4xl">
        {title}
      </Heading>
      {lead && <p className={`mt-4 text-[17px] leading-8 ${invert ? "text-invert-muted" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}
