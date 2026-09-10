import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

type FaqSectionProps = {
  page: "home" | "services";
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
} as const;

export function FaqSection({ page }: FaqSectionProps) {
  const questions = faqsByPage[page];

  return (
    <Section className="pt-0">
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title="Lo que necesitás saber antes de crear tu web"
        text="Respuestas claras sobre inversión, tiempos y cómo preparamos tu sitio para crecer."
      />
      <div className="grid gap-3">
        {questions.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-2xl border border-white/10 bg-ink-900/70 px-5 py-1 transition hover:border-neon-mint/35 sm:px-6"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-heading text-base font-semibold text-white marker:content-none focus:outline-none">
              {question}
              <ChevronDown className="size-5 shrink-0 text-neon-cyan transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="pb-5 text-sm leading-7 text-zinc-400 sm:text-base">{answer}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
