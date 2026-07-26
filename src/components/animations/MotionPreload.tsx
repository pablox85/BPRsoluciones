"use client";

import { useEffect } from "react";

export function MotionPreload() {
  useEffect(() => {
    let active = true;
    let frameId = 0;

    const enableMotion = () => {
      frameId = window.requestAnimationFrame(() => {
        if (active) {
          document.documentElement.classList.add("motion-ready");
        }
      });
    };

    document.fonts.ready.then(enableMotion, enableMotion);

    return () => {
      active = false;
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
