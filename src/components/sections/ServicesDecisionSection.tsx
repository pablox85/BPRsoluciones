import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";

const options = [
  {
    title: "Lanzar una presencia profesional",
    text: "Para presentar un servicio, recibir consultas y empezar con una web clara, rápida y lista para usar.",
    href: "#starter",
    label: "Ver plan Starter",
  },
  {
    title: "Captar más oportunidades",
    text: "Para empresas que necesitan explicar mejor su propuesta, posicionarse y medir qué genera interés.",
    href: "#business",
    label: "Ver plan Business",
  },
  {
    title: "Resolver algo más específico",
    text: "Para automatizar procesos, integrar herramientas o construir una solución que acompañe una operación más compleja.",
    href: "#soluciones-a-medida",
    label: "Ver soluciones a medida",
  },
];

export function ServicesDecisionSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Cómo elegir"
        title="Elegí el plan según lo que tu empresa necesita resolver"
        text="No se trata solo de sumar secciones: cada alternativa responde a un momento distinto de tu negocio."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option) => (
          <article key={option.title} className="rounded-2xl border border-white/10 bg-ink-900/70 p-5 sm:p-6">
            <h3 className="font-heading text-xl font-semibold text-white">{option.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{option.text}</p>
            <Link
              href={option.href}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-neon-mint underline underline-offset-4 transition hover:text-white"
            >
              {option.label}
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
