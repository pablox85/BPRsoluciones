import { CalendarDays, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Buttons";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export function CTASection() {
  return (
    <Section className="pt-0">
      <div className="scroll-reveal reveal-up rounded-3xl border border-neon-mint/30 bg-gradient-to-br from-neon-mint/12 via-white/[0.045] to-neon-cyan/10 p-6 shadow-glow backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Tu empresa necesita mas que una web linda.
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
            Necesita una infraestructura digital rapida, medible y preparada
            para convertir visitas en clientes.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:flex">
          <ButtonLink href={siteConfig.whatsappUrl} className="gap-2">
            <MessageCircle className="size-4" aria-hidden="true" />
            Hablar por WhatsApp
          </ButtonLink>
          <ButtonLink href={siteConfig.calendarUrl} variant="secondary" className="gap-2">
            <CalendarDays className="size-4" aria-hidden="true" />
            Agendar llamada
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
