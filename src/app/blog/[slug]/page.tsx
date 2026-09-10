import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { BlogPostingJsonLd } from "@/components/seo/BlogPostingJsonLd";
import { Section } from "@/components/ui/Section";
import { blogArticles } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const articleMetadata: Record<
  (typeof blogArticles)[number]["slug"],
  { title: string; description: string }
> = {
    "web-rapida-vs-web-linda": {
    title: "Web rápida o web linda: ¿qué convierte más?",
    description:
      "Descubrí cómo combinar diseño, velocidad y una navegación clara para mejorar la experiencia móvil y convertir más visitas en consultas para tu empresa.",
  },
  "seo-tecnico-desde-el-dia-uno": {
    title: "SEO técnico desde el primer día",
    description:
      "Descubrí por qué el SEO técnico importa desde el inicio: rastreo, estructura y velocidad para que Google encuentre y entienda la web de tu empresa.",
  },
  "seo-score": {
    title: "SEO Score: qué es y cómo aprovecharlo",
    description:
      "Conocé qué mide un SEO Score, cómo interpretar sus resultados y cómo priorizar mejoras técnicas para que tu web sea más fácil de encontrar y usar.",
  },
  "automatizacion-ia-pymes-primeros-pasos": {
    title: "Automatización con IA para pymes: cómo empezar",
    description:
      "Aprendé a identificar tareas repetitivas, conectar herramientas y medir resultados para empezar a automatizar procesos con IA en tu pyme, paso a paso.",
  },
  "cuanto-cuesta-pagina-web-uruguay": {
    title: "Cuánto cuesta una página web en Uruguay",
    description:
      "Conocé qué define el precio de una página web en Uruguay, qué conviene incluir y cómo elegir un alcance alineado con los objetivos de tu empresa.",
  },
  "como-elegir-desarrollo-web-uruguay": {
    title: "Cómo elegir desarrollo web en Uruguay",
    description:
      "Una guía para elegir un servicio de desarrollo web en Uruguay según objetivos comerciales, alcance, soporte y posibilidades de crecimiento.",
  },
};

const getArticle = (slug: string) =>
  blogArticles.find((article) => article.slug === slug);

export function generateStaticParams() {
  return blogArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return buildMetadata({
    ...articleMetadata[article.slug],
    path: `/blog/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return (
    <div className="page-theme page-theme-blog">
      <BreadcrumbJsonLd items={[
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: article.title, path: `/blog/${article.slug}` },
      ]} />
      <BlogPostingJsonLd
        title={article.title}
        description={articleMetadata[article.slug].description}
        slug={article.slug}
      />
      <Section className="pt-10 sm:pt-14">
        <BlogArticle article={article} />
      </Section>
    </div>
  );
}
