import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
}: MetadataInput = {}): Metadata {
  const url = new URL(path, siteConfig.domain);
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : `Desarrollo web en Uruguay | ${siteConfig.name}`;

  return {
    metadataBase: new URL(siteConfig.domain),
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "es_UY",
      type,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - tecnología que convierte`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: ["/opengraph-image"],
    },
    icons: {
      icon: [
        {
          url: "/images/favicon-square.png",
          type: "image/png",
          sizes: "1254x1254",
        },
      ],
      shortcut: "/images/favicon-square.png",
      apple: "/images/favicon-square.png",
    },
  };
}
