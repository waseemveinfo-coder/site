"use client";

import type { ReactNode } from "react";
import { useScene } from "./useScene";
import { DemoFrame, ReplayButton } from "./DemoFrame";
import { Icon } from "@/components/ui/Icon";

// A workflow drawn as a real flowchart: trigger → condition → two branches.
// Each step of the scene reveals the next line or node.
const DELAYS = [450, 450, 450, 500, 450, 450, 450, 450];

export function WorkflowDemo({ onDone }: { onDone?: () => void }) {
  const { ref, step, done, replay } = useScene(DELAYS, onDone);
  const on = (i: number) => step >= i;

  return (
    <div ref={ref}>
      <DemoFrame title="ديرلي · المسارات" meta="مسار: استفسار أسعار">
        <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[12px]">
          <span className="font-semibold">استفسار أسعار من عميل جديد</span>
          <span className="inline-flex items-center gap-1.5 text-brand-ink">
            <span className="relative inline-block h-4 w-7 rounded-full bg-brand">
              <span className="absolute top-0.5 start-0.5 size-3 rounded-full bg-surface" />
            </span>
            مفعّل
          </span>
        </div>

        <div className="bg-bg px-3 py-5 sm:px-6">
          <div className="flex flex-col items-center">
            <Node show={on(0)} kind="trigger" icon={<Icon name="chat" size={14} />}>
              لما توصل رسالة من عميل جديد
            </Node>
            <VLine show={on(1)} />
            <Node show={on(2)} kind="condition" icon="؟">
              الرسالة فيها كلمة «أسعار»؟
            </Node>
            <VLine show={on(3)} short />

            {/* Branches */}
            <div className="relative grid w-full grid-cols-2 gap-3">
              <span
                aria-hidden
                className={`absolute top-0 right-1/4 left-1/4 h-px origin-center bg-line-strong transition-transform duration-500 ${on(3) ? "scale-x-100" : "scale-x-0"}`}
              />
              <Branch label="إي" show={on(4)}>
                <Node show={on(4)} icon={<Icon name="doc" size={14} />}>ابعت رسالة ترحيب وصورة الكتالوج</Node>
                <VLine show={on(5)} short />
                <Node show={on(5)} icon={<Icon name="users" size={14} />}>سلّم المحادثة لفريق المبيعات</Node>
                <VLine show={on(6)} short />
                <Node show={on(6)} icon={<Icon name="ticket" size={14} />}>حط وسم: مهتم بالأسعار</Node>
              </Branch>
              <Branch label="لأ" show={on(4)}>
                <Node show={on(4)} kind="condition" icon="؟">
                  برّا أوقات الدوام؟
                </Node>
                <VLine show={on(5)} short />
                <Node show={on(5)} icon={<Icon name="clock" size={14} />}>رد تلقائي بموعد رجوع الفريق</Node>
                <VLine show={on(7)} short />
                <Node show={on(7)} icon={<Icon name="users" size={14} />}>سلّم لفريق خدمة العملاء</Node>
              </Branch>
            </div>
          </div>
        </div>
      </DemoFrame>
      <ReplayButton show={done} onClick={replay} />
    </div>
  );
}

function Branch({ label, show, children }: { label: string; show: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <span aria-hidden className={`h-3 w-px origin-top bg-line-strong transition-transform duration-300 ${show ? "scale-y-100" : "scale-y-0"}`} />
      <span className={`rounded-full border border-line-strong bg-surface px-2.5 py-0.5 text-[11px] font-bold transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
        {label}
      </span>
      <span aria-hidden className={`h-3 w-px origin-top bg-line-strong transition-transform duration-300 ${show ? "scale-y-100" : "scale-y-0"}`} />
      {children}
    </div>
  );
}

function VLine({ show, short = false }: { show: boolean; short?: boolean }) {
  return (
    <span
      aria-hidden
      className={`w-px origin-top bg-line-strong transition-transform duration-400 ${short ? "h-4" : "h-6"} ${show ? "scale-y-100" : "scale-y-0"}`}
    />
  );
}

function Node({
  show,
  kind = "action",
  icon,
  children,
}: {
  show: boolean;
  kind?: "trigger" | "condition" | "action";
  icon: ReactNode;
  children: ReactNode;
}) {
  const look = {
    trigger: "border-ink bg-ink text-bg",
    condition: "border-warn bg-warn-tint text-ink",
    action: "border-line-strong bg-surface text-ink",
  }[kind];
  return (
    <div
      className={`flex w-full max-w-[260px] items-center gap-2 rounded-md border px-3 py-2 text-[12px] leading-5 font-semibold transition-all duration-400 sm:text-[13px] ${look} ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-95 opacity-0"}`}
    >
      <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-[4px] bg-black/5 text-[12px]">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}
