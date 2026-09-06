import { serviceDetails, siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function ServicesJsonLd() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": serviceDetails.map(service => {
      const fragment = service.name.toLowerCase().replaceAll(" ", "-");
      const url = `${siteConfig.domain}/servicios#${fragment}`;
      const price = /^USD (\d+(?:\.\d{1,2})?)$/.exec(service.price)?.[1];
      return {
        "@type": "Service",
        "@id": `${siteConfig.domain}/#service-${fragment}`,
        name: service.name,
        description: service.description,
        url,
        provider: { "@id": `${siteConfig.domain}/#organization` },
        areaServed: { "@type": "Country", name: "Uruguay" },
        ...(price ? { offers: {
          "@type": "Offer",
          name: service.name,
          price,
          priceCurrency: "USD",
          url,
          seller: { "@id": `${siteConfig.domain}/#organization` },
        } } : {}),
      };
    }),
  }} />;
}
