import type { Metadata } from "next";
import Link from "next/link";
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
          <p className="-mt-6 mb-10 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            Si estás evaluando una nueva web, conocé nuestras{" "}
            <Link href="/" className="text-neon-mint underline underline-offset-4">soluciones digitales para empresas</Link>{" "}
            y los <Link href="/servicios" className="text-neon-mint underline underline-offset-4">planes disponibles</Link>.
          </p>
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
