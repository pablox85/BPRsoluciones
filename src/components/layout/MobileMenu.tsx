"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/config/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Cerrar menu"
            onClick={() => setOpen(false)}
            className="absolute left-0 right-0 top-20 z-40 h-[calc(100dvh-5rem)] cursor-default bg-ink-950/70 backdrop-blur-[2px]"
          />
          <div className="absolute left-4 right-4 top-20 z-50 rounded-2xl border border-neon-mint/25 bg-ink-950/95 p-4 shadow-glow backdrop-blur-xl">
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
                      onClick={() => setOpen(false)}
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
