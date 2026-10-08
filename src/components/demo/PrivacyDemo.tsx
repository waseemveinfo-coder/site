"use client";

import { useEffect, useRef, useState } from "react";
import { MessageText, Phone } from "./Phone";

// One illustrative conversation, seen from three seats:
// the customer (plain WhatsApp on their phone), the employee (Derlly, number
// masked, even inside message text) and the manager (Derlly, full number).
// It plays like a real chat: the sender types in their composer, the other
// side sees "typing…", the bubble lands, ticks turn blue. All data is made up.

type View = "customer" | "employee" | "manager";
type MsgState = "hidden" | "typing" | "shown";

const CUSTOMER_NUMBER = "0591234789";

const messages: { from: "customer" | "agent"; text: string; time: string }[] = [
  { from: "customer", text: "مرحبا، شفت إعلانكم عن الشقة بثلاث غرف. لسّا متوفرة؟", time: "4:02 م" },
  { from: "agent", text: "أهلين فيك. إي متوفرة، وفيك تعاينها بكرا العصر إذا بيناسبك.", time: "4:03 م" },
  { from: "customer", text: "تمام، الساعة 5 بتناسبني. وبتبعتولي الموقع؟", time: "4:05 م" },
  { from: "agent", text: "أكيد. سجّلنا موعدك بكرا الساعة 5، ورح نبعتلك الموقع قبلها بساعة.", time: "4:06 م" },
];

const LAST = messages.length * 2 - 1; // final step: last message shown
const TYPE_MS = 34; // per typing tick (2 characters)
const PAUSE_MS = 900; // reading pause after each message

const views: { id: View; label: string; desktop: boolean }[] = [
  { id: "customer", label: "العميل", desktop: false },
  { id: "employee", label: "الموظف", desktop: true },
  { id: "manager", label: "المدير", desktop: true },
];

/* Timeline: step 2i = message i being typed, step 2i+1 = message i delivered. */
function useConversation() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const [chars, setChars] = useState(0);

  // Start once the demo is on screen; reduced-motion users get the full chat at once.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setStep(LAST), 0);
      return () => clearTimeout(t);
    }
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => setStep(0), 700);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (step < 0 || step >= LAST) return;
    let t: ReturnType<typeof setTimeout>;
    if (step % 2 === 0) {
      const len = messages[step / 2].text.length;
      t =
        chars < len
          ? setTimeout(() => setChars((c) => Math.min(len, c + 2)), TYPE_MS)
          : setTimeout(() => {
              setChars(0);
              setStep((s) => s + 1);
            }, 280);
    } else {
      t = setTimeout(() => setStep((s) => s + 1), PAUSE_MS);
    }
    return () => clearTimeout(t);
  }, [step, chars]);

  const stateOf = (i: number): MsgState => (step >= 2 * i + 1 ? "shown" : step === 2 * i ? "typing" : "hidden");
  const typingIndex = step >= 0 && step % 2 === 0 && step < LAST ? step / 2 : -1;
  const replay = () => {
    setChars(0);
    setStep(0);
  };
  return { ref, stateOf, typingIndex, chars, done: step >= LAST, replay };
}

type Convo = Omit<ReturnType<typeof useConversation>, "ref">;

