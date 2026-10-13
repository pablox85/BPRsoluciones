"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { answerHighlightStyle } from "@/components/ui/answerHighlightStyle";

type ProjectCardProps = {
  category: string;
  title: string;
  description: string;
  backTitle: string;
  backDescription: string;
  highlightBackDescription?: boolean;
  backDescriptionNoWrapDesktop?: boolean;
  backDescription2?: string;
  highlightBackDescription2?: boolean;
  companyLinks?: { href: string; linkLabel: string; previewImages?: string[] }[];
  href?: string;
  linkLabel?: string;
  linkInline?: boolean;
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
  highlightBackDescription,
  backDescriptionNoWrapDesktop,
  backDescription2,
  highlightBackDescription2,
  companyLinks,
  href,
  linkLabel,
  linkInline,
  accent,
  isFlipped,
  onFlip,
}: ProjectCardProps) {
  const [hasFlipped, setHasFlipped] = useState(false);
  const [expandedPreviewImage, setExpandedPreviewImage] = useState<number | null>(null);
  const [canCloseExpandedPreview, setCanCloseExpandedPreview] = useState(true);
  const [isCompanyPreviewOpen, setIsCompanyPreviewOpen] = useState(false);
  const [isCompanyPreviewClosing, setIsCompanyPreviewClosing] = useState(false);
  const companyPreviewRef = useRef<HTMLDivElement>(null);
  const companyPreviewPanelRef = useRef<HTMLDivElement>(null);
  const companyPreviewCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isCompanyPreviewOpen || isCompanyPreviewClosing) return;

    const closePreviewOutside = (event: MouseEvent) => {
      const isInsideExpandedArea = [companyPreviewRef.current, companyPreviewPanelRef.current]
        .filter((element): element is HTMLDivElement => element !== null)
        .some((element) => {
          const bounds = element.getBoundingClientRect();
          const padding = 16;

          return (
            event.clientX >= bounds.left - padding &&
            event.clientX <= bounds.right + padding &&
            event.clientY >= bounds.top - padding &&
            event.clientY <= bounds.bottom + padding
          );
        });

      if (isInsideExpandedArea) return;

      setExpandedPreviewImage(null);
      setIsCompanyPreviewClosing(true);
      companyPreviewCloseTimeoutRef.current = window.setTimeout(() => {
        setIsCompanyPreviewOpen(false);
        setIsCompanyPreviewClosing(false);
        companyPreviewCloseTimeoutRef.current = null;
      }, 1000);
    };

    window.addEventListener("mousemove", closePreviewOutside);
    return () => window.removeEventListener("mousemove", closePreviewOutside);
  }, [isCompanyPreviewClosing, isCompanyPreviewOpen]);

  useEffect(() => {
    return () => {
      if (companyPreviewCloseTimeoutRef.current) {
        window.clearTimeout(companyPreviewCloseTimeoutRef.current);
      }
    };
  }, []);
  const projectLink = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={isFlipped ? 0 : -1}
      className={`pointer-events-auto relative z-10 text-sm font-semibold text-neon-mint underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-mint ${
        linkInline ? "inline" : "mt-5 inline-flex"
      }`}
    >
      {linkLabel ?? `Visitar ${new URL(href).hostname} ↗`}
    </a>
  ) : null;

  return (
    <article className="group relative min-h-[28rem] sm:min-h-[24rem] lg:min-h-[30rem] xl:min-h-[24rem] [perspective:1200px]">
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
        className={`pointer-events-none relative z-20 min-h-[28rem] transform-gpu sm:min-h-[24rem] lg:min-h-[30rem] xl:min-h-[24rem] [transform-style:preserve-3d] ${
          hasFlipped
            ? isFlipped
              ? "project-card-flip-open"
              : "project-card-flip-close"
            : ""
        } motion-reduce:animate-none ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div aria-hidden={isFlipped} className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 shadow-card transition group-hover:-translate-y-1 group-hover:border-neon-cyan/35 [backface-visibility:hidden]">
          <div className={`flex h-1/4 items-end bg-gradient-to-br ${accent} p-6`}>
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

        <div aria-hidden={!isFlipped} className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-neon-mint/35 bg-[linear-gradient(145deg,rgba(7,44,43,0.96),rgba(8,18,23,0.98))] p-6 shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <span className="rounded-full border border-neon-mint/30 bg-neon-mint/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neon-mint">
                {category}
              </span>
              <h2 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-white">
                {backTitle}
              </h2>
              <p className={`mt-4 text-sm leading-6 text-zinc-300 ${highlightBackDescription ? answerHighlightStyle : ""} ${backDescriptionNoWrapDesktop ? "lg:whitespace-nowrap xl:text-[13px]" : ""}`}>
                {backDescription}
                {linkInline && projectLink && <> {projectLink}</>}
              </p>
              {backDescription2 && (
                <p className={`mt-3 text-sm leading-6 text-zinc-300 ${highlightBackDescription2 ? answerHighlightStyle : ""}`}>
                  {backDescription2}
                </p>
              )}
              {companyLinks && companyLinks.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {companyLinks.map(({ href: companyHref, linkLabel: companyLinkLabel, previewImages }) => (
                    <li key={companyHref}>
                      <div
                        ref={companyPreviewRef}
                        className="group/company pointer-events-auto relative inline-flex"
                        onMouseEnter={() => {
                          if (companyPreviewCloseTimeoutRef.current) {
                            window.clearTimeout(companyPreviewCloseTimeoutRef.current);
                            companyPreviewCloseTimeoutRef.current = null;
                          }
                          setIsCompanyPreviewClosing(false);
                          setIsCompanyPreviewOpen(true);
                        }}
                      >
                        <a
                          href={companyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isFlipped ? 0 : -1}
                          className="pointer-events-auto relative z-10 text-sm font-semibold text-neon-mint underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-mint"
                        >
                          {companyLinkLabel}
                        </a>
                        {previewImages && previewImages.length > 0 && (
                          <div ref={companyPreviewPanelRef} className={`company-preview absolute left-0 top-full z-50 mt-2 block w-[17rem] max-w-[calc(100vw-3rem)] cursor-default ${isCompanyPreviewOpen ? "company-preview-visible" : ""} ${isCompanyPreviewClosing ? "company-preview-closing" : ""}`}>
                            {previewImages.map((imageSrc, imageIndex) => (
                              <Image
                                key={imageSrc}
                                src={imageSrc}
                                alt={`${companyLinkLabel} - captura del sitio web`}
                                width={480}
                                height={300}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setCanCloseExpandedPreview(false);
                                  setExpandedPreviewImage(imageIndex);
                                  window.setTimeout(() => setCanCloseExpandedPreview(true), 450);
                                  window.setTimeout(() => {
                                    setExpandedPreviewImage((currentImage) =>
                                      currentImage === imageIndex ? null : currentImage,
                                    );
                                  }, 850);
                                }}
                                onMouseLeave={() => {
                                  if (canCloseExpandedPreview && expandedPreviewImage === imageIndex) {
                                    setExpandedPreviewImage(null);
                                  }
                                }}
                              className={`company-preview-image absolute bottom-8 left-1/2 h-20 w-20 cursor-zoom-in rounded-lg border border-neon-mint/30 object-cover object-top shadow-glow ${
                                  expandedPreviewImage === imageIndex
                                    ? "company-preview-image-expanded cursor-zoom-out"
                                    : ""
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {!linkInline && projectLink}
            </div>
            <span className="text-sm font-semibold text-neon-mint">Hacé clic para volver</span>
        </div>
      </div>
    </article>
  );
}
