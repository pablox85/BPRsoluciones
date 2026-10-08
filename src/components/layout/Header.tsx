"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileSecondaryLinks = navLinks.filter((link) =>
    ["/servicios", "/blog"].includes(link.href),
  );

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div className="relative mx-auto flex min-h-16 w-full max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-white/[0.1] bg-ink-950/80 px-3 shadow-[0_16px_45px_rgba(1,13,15,0.3),inset_0_1px_0_rgba(223,255,250,0.05)] backdrop-blur-2xl sm:px-5">
        <div className="shrink-0">
          <Logo />
        </div>
        <button
          type="button"
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-200 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="relative block size-5 text-[0px]">
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-[7px] rounded-full bg-current transition-[transform,opacity] duration-300 ease-out ${
                isMenuOpen ? "!translate-y-0 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-[transform,opacity] duration-200 ease-out ${
                isMenuOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 translate-y-[6px] rounded-full bg-current transition-[transform,opacity] duration-300 ease-out ${
                isMenuOpen ? "!translate-y-0 -rotate-45" : ""
              }`}
            />
            {isMenuOpen ? "×" : "☰"}
          </span>
        </button>
        <nav
          aria-label="Accesos destacados"
          className="mobile-secondary-nav basis-full pb-2 pt-2 md:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            {mobileSecondaryLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-9 items-center justify-center rounded-xl border px-3 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                    isActive
                      ? "border-neon-mint/35 bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(114,231,206,0.22)]"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:-translate-y-0.5 hover:border-neon-cyan/35 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
        <nav
          id="main-navigation"
          aria-label="Principal"
          className={`absolute left-0 right-0 top-full z-50 mt-2 flex max-h-[calc(100dvh-7rem)] origin-top flex-col gap-2 overflow-y-auto overscroll-contain rounded-[1.35rem] border border-white/[0.1] bg-ink-950/95 p-2 shadow-[0_16px_45px_rgba(1,13,15,0.35)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out will-change-[opacity,transform] md:static md:order-none md:mt-0 md:w-auto md:flex-row md:gap-1 md:max-h-none md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none md:transition-none ${
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none invisible scale-y-[0.96] -translate-y-1 opacity-0 md:pointer-events-auto md:visible md:scale-y-100 md:translate-y-0 md:opacity-100"
          }`}
        >
          {navLinks.map((link) => (
            (() => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              const isContact = link.href === "/contacto";
              const isMobileSecondary = mobileSecondaryLinks.some(
                (secondaryLink) => secondaryLink.href === link.href,
              );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isMobileSecondary ? "hidden md:flex" : "flex"} relative min-h-10 items-center justify-center whitespace-nowrap rounded-xl px-2 text-center text-[0.7rem] font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 md:px-3 md:text-sm ${
                    isContact
                    ? "border border-neon-mint/45 bg-neon-mint px-3 text-ink-950 shadow-[0_0_24px_rgba(0,255,198,0.16),inset_0_1px_0_rgba(255,255,255,0.35)] hover:-translate-y-0.5 hover:bg-white md:px-4"
                      : isActive
                        ? "premium-surface border-neon-mint/35 bg-[linear-gradient(145deg,rgba(24,47,49,0.78),rgba(10,24,27,0.72))] text-white shadow-[inset_0_1px_0_rgba(223,255,250,0.035)] md:border-transparent md:bg-transparent md:shadow-none"
                        : "border border-white/10 bg-[linear-gradient(145deg,rgba(24,47,49,0.62),rgba(10,24,27,0.56))] text-zinc-300 shadow-[inset_0_1px_0_rgba(223,255,250,0.035)] hover:-translate-y-0.5 hover:border-neon-cyan/35 hover:bg-ink-850 hover:text-white md:border-transparent md:bg-transparent md:shadow-none md:hover:translate-y-0 md:hover:border-transparent md:hover:bg-white/[0.05]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })()
            ))}
        </nav>
      </div>
    </header>
  );
}
