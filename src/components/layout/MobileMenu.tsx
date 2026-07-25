"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/config/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

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
        <div className="absolute left-4 right-4 top-20 rounded-2xl border border-neon-mint/25 bg-ink-950/95 p-4 shadow-glow backdrop-blur-xl">
          <nav aria-label="Menu movil" className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-zinc-100 transition hover:bg-white/[0.07]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
