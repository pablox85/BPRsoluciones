import { CalendarDays, Check, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Buttons";
import { siteConfig } from "@/config/site";

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
      className={`rounded-2xl border bg-white/[0.045] p-5 backdrop-blur-xl transition hover:bg-white/[0.065] sm:p-6 ${
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
      style={{ "--stagger-delay": `${index * 90}ms` } as CSSProperties}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`service-card-panel-${index}`}
        onClick={onToggle}
        className="flex min-h-20 w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-mint/70"
      >
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">{name}</h3>
          <p className="mt-2 font-heading text-2xl font-semibold text-neon-mint">
            {price}
          </p>
        </div>
        <ChevronDown
          className={`size-5 shrink-0 text-zinc-500 transition ${
            isOpen ? "rotate-180 text-neon-cyan" : ""
          }`}
          aria-hidden="true"
        />
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
          <ButtonLink
            href={siteConfig.calendarUrl}
            className="mt-6 w-full gap-2"
            variant="secondary"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            Agendar llamada
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
