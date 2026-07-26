"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [animationSettled, setAnimationSettled] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    let frameId = 0;

    if (!grid || revealed) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      frameId = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const revealIfVisible = () => {
      const { bottom, top } = grid.getBoundingClientRect();

      if (top < window.innerHeight * 0.92 && bottom > 0) {
        setRevealed(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(grid);
    revealIfVisible();
    window.addEventListener("scroll", revealIfVisible, { passive: true });
    window.addEventListener("resize", revealIfVisible);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfVisible);
      window.removeEventListener("resize", revealIfVisible);
    };
  }, [revealed]);

  useEffect(() => {
    if (!revealed) {
      return;
    }

    const timeoutId = window.setTimeout(() => setAnimationSettled(true), 900);

    return () => window.clearTimeout(timeoutId);
  }, [revealed]);

  return (
    <Section>
      <SectionHeader
        eyebrow="Servicios"
        title="Paquetes claros para crecer con infraestructura digital"
        text="Desde una landing rapida optimizada para Google, hasta una plataforma completa con automatizaciones y mediciones."
      />
      <div ref={gridRef} className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard
            key={service.name}
            {...service}
            index={index}
            isOpen={openIndex === index}
            isRevealed={revealed}
            animationSettled={animationSettled}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
            featured={service.name === "Business"}
          />
        ))}
      </div>
    </Section>
  );
}
