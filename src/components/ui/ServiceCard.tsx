import { Check, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { cardSurfaceClass } from "@/components/ui/Card";

type ServiceCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  index?: number;
  isOpen?: boolean;
  isRevealed?: boolean;
  animationSettled?: boolean;
  onToggle?: () => void;
};

export function ServiceCard({
  name,
  price,
  description,
  features,
  featured = false,
  index = 0,
  isOpen = false,
  isRevealed = true,
  animationSettled = true,
  onToggle,
}: ServiceCardProps) {
  return (
    <article
      className={`${cardSurfaceClass} p-5 transition hover:border-neon-cyan/30 hover:bg-ink-850 sm:p-6 ${
        animationSettled ? "opacity-100" : "stagger-card"
      } ${
        isRevealed && !animationSettled ? "is-visible" : ""
      } ${
        isOpen
          ? "border-neon-mint/55 shadow-glow"
          : featured
            ? "border-neon-mint/30"
          : "border-white/10 hover:border-neon-cyan/40"
      }`}
      data-dropdown-card
      style={{ "--stagger-delay": `${index * 90}ms` } as CSSProperties}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`service-card-panel-${index}`}
        aria-label={`Ver detalles del plan ${name}`}
        onClick={onToggle}
        className="flex min-h-20 w-full items-start justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-mint/70"
      >
        <div className="min-w-0">
          <h3 className="font-heading text-xl font-semibold text-white">{name}</h3>
          <p className="mt-2 font-heading text-2xl font-semibold text-neon-mint">
            {price}
          </p>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-2">
          <span className="whitespace-nowrap text-xs font-semibold text-zinc-500">
            Ver detalles
          </span>
          <ChevronDown
            className={`size-5 shrink-0 text-zinc-500 transition ${
              isOpen ? "rotate-180 text-neon-cyan" : ""
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      <div
        id={`service-card-panel-${index}`}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
          <ul className="mt-5 space-y-3 text-sm text-zinc-300">
            {features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-neon-green"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
