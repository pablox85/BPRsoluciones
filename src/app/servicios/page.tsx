import type { Metadata } from "next";
import { ServicesJsonLd } from "@/components/seo/ServicesJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceDetailsSection } from "@/components/sections/ServiceDetailsSection";
import { ServicesDecisionSection } from "@/components/sections/ServicesDecisionSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Páginas web económicas en Uruguay desde USD 150",
  path: "/servicios",
  description:
    "Páginas web económicas en Uruguay desde USD 150. Compará planes claros, elegí lo que tu negocio necesita y consultá por desarrollo web o soluciones a medida.",
});

export default function ServicesPage() {
  return (
    <div className="page-theme page-theme-services">
      <ServicesJsonLd />
      <FaqJsonLd page="services" />
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }]} />
      <ServiceDetailsSection />
      <ServicesDecisionSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <FaqSection page="services" />
      <CTASection />
    </div>
  );
}
