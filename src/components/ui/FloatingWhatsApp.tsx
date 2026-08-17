"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

const BUTTON_SIZE = 56;
const MARGIN = 16;
const STORAGE_KEY = "bpr-whatsapp-position";
const MOBILE_MENU_EVENT = "bpr-mobile-menu-change";
const FLOATING_WHATSAPP_STYLE =
  "fixed z-0 inline-flex size-14 touch-none select-none items-center justify-center rounded-full border border-[#25D366]/70 bg-[#25D366]/10 text-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.25)] backdrop-blur-md hover:bg-[#25D366]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/80";

type Position = { x: number; y: number };
type Side = "left" | "right";
type SafeArea = { top: number; right: number; bottom: number; left: number };
type SavedPosition = { side: Side; bottom: number };

const readSafeArea = (): SafeArea => {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);";
  document.body.appendChild(probe);
  const styles = window.getComputedStyle(probe);
  const safeArea = {
    top: Number.parseFloat(styles.paddingTop) || 0,
    right: Number.parseFloat(styles.paddingRight) || 0,
    bottom: Number.parseFloat(styles.paddingBottom) || 0,
    left: Number.parseFloat(styles.paddingLeft) || 0,
  };
  probe.remove();

  return safeArea;
};

const readSavedPosition = (): SavedPosition | null => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const position = JSON.parse(saved) as SavedPosition;
    if (
      (position.side !== "left" && position.side !== "right") ||
      !Number.isFinite(position.bottom) ||
      position.bottom < 0
    ) {
      return null;
    }

    return position;
  } catch {
    return null;
  }
};

export function FloatingWhatsApp() {
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const safeAreaRef = useRef<SafeArea>({ top: 0, right: 0, bottom: 0, left: 0 });
  const sideRef = useRef<Side>("right");
  const bottomRef = useRef(MARGIN);

  const drag = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    moved: false,
  });

  const getBounds = useCallback(() => ({
    left: MARGIN + safeAreaRef.current.left,
    right: window.innerWidth - BUTTON_SIZE - MARGIN - safeAreaRef.current.right,
    top: MARGIN + safeAreaRef.current.top,
    bottom: window.innerHeight - BUTTON_SIZE - MARGIN - safeAreaRef.current.bottom,
  }), []);

  const clampPosition = useCallback((x: number, y: number): Position => {
    const bounds = getBounds();

    return {
      x: Math.max(bounds.left, Math.min(x, bounds.right)),
      y: Math.max(bounds.top, Math.min(y, bounds.bottom)),
    };
  }, [getBounds]);

  const getPositionForSide = useCallback((side: Side, bottom: number): Position => {
    const bounds = getBounds();

    return clampPosition(
      side === "left" ? bounds.left : bounds.right,
      window.innerHeight - BUTTON_SIZE - bottom,
    );
  }, [clampPosition, getBounds]);

  const savePosition = (side: Side, bottom: number) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ side, bottom }));
    } catch {
      // Storage can be unavailable in private browsing modes.
    }
  };

  useEffect(() => {
    const initialize = () => {
      safeAreaRef.current = readSafeArea();
      const savedPosition = readSavedPosition();
      sideRef.current = savedPosition?.side ?? "right";
      bottomRef.current = savedPosition?.bottom ?? MARGIN + safeAreaRef.current.bottom;
      setPosition(getPositionForSide(sideRef.current, bottomRef.current));
    };

    const frameId = window.requestAnimationFrame(initialize);

    return () => window.cancelAnimationFrame(frameId);
  }, [getPositionForSide]);

  useEffect(() => {
    const handleResize = () => {
      safeAreaRef.current = readSafeArea();
      setPosition((current) =>
        current ? getPositionForSide(sideRef.current, bottomRef.current) : current,
      );
    };

    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [getPositionForSide]);

  useEffect(() => {
    const handleMobileMenuChange = (event: Event) => {
      setIsMobileMenuOpen(
        (event as CustomEvent<{ open: boolean }>).detail.open,
      );
    };

    window.addEventListener(MOBILE_MENU_EVENT, handleMobileMenuChange);

    return () => window.removeEventListener(MOBILE_MENU_EVENT, handleMobileMenuChange);
  }, []);

  const finishDrag = (element: HTMLAnchorElement) => {
    if (!drag.current.active) return;

    drag.current.active = false;
    setIsDragging(false);

    if (element.hasPointerCapture(drag.current.pointerId)) {
      element.releasePointerCapture(drag.current.pointerId);
    }

    setPosition((current) => {
      if (!current) return current;

      const side: Side =
        current.x + BUTTON_SIZE / 2 < window.innerWidth / 2 ? "left" : "right";
      const nextPosition = getPositionForSide(
        side,
        window.innerHeight - current.y - BUTTON_SIZE,
      );

      sideRef.current = side;
      bottomRef.current = window.innerHeight - nextPosition.y - BUTTON_SIZE;
      savePosition(side, bottomRef.current);

      return nextPosition;
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
      data-floating-whatsapp
      className={`${FLOATING_WHATSAPP_STYLE} ${isMobileMenuOpen ? "pointer-events-none scale-95 opacity-35 blur-[2px]" : ""} ${
        isDragging
          ? "transition-none"
          : "transition-[left,top,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      }`}
    >
      <FaWhatsapp className="size-8" aria-hidden="true" />
    </Link>
  );
}
