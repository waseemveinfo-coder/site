import type { ReactNode } from "react";

// Section heading in the Bitrix24 manner: a plain, direct title (no label
// above it, no full stop at the end) and one readable line under it.
// Centered by default; use align="start" when it sits beside a visual.
export function SectionHeader({
  id,
  title,
  lead,
  invert = false,
  align = "center",
  as: Heading = "h2",
}: {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  invert?: boolean;
  align?: "center" | "start";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[780px] text-center" : "max-w-[620px]"}>
      <Heading id={id} className="text-[1.75rem] leading-[1.45] font-bold sm:text-[2.25rem]">
        {title}
      </Heading>
      {lead && (
        <p className={`mt-4 text-[18px] leading-[1.9] ${invert ? "text-invert-muted" : "text-ink/75"}`}>{lead}</p>
      )}
    </div>
  );
}
