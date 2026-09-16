import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";

type FaqSectionProps = {
  page: "home" | "services" | "faq";
  heading?: "h1" | "h2";
};

export const faqsByPage = {
  home: [
  {
    question: "¿Cuánto cuesta una página web?",
    answer: "Contamos con un plan Starter desde USD 150 para negocios que necesitan una presencia online clara y profesional. Podés comparar qué incluye cada opción en nuestros planes web.",
  },
  {
    question: "¿Cuánto demora el desarrollo de una web?",
    answer: "El plazo depende del alcance, los contenidos y las integraciones que necesite tu empresa. Antes de empezar, definimos las etapas y una fecha de entrega realista.",
  },
  {
    question: "¿Necesito tener un dominio y hosting?",
    answer: "No es necesario tenerlos resueltos antes de consultarnos. Te orientamos para elegirlos y dejar tu sitio publicado con una base técnica adecuada.",
  },
  {
    question: "¿La web incluye mantenimiento?",
    answer: "Podemos acompañarte luego del lanzamiento con mejoras, nuevas secciones o ajustes técnicos. El nivel de soporte se define según lo que tu negocio necesite.",
  },
  {
    question: "¿La página queda preparada para aparecer en Google?",
    answer: "Sí. Trabajamos estructura, velocidad, contenido y aspectos técnicos para que Google pueda entender el sitio. El posicionamiento orgánico se construye con el tiempo y una estrategia sostenida.",
  },
  ],
  services: [
  {
    question: "¿Qué incluye una página web económica?",
    answer: "El plan Starter parte de USD 150 e incluye una landing rápida, diseño adaptable, estructura para generar consultas y herramientas para medir visitas. Cada plan detalla sus alcances antes de contratar.",
  },
  {
    question: "¿Las páginas web baratas sirven para mi negocio?",
    answer: "El precio es importante, pero también lo es contar con una web clara, rápida y preparada para crecer. Te ayudamos a elegir un plan acorde a tus objetivos sin pagar por funciones que no vas a usar.",
  },
  {
    question: "¿Cuánto demora tener el sitio online?",
    answer: "Depende de la cantidad de secciones, el contenido disponible y las integraciones. Al definir el proyecto te compartimos un plan de trabajo y tiempos concretos.",
  },
  {
    question: "¿El dominio, el mantenimiento y el SEO están contemplados?",
    answer: "Te asesoramos con el dominio y podemos acompañar el mantenimiento posterior. Los sitios se construyen con una base técnica orientada a SEO para que Google pueda rastrearlos y entenderlos mejor.",
  },
  ],
  faq: [
  {
    question: "¿Cuánto cuesta una página web en Uruguay?",
    answer: "Nuestro plan Starter comienza en USD 150 para una landing profesional. El valor final depende de las secciones, funcionalidades, contenidos e integraciones que necesite tu negocio.",
  },
  {
    question: "¿Qué incluye una página web profesional?",
    answer: "Incluye diseño adaptable a celulares, una estructura clara para presentar tus servicios, llamados a la acción para generar consultas y una base técnica rápida y preparada para Google. El alcance exacto se define según el plan.",
  },
  {
    question: "¿Cuánto demora crear una página web?",
    answer: "Depende del alcance, los contenidos disponibles y las integraciones necesarias. Antes de comenzar definimos las etapas del proyecto y una fecha de entrega realista.",
  },
  {
    question: "¿Necesito tener dominio y hosting antes de contratar?",
    answer: "No. Podemos orientarte para elegir el dominio y hosting adecuados, configurarlos y dejar tu sitio publicado con una base técnica correcta.",
  },
  {
    question: "¿La página web aparece en Google?",
    answer: "Construimos sitios con una base técnica y de contenido orientada a SEO para que Google pueda rastrearlos y entenderlos. El posicionamiento orgánico depende de la competencia, las búsquedas y una estrategia sostenida en el tiempo.",
  },
  {
    question: "¿La web funciona bien en celulares?",
    answer: "Sí. Diseñamos cada sitio para que se adapte correctamente a celulares, tablets y computadoras, priorizando una navegación clara y tiempos de carga rápidos.",
  },
  {
    question: "¿Puedo actualizar mi sitio después de publicarlo?",
    answer: "Sí. Podemos acompañarte con mantenimiento, nuevas secciones, mejoras de contenido y ajustes técnicos después del lanzamiento, según las necesidades de tu empresa.",
  },
  {
    question: "¿También desarrollan automatizaciones y software a medida?",
    answer: "Sí. Además de páginas web, desarrollamos automatizaciones e integraciones para simplificar tareas, conectar herramientas y crear soluciones adaptadas a los procesos de tu negocio.",
  },
  ],
} as const;

export function FaqSection({ page, heading = "h2" }: FaqSectionProps) {
  const questions = faqsByPage[page];

  return (
    <Section className="pt-0">
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title="Lo que necesitás saber antes de crear tu web"
        text="Respuestas claras sobre inversión, tiempos y cómo preparamos tu sitio para crecer."
        heading={heading}
      />
      <div className="grid gap-3">
        {questions.map(({ question, answer }, index) => (
          <details
            key={question}
            className="faq-item scroll-reveal stagger-card group rounded-2xl border border-white/10 bg-ink-900/70 px-5 py-1 sm:px-6"
            style={{ "--stagger-delay": `${index * 80}ms` } as CSSProperties}
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-heading text-base font-semibold text-white marker:content-none focus:outline-none">
              {question}
              <ChevronDown className="faq-icon size-5 shrink-0 text-neon-cyan" aria-hidden="true" />
            </summary>
            <div className="faq-answer pb-5">
              <p className="rounded-r-xl border-l-2 border-neon-cyan/60 bg-neon-cyan/[0.055] px-4 py-3 text-sm leading-7 text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:text-base">
                {answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
