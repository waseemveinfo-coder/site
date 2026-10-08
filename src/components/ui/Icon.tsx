// Minimal hairline icon set (24px grid, 1.5 stroke). Decorative by default.

const paths = {
  shield: "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zM9.5 12h5M9.5 12v-1.5a2.5 2.5 0 015 0V12M9 12h6v4H9z",
  ticket: "M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4V7zM14 7v10",
  task: "M5 5h14v14H5zM8.5 12l2.5 2.5L16 9.5",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  flow: "M5 4h6v5H5zM13 15h6v5h-6zM8 9v3h8v3",
  bot: "M7 9h10v9H7zM12 5v4M10 13h.01M14 13h.01M9.5 16h5M5 12v3M19 12v3",
  folder: "M3 7h6l2 2h10v10H3zM10 14h4M12 12v4",
  broadcast: "M4 10v4h3l6 4V6L7 10H4zM17 9a4 4 0 010 6M19.5 7a7 7 0 010 10",
  building: "M5 21V5h9v16M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
  helmet: "M4 16h16M5 16a7 7 0 0114 0M12 9V6M9 10V8M15 10V8M3 19h18",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M16 5a3 3 0 010 6M18 14a5 5 0 013 6",
  chat: "M4 5h16v11H10l-4 4v-4H4zM8 9.5h8M8 12.5h5",
  zap: "M13 3L5 14h6l-1 7 8-11h-6l1-7z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  clinic: "M4 21V7h16v14M9 3h6v4H9zM12 10v6M9 13h6M2 21h20",
  store: "M4 9l1.5-5h13L20 9M4 9h16v2a2.7 2.7 0 01-5.3 0 2.7 2.7 0 01-5.4 0A2.7 2.7 0 014 11V9zM5 13v8h14v-8M10 21v-5h4v5",
  briefcase: "M3 8h18v12H3zM9 8V5h6v3M3 13h18M11 13v2h2v-2",
  help:"M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17h.01",
  doc: "M6 3h9l3 3v15H6zM9 10h6M9 14h6M9 18h3",
  lock: "M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 017 0v3M12 15v2",
  support: "M4 13v-1a8 8 0 0116 0v1M4 13h3v5H4zM17 13h3v5h-3zM20 18c0 2-2 3-5 3h-2",
  chevron: "M15 9l-3 3-3-3",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M14 6l-6 6 6 6", // points toward the reading direction's end (left in RTL)
  sun: "M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 20,
  className,
  label,
}: {
  name: IconName;
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={name === "arrow" ? `icon-arrow ${className ?? ""}` : className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={paths[name]} />
    </svg>
  );
}
