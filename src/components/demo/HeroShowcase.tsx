"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PrivacyDemo } from "./PrivacyDemo";
import { KanbanDemo } from "./KanbanDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { ReportsDemo } from "./ReportsDemo";

// Hero product tabs (the Bitrix24 pattern): each tab plays a short, live
// scene of one part of Derlly. When a scene finishes, the next tab opens
// after a short hold, looping. Pointing at the scene pauses the hand-off.
const tabs: { id: string; label: string; icon: IconName; hold: number; Scene: ComponentType<{ onDone?: () => void }> }[] = [
  // Privacy holds longer: it switches to the manager seat right after it ends.
  { id: "privacy", label: "سرية الأرقام", icon: "shield", hold: 5500, Scene: PrivacyDemo },
  { id: "tasks", label: "محادثة ← مهمة", icon: "task", hold: 3500, Scene: KanbanDemo },
  { id: "workflow", label: "المسارات", icon: "flow", hold: 3500, Scene: WorkflowDemo },
  { id: "reports", label: "التقارير", icon: "chart", hold: 4000, Scene: ReportsDemo },
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const { Scene, id, hold } = tabs[active];

  const open = (i: number) => {
    setFinished(false);
    setActive(i);
  };

  // Hold, then move on to the next tab (skipped for reduced-motion users).
  useEffect(() => {
    if (!finished || paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      setFinished(false);
      setActive((a) => (a + 1) % tabs.length);
    }, hold);
    return () => clearTimeout(t);
  }, [finished, paused, hold]);

  return (
    <div onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="جولة بديرلي" className="-mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`hero-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="hero-panel"
            onClick={() => open(i)}
            className="relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-line-strong px-3.5 py-1.5 text-[14px] font-semibold whitespace-nowrap text-ink/75 transition-colors hover:border-ink hover:text-ink aria-selected:border-ink aria-selected:bg-ink aria-selected:text-bg"
          >
            <Icon name={t.icon} size={16} />
            {t.label}
            {/* Countdown to the next tab */}
            {i === active && finished && !paused && (
              <span
                aria-hidden
                style={{ "--hold": `${hold}ms` } as CSSProperties}
                className="tab-countdown absolute inset-x-0 bottom-0 h-[3px] bg-brand"
              />
            )}
          </button>
        ))}
      </div>
      <div key={id} id="hero-panel" role="tabpanel" aria-labelledby={`hero-tab-${id}`} className="msg-in">
        <Scene onDone={() => setFinished(true)} />
      </div>
    </div>
  );
}
