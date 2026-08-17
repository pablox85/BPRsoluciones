"use client";

import { Bot, ChevronDown, Gauge, LineChart, SearchCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cardSurfaceClass } from "@/components/ui/Card";

const items = [
  {
    label: "Posicionamiento Google",
    description: "Optimizamos tu web para Busquedas de Google",
    icon: SearchCheck,
  },
 {
  label: "Core Web Vitals",
  description:
    "Optimizacion de velocidad y experiencia de usuario para mejorar el rendimiento.",
  icon: Gauge,
},
  {
    label: "Analytics integrado",
    description: "Conocé cuántas personas visitan tu sitio y qué acciones generan más consultas.",
    icon: LineChart,
  },
  {
    label: "Automatizacion IA",
    description: "Ahorra tiempo, responde antes, genera ventas",
    icon: Bot,
  },
];

export function TrustBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    let frameId = 0;

    if (!section || revealed) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      frameId = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const revealIfVisible = () => {
      const { bottom, top } = section.getBoundingClientRect();

      if (top < window.innerHeight * 0.92 && bottom > 0) {
        setRevealed(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);
    revealIfVisible();
    window.addEventListener("scroll", revealIfVisible, { passive: true });
    window.addEventListener("resize", revealIfVisible);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfVisible);
      window.removeEventListener("resize", revealIfVisible);
    };
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      aria-label="Confianza"
      className="px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-start gap-3 md:grid-cols-4">
        {items.map(({ label, description, icon: Icon }, index) => (
          <article
            key={label}
            className={`stagger-card ${cardSurfaceClass} relative min-w-0 transition ${
              revealed ? "is-visible" : ""
            } ${
              openIndex === index ? "z-30" : "z-0"
            } ${
              openIndex === index
                ? "border-neon-mint/70 bg-ink-850 shadow-glow"
                : "border-transparent bg-ink-900 hover:border-neon-cyan/30 hover:bg-ink-850"
            }`}
            style={{ "--stagger-delay": `${index * 80}ms` } as CSSProperties}
          >
            <button
              type="button"
              aria-expanded={openIndex === index}
              aria-controls={`trust-panel-${index}`}
              onClick={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              className="relative z-10 flex min-h-20 min-w-0 w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-mint/70"
            >
              <Icon className="size-5 shrink-0 text-neon-mint" aria-hidden="true" />
              <h2 className="min-w-0 flex-1 text-sm font-semibold text-zinc-100">{label}</h2>
              <ChevronDown
                className={`size-4 shrink-0 text-zinc-500 transition ${
                  openIndex === index ? "rotate-180 text-neon-cyan" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`trust-panel-${index}`}
              className={`grid overflow-hidden px-3 transition-[grid-template-rows,opacity,transform] duration-300 ease-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-4 pl-8 pt-1 text-xs leading-5 text-zinc-400">
                  {description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
