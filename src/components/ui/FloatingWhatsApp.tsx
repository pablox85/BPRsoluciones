"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

const BUTTON_SIZE = 56;
const MARGIN = 20;

type Position = { x: number; y: number };

export function FloatingWhatsApp() {
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const drag = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    moved: false,
  });

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setPosition({
        x: window.innerWidth - BUTTON_SIZE - MARGIN,
        y: window.innerHeight - BUTTON_SIZE - MARGIN,
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const clampPosition = (x: number, y: number): Position => ({
    x: Math.max(MARGIN, Math.min(x, window.innerWidth - BUTTON_SIZE - MARGIN)),
    y: Math.max(MARGIN, Math.min(y, window.innerHeight - BUTTON_SIZE - MARGIN)),
  });

  const finishDrag = (element: HTMLAnchorElement) => {
    if (!drag.current.active) return;

    drag.current.active = false;
    setIsDragging(false);

    if (element.hasPointerCapture(drag.current.pointerId)) {
      element.releasePointerCapture(drag.current.pointerId);
    }

    setPosition((current) => {
      if (!current) return current;

      const rightEdge = window.innerWidth - BUTTON_SIZE - MARGIN;
      const leftEdge = MARGIN;

      return {
        x:
          current.x + BUTTON_SIZE / 2 < window.innerWidth / 2
            ? leftEdge
            : rightEdge,
        y: current.y,
      };
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsDragging(true);

    drag.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialX: position?.x ?? 0,
      initialY: position?.y ?? 0,
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return;

    const deltaX = event.clientX - drag.current.startX;
    const deltaY = event.clientY - drag.current.startY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      drag.current.moved = true;
    }

    setPosition(
      clampPosition(
        drag.current.initialX + deltaX,
        drag.current.initialY + deltaY,
      ),
    );
  };

  if (!position) return null;

  return (
    <Link
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      title="Hablar por WhatsApp"
      style={{ left: position.x, top: position.y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event.currentTarget)}
      onPointerCancel={(event) => finishDrag(event.currentTarget)}
      onClick={(event) => {
        if (drag.current.moved) {
          event.preventDefault();
        }
      }}
      className={`fixed z-40 inline-flex size-14 touch-none select-none items-center justify-center rounded-full border border-[#25D366]/70 bg-[#25D366]/10 text-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.25)] backdrop-blur-md hover:bg-[#25D366]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/80 ${
        isDragging
          ? "transition-none"
          : "transition-[left,top,background-color,box-shadow] duration-300 ease-out"
      }`}
    >
      <FaWhatsapp className="size-8" aria-hidden="true" />
    </Link>
  );
}
