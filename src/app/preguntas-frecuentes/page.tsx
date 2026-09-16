import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { FaqSection } from "@/components/sections/FaqSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Preguntas frecuentes sobre desarrollo web",
  path: "/preguntas-frecuentes",
  description:
    "Respuestas sobre precios, tiempos, SEO, dominio, mantenimiento y desarrollo web en Uruguay. Conocé cómo trabajamos en BPR Soluciones.",
});

export default function PreguntasFrecuentesPage() {
  return (
    <div className="page-theme page-theme-home">
      <FaqJsonLd page="faq" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
        ]}
      />
      <FaqSection page="faq" heading="h1" />
      <CTASection />
    </div>
  );
}
