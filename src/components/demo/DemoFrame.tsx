import type { ReactNode } from "react";

// Shared chrome for the hero scenes: a Derlly window title bar.
export function DemoFrame({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-line-strong bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-3 py-2 text-[12px] text-muted">
        <span className="font-display font-bold whitespace-nowrap text-ink">{title}</span>
        {meta && <span className="truncate">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

export function ReplayButton({ show, onClick }: { show: boolean; onClick: () => void }) {
  return (
    <div className="mt-2 flex h-7 items-center justify-end">
      {show && (
        <button type="button" onClick={onClick} className="msg-in inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-ink hover:underline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" />
          </svg>
          شوف المشهد من جديد
        </button>
      )}
    </div>
  );
}
