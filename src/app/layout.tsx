import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import { ViewTransition } from "react";
import { site } from "@/lib/site";
import { TalkToHuman } from "@/components/layout/TalkToHuman";
import "./globals.css";

// Self-hosted at build time by next/font; no request goes to Google at runtime.
const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["600", "800"],
  display: "swap",
  variable: "--font-kufi",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ar_AR",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1d2b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${kufi.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <SiteHeader />
        <main id="main" className="flex-1">
          {/* Route changes cross-fade here; header and footer stay put. */}
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <SiteFooter />
        <TalkToHuman />
      </body>
    </html>
  );
}
