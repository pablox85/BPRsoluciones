import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectCards } from "@/components/ui/ProjectCards";
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
    category: "Desarrollo web - proyectos",
    title: "Sitios que convierten visitas en consultas",
    description:
      "Diseñamos páginas claras, rápidas y preparadas para que cada visita encuentre el próximo paso.",
    backTitle: "Webs pensadas para maximizar las ventas.",
    backDescription:
      "Empresas que contrataron nuestros servicios.",
    backDescription2: "Lorem ipsum.",
    href: "https://www.polarizadosdeleste.com/?utm_source=BprSoluciones",
    linkLabel: "Polarizados del este",
    accent: "from-neon-mint/25 via-ink-850 to-ink-950",
  },
  {
    category: "Automatización",
    title: "Procesos más simples para tu equipo",
    description:
      "Conectamos herramientas y automatizamos tareas repetitivas.",
    backTitle: "Menos tareas repetitivas, más tiempo para crecer.",
    backDescription: "Somos partners de",
    backDescription2: "Automatizá la atención al cliente, optimizá procesos y generá más oportunidades de venta con inteligencia artificial.",
    highlightBackDescription2: true,
    href: "https://meigahub.com/?utm_source=BprSoluciones",
    linkLabel: "MeigaHub.com",
    linkInline: true,
    accent: "from-neon-cyan/25 via-ink-850 to-ink-950",
  },
  {
    category: "Soluciones a medida",
    title: "Una solución adaptada a tu negocio",
    description:
      "Construimos experiencias digitales flexibles cuando tu proyecto necesita algo más que una web estándar.",
    backTitle: "Tecnología que se adapta a tu forma de trabajar.",
    backDescription:
      "Diseñamos software a medida para resolver necesidades concretas y acompañar la evolución de tu negocio.",
    backDescription2: "Lorem ipsum.",
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
        <ProjectCards projects={projects} />
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
