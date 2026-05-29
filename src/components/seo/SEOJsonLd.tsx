import { siteConfig } from "@/config/site";

export function SEOJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    areaServed: ["Uruguay", "Latinoamerica", "Estados Unidos"],
    serviceType: [
      "Desarrollo web",
      "SEO tecnico",
      "Automatizacion digital",
      "Integraciones digitales",
    ],
    email: siteConfig.email,
    sameAs: [siteConfig.whatsappUrl],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "100",
      highPrice: "1000",
      offerCount: "4",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
