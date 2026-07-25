import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

type BlogCardProps = {
  title: string;
  excerpt: string;
  slug: string;
  index?: number;
};

export function BlogCard({ title, excerpt, slug, index = 0 }: BlogCardProps) {
  return (
    <article
      className="scroll-reveal stagger-card rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:border-neon-cyan/35 hover:bg-white/[0.065]"
      style={{ "--stagger-delay": `${index * 90}ms` } as CSSProperties}
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-neon-mint">
        Guia BPR
      </p>
      <h2 className="font-heading text-xl font-semibold leading-tight text-white">
        <Link className="inline-flex min-h-11 items-center" href={`/blog#${slug}`}>
          {title}
        </Link>
      </h2>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{excerpt}</p>
      <Link
        href={`/blog#${slug}`}
        className="mt-5 inline-flex min-h-12 items-center gap-2 text-sm font-bold text-neon-cyan"
      >
        Nuestro Enfoque
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
