"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { serviceDetails, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Buttons";
import { Section, SectionHeader } from "@/components/ui/Section";

export function ServiceDetailsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [animationSettled, setAnimationSettled] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setAnimationSettled(true), 900);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <Section className="pt-10 sm:pt-14 lg:pt-16">
      <SectionHeader
        eyebrow="Servicios"
        title="Planes web, SEO y automatizacion para cada etapa"
        text="Cada plan esta pensado para una etapa distinta: lanzar rapido, profesionalizar la presencia digital, escalar SEO o automatizar procesos."
        heading="h1"
      />

      <div className="grid gap-5">
        {serviceDetails.map((service, index) => (
          <article
            key={service.name}
            id={service.name.toLowerCase().replaceAll(" ", "-")}
            className={`rounded-3xl border bg-white/[0.045] p-5 backdrop-blur-xl transition hover:bg-white/[0.065] sm:p-6 ${
              animationSettled ? "opacity-100" : "stagger-card is-visible"
            } ${
              openIndex === index
                ? "border-neon-mint/45 shadow-glow"
                : "border-white/10 hover:border-neon-mint/35"
            }`}
            style={{ "--stagger-delay": `${index * 90}ms` } as CSSProperties}
          >
            <button
              type="button"
              aria-expanded={openIndex === index}
              aria-controls={`service-detail-${index}`}
              onClick={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              className="flex w-full flex-col gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-mint/70 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-2xl font-semibold text-white">
                  {service.name}
                </h2>
                <span className="rounded-full border border-neon-mint/30 bg-neon-mint/10 px-3 py-1 text-xs font-bold text-neon-mint">
                  {service.price}
                </span>
              </div>
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-neon-cyan">
                {openIndex === index ? "Ocultar" : "Ver detalle"}
              </span>
            </button>

            <p className="mt-4 text-base font-semibold leading-7 text-zinc-100">
              {service.tagline}
            </p>

            <div
              id={`service-detail-${index}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="mt-5 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
                  <div>
                    <p className="text-sm leading-7 text-zinc-400">
                      {service.description}
                    </p>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-ink-950/55 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-neon-cyan">
                        Ideal para
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        {service.bestFor}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      Incluye
                    </h3>
                    <ul className="mt-4 grid gap-3">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-6 text-zinc-300"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-5 shrink-0 text-neon-green"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonLink
                      href={siteConfig.calendarUrl}
                      variant={index === 1 ? "primary" : "secondary"}
                      className="mt-6 w-full gap-2 sm:w-auto"
                    >
                      Consultar {service.name}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
