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
    "BPR Soluciones crea webs rapidas, SEO tecnico, automatizacion e integraciones digitales para convertir visitas en clientes reales.",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
