import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  path: "/contacto",
  description:
    "Contacta a BPR Soluciones para crear una web rapida, mejorar SEO, automatizar procesos o integrar herramientas digitales.",
});

export default function ContactPage() {
  return (
    <Section>
      <ContactForm />
    </Section>
  );
}
