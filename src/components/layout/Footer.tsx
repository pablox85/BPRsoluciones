import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { getEmailHref } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            Infraestructura digital para empresas que necesitan velocidad, SEO,
            automatizacion y medicion real.
          </p>
        </div>
        <nav aria-label="Footer" className="grid gap-3 text-sm">
          <p className="font-heading font-semibold text-white">Navegacion</p>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex min-h-11 items-center text-zinc-400 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="grid content-start gap-3 text-sm">
          <p className="font-heading font-semibold text-white">Contacto</p>
          <Link href={siteConfig.whatsappUrl} className="flex min-h-11 items-center gap-2 text-zinc-400 hover:text-white">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </Link>
          <Link href={getEmailHref()} className="flex min-h-11 items-center gap-2 text-zinc-400 hover:text-white">
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.email}
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-zinc-500">
        © {new Date().getFullYear()} BPR Soluciones. Todos los derechos reservados.
      </p>
    </footer>
  );
}
