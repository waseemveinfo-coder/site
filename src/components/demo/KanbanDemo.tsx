"use client";

import { useScene } from "./useScene";
import { ReplayButton, DemoFrame } from "./DemoFrame";

// Chat → task in one click, then the task moves across a Kanban board.
// Steps: 0 hover tools · 1 pointer on "to task" · 2 click + form · 3 card lands · 4 card moves to "in progress".
const DELAYS = [900, 900, 1200, 1900, 1200];

type Card = { id: string; title: string; who: string; due: string; tone?: "new" };

const base: Record<"todo" | "doing" | "done", Card[]> = {
  todo: [
    { id: "a", title: "متابعة عقد شقة 12", who: "ليان", due: "اليوم" },
    { id: "b", title: "تجهيز صور الموقع", who: "خالد", due: "الأحد" },
  ],
  doing: [{ id: "c", title: "عرض سعر مكتب 4", who: "سارة", due: "بكرا" }],
  done: [{ id: "d", title: "توقيع عقد الإيجار", who: "أحمد", due: "مبارح" }],
};

const NEW: Card = { id: "n", title: "عرض سعر الطابق التاني", who: "م. أحمد", due: "الخميس", tone: "new" };

export function KanbanDemo() {
  const { ref, step, done, replay } = useScene(DELAYS);
  const landed = step >= 3;
  const moved = step >= 4;
  const cols = {
    todo: landed && !moved ? [NEW, ...base.todo] : base.todo,
    doing: moved ? [NEW, ...base.doing] : base.doing,
    done: base.done,
  };

  return (
    <div ref={ref}>
      <DemoFrame title="ديرلي · محادثة ← مهمة" meta="لوحة مهام المبيعات">
        <div className="grid gap-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Chat */}
          <div className="border-b border-line bg-bg p-3 sm:border-e sm:border-b-0">
            <p className="mb-2 text-[11px] font-semibold text-muted">محادثة #1044 · عميل جديد</p>
            <div className="relative mt-8">
              {/* Hover tools above the message */}
              <div
                className={`absolute -top-8 start-0 z-10 flex gap-1 rounded-md border border-line-strong bg-surface p-0.5 text-[11px] font-semibold shadow-none transition-opacity duration-200 ${step >= 0 && !landed ? "opacity-100" : "opacity-0"}`}
              >
                <span className="rounded-[4px] px-2 py-1 text-muted">رد</span>
                <span className={`rounded-[4px] px-2 py-1 transition-colors ${step >= 2 ? "bg-brand text-on-brand" : "text-brand-ink"}`}>
                  حوّل لمهمة
                </span>
                {/* Pointer */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className={`absolute top-4 end-4 text-ink transition-all duration-500 ${step >= 1 ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-6 translate-y-6 opacity-0"} ${step === 2 ? "scale-90" : ""}`}
                >
                  <path d="M4 3l14 7-6 2-2 6z" fill="currentColor" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={`max-w-[92%] rounded-md border bg-surface px-3 py-2 text-[13px] leading-6 transition-colors ${step >= 0 && !landed ? "border-brand" : "border-line"}`}>
                بدي عرض سعر للطابق التاني حسب المخطط اللي بعتّه، قبل الخميس إذا بتقدروا.
                {landed && (
                  <span className="msg-in mt-1.5 flex w-fit items-center gap-1 rounded-[4px] bg-brand-tint px-1.5 py-0.5 text-[10px] font-semibold text-brand-ink">
                    ✓ صارت مهمة
                  </span>
                )}
              </div>
            </div>
            <div className="ms-auto mt-2 max-w-[80%] rounded-md border border-line bg-chat-out px-3 py-2 text-[13px] leading-6">
              أكيد، بنجهزلك ياه وبنبعتلك.
            </div>

            {/* Mini task form */}
            <div
              className={`mt-3 rounded-md border border-brand bg-surface p-2.5 text-[11px] transition-all duration-300 ${step === 2 ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
            >
              <p className="font-semibold text-ink">مهمة جديدة من الرسالة</p>
              <p className="mt-1 text-muted">المسؤول: م. أحمد · الموعد: الخميس</p>
            </div>
          </div>

          {/* Board */}
          <div className="grid grid-cols-3 gap-2 p-3">
            <Column title="جديدة" cards={cols.todo} />
            <Column title="قيد التنفيذ" cards={cols.doing} />
            <Column title="منجزة" cards={cols.done} muted />
          </div>
        </div>
      </DemoFrame>
      <ReplayButton show={done} onClick={replay} />
    </div>
  );
}

function Column({ title, cards, muted = false }: { title: string; cards: Card[]; muted?: boolean }) {
  return (
    <div className="min-w-0 rounded-md bg-surface-2 p-1.5">
      <p className="flex items-center justify-between px-1 pb-1.5 text-[11px] font-bold">
        {title}
        <span className="font-mono text-[10px] font-normal text-muted">{cards.length}</span>
      </p>
      <ul className="space-y-1.5">
        {cards.map((c) => (
          <li
            key={c.id + title}
            className={`rounded-[5px] border bg-surface p-2 text-[11px] leading-5 ${c.tone === "new" ? "msg-in border-brand ring-2 ring-brand-tint" : "border-line"} ${muted ? "opacity-70" : ""}`}
          >
            <p className={`font-semibold ${muted ? "line-through decoration-muted" : ""}`}>{c.title}</p>
            <p className="mt-1 flex items-center justify-between gap-1 text-[10px] text-muted">
              <span className="truncate">{c.who}</span>
              <span className="shrink-0 rounded-[3px] bg-surface-2 px-1">{c.due}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
