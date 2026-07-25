"use client";

import {
  ChevronDown,
  Cpu,
  Gauge,
  LineChart,
  Network,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { differentiators } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";

const icons = [SearchCheck, Gauge, Sparkles, Cpu, LineChart, Network];

export function DifferentiatorsSection() {
  const [revealed, setRevealed] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Section className="pt-0">
      <SectionHeader
        eyebrow="Diferenciales"
        title="Pensado para conversion de clientes, no solo para verse bien"
      />
      <div ref={sectionRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item, index) => {
          const Icon = icons[index];
          const isOpen = openIndex === index;
          return (
            <article
              key={item.title}
              className={`stagger-card rounded-2xl border bg-white/[0.045] p-5 backdrop-blur-xl transition hover:bg-white/[0.065] ${
                isOpen
                  ? "border-neon-mint/50 shadow-glow"
                  : "border-white/10 hover:border-neon-mint/35"
              } ${revealed ? "is-visible" : ""}`}
              style={{ "--stagger-delay": `${index * 80}ms` } as CSSProperties}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`differentiator-panel-${index}`}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
                className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint/70"
              >
                <span className="flex items-center gap-4">
                  <Icon className="size-6 shrink-0 text-neon-cyan" aria-hidden="true" />
                  <span className="font-heading text-lg font-semibold text-white">
                    {item.title}
                  </span>
                </span>
                <ChevronDown
                  className={`size-6 shrink-0 text-zinc-500 transition ${
                    isOpen ? "rotate-180 text-neon-cyan" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`differentiator-panel-${index}`}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
