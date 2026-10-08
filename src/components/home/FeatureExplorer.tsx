"use client";

import Link from "next/link";
import { useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  AiBotView,
  BroadcastView,
  ChatToTaskView,
  ReportsView,
  StorageView,
  SupportView,
  TicketsView,
  WorkflowView,
} from "./featureViews";

type Feature = {
  id: string;
  icon: IconName;
  label: string;
  title: string;
  text: string;
  href: string;
  View: ComponentType;
};

const features: Feature[] = [
  {
    id: "tickets",
    icon: "ticket",
    label: "نظام التذاكر",
    title: "كل محادثة إلها موظف مسؤول وحالة واضحة",
    text: "الرسالة الجديدة بتصير تذكرة وبتنسلّم لموظف. بتعرف مين ماسكها، ووين وصلت، وشو لسّا ناطر رد.",
    href: "/product/tickets",
    View: TicketsView,
  },
  {
    id: "task",
    icon: "task",
    label: "من رسالة لمهمة",
    title: "طلب العميل بيصير مهمة بضغطة وحدة",
    text: "العميل طلب عرض سعر؟ حوّل رسالته لمهمة إلها مسؤول وموعد، من جوّا المحادثة نفسها. ما في نسخ ولصق، وما في «نسيت».",
    href: "/product/chat-to-task",
    View: ChatToTaskView,
  },
  {
    id: "reports",
    icon: "chart",
    label: "التقارير",
    title: "أداء كل موظف بالأرقام",
    text: "تقارير شهرية ودورية: أنشط الموظفين، أوقات الذروة، حجم الشغل، ومين أداؤه أقل من المطلوب.",
    href: "/product/reports",
    View: ReportsView,
  },
  {
    id: "bot",
    icon: "bot",
    label: "الرد الآلي الذكي",
    title: "بوت بيرد من معلومات شركتك",
    text: "بتدرّبه على أسعارك وخدماتك وأسئلة عملائك المتكررة، وهو بيرد عنك بأي ساعة. وإذا لزم، بيحوّل المحادثة لموظف.",
    href: "/product/ai-bot",
    View: AiBotView,
  },
  {
    id: "workflow",
    icon: "flow",
    label: "باني المسارات",
    title: "قواعد تلقائية بدون مبرمج",
    text: "عميل جديد بعت كلمة معيّنة؟ ابعتله رسالة أو صورة، سلّمه لموظف، وحطّله وسم. كل هاد تلقائي.",
    href: "/product/workflow",
    View: WorkflowView,
  },
  {
    id: "storage",
    icon: "folder",
    label: "تخزين آمن",
    title: "ملفات العملاء بمساحة شركتك الخاصة",
    text: "العقود والمخططات والصور اللي بتنبعت بالمحادثات، محفوظة بمساحة شركتك الخاصة، مش على جوال حدا ومش عندنا.",
    href: "/product/storage",
    View: StorageView,
  },
  {
    id: "broadcast",
    icon: "broadcast",
    label: "الرسائل الجماعية",
    title: "رسالة وحدة لكل العملاء المهتمين",
    text: "عرض جديد أو مشروع جديد؟ ابعت لقائمة كاملة مرة وحدة، وتابع شو وصل وشو انقرأ.",
    href: "/product/broadcast",
    View: BroadcastView,
  },
  {
    id: "support",
    icon: "support",
    label: "الدعم الفني",
    title: "فريق دعم بيحكي لغتك، 24/7",
    text: "منساعدك بالإعداد وبتدريب فريقك، ومنضل معك بعد الإطلاق. ومتواجدين 24/7.",
    href: "/support",
    View: SupportView,
  },
];

export function FeatureExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const f = features[active];

  // Arrow keys move between tabs (both orientations, RTL-aware).
  function onKey(e: KeyboardEvent) {
    const next: Record<string, number> = { ArrowDown: 1, ArrowLeft: 1, ArrowUp: -1, ArrowRight: -1 };
    if (e.key in next) {
      e.preventDefault();
      const i = (active + next[e.key] + features.length) % features.length;
      setActive(i);
      tabs.current[i]?.focus();
    }
  }

  return (
    <section aria-labelledby="features-title" className="border-b border-line py-14 sm:py-20">
      <Container>
        <SectionHeader
          id="features-title"
          title="كل أدوات فريقك على واتساب بمكان واحد"
          lead="حجب الأرقام هو الأساس، وفوقه كل شي بيحتاجه فريقك ليشتغل مع العملاء كل يوم."
        />

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          <div
            role="tablist"
            aria-label="ميزات ديرلي"
            onKeyDown={onKey}
            className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {features.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`tab-${x.id}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`panel-${x.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className="flex shrink-0 items-center gap-2.5 rounded-md border border-line px-3 py-2.5 text-start text-[15px] font-medium whitespace-nowrap text-muted hover:text-ink aria-selected:border-ink aria-selected:bg-surface aria-selected:text-ink lg:border-transparent lg:aria-selected:border-line-strong"
              >
                <Icon name={x.icon} size={18} />
                {x.label}
              </button>
            ))}
          </div>

          <div id={`panel-${f.id}`} role="tabpanel" aria-labelledby={`tab-${f.id}`} className="grid content-start items-start gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] xl:gap-8">
            <div>
              <h3 className="text-[1.4rem] leading-[1.5] font-bold sm:text-[1.6rem]">{f.title}</h3>
              <p className="mt-3 text-[17px] leading-8 text-ink/75">{f.text}</p>
              <Link href={f.href} className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-ink hover:underline">
                اعرف أكثر عن {f.label}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <f.View />
          </div>
        </div>
      </Container>
    </section>
  );
}
