"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { serviceDetails, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Buttons";
import { cardSurfaceClass } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";

const getWhatsAppInquiryUrl = (serviceName: string) => {
  const url = new URL(siteConfig.whatsappUrl);
  url.searchParams.set(
    "text",
    `Hola, quiero consultar por el servicio ${serviceName}.`,
  );

  return url.toString();
};

const homePlanIds: Record<string, string> = {
  Starter: "starter",
  Business: "business",
  Premium: "premium",
  "Soluciones a medida": "a-medida",
};

export function ServiceDetailsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [animationSettled, setAnimationSettled] = useState(false);
  const pendingScrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setAnimationSettled(true), 900);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const planId = new URLSearchParams(window.location.search).get("plan");
    const index = serviceDetails.findIndex(
      (service) => service.name.toLowerCase().replaceAll(" ", "-") === planId,
    );

    if (index < 0) return;

    const frameId = window.requestAnimationFrame(() => setOpenIndex(index));

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const card = pendingScrollRef.current;
    if (!card) return;

    const timeoutId = window.setTimeout(() => {
      card.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      pendingScrollRef.current = null;
    }, 320);

    return () => window.clearTimeout(timeoutId);
  }, [openIndex]);

  const toggleService = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    pendingScrollRef.current =
      openIndex === index ? null : event.currentTarget.closest("article");
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <Section className="pt-10 sm:pt-14 lg:pt-16">
      <SectionHeader
        eyebrow="Servicios"
        title="Páginas web económicas en Uruguay para hacer crecer tu negocio"
        text="Compará planes de páginas web desde USD 150 y elegí el que mejor se adapta a tu empresa. Si estás buscando páginas web baratas en Uruguay, te ayudamos a encontrar una opción clara, profesional y preparada para crecer. También creamos automatizaciones con IA, integraciones y software a medida."
        heading="h1"
      />
      <p className="-mt-6 mb-10 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
        ¿Querés conocer nuestro enfoque? Visitá la página de{" "}
        <Link href="/desarrollo-web-uruguay" className="text-neon-mint underline underline-offset-4">
          desarrollo web en Uruguay
        </Link>.
      </p>

      <div className="grid gap-5">
        {serviceDetails.map((service, index) => (
          <article
            key={service.name}
            id={service.name.toLowerCase().replaceAll(" ", "-")}
            className={`scroll-mt-28 ${cardSurfaceClass} p-0 transition hover:border-neon-cyan/30 hover:bg-ink-850 ${
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
              onClick={(event) => toggleService(index, event)}
              className="flex w-full flex-col gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-mint/70 sm:p-6"
            >
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-white">
                    {service.name}
                  </h2>
                  <span className="rounded-full border border-neon-mint/30 bg-neon-mint/10 px-3 py-1 text-xs font-bold text-neon-mint">
                    {service.price}
                  </span>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-neon-cyan">
                  {openIndex === index ? "Ocultar" : "Ver detalle"}
                </span>
              </div>
              <p className="text-left text-base font-semibold leading-7 text-zinc-100">
                {service.tagline}
              </p>
            </button>

            <div
              id={`service-detail-${index}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="grid gap-6 px-5 pb-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 sm:px-6 sm:pb-6">
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
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <ButtonLink
                        href={getWhatsAppInquiryUrl(service.name)}
                        variant="primary"
                        className="w-full gap-2 sm:w-72"
                      >
                        Consultar por WhatsApp
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </ButtonLink>
                      <Link
                        href={`/?plan=${homePlanIds[service.name]}#plan-${homePlanIds[service.name]}`}
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-neon-mint underline underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint/70"
                      >
                        Ver este plan en Inicio
                      </Link>
                    </div>
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
