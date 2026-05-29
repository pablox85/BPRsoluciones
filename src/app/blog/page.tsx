import type { Metadata } from "next";
import { BlogCard } from "@/components/ui/BlogCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { blogPosts } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog de SEO, performance y automatizacion",
  path: "/blog",
  description:
    "Ideas practicas sobre SEO tecnico, velocidad web, conversion y automatizacion con IA para pymes y empresas.",
});

export default function BlogPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Blog"
        title="Estrategia digital explicada con criterio tecnico"
        text="Articulos iniciales para tomar mejores decisiones sobre tu web, tu SEO y tus automatizaciones."
        heading="h1"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.slug} {...post} index={index} />
        ))}
      </div>
    </Section>
  );
}
