import { ArrowRight, MessageCircle, Search, TrendingUp, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Buttons";
import { siteConfig } from "@/config/site";

const metrics = [
  { label: "SEO Score", value: "96", icon: Search },
  { label: "CWV", value: "A+", icon: Zap },
  { label: "Leads", value: "+38%", icon: TrendingUp },
];

export function HeroSection() {
  return (
    <section className="px-4 pb-12 pt-10 sm:px-6 md:pt-16 lg:px-8 lg:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="scroll-reveal reveal-up">
          <p className="mb-4 inline-flex rounded-full border border-neon-mint/30 bg-neon-mint/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neon-mint">
            Web, SEO e integraciones
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-6xl">
            Webs rapidas. SEO real. Tecnologia que convierte.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Desarrollamos sitios web modernos, optimizados para Google y
            disenados para convertir visitas en clientes reales.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href={siteConfig.calendarUrl} className="gap-2">
              Agendar llamada
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={siteConfig.whatsappUrl} variant="secondary" className="gap-2">
              <MessageCircle className="size-4" aria-hidden="true" />
              Hablar por WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div
          className="scroll-reveal reveal-up rounded-[1.65rem] border border-neon-cyan/25 bg-white/[0.045] p-3 shadow-glow-cyan backdrop-blur-xl sm:p-4"
          style={{ "--stagger-delay": "120ms" } as CSSProperties}
        >
          <div className="rounded-[1.25rem] border border-white/10 bg-ink-950/80 p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Growth dashboard
                </p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-white">
                  Pipeline digital
                </h2>
              </div>
              <span className="rounded-full bg-neon-green/12 px-3 py-1 text-xs font-bold text-neon-green">
                live
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <Icon className="mb-4 size-5 text-neon-cyan" aria-hidden="true" />
                  <p className="font-heading text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs text-zinc-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-neon-mint/12 to-neon-cyan/8 p-4">
              <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
                <span>Visibilidad organica</span>
                <span>90 dias</span>
              </div>
              <div className="flex h-36 items-end gap-2">
                {[32, 48, 42, 58, 64, 76, 70, 86, 92, 98].map((height, index) => (
                  <span
                    key={height + index}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-neon-mint to-neon-cyan"
                    style={{ height: `${height}%`, opacity: 0.46 + index * 0.045 }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs text-zinc-500">Automatizaciones activas</p>
                <p className="mt-2 font-heading text-2xl font-semibold text-white">12</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs text-zinc-500">Eventos medidos</p>
                <p className="mt-2 font-heading text-2xl font-semibold text-white">1.8k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
