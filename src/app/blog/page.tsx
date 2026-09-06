import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BlogCard } from "@/components/ui/BlogCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { blogPosts } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog SEO, performance y automatización",
  path: "/blog",
  description:
    "Ideas prácticas sobre SEO técnico, velocidad web, conversión y automatización con IA para pymes y empresas.",
});

export default function BlogPage() {
  return (
    <div className="page-theme page-theme-blog">
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <Section>
        <div id="articulos" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Blog"
            title="Estrategia digital explicada con criterio técnico"
            text="Artículos para ayudarte a tomar mejores decisiones sobre tu web, SEO y automatizaciones."
            heading="h1"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} {...post} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
