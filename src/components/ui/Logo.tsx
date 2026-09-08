"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Logo() {
  const sparkleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sparkle = sparkleRef.current;
    if (!sparkle || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timeoutId: number;
    const moveSparkle = () => {
      sparkle.style.setProperty("--sparkle-x", `${18 + Math.random() * 64}%`);
      sparkle.style.setProperty("--sparkle-y", `${15 + Math.random() * 54}%`);
      sparkle.style.setProperty("--sparkle-duration", `${700 + Math.random() * 500}ms`);
      sparkle.classList.remove("logo-sparkle--active");
      void sparkle.offsetWidth;
      sparkle.classList.add("logo-sparkle--active");
      timeoutId = window.setTimeout(moveSparkle, 1800 + Math.random() * 2200);
    };

    moveSparkle();

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <Link href="/" className="relative flex min-h-11 items-center" aria-label="BPR Soluciones">
      <Image
        src="/images/bpr2.png"
        alt="BPR Soluciones"
        width={1972}
        height={798}
        className="h-auto w-36 sm:w-40 md:w-44"
      />
      <span ref={sparkleRef} className="logo-sparkle" aria-hidden="true" />
    </Link>
  );
}
