import type { CSSProperties } from "react";
import { processSteps } from "@/config/site";
import { cardSurfaceClass } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <Section className="pt-0">
      <SectionHeader
        eyebrow="Proceso"
        title="Un metodo directo para lanzar, medir y mejorar"
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <article
            key={step.number}
            className={`scroll-reveal stagger-card ${cardSurfaceClass} p-5 transition hover:border-neon-cyan/30 hover:bg-ink-850`}
            style={{ "--stagger-delay": `${index * 80}ms` } as CSSProperties}
          >
            <p className="font-heading text-sm font-bold text-neon-mint">{step.number}</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{step.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
