"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";

type Theme = "light" | "dark";

const darkQuery = "(prefers-color-scheme: dark)";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia(darkQuery).matches ? "dark" : "light";
}

// Theme lives on <html data-theme>; re-render on OS changes or our own toggles.
function subscribe(onChange: () => void) {
  const mq = matchMedia(darkQuery);
  mq.addEventListener("change", onChange);
  window.addEventListener("themechange", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("themechange", onChange);
  };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  }

  const label = theme === "dark" ? "التبديل للوضع الفاتح" : "التبديل للوضع الداكن";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid size-9 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink ${className}`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}

// Runs before paint so a saved theme never flashes the wrong colors.
export const themeInitScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
