import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";

type BlogArticleData = {
  title: string;
  category: string;
  readingTime: string;
  lead: string;
  sections: readonly {
    title: string;
    paragraphs: readonly string[];
  }[];
  conclusion: string;
};

function BackToBlog() {
  return (
    <Link
      href="/blog"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-neon-mint transition hover:text-white focus-visible:rounded-md"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Ver todos los artículos
    </Link>
  );
}

export function BlogArticle({ article }: { article: BlogArticleData }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-ink-900/70 p-6 shadow-card backdrop-blur-md sm:p-10">
      <BackToBlog />
      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="eyebrow">{article.category}</p>
        <p className="inline-flex items-center gap-1.5 text-sm text-zinc-400">
          <Clock3 className="size-4" aria-hidden="true" />
          {article.readingTime}
        </p>
      </div>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
        {article.lead}
      </p>

      <div className="mt-10 grid gap-8">
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-3 grid max-w-3xl gap-3 text-base leading-7 text-zinc-300">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 max-w-3xl border-l-2 border-neon-mint pl-4 text-base leading-7 text-zinc-100">
        {article.conclusion}
      </p>

      <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-zinc-400">
          ¿Tu web carga lento o no genera suficientes consultas? Revisemos qué está frenando la conversión.
        </p>
        <Link
          href="/contacto"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-neon-mint px-5 text-sm font-bold text-ink-950 transition hover:bg-white"
        >
          Hablemos de tu web
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <BackToBlog />
      </div>
    </article>
  );
}
