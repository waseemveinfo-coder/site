"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "./ThemeToggle";
import { mainNav, site, type MainNavItem, type NavLink } from "@/lib/site";

type MenuItem = Extract<MainNavItem, { kind: "menu" }>;

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  // Close everything on navigation (adjust state during render, no effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  // Escape closes and returns focus to the trigger; outside click closes.
  useEffect(() => {
    if (!openMenu && !drawerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (openMenu) document.getElementById(`trigger-${openMenu}`)?.focus();
      setOpenMenu(null);
      setDrawerOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu, drawerOpen]);

  // Lock page scroll behind the mobile drawer.
  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  function hoverOpen(id: string | null, e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(id), id ? 80 : 180);
  }

  const active = mainNav.find((i): i is MenuItem => i.kind === "menu" && i.id === openMenu);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-surface"
      onPointerLeave={(e) => hoverOpen(null, e)}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-10 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
      >
        تخطَّ إلى المحتوى
      </a>

      <Container className="flex h-[var(--header-h)] items-center gap-3 sm:gap-6">
        <Logo />

        <nav aria-label="القائمة الرئيسية" className="hidden h-full lg:block">
          <ul className="flex h-full items-stretch gap-1">
            {mainNav.map((item) =>
              item.kind === "link" ? (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center px-3 text-[15px] font-medium text-ink hover:text-brand-ink aria-[current=page]:text-brand-ink"
                    onPointerEnter={(e) => hoverOpen(null, e)}
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.id} className="flex">
                  <button
                    id={`trigger-${item.id}`}
                    type="button"
                    aria-expanded={openMenu === item.id}
                    aria-controls={`menu-${item.id}`}
                    onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                    onPointerEnter={(e) => hoverOpen(item.id, e)}
                    className="group relative flex items-center gap-1 px-3 text-[15px] font-medium text-ink hover:text-brand-ink aria-expanded:text-brand-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand after:opacity-0 aria-expanded:after:opacity-100"
                  >
                    {item.label}
                    <Icon name="chevron" size={16} className="transition-transform duration-150 group-aria-expanded:rotate-180" />
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <span className="hidden sm:block">
            <ThemeToggle />
          </span>
          {site.loginHref && (
            <a href={site.loginHref} className="hidden px-3 text-[15px] font-medium text-ink hover:text-brand-ink sm:block">
              تسجيل الدخول
            </a>
          )}
          <ButtonLink href={site.demoHref} size="sm">
            اطلب عرضاً<span className="max-[379px]:hidden"> تجريبياً</span>
          </ButtonLink>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md text-ink hover:bg-surface-2 lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <Icon name={drawerOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>

      {/* Desktop mega-menu panel */}
      {active && (
        <div
          id={`menu-${active.id}`}
          className="absolute inset-x-0 top-full hidden border-b border-line bg-surface lg:block"
          onPointerEnter={(e) => hoverOpen(active.id, e)}
        >
          <Container className="grid grid-cols-[1fr_260px] gap-8 py-6">
            <ul className="grid grid-cols-2 gap-1">
              {active.links.map((l) => (
                <li key={l.href}>
                  <MenuLink link={l} />
                </li>
              ))}
            </ul>
            <MenuAside item={active} />
          </Container>
        </div>
      )}

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <Container className="py-4">
            <nav aria-label="القائمة الرئيسية">
              <ul className="divide-y divide-line">
                {mainNav.map((item) =>
                  item.kind === "link" ? (
                    <li key={item.href}>
                      <Link href={item.href} className="block py-4 font-display text-[17px] font-semibold">
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <MobileGroup key={item.id} item={item} />
                  ),
                )}
              </ul>
            </nav>
            <div className="mt-6 grid gap-3 border-t border-line pt-6">
              <div className="flex items-center justify-between sm:hidden">
                <span className="font-medium">المظهر</span>
                <ThemeToggle />
              </div>
              <ButtonLink href={site.demoHref}>{site.demoLabel}</ButtonLink>
              {site.loginHref && (
                <a href={site.loginHref} className="py-2 text-center font-medium">
                  تسجيل الدخول
                </a>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function MenuLink({ link }: { link: NavLink }) {
  return (
    <Link href={link.href} className="group flex gap-3 rounded-md p-3 hover:bg-surface-2">
      {link.icon && (
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-line text-brand-ink group-hover:border-brand">
          <Icon name={link.icon} />
        </span>
      )}
      <span>
        <span className="block font-display text-[15px] font-semibold text-ink">{link.label}</span>
        {link.desc && <span className="block text-sm leading-6 text-muted">{link.desc}</span>}
      </span>
    </Link>
  );
}

function MenuAside({ item }: { item: MenuItem }) {
  // Product menu points at the hero feature; others get a single demo prompt.
  if (item.aside) {
    return (
      <div className="flex flex-col justify-between rounded-md border border-line bg-bg p-5">
        <div>
          <p className="text-sm text-muted">ميزة ديرلي الأساسية</p>
          <p className="mt-1 font-display text-lg font-bold">
            الموظف يخدم العميل بدون ما يشوف رقمه
          </p>
          <p className="mt-2 font-mono text-[15px] tracking-wider text-ink" dir="ltr">
            05••••••89
          </p>
        </div>
        <Link href={item.aside.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink hover:underline">
          {item.aside.label}: {item.aside.desc}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between rounded-md border border-line bg-bg p-5">
      <p className="font-display text-lg font-bold">شوف ديرلي على شغلك أنت</p>
      <p className="mt-2 text-sm text-muted">جلسة مع فريقنا، على أمثلة من شغلك أنت.</p>
      <Link href={site.demoHref} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink hover:underline">
        {site.demoLabel}
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}

function MobileGroup({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`m-${item.id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 font-display text-[17px] font-semibold"
      >
        {item.label}
        <Icon name="chevron" size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul id={`m-${item.id}`} className="pb-3">
          {item.links.map((l) => (
            <li key={l.href}>
              <MenuLink link={l} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
