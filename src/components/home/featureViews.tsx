import type { ReactNode } from "react";
import { MessageText, Phone } from "@/components/demo/Phone";

// Small, honest product screens for the feature explorer. Built from real
// HTML so they stay sharp, theme-aware and translatable. All data is made up.

function Frame({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-line-strong bg-surface text-[13px]">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2 text-[12px] text-muted">
        <span className="font-display font-bold whitespace-nowrap text-ink">ديرلي · {title}</span>
        {meta && <span className="truncate">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

function Pill({ tone = "neutral", children }: { tone?: "neutral" | "brand" | "warn"; children: ReactNode }) {
  const tones = {
    neutral: "bg-surface-2 text-muted",
    brand: "bg-brand-tint text-brand-ink",
    warn: "bg-warn-tint text-warn",
  };
  return <span className={`inline-block rounded-[4px] px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${tones[tone]}`}>{children}</span>;
}

/* 1. Privacy: what the employee sees vs. what the manager can reveal */
export function PrivacyView() {
  const rows = [
    { num: "0591234789", agent: "سارة", note: "طلب معاينة" },
    { num: "0782214431", agent: "أحمد", note: "عرض سعر" },
    { num: "0599012276", agent: "سارة", note: "متابعة عقد" },
  ];
  return (
    <Frame title="العملاء" meta="عرض الموظف">
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.num} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <Phone value={r.num} masked />
              <p className="text-[12px] text-muted">{r.note} · المسؤول: {r.agent}</p>
            </div>
            <Pill tone="warn">محجوب</Pill>
          </li>
        ))}
      </ul>
      <p className="border-t border-line bg-bg px-4 py-2.5 text-[12px] text-muted">كشف الرقم الكامل متاح لصلاحية المدير بس.</p>
    </Frame>
  );
}

