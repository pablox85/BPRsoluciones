import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

type BlogPostingJsonLdProps = {
  title: string;
  description: string;
  slug: string;
};

export function BlogPostingJsonLd({
  title,
  description,
  slug,
}: BlogPostingJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteConfig.domain}/blog/${slug}#article`,
    headline: title,
    description,
    url: new URL(`/blog/${slug}`, siteConfig.domain).toString(),
    inLanguage: "es-UY",
    mainEntityOfPage: new URL(`/blog/${slug}`, siteConfig.domain).toString(),
    isPartOf: { "@id": `${siteConfig.domain}/#website` },
    publisher: {
      "@id": `${siteConfig.domain}/#organization`,
    },
  };

  return <JsonLd data={jsonLd} />;
}
