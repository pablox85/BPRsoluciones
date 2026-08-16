"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-ink-950/75 shadow-[0_12px_35px_rgba(1,13,15,0.18)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            (() => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition hover:text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:origin-left after:rounded-full after:bg-neon-mint after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-white after:scale-x-100"
                      : "text-zinc-300 after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })()
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
