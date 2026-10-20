import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Clock3, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Buttons";
import { siteConfig } from "@/config/site";

type BlogArticleData = {
  title: string;
  category: string;
  readingTime: string;
  lead: string;
  leadBullet?: boolean;
  sections: readonly {
    title: string;
    paragraphs: readonly string[];
    bullets?: readonly string[];
  }[];
  conclusion: string;
};

const getArticleWhatsAppUrl = (articleTitle: string) => {
  const url = new URL(siteConfig.whatsappUrl);
  url.searchParams.set(
    "text",
    `Hola, estuve leyendo el artículo "${articleTitle}" del blog de BPR Soluciones y quisiera hacer una consulta.`,
  );

  return url.toString();
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
      {article.leadBullet ? (
        <ul className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
          <li className="flex gap-3">
            <X className="mt-1.5 size-4 shrink-0 text-neon-mint" aria-hidden="true" />
            <span>{article.lead}</span>
          </li>
        </ul>
      ) : (
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
          {article.lead}
        </p>
      )}

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
              {section.bullets ? (
                <ul className="grid gap-2 pt-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-neon-mint" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 max-w-3xl border-l-2 border-neon-mint pl-4 text-base leading-7 text-zinc-100">
        {article.conclusion}
      </p>
      <div className="mt-6 flex max-w-3xl flex-col items-center md:items-end">
        <p className="w-full text-lg font-medium leading-7 text-white">
          ¿Te quedó alguna duda o tenés una idea en mente?
        </p>
        <ButtonLink
          href={getArticleWhatsAppUrl(article.title)}
          className="mt-4 gap-2"
        >
          Charlamos por WhatsApp
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
      <div className="mt-6">
        <p className="max-w-xl border-t border-white/10 pt-6 text-sm leading-6 text-zinc-400">
          ¿Querés aplicar estas ideas a tu empresa? Conocé nuestros{" "}
          <Link href="/servicios" className="text-neon-mint underline underline-offset-4">
            planes web y soluciones a medida
          </Link>{" "}
          o nuestro enfoque de{" "}
          <Link href="/desarrollo-web-uruguay" className="text-neon-mint underline underline-offset-4">
            desarrollo web en Uruguay
          </Link>{" "}
          o contanos qué necesitás.
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <BackToBlog />
      </div>
    </article>
  );
}
