import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
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
            Desarrollo web, automatización e inteligencia artificial para empresas
            en Uruguay. Software a medida para simplificar tu trabajo.
          </p>
        </div>
        <nav aria-label="Footer" className="grid gap-3 text-sm">
          <p className="font-heading font-semibold text-white">Navegación</p>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex min-h-11 items-center text-zinc-400 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="grid content-start gap-3 text-sm">
          <p className="font-heading font-semibold text-white">Contacto</p>
          <Link
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-11 items-center gap-2 text-zinc-400 hover:text-white"
          >
            <FaWhatsapp className="size-4" aria-hidden="true" />
            +59891343651
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-11 items-center gap-2 text-zinc-400 hover:text-white"
          >
            <FaInstagram className="size-4" aria-hidden="true" />
            Bpr Soluciones
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href={getEmailHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 text-zinc-400 hover:text-white"
          >
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
