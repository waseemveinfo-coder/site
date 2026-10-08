"use client";

import { useState, type FormEvent } from "react";
import { site, solutionLinks } from "@/lib/site";
import { buttonClass } from "@/components/ui/Button";

// Demo requests go to Derlly's WhatsApp: the form validates, then opens a
// WhatsApp chat with the request pre-written. The visitor taps "send".

const field =
  "mt-1.5 block w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-[15px] text-ink placeholder:text-muted focus:border-brand focus:outline-none aria-invalid:border-warn";

const teamSizes = ["1 لـ 5 موظفين", "6 لـ 20 موظف", "21 لـ 50 موظف", "أكتر من 50"];

type Errors = Partial<Record<"name" | "company" | "phone", string>>;

function validate(f: FormData): { errors: Errors; get: (k: string) => string } {
  const get = (k: string) => String(f.get(k) ?? "").trim();
  const errors: Errors = {};
  if (get("name").length < 2) errors.name = "اكتب اسمك.";
  if (get("company").length < 2) errors.company = "اكتب اسم الشركة.";
  if (!/^\+?\d{8,15}$/.test(get("phone").replace(/[\s-]/g, ""))) errors.phone = "اكتب رقم جوال صحيح، أرقام بس.";
  return { errors, get };
}

export function whatsappDemoUrl(get: (k: string) => string) {
  const lines = [
    "مرحبا، بدي أطلب عرض تجريبي لديرلي.",
    `الاسم: ${get("name")}`,
    `الشركة: ${get("company")}`,
    `الجوال: ${get("phone")}`,
    get("size") && `حجم الفريق: ${get("size")}`,
    get("sector") && `القطاع: ${get("sector")}`,
    get("note") && `ملاحظة: ${get("note")}`,
  ].filter(Boolean);
  return `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function DemoForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { errors, get } = validate(new FormData(e.currentTarget));
    setErrors(errors);
    if (Object.keys(errors).length) {
      document.getElementById(Object.keys(errors)[0])?.focus();
      return;
    }
    const url = whatsappDemoUrl(get);
    setSentUrl(url);
    window.open(url, "_blank", "noopener");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-md border border-line-strong bg-surface p-5 sm:p-6">
      <p className="font-display text-lg font-bold">احجز جلستك</p>
      <p className="mt-1 text-[14px] text-muted">طلبك بيوصلنا على واتساب، ومنرجعلك لنتفق على موعد يناسبك.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="name" label="الاسم" error={errors.name}>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={field} />
        </Field>
        <Field id="company" label="اسم الشركة" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" required aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-err" : undefined} className={field} />
        </Field>
        <Field id="phone" label="رقم الجوال (واتساب)" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="05xxxxxxxx"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-err" : undefined}
            className={`${field} text-start`}
          />
        </Field>
        <Field id="size" label="حجم الفريق">
          <select id="size" name="size" className={field} defaultValue="">
            <option value="" disabled>
              اختار
            </option>
            {teamSizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field id="sector" label="القطاع" className="sm:col-span-2">
          <select id="sector" name="sector" className={field} defaultValue="">
            <option value="" disabled>
              اختار
            </option>
            {solutionLinks.map((s) => (
              <option key={s.href}>{s.label}</option>
            ))}
            <option>قطاع تاني</option>
          </select>
        </Field>
        <Field id="note" label="شو أهم شي بدك تشوفه؟ (اختياري)" className="sm:col-span-2">
          <textarea id="note" name="note" rows={3} className={field} />
        </Field>
      </div>

      <button type="submit" className={buttonClass("primary", "md", "mt-6 w-full")}>
        ابعت الطلب على واتساب
      </button>

      <div aria-live="polite" className="mt-4 text-[14px] leading-7">
        {sentUrl && (
          <p className="rounded-md border border-brand bg-brand-tint px-3 py-2 text-ink">
            فتحنالك واتساب والرسالة جاهزة، بس اضغط إرسال. إذا ما انفتح،{" "}
            <a href={sentUrl} target="_blank" rel="noopener" className="font-semibold text-brand-ink underline">
              اضغط هون
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[14px] font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[13px] text-warn">
          {error}
        </p>
      )}
    </div>
  );
}
