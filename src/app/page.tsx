import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "Desarrollo web para empresas en Uruguay. Creamos sitios rápidos, automatizaciones con IA y software a medida para generar consultas y simplificar procesos.",
});

export default function HomePage() {
  return (
    <div className="page-theme page-theme-home">
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
