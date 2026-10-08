"use client";

import { useScene } from "./useScene";
import { DemoFrame, ReplayButton } from "./DemoFrame";

// Monthly report: who carries the team, who lags, and when messages peak.
// Steps: 0 KPIs · 1 bars grow · 2 badges · 3 heatmap fills · 4 peak note. All numbers illustrative.
const DELAYS = [500, 900, 600, 1300, 600];

const kpis = [
  { k: "محادثات الشهر", v: "1,284", ltr: true },
  { k: "متوسط أول رد", v: "3 دقايق", ltr: false },
  { k: "تذاكر انحلّت", v: "91%", ltr: true },
];

const people = [
  { name: "سارة", chats: 412, reply: "1 د", pct: 100, badge: "الأنشط هالشهر", tone: "good" as const },
  { name: "أحمد", chats: 336, reply: "2 د", pct: 82 },
  { name: "ليان", chats: 298, reply: "3 د", pct: 72 },
  { name: "خالد", chats: 118, reply: "11 د", pct: 29, badge: "أقل من المعدّل", tone: "warn" as const },
];

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// Messages per hour cell (0–4 intensity): busy late morning, peak 6–8 pm early in the week.
const hourShape = [1, 2, 3, 3, 2, 1, 1, 2, 2, 4, 4, 3];
const dayBoost = [0, 1, 1, 0, 0, -1];
const level = (d: number, h: number) => Math.max(0, Math.min(4, hourShape[h] + (hourShape[h] >= 3 ? dayBoost[d] : 0)));
const shade = ["bg-surface-2", "bg-brand/15", "bg-brand/35", "bg-brand/60", "bg-brand"];

export function ReportsDemo() {
  const { ref, step, done, replay } = useScene(DELAYS);
  const on = (i: number) => step >= i;

  return (
    <div ref={ref}>
      <DemoFrame title="ديرلي · التقارير" meta="تقرير شهر أيلول · بيانات توضيحية">
        <div className="space-y-4 bg-bg p-3 sm:p-4">
          <dl className="grid grid-cols-3 gap-2">
            {kpis.map((x, i) => (
              <div
                key={x.k}
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`rounded-md border border-line bg-surface px-3 py-2 transition-all duration-500 ${on(0) ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
              >
                <dt className="text-[11px] text-muted">{x.k}</dt>
                <dd className="text-right font-display text-lg font-bold" dir={x.ltr ? "ltr" : undefined}>
                  {x.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-md border border-line bg-surface p-3">
            <p className="text-[12px] font-bold">أداء الموظفين</p>
            <ul className="mt-2 space-y-2.5">
              {people.map((p, i) => (
                <li key={p.name} className="grid grid-cols-[3.2rem_minmax(0,1fr)_auto] items-center gap-2 text-[12px]">
                  <span className="font-semibold">{p.name}</span>
                  <span className="relative h-2.5 rounded-full bg-surface-2">
                    <span
                      style={{ width: `${p.pct}%`, transitionDelay: `${i * 120}ms` }}
                      className={`absolute inset-y-0 start-0 origin-right rounded-full transition-transform duration-700 ease-out ${p.tone === "warn" ? "bg-warn" : "bg-brand"} ${on(1) ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted">
                    <span dir="ltr" className="font-mono">
                      {p.chats}
                    </span>
                    <span>· {p.reply}</span>
                  </span>
                  {p.badge && (
                    <span
                      className={`col-start-2 -mt-1 w-fit rounded-[4px] px-1.5 py-0.5 text-[10px] font-bold transition-opacity duration-300 ${p.tone === "warn" ? "bg-warn-tint text-warn" : "bg-brand-tint text-brand-ink"} ${on(2) ? "opacity-100" : "opacity-0"}`}
                    >
                      {p.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-line bg-surface p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-bold">ساعات الذروة حسب عدد الرسائل</p>
              <span className={`rounded-[4px] bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-bg transition-opacity duration-300 ${on(4) ? "opacity-100" : "opacity-0"}`}>
                الذروة: 6–8 المسا
              </span>
            </div>
            <div className="mt-2 grid grid-cols-[3.2rem_repeat(12,minmax(0,1fr))] gap-[3px] text-[9px] text-muted">
              {days.map((d, di) => (
                <div key={d} className="contents">
                  <span className="self-center">{d}</span>
                  {hours.map((h, hi) => (
                    <span
                      key={h}
                      style={{ transitionDelay: `${(di * 12 + hi) * 14}ms` }}
                      className={`aspect-square rounded-[2px] transition-opacity duration-300 ${shade[level(di, hi)]} ${on(3) ? "opacity-100" : "opacity-0"}`}
                    />
                  ))}
                </div>
              ))}
              <span />
              {hours.map((h) => (
                <span key={h} className="text-center" dir="ltr">
                  {h > 12 ? h - 12 : h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DemoFrame>
      <ReplayButton show={done} onClick={replay} />
    </div>
  );
}
