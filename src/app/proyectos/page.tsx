import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeader } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Nuestros proyectos | BPR Soluciones",
  path: "/proyectos",
  description:
    "Conocé algunos de los proyectos web y soluciones digitales que desarrollamos para empresas y emprendimientos.",
});

const projects = [
  {
    category: "Desarrollo web",
    title: "Sitios que convierten visitas en consultas",
    description:
      "Diseñamos páginas claras, rápidas y preparadas para que cada visita encuentre el próximo paso.",
    accent: "from-neon-mint/25 via-ink-850 to-ink-950",
  },
  {
    category: "Automatización",
    title: "Procesos más simples para tu equipo",
    description:
      "Conectamos herramientas y automatizamos tareas repetitivas para ahorrar tiempo y responder mejor.",
    accent: "from-neon-cyan/25 via-ink-850 to-ink-950",
  },
  {
    category: "Soluciones a medida",
    title: "Una solución adaptada a tu negocio",
    description:
      "Construimos experiencias digitales flexibles cuando tu proyecto necesita algo más que una web estándar.",
    accent: "from-violet-400/20 via-ink-850 to-ink-950",
  },
];

export default function ProjectsPage() {
  return (
    <div className="page-theme page-theme-home">
      <BreadcrumbJsonLd
        items={[{ name: "Inicio", path: "/" }, { name: "Nuestros proyectos", path: "/proyectos" }]}
      />
      <Section className="pb-8 pt-16 sm:pt-24 lg:pb-12 lg:pt-32">
        <SectionHeader
          eyebrow="Nuestros proyectos"
          title="Ideas digitales que se convierten en resultados."
          text="Cada proyecto parte de una necesidad concreta: mejorar la presencia online, ganar tiempo o hacer crecer el negocio."
          heading="h1"
        />
      </Section>
      <Section className="pt-8 lg:pt-12">
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 shadow-card transition hover:-translate-y-1 hover:border-neon-cyan/35"
            >
              <div className={`flex min-h-48 items-end bg-gradient-to-br ${project.accent} p-6`}>
                <span className="rounded-full border border-white/15 bg-ink-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neon-mint">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/contacto" className="text-neon-mint underline underline-offset-4 hover:text-white">
            Hablemos de tu próximo proyecto
          </Link>
        </div>
      </Section>
      <CTASection />
    </div>
  );
}
