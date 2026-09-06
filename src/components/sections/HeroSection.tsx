import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Buttons";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="scroll-reveal reveal-up">
          <p className="eyebrow mb-5 inline-flex border-l-2 border-neon-mint pl-3">
            BPR soluciones digitales
          </p>
          <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
            <span className="block">Desarrollo web en Uruguay.</span>
            <span className="block">Posicionamiento en Google.</span>
            <span className="block">Tecnología que impulsa tu negocio.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Creamos sitios web, automatizaciones con inteligencia artificial y
            software a medida para empresas que quieren generar consultas y ahorrar tiempo.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href={siteConfig.whatsappUrl} className="gap-2">
              <FaWhatsapp className="size-4" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
          </div>
        </div>
        <div className="scroll-reveal reveal-up order-first flex justify-center lg:order-none">
          <Image
            src="/images/bpr2.png"
            alt="BPR Soluciones"
            width={1972}
            height={798}
            sizes="(max-width: 511px) calc(100vw - 32px), (max-width: 1023px) 480px, (max-width: 1151px) 44vw, 480px"
            className="hero-logo-glow h-auto w-full max-w-[30rem] object-contain"
            preload
          />
        </div>
      </div>
    </section>
  );
}
