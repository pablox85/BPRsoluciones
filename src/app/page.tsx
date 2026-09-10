import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Páginas web en Uruguay para empresas",
  path: "/",
  description:
    "Páginas web en Uruguay para empresas que buscan generar consultas. Desarrollo web, automatizaciones con IA y software a medida para hacer crecer tu negocio.",
});

export default function HomePage() {
  return (
    <div className="page-theme page-theme-home">
      <FaqJsonLd page="home" />
      <HeroSection />
      <TrustBar />
      <ServicesSection showDetailsLinks />
      <DifferentiatorsSection />
      <ProcessSection />
      <FaqSection page="home" />
      <CTASection />
    </div>
  );
}
