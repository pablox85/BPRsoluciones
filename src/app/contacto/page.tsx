import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contacto y presupuestos en Uruguay",
  path: "/contacto",
  description:
    "Contanos qué necesita tu empresa en Uruguay. Consultá por desarrollo web, automatización con IA o software a medida por formulario, WhatsApp o email.",
});

export default function ContactPage() {
  return (
    <div className="page-theme page-theme-contact">
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto" }]} />
      <Section>
        <ContactForm />
      </Section>
    </div>
  );
}