/* 2. Tickets */
export function TicketsView() {
  const rows = [
    { id: "1042", subject: "طلب معاينة شقة", agent: "سارة", status: "مفتوحة", tone: "brand" as const },
    { id: "1041", subject: "استفسار عن الدفعات", agent: "أحمد", status: "بانتظار العميل", tone: "warn" as const },
    { id: "1039", subject: "تعديل موعد التسليم", agent: "ليان", status: "مغلقة", tone: "neutral" as const },
    { id: "1038", subject: "شكوى تأخير", agent: "غير مسندة", status: "جديدة", tone: "warn" as const },
  ];
  return (
    <Frame title="التذاكر" meta="4 تذاكر اليوم">
      <table className="w-full text-start">
        <thead className="border-b border-line text-[11px] text-muted">
          <tr>
            <th className="px-4 py-2 text-start font-medium">#</th>
            <th className="px-2 py-2 text-start font-medium">الموضوع</th>
            <th className="hidden px-2 py-2 text-start font-medium sm:table-cell">المسؤول</th>
            <th className="px-4 py-2 text-start font-medium">الحالة</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-2.5 font-mono text-muted">{r.id}</td>
              <td className="px-2 py-2.5">{r.subject}</td>
              <td className="hidden px-2 py-2.5 text-muted sm:table-cell">{r.agent}</td>
              <td className="px-4 py-2.5">
                <Pill tone={r.tone}>{r.status}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

/* 3. Chat to task */
export function ChatToTaskView() {
  return (
    <Frame title="محادثة #1044">
      <div className="space-y-3 bg-bg p-4">
        <div className="relative max-w-[85%] rounded-md border border-brand bg-surface px-3 py-2 leading-6">
          بدي عرض سعر للطابق التاني حسب المخطط اللي بعتّه، قبل يوم الخميس إذا بتقدروا.
          <span className="absolute -bottom-3 end-3 rounded-[4px] bg-ink px-2 py-0.5 text-[11px] font-semibold text-bg">حوّل لمهمة ✓</span>
        </div>
        <div className="mt-5 rounded-md border border-line bg-surface p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">تجهيز عرض سعر للطابق التاني</p>
            <Pill tone="brand">مهمة جديدة</Pill>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
            <div>
              <dt className="text-muted">المسؤول</dt>
              <dd>م. أحمد</dd>
            </div>
            <div>
              <dt className="text-muted">الموعد</dt>
              <dd>الخميس</dd>
            </div>
            <div>
              <dt className="text-muted">المصدر</dt>
              <dd>رسالة عميل</dd>
            </div>
          </dl>
        </div>
      </div>
    </Frame>
  );
}

/* 4. Reports */
export function ReportsView() {
  const people = [
    { name: "سارة", value: 92 },
    { name: "أحمد", value: 74 },
    { name: "ليان", value: 61 },
    { name: "خالد", value: 28 },
  ];
  const hours = [2, 3, 5, 8, 9, 7, 4, 6, 9, 10, 6, 3];
  return (
    <Frame title="تقرير الشهر" meta="بيانات توضيحية">
      <div className="grid gap-5 p-4 sm:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold text-muted">محادثات انحلّت لكل موظف</p>
          <ul className="mt-3 space-y-2.5">
            {people.map((p) => (
              <li key={p.name} className="grid grid-cols-[3rem_1fr_2rem] items-center gap-2">
                <span>{p.name}</span>
                <span className="h-2 rounded-full bg-surface-2">
                  <span className={`block h-2 rounded-full ${p.value < 40 ? "bg-warn" : "bg-brand"}`} style={{ width: `${p.value}%` }} />
                </span>
                <span className="font-mono text-[12px] text-muted">{p.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-warn">خالد أقل من المعدّل هالشهر</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-muted">أوقات الذروة (9 الصبح لـ 9 المسا)</p>
          <div className="mt-3 flex h-24 items-end gap-1" dir="ltr">
            {hours.map((h, i) => (
              <span key={i} className={`flex-1 rounded-t-[2px] ${h >= 9 ? "bg-brand" : "bg-line-strong"}`} style={{ height: `${h * 10}%` }} />
            ))}
          </div>
          <p className="mt-2 text-[12px] text-muted">الذروة بين 6 و 8 المسا</p>
        </div>
      </div>
    </Frame>
  );
}

/* 5. AI bot */
export function AiBotView() {
  return (
    <Frame title="الرد الآلي" meta="مدرّب على ملفات شركتك">
      <div className="space-y-2 bg-bg p-4 leading-6">
        <p className="max-w-[85%] rounded-md border border-line bg-surface px-3 py-2">كم سعر المتر بمشروع الريحان؟ وفي تقسيط؟</p>
        <div className="ms-auto max-w-[85%] rounded-md border border-line bg-chat-out px-3 py-2">
          سعر المتر بيبدأ من الرقم المذكور بملف الأسعار، والتقسيط متاح على 24 شهر. بتحب يتواصل معك موظف المبيعات؟
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Pill>المصدر: ملف أسعار الريحان</Pill>
            <Pill tone="brand">رد آلي</Pill>
          </div>
        </div>
        <p className="pt-1 text-center text-[11px] text-muted">إذا السؤال بدّه موظف، البوت بيحوّل المحادثة.</p>
      </div>
    </Frame>
  );
}

/* 6. Workflow builder */
export function WorkflowView() {
  const steps = [
    { k: "إذا", v: "عميل جديد بعت كلمة «أسعار»" },
    { k: "ابعت", v: "رسالة ترحيب + صورة الكتالوج" },
    { k: "وزّع", v: "على فريق المبيعات" },
    { k: "أضف وسم", v: "مهتم · من إعلان" },
  ];
  return (
    <Frame title="المسارات" meta="مسار: استفسار أسعار">
      <ol className="space-y-0 p-4">
        {steps.map((s, i) => (
          <li key={s.k} className="relative ps-8 pb-4 last:pb-0">
            {i < steps.length - 1 && <span aria-hidden className="absolute start-[11px] top-6 bottom-0 w-px bg-line-strong" />}
            <span className={`absolute start-0 top-0.5 grid size-6 place-items-center rounded-full text-[11px] font-bold ${i === 0 ? "bg-ink text-bg" : "border border-line-strong bg-surface text-muted"}`}>
              {i + 1}
            </span>
            <div className="rounded-md border border-line bg-surface px-3 py-2">
              <span className="font-semibold text-brand-ink">{s.k}:</span> {s.v}
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* 7. Secure storage */
export function StorageView() {
  const files = [
    { name: "عقد_إيجار_شقة_12.pdf", size: "1.2 MB", from: "محادثة #1042" },
    { name: "مخطط_الطابق_الثاني.pdf", size: "4.8 MB", from: "محادثة #1044" },
    { name: "صور_الموقع_أيلول.zip", size: "36 MB", from: "مهمة: معاينة" },
  ];
  return (
    <Frame title="الملفات" meta="مساحة شركتك الخاصة">
      <ul className="divide-y divide-line">
        {files.map((f) => (
          <li key={f.name} className="flex items-center gap-3 px-4 py-3">
            <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-md border border-line font-mono text-[10px] text-muted">
              {f.name.split(".").pop()?.toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium" dir="auto">{f.name}</p>
              <p className="text-[12px] text-muted">{f.from}</p>
            </div>
            <span className="font-mono text-[12px] text-muted" dir="ltr">{f.size}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* 8. Broadcast */
export function BroadcastView() {
  const stats = [
    { k: "انبعتت", v: "240" },
    { k: "وصلت", v: "236" },
    { k: "انقرأت", v: "171" },
  ];
  return (
    <Frame title="رسالة جماعية" meta="بيانات توضيحية">
      <div className="p-4">
        <p className="text-[12px] text-muted">القائمة: عملاء مهتمين بمشروع الريحان</p>
        <p className="mt-2 rounded-md border border-line bg-chat-out px-3 py-2 leading-6">
          مرحبا، فتحنا حجوزات المرحلة التانية من مشروع الريحان. بتحب نبعتلك المخططات والأسعار؟
        </p>
        <dl className="mt-4 grid grid-cols-3 divide-x divide-x-reverse divide-line border-y border-line text-center">
          {stats.map((s) => (
            <div key={s.k} className="py-2.5">
              <dd className="font-mono text-lg font-semibold">{s.v}</dd>
              <dt className="text-[12px] text-muted">{s.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Frame>
  );
}

/* 9. Support */
export function SupportView() {
  return (
    <Frame title="الدعم الفني">
      <div className="space-y-2 bg-bg p-4 leading-6">
        <p className="max-w-[85%] rounded-md border border-line bg-surface px-3 py-2">بدنا نضيف 3 موظفين جداد على الحساب، كيف؟</p>
        <div className="ms-auto max-w-[85%] rounded-md border border-line bg-chat-out px-3 py-2">
          أكيد. منضيفهم سوا هلق خطوة بخطوة، ومنتأكد إن الأرقام محجوبة عندهم قبل ما يبلّشوا.
          <p className="mt-1 text-[11px] text-muted">فريق دعم ديرلي</p>
        </div>
      </div>
    </Frame>
  );
}

/* Sector inbox: the same masked inbox, filled with one sector's conversations */
export type SectorRow = { num: string; text: string; tag: string; agent: string };

export function SectorInbox({ title, rows }: { title: string; rows: SectorRow[] }) {
  return (
    <Frame title={title} meta="عرض الموظف">
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.num} className="px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <Phone value={r.num} masked />
              <Pill tone="brand">{r.tag}</Pill>
            </div>
            <p className="mt-1 truncate text-muted">
              <MessageText text={r.text} masked />
            </p>
            <p className="mt-0.5 text-[11px] text-muted">المسؤول: {r.agent}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-line bg-bg px-4 py-2.5 text-[12px] text-muted">الأرقام محجوبة عن الموظف، حتى جوّا الرسائل.</p>
    </Frame>
  );
}

/* Internal team chat */
export function InternalChatView() {
  const msgs = [
    { who: "سارة", text: "العميل 0591234789 بدّه خصم على الدفعة الأولى، مين بيوافق؟", own: false },
    { who: "المدير", text: "موافق لحد 5%، وحوّليلي التذكرة إذا طلب أكتر.", own: true },
    { who: "أحمد", text: "أنا ماسك عميل بنفس المشروع، منرتّب المعاينتين سوا؟", own: false },
  ];
  return (
    <Frame title="الدردشة الداخلية" meta="فريق المبيعات">
      <ol className="space-y-2.5 bg-bg p-4 leading-6">
        {msgs.map((m) => (
          <li key={m.text} className={`max-w-[85%] rounded-md border border-line px-3 py-2 ${m.own ? "ms-auto bg-chat-out" : "bg-surface"}`}>
            <span className="block text-[11px] font-semibold text-brand-ink">{m.who}</span>
            <MessageText text={m.text} masked />
          </li>
        ))}
      </ol>
      <p className="border-t border-line px-4 py-2.5 text-[12px] text-muted">حكي الشغل بيضل جوّا الشركة، مش بجروبات شخصية.</p>
    </Frame>
  );
}

/* Saved quick replies */
export function QuickRepliesView() {
  const replies = [
    { key: "سعر", text: "أهلين فيك! أسعارنا بتبدأ من… وفي تقسيط مريح. بتحب نبعتلك التفاصيل؟" },
    { key: "موقع", text: "مكتبنا بشارع… جنب… وفيك تزورنا من 9 الصبح لـ 6 المسا." },
    { key: "دوام", text: "دوامنا من الأحد للخميس، من 9 الصبح لـ 6 المسا." },
  ];
  return (
    <Frame title="الردود الجاهزة">
      <div className="bg-bg p-4">
        <ul className="overflow-hidden rounded-md border border-line-strong bg-surface">
          {replies.map((r, i) => (
            <li key={r.key} className={`flex gap-3 px-3 py-2.5 ${i === 0 ? "bg-brand-tint" : "border-t border-line"}`}>
              <span className="shrink-0 rounded-[4px] border border-line bg-surface px-1.5 font-mono text-[12px] text-brand-ink">{r.key}</span>
              <span className="truncate text-muted">{r.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-2">
          <span className="flex-1 rounded-md border border-brand bg-surface px-3 py-1.5">
            سعر<span aria-hidden className="ms-0.5 inline-block h-4 w-px translate-y-0.5 bg-ink" />
          </span>
          <span className="text-[12px] text-muted">اختصار ← رد كامل</span>
        </div>
      </div>
    </Frame>
  );
}

/* Out-of-hours schedule and auto reply */
export function OutOfHoursView() {
  const days = [
    { d: "الأحد – الخميس", h: "9:00 – 18:00", on: true },
    { d: "السبت", h: "10:00 – 14:00", on: true },
    { d: "الجمعة", h: "عطلة", on: false },
  ];
  return (
    <Frame title="أوقات الدوام" meta="جدول أسبوعي">
      <ul className="divide-y divide-line">
        {days.map((x) => (
          <li key={x.d} className="flex items-center justify-between px-4 py-2.5">
            <span>{x.d}</span>
            <span className={x.on ? "font-mono text-[12px]" : "text-[12px] font-semibold text-warn"} dir={x.on ? "ltr" : undefined}>
              {x.h}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line bg-bg p-4">
        <p className="text-[11px] font-semibold text-muted">الرد التلقائي برّا الدوام</p>
        <p className="mt-2 max-w-[90%] rounded-md border border-line bg-chat-out px-3 py-2 leading-6">
          أهلين فيك! رسالتك وصلت برّا أوقات الدوام. فريقنا بيرجعلك بكرا من الساعة 9 الصبح.
        </p>
      </div>
    </Frame>
  );
}
