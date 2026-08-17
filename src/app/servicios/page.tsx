import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceDetailsSection } from "@/components/sections/ServiceDetailsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Servicios IT, webs, SEO y automatizacion",
  path: "/servicios",
  description:
    "Planes de desarrollo web, SEO tecnico, automatizacion con IA e integraciones digitales para empresas que buscan mas leads.",
});

export default function ServicesPage() {
  return (
    <div className="page-theme page-theme-services">
      <ServiceDetailsSection />
      <ServicesSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
