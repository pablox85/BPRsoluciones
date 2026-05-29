import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-neon-mint/40 bg-neon-mint text-ink-950 shadow-glow hover:bg-white",
  secondary:
    "border-neon-cyan/35 bg-white/[0.06] text-white hover:border-neon-mint/60 hover:bg-white/[0.1]",
  ghost:
    "border-white/10 bg-transparent text-zinc-200 hover:border-neon-mint/40 hover:text-white",
};

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-2xl border px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-neon-mint/70 focus:ring-offset-2 focus:ring-offset-ink-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
