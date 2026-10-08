"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main key={pathname} className="page-content">
      {children}
    </main>
  );
}
