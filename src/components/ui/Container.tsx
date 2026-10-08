import type { ReactNode } from "react";

// Page gutter: 16px on phones, grows with the viewport, caps content at 1200px.
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
