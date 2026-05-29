import { siteConfig } from "@/config/site";

export function getEmailHref(subject = "Consulta desde la web") {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
