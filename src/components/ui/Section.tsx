import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
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
    <div className="mb-10 max-w-3xl sm:mb-14">
      {eyebrow ? (
        <p className="eyebrow mb-4">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="max-w-2xl font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
        {title}
      </Heading>
      {text ? <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">{text}</p> : null}
    </div>
  );
}
