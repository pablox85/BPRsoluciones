import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Buttons";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="overflow-x-clip px-[clamp(1rem,4vw,2rem)] pb-[clamp(2.5rem,6vw,7rem)] pt-[clamp(1.5rem,5vw,5rem)]">
      <div className="mx-auto grid max-w-6xl items-center gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <p className="eyebrow mb-[clamp(0.75rem,2vw,1.25rem)] inline-flex border-l-2 border-neon-mint pl-3">
            BPR soluciones digitales
          </p>
          <h1 className="max-w-2xl font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-white">
            Tu página web profesional desde USD 150.
          </h1>
          <ul
            aria-label="Beneficios principales"
            className="mt-[clamp(0.75rem,2vw,1.5rem)] grid max-w-2xl gap-1 text-[clamp(1.15rem,2.5vw,1.5rem)] font-medium leading-[1.35] text-zinc-100"
          >
            {[
              "Conseguí más clientes.",
              "Mostrá tu negocio.",
              "Generá consultas.",
            ].map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <Check
                  className="size-4 shrink-0 text-neon-mint"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-[clamp(0.75rem,2vw,1.25rem)] max-w-xl space-y-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.95rem,1.5vw,1.125rem)] leading-[1.65] text-zinc-300">
            <p>
              Diseñamos páginas web rápidas y modernas para negocios y empresas de Uruguay,
              diseñadas para convertir visitas en consultas.
            </p>
            <p>
              También desarrollamos automatizaciones con inteligencia artificial y software a
              medida para ahorrar tiempo y optimizar procesos.
            </p>
          </div>
          <div
            data-hero-cta
            className="mt-[clamp(1rem,2.5vw,2rem)] grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-3 [&>a:first-child]:col-span-full sm:flex sm:flex-wrap sm:[&>a:first-child]:col-auto"
          >
            <ButtonLink href={siteConfig.whatsappUrl} className="gap-2">
              <FaWhatsapp className="size-4" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
            <Link
              href="/servicios"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-neon-cyan/35 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:border-neon-mint/60 hover:bg-white/[0.1]"
            >
              Ver planes web
            </Link>
            <Link
              href="/desarrollo-web-uruguay"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-zinc-200 transition hover:border-neon-mint/40 hover:text-white"
            >
              Desarrollo web
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 justify-center">
          <Image
            src="/images/bpr-hero.webp"
            alt="BPR Soluciones"
            width={960}
            height={388}
            sizes="(max-width: 511px) calc(100vw - 32px), (max-width: 1023px) 480px, (max-width: 1151px) 44vw, 480px"
            className="hero-logo-glow h-auto w-full max-w-[30rem] object-contain"
            preload
          />
        </div>
      </div>
    </section>
  );
}
