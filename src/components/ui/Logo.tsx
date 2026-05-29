import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl border border-neon-mint/30 bg-white/[0.06] text-sm font-bold text-neon-mint shadow-glow">
        BPR
      </span>
      <span className="font-heading text-base font-semibold tracking-normal text-white">
        BPR Soluciones
      </span>
    </Link>
  );
}
