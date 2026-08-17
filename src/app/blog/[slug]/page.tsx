import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { Section } from "@/components/ui/Section";
import { blogArticles } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
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
    title: article.title,
    description: article.lead,
    path: `/blog/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return (
    <div className="page-theme page-theme-blog">
      <Section className="pt-10 sm:pt-14">
        <BlogArticle article={article} />
      </Section>
    </div>
  );
}
