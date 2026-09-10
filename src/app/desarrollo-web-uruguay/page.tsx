import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeader } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Desarrollo web en Uruguay para empresas",
  path: "/desarrollo-web-uruguay",
  description:
    "Desarrollo web en Uruguay para empresas que buscan una página rápida, profesional y preparada para generar consultas. Conocé nuestros planes y soluciones a medida.",
});

export default function DesarrolloWebUruguayPage() {
  return (
    <div className="page-theme page-theme-home">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Desarrollo web en Uruguay", path: "/desarrollo-web-uruguay" },
        ]}
      />
      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <SectionHeader
          eyebrow="Desarrollo web"
          title="Desarrollo web en Uruguay para empresas que quieren crecer"
          text="Creamos páginas web claras, rápidas y pensadas para transformar visitas en consultas. Combinamos estrategia comercial, tecnología y una base preparada para Google."
          heading="h1"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Una web con un objetivo", "Definimos la estructura y los mensajes para que cada sección ayude a tu empresa a explicar mejor lo que ofrece y facilitar el contacto."],
            ["Rendimiento y experiencia", "Diseñamos sitios adaptados a celulares, rápidos de navegar y fáciles de mantener para que la experiencia acompañe a tu propuesta."],
            ["Base para posicionar", "Trabajamos títulos, contenido, estructura técnica y medición desde el inicio para que el sitio pueda ganar visibilidad de forma sostenida."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-ink-900/70 p-5 sm:p-6">
              <h2 className="font-heading text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="max-w-3xl rounded-3xl border border-neon-cyan/20 bg-ink-900/70 p-6 sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Elegí el punto de partida adecuado</h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">Desde una landing para presentar tu negocio hasta una web corporativa o una solución a medida, el alcance se adapta a lo que necesitás hoy y a cómo querés crecer mañana.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/servicios" className="text-neon-mint underline underline-offset-4 hover:text-white">Ver planes y precios</Link>
            <Link href="/blog" className="text-neon-cyan underline underline-offset-4 hover:text-white">Leer guías sobre web y SEO</Link>
          </div>
        </div>
      </Section>
      <CTASection />
    </div>
  );
}
