import type { CSSProperties } from "react";
import { processSteps } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <Section className="pt-0">
      <SectionHeader
        eyebrow="Proceso"
        title="Un metodo directo para lanzar, medir y mejorar"
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map(([number, label], index) => (
          <article
            key={number}
            className="scroll-reveal stagger-card rounded-2xl border border-white/10 bg-ink-900/70 p-5"
            style={{ "--stagger-delay": `${index * 80}ms` } as CSSProperties}
          >
            <p className="font-heading text-sm font-bold text-neon-mint">{number}</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-white">{label}</h3>
          </article>
        ))}
      </div>
    </Section>
  );
}
