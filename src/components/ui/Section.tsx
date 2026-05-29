import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  heading?: "h1" | "h2";
}) {
  const Heading = heading;

  return (
    <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-neon-mint">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-heading text-3xl font-semibold tracking-normal text-white sm:text-4xl">
        {title}
      </Heading>
      {text ? <p className="mt-4 text-base leading-7 text-zinc-400">{text}</p> : null}
    </div>
  );
}
