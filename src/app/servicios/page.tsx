import type { Metadata } from "next";
import { ServicesJsonLd } from "@/components/seo/ServicesJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceDetailsSection } from "@/components/sections/ServiceDetailsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Planes web y software a medida en Uruguay",
  path: "/servicios",
  description:
    "Compará planes de desarrollo web desde USD 150 y consultá por automatización con IA o software a medida para tu empresa en Uruguay. Conocé qué incluye cada plan.",
});

export default function ServicesPage() {
  return (
    <div className="page-theme page-theme-services">
      <ServicesJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }]} />
      <ServiceDetailsSection />
      <ServicesSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
