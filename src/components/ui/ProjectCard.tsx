"use client";

import { useState } from "react";

type ProjectCardProps = {
  category: string;
  title: string;
  description: string;
  backTitle: string;
  backDescription: string;
  accent: string;
  isFlipped: boolean;
  onFlip: () => void;
};

export function ProjectCard({
  category,
  title,
  description,
  backTitle,
  backDescription,
  accent,
  isFlipped,
  onFlip,
}: ProjectCardProps) {
  const [hasFlipped, setHasFlipped] = useState(false);

  return (
    <article className="group relative min-h-[22rem] [perspective:1200px]">
      <button
        type="button"
        aria-label={isFlipped ? `Volver al frente de la tarjeta ${category}` : `Ver más sobre ${category}`}
        aria-pressed={isFlipped}
        onClick={() => {
          setHasFlipped(true);
          onFlip();
        }}
        className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint/70 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
      >
        <span className="sr-only">{isFlipped ? "Volver al frente" : "Ver más detalles"}</span>
      </button>
      <div
        className={`relative min-h-[22rem] transform-gpu [transform-style:preserve-3d] ${
          hasFlipped
            ? isFlipped
              ? "project-card-flip-open"
              : "project-card-flip-close"
            : ""
        } motion-reduce:animate-none ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 shadow-card transition group-hover:-translate-y-1 group-hover:border-neon-cyan/35 [backface-visibility:hidden]">
          <div className={`flex min-h-48 items-end bg-gradient-to-br ${accent} p-6`}>
            <span className="rounded-full border border-white/15 bg-ink-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neon-mint">
              {category}
            </span>
          </div>
          <div className="p-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
            <span className="mt-6 inline-flex text-sm font-semibold text-neon-mint">Hacé clic para saber más</span>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-neon-mint/35 bg-[linear-gradient(145deg,rgba(7,44,43,0.96),rgba(8,18,23,0.98))] p-6 shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <span className="rounded-full border border-neon-mint/30 bg-neon-mint/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neon-mint">
                {category}
              </span>
              <h2 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-white">
                {backTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                {backDescription}
              </p>
            </div>
            <span className="text-sm font-semibold text-neon-mint">Hacé clic para volver</span>
        </div>
      </div>
    </article>
  );
}
