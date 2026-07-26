"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let frameId = 0;

    const setupReveal = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(".scroll-reveal"),
      ).filter((element) => !element.classList.contains("is-visible"));

      if (!elements.length) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      const revealVisibleElements = () => {
        elements.forEach((element) => {
          const { bottom, top } = element.getBoundingClientRect();

          if (top < window.innerHeight * 0.96 && bottom > 0) {
            element.classList.add("is-visible");
            observer?.unobserve(element);
          }
        });
      };

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "0px 0px -4% 0px",
        },
      );

      elements.forEach((element) => observer?.observe(element));
      revealVisibleElements();
      window.addEventListener("scroll", revealVisibleElements, { passive: true });
      window.addEventListener("resize", revealVisibleElements);

      return () => {
        window.removeEventListener("scroll", revealVisibleElements);
        window.removeEventListener("resize", revealVisibleElements);
      };
    };

    let cleanupReveal: (() => void) | undefined;

    frameId = window.requestAnimationFrame(() => {
      cleanupReveal = setupReveal();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      cleanupReveal?.();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
