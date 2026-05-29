import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Buttons";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href={siteConfig.calendarUrl} className="gap-2">
            <CalendarDays className="size-4" aria-hidden="true" />
            Agendar llamada
          </ButtonLink>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
