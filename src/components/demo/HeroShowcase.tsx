"use client";

import { useState, type ComponentType } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PrivacyDemo } from "./PrivacyDemo";
import { KanbanDemo } from "./KanbanDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { ReportsDemo } from "./ReportsDemo";

// Hero product tabs (the Bitrix24 pattern): each tab plays a short, live
// scene of one part of Derlly. Switching tabs restarts that scene.
const tabs: { id: string; label: string; icon: IconName; Scene: ComponentType }[] = [
  { id: "privacy", label: "سرية الأرقام", icon: "shield", Scene: PrivacyDemo },
  { id: "tasks", label: "محادثة ← مهمة", icon: "task", Scene: KanbanDemo },
  { id: "workflow", label: "المسارات", icon: "flow", Scene: WorkflowDemo },
  { id: "reports", label: "التقارير", icon: "chart", Scene: ReportsDemo },
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const { Scene, id } = tabs[active];

  return (
    <div>
      <div role="tablist" aria-label="جولة بديرلي" className="-mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`hero-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="hero-panel"
            onClick={() => setActive(i)}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-[14px] font-semibold whitespace-nowrap text-ink/75 transition-colors hover:border-ink hover:text-ink aria-selected:border-ink aria-selected:bg-ink aria-selected:text-bg"
          >
            <Icon name={t.icon} size={16} />
            {t.label}
          </button>
        ))}
      </div>
      <div key={id} id="hero-panel" role="tabpanel" aria-labelledby={`hero-tab-${id}`} className="msg-in">
        <Scene />
      </div>
    </div>
  );
}
