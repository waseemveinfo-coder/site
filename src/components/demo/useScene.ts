"use client";

import { useEffect, useRef, useState } from "react";

// Drives a short scripted scene: `step` advances through `delays` (ms after
// the previous step) once the element is on screen. Reduced-motion users
// jump straight to the final step. `replay` restarts from step 0.
export function useScene(delays: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const last = delays.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setStep(last), 0);
      return () => clearTimeout(t);
    }
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t = setTimeout(() => setStep(0), 400);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [last]);

  useEffect(() => {
    if (step < 0 || step >= last) return;
    const t = setTimeout(() => setStep((s) => s + 1), delays[step]);
    return () => clearTimeout(t);
  }, [step, last, delays]);

  return { ref, step, done: step >= last, replay: () => setStep(0) };
}
