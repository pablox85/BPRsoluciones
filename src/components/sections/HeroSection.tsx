import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Buttons";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal reveal-up">
          <p className="eyebrow mb-5 inline-flex border-l-2 border-neon-mint pl-3">
            BPR soluciones digitales
          </p>
          <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
            <span className="block">Webs rapidas.</span>
            <span className="block">Posicionamiento en Google.</span>
            <span className="block">Tecnologia que impulsa tu negocio.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Desarrollamos sitios web modernos, optimizados para Google y
            diseñados para convertir visitas en clientes reales.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href={siteConfig.whatsappUrl} className="gap-2">
              <FaWhatsapp className="size-4" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
