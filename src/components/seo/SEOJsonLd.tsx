import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function SEOJsonLd() {
  const organizationId = `${siteConfig.domain}/#organization`;
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": organizationId,
          name: siteConfig.name,
          url: siteConfig.domain,
          description: siteConfig.description,
          email: siteConfig.email,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.domain}/images/bprLogo.png`,
            width: 1972,
            height: 798,
          },
          areaServed: { "@type": "Country", name: "Uruguay" },
          knowsAbout: ["Desarrollo web", "Automatización", "Inteligencia artificial", "Software a medida"],
        },
        {
          "@type": "WebSite",
          "@id": `${siteConfig.domain}/#website`,
          name: siteConfig.name,
          url: siteConfig.domain,
          inLanguage: "es-UY",
          publisher: { "@id": organizationId },
        },
      ],
    }} />
  );
}
