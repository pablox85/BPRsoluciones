"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/config/site";

const MOBILE_MENU_EVENT = "bpr-mobile-menu-change";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);
  const pathname = usePathname();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);

    return () => document.body.classList.remove("mobile-menu-open");
  }, [open]);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const updateMenu = (nextOpen: boolean) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    if (nextOpen) {
      setRendered(true);
      setClosing(false);
    } else {
      setClosing(true);
      closeTimerRef.current = setTimeout(() => {
        setRendered(false);
        setClosing(false);
        closeTimerRef.current = null;
      }, 280);
    }

    setOpen(nextOpen);
    window.dispatchEvent(
      new CustomEvent(MOBILE_MENU_EVENT, { detail: { open: nextOpen } }),
    );
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => updateMenu(!open)}
        className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {rendered ? (
        <>
          <button
            type="button"
            aria-label="Cerrar menu"
            onClick={() => updateMenu(false)}
            className={`mobile-menu-backdrop absolute inset-x-0 top-20 z-[60] h-[calc(100dvh-5rem)] cursor-default bg-ink-950/80 backdrop-blur-xl ${closing ? "mobile-menu-backdrop--closing" : "mobile-menu-backdrop--opening"}`}
          />
          <div className={`mobile-menu-panel absolute left-4 right-4 top-20 z-[70] rounded-2xl border border-white/[0.08] p-4 ${closing ? "mobile-menu-panel--closing" : "mobile-menu-panel--opening"}`}>
            <nav aria-label="Menu movil" className="grid gap-2">
              {navLinks.map((link) => (
                (() => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => updateMenu(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-xl border-l-2 px-4 py-3 text-base font-semibold transition hover:bg-white/[0.07] ${
                        isActive
                          ? "border-neon-mint bg-neon-mint/10 text-neon-mint"
                          : "border-transparent text-zinc-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })()
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