export function PrivacyDemo({ onDone }: { onDone?: () => void }) {
  const [view, setView] = useState<View>("employee");
  const [touched, setTouched] = useState(false);
  const seat = view === "manager" ? "manager" : "employee";
  const { ref, ...convo } = useConversation();

  // Report completion to the hero tabs (after the hand-off to the manager seat).
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });
  useEffect(() => {
    if (convo.done) doneRef.current?.();
  }, [convo.done]);

  useEffect(() => {
    if (!convo.done || touched) return;
    const t = setTimeout(() => setView("manager"), 1400);
    return () => clearTimeout(t);
  }, [convo.done, touched]);

  const choose = (v: View) => {
    setTouched(true);
    setView(v);
  };

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">نفس المحادثة، من كل جهة:</p>
        <div role="group" aria-label="اختر من وين بدك تشوف المحادثة" className="flex w-full rounded-md border border-line-strong bg-surface p-0.5 sm:inline-flex sm:w-auto">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => choose(v.id)}
              className={`h-9 flex-1 rounded-[4px] px-3 font-display whitespace-nowrap sm:flex-none sm:px-4 text-sm font-semibold text-muted transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-bg ${v.desktop ? "" : "lg:hidden"}`}
            >
              <span className="hidden sm:inline">منظور </span>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-[230px_minmax(0,1fr)]">
        <div className={view === "customer" ? "block" : "hidden lg:block"}>
          <CustomerPhone convo={convo} />
        </div>
        <div className={view === "customer" ? "hidden lg:block" : "block"}>
          <InboxWindow seat={seat} convo={convo} />
        </div>
      </div>

      <div className="mt-2 flex min-h-7 flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p key={seat} className={`text-[13px] text-muted ${seat === "manager" ? "msg-in" : "invisible"}`}>
          <span className="font-semibold text-ink">هيك بيشوفها المدير:</span> المحادثة كاملة، والرقم كامل، ومين ردّ وأمتى.
        </p>
        {convo.done && (
          <button type="button" onClick={convo.replay} className="msg-in inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-ink hover:underline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" />
            </svg>
            شوف المحادثة من جديد
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Customer side: an ordinary WhatsApp chat ---------- */

function CustomerPhone({ convo }: { convo: Convo }) {
  const t = convo.typingIndex;
  const agentTyping = t >= 0 && messages[t].from === "agent";
  const selfTyping = t >= 0 && messages[t].from === "customer" ? messages[t].text : "";

  return (
    <div className="mx-auto flex h-full max-w-[300px] flex-col overflow-hidden rounded-[22px] border-[6px] border-ink bg-chat-wall lg:max-w-none">
      <div className="flex items-center gap-2.5 bg-surface px-3 py-2.5">
        <span aria-hidden className="grid size-8 place-items-center rounded-full bg-brand font-display text-sm font-bold text-on-brand">
          أ
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">مكتب الأفق العقاري</p>
          <p className={`text-[11px] ${agentTyping ? "font-semibold text-brand-ink" : "text-muted"}`}>
            {agentTyping ? "عم يكتب…" : "حساب أعمال · متصل الآن"}
          </p>
        </div>
      </div>
      <p className="mx-auto mt-3 rounded-md bg-surface/80 px-2 py-0.5 text-[11px] text-muted">جوال العميل · واتساب العادي</p>
      <ol className="flex flex-1 flex-col gap-1.5 p-3">
        {messages.map((m, i) => (
          <Bubble key={i} state={convo.stateOf(i)} own={m.from === "customer"} tone="phone">
            <MessageText text={m.text} masked={false} />
            <Meta time={m.time} ticks={m.from === "customer" ? tickFor(convo, i) : undefined} />
          </Bubble>
        ))}
      </ol>
      <Composer text={selfTyping} chars={convo.chars} placeholder="رسالة" tone="phone" />
    </div>
  );
}

/* ---------- Company side: Derlly inbox ---------- */

const otherChats = [
  { num: "0782214431", preview: "بدي عرض سعر للمخطط" },
  { num: "0599012276", preview: "شكراً، وصل الملف" },
];

function InboxWindow({ seat, convo }: { seat: "employee" | "manager"; convo: Convo }) {
  const masked = seat === "employee";
  const t = convo.typingIndex;
  const customerTyping = t >= 0 && messages[t].from === "customer";
  const selfTyping = t >= 0 && messages[t].from === "agent" ? messages[t].text : "";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-line-strong bg-surface">
      {/* App chrome */}
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2 text-[12px] text-muted">
        <span className="font-display font-bold whitespace-nowrap text-ink">ديرلي · المحادثات</span>
        <span className="truncate">{masked ? "الدخول: سارة، مبيعات" : "الدخول: المدير"}</span>
      </div>

      <div className="grid flex-1 sm:grid-cols-[150px_minmax(0,1fr)] lg:grid-cols-1">
        {/* Conversation list */}
        <ul className="hidden border-e border-line text-[12px] sm:block lg:hidden">
          <li className="border-s-2 border-brand bg-brand-tint px-3 py-2.5">
            <Phone value={CUSTOMER_NUMBER} masked={masked} />
            <p className="mt-0.5 truncate text-muted">إعلان شقة 3 غرف</p>
          </li>
          {otherChats.map((c) => (
            <li key={c.num} className="border-b border-line px-3 py-2.5">
              <Phone value={c.num} masked={masked} />
              <p className="mt-0.5 truncate text-muted">{c.preview}</p>
            </li>
          ))}
        </ul>

        {/* Open conversation */}
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
            <div className="leading-tight">
              <p className="text-sm font-semibold">
                {/* key remounts the number so the redaction sweep replays on seat change */}
                عميل جديد · <Phone key={seat} value={CUSTOMER_NUMBER} masked={masked} />
              </p>
              <p className={`mt-0.5 text-[11px] ${customerTyping ? "font-semibold text-brand-ink" : "text-muted"}`}>
                {customerTyping ? "العميل عم يكتب…" : "المسؤول: سارة · المصدر: إعلان"}
              </p>
            </div>
            {masked ? (
              <span className="rounded-[4px] bg-warn-tint px-2 py-1 text-[11px] font-semibold text-warn">الرقم محجوب عنك</span>
            ) : (
              <span className="rounded-[4px] bg-brand-tint px-2 py-1 text-[11px] font-semibold text-brand-ink">صلاحية مدير: الرقم كامل</span>
            )}
          </div>

          {!masked && (
            <div className="msg-in flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-brand-tint px-4 py-2 text-[12px]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-brand-ink">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                عم تتابع المحادثة مباشرة
              </span>
              <span className="text-muted">المسؤولة: سارة · أول رد خلال دقيقة</span>
            </div>
          )}

          <ol className="flex flex-1 flex-col gap-1.5 bg-bg p-4">
            {messages.map((m, i) => (
              <Bubble key={i} state={convo.stateOf(i)} own={m.from === "agent"} tone="inbox">
                {!masked && m.from === "agent" && <span className="block text-[11px] font-semibold text-brand-ink">سارة</span>}
                <MessageText text={m.text} masked={masked} />
                <Meta time={m.time} ticks={m.from === "agent" ? tickFor(convo, i) : undefined} />
              </Bubble>
            ))}
          </ol>

          <Composer text={selfTyping} chars={convo.chars} placeholder="اكتب ردّك…" tone="inbox" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Pieces ---------- */

// Ticks: the newest sent message turns blue a moment after landing; older ones are read.
function tickFor(convo: Convo, i: number): "read" | "animate" {
  return convo.stateOf(i + 1) === "hidden" ? "animate" : "read";
}

// A message slot keeps its size from the start, so nothing jumps while the chat plays.
function Bubble({ state, own, tone, children }: { state: MsgState; own: boolean; tone: "phone" | "inbox"; children: React.ReactNode }) {
  const side = own ? "self-end" : "self-start";
  const look =
    tone === "phone"
      ? `rounded-md px-2.5 py-1.5 ${own ? "bg-chat-out" : "bg-surface"}`
      : `rounded-md border border-line px-3 py-1.5 ${own ? "bg-chat-out" : "bg-surface"}`;
  return (
    <li className={`relative max-w-[88%] text-[13px] leading-6 ${side}`}>
      {/* key remounts the content on arrival, replaying the entrance and the number sweep */}
      <div key={state} className={`${look} ${state === "shown" ? "msg-in" : "invisible"}`}>
        {children}
      </div>
      {state === "typing" && !own && (
        <span className={`absolute top-0 start-0 inline-flex items-center gap-1 px-3 py-2.5 ${look}`} aria-label="عم يكتب">
          <i className="typing-dot" />
          <i className="typing-dot" />
          <i className="typing-dot" />
        </span>
      )}
    </li>
  );
}

// Composer that "types" the next own message, then sends it.
function Composer({ text, chars, placeholder, tone }: { text: string; chars: number; placeholder: string; tone: "phone" | "inbox" }) {
  const typed = text ? text.slice(Math.max(0, chars - 34), chars) : "";
  const active = !!text;
  return (
    <div className={`flex items-center gap-2 px-2.5 py-2 ${tone === "phone" ? "bg-chat-wall" : "border-t border-line px-3"}`}>
      <span
        className={`flex min-w-0 flex-1 items-center overflow-hidden rounded-full border px-3 py-1.5 text-[13px] whitespace-nowrap ${
          active ? "border-brand bg-surface text-ink" : "border-line bg-surface text-muted"
        } ${tone === "inbox" ? "rounded-md" : ""}`}
      >
        {active ? (
          <>
            <span className="truncate">{typed}</span>
            <span aria-hidden className="caret ms-0.5 inline-block h-4 w-px shrink-0 bg-ink" />
          </>
        ) : (
          placeholder
        )}
      </span>
      <span
        aria-hidden
        className={`grid size-8 shrink-0 place-items-center rounded-full bg-brand text-on-brand transition-transform duration-200 ${active ? "scale-100" : "scale-90 opacity-70"} ${tone === "inbox" ? "rounded-md" : ""}`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4L9 15M20 4l-6 16-3-7-7-3 16-6z" transform="scale(-1 1) translate(-24 0)" />
        </svg>
      </span>
    </div>
  );
}

function Meta({ time, ticks }: { time: string; ticks?: "read" | "animate" }) {
  return (
    <span className="ms-2 inline-flex translate-y-0.5 items-center gap-1 align-baseline text-[10px] text-muted">
      {time}
      {ticks && (
        <svg
          width="15"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ticks === "animate" ? "tick-read" : "text-tick-read"}
          aria-label="مقروءة"
          role="img"
        >
          <path d="M1 5.5l2.5 2.5L9 2M6.5 8l1 0.5L15 2" />
        </svg>
      )}
    </span>
  );
}
