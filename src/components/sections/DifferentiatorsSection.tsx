"use client";

import { Cpu, Gauge, LineChart, Network, SearchCheck, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { differentiators } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";

const icons = [SearchCheck, Gauge, Sparkles, Cpu, LineChart, Network];

export function DifferentiatorsSection() {
  const [revealed, setRevealed] = useState(false);
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
          return (
            <article
              key={item}
              className={`stagger-card rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:border-neon-mint/35 hover:bg-white/[0.065] ${
                revealed ? "is-visible" : ""
              }`}
              style={{ "--stagger-delay": `${index * 80}ms` } as CSSProperties}
            >
              <Icon className="mb-5 size-6 text-neon-cyan" aria-hidden="true" />
              <h3 className="font-heading text-lg font-semibold text-white">{item}</h3>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
