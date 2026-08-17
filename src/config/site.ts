export const siteConfig = {
  name: "BPR Soluciones",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bprsoluciones.com",
  description:
    "Webs modernas, SEO tecnico, automatizacion e integraciones digitales para empresas que quieren convertir mas visitas en clientes.",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/+598343651",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hola@bprsoluciones.com",
  calendarUrl:
    process.env.NEXT_PUBLIC_CALENDAR_URL ?? "https://cal.com/bprsoluciones",
};

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export const services = [
  {
    name: "Starter",
    price: "USD 150",
    description: "Landing simple, rapida, optimizada y analitica.",
    features: ["Diseñada para vender mas", "Optimizada para Google", "Carga rapida"],
  },
  {
    name: "Business",
    price: "USD 450",
    description:
      "Web corporativa con posiciniomiento en Google, secciones comerciales y analitica.",
    features: ["Todo lo de Starter", "Arquitectura comercial", "Maximo rendimiento", "Medicion de resultados", "Comportamiento de usuarios"],
  },
  {
    name: "Premium",
    price: "USD 1000",
    description:
      "Web completa con Poscicionamiento en Google, automatizacion, metricas y arquitectura escalable.",
    features: ["Todo lo de Starte + Busines", "Automatizacion (IA)", "Sistema escalable"],
  },
 {
  name: "A medida",
  price: "Presupuesto",
  description:
    "Si tu proyecto necesita algo único, diseñamos una solución adaptada a tu forma de trabajar.",
  features: [
    "Conecta tus herramientas",
    "Personliza tus paneles",
    "Automatiza con IA",
  ],
},
];

export const serviceDetails = [
  {
  name: "Starter",
  price: "USD 150",
  tagline: "Para lanzar tu negocio online de forma rápida y profesional.",
  description:
    "Ideal para profesionales, comercios y empresas que necesitan una página clara, rápida y preparada para generar consultas desde el primer día.",
  includes: [
    "Diseño adaptable a celulares, tablets y PC",
    "Estructura pensada para generar más consultas",
    "Preparada para aparecer en Google",
    "Botón de WhatsApp, formulario o agenda online",
    "Estadísticas para conocer visitas",
  ],
  bestFor:
    "Profesionales, comercios, servicios y emprendimientos que necesitan empezar a vender online.",
},
  {
  name: "Business",
  price: "USD 450",
  tagline: "Para empresas que quieren generar más oportunidades desde su web.",
  description:
    "Ideal para negocios que buscan mostrar sus servicios de forma profesional, aparecer mejor en Google.",
  includes: [
    "Todo lo de Starter",
    "Web corporativa con diseño profesional",
    "Secciones para servicios, empresa y contacto",
    "Optimización para Google",
    "Sitio rápido y preparado para celulares",
    "Estadísticas, medición de resultados y comportamiento de usuarios",
  ],
  bestFor:
    "Empresas de servicios, consultoras, estudios y pymes en crecimiento.",
},
  {
  name: "Premium",
  price: "USD 1000",
  tagline: "Para empresas que quieren crecer con una estrategia digital completa.",
  description:
    "Pensado para empresas que buscan atraer más clientes, automatizar tareas y tomar decisiones con datos reales, todo sobre una plataforma preparada para crecer.",
  includes: [
    "Todo lo de Starter + Business",
    "Sitio web preparado para crecer con tu negocio",
    "Páginas y landing pages enfocadas en generar clientes",
    "Automatización de consultas y procesos",
    "Estadísticas y paneles de resultados",
    "Conexión con las herramientas que ya utilizás",
  ],
  bestFor:
    "Empresas que ya venden y quieren conseguir más clientes, optimizar procesos y crecer.",
},
  {
  name: "Soluciones a medida",
  price: "Proyecto",
  tagline: "Para automatizar tareas y crear herramientas adaptadas a tu negocio.",
  description:
    "Si una web no alcanza, desarrollamos soluciones personalizadas para ahorrar tiempo, organizar la información y simplificar el trabajo de tu equipo.",
  includes: [
    "Análisis de necesidades y procesos",
    "Conexión con las herramientas que ya utilizás",
    "Automatización de tareas y procesos",
    "Paneles para visualizar la información de tu negocio",
    "Solución preparada para crecer y mantenerse en el tiempo",
  ],
  bestFor:
    "Empresas que quieren ahorrar tiempo, reducir tareas manuales y trabajar de forma más eficiente.",
},
];

export const differentiators = [
  {
    title: "SEO desde el inicio",
    description: "Tu sitio nace preparado para aparecer en Google.",
  },
  {
    title: "Performance extrema",
    description: "Carga rápido para mejorar la experiencia.",
  },
  {
    title: "Diseño orientado a resultados",
    description: "Pensada para convertir visitas en clientes.",
  },
  {
    title: "Automatización con IA",
    description: "Responde mas rapido, genra mas ventas.",
  },
  {
    title: "Métricas reales",
    description: "Medi visitas, comportamiento de usuarios con datos reales.",
  },
  {
    title: "Arquitectura moderna y escalable",
    description: "Preparados para acompañar tu crecimiento.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entendemos tu negocio, objetivos y necesidades.",
  },
  {
    number: "02",
    title: "Estrategia",
    description: "Definimos la mejor forma de atraer y convertir clientes.",
  },
  {
    number: "03",
    title: "Diseño",
    description: "Creamos una experiencia clara, moderna y profesional.",
  },
  {
    number: "04",
    title: "Desarrollo",
    description: "Construimos un sitio rápido, seguro y preparado para crecer.",
  },
  {
    number: "05",
    title: "Optimización para Google",
    description: "Preparamos tu web para que pueda posicionarse mejor.",
  },
  {
    number: "06",
    title: "Lanzamiento y seguimiento",
    description: "Publicamos el sitio y medimos sus resultados.",
  },
] as const;

export const blogPosts = [
  {
    slug: "seo-tecnico-desde-el-dia-uno",
    title: "Por que tu empresa necesita SEO tecnico desde el dia uno",
    excerpt:
      "La base de tu web es lo que permite que Google la encuentre, la entienda y la muestre a más personas.",
  },
      {
    slug: "seo-score",
    title: "Seo Score: que es y como usarlo para mejorar tu posicionamiento",
    excerpt:
      "Una herramienta gratuita que te permite medir la salud SEO de tu web y detectar problemas de indexacion, velocidad y optimizacion.",
  },
  {
    slug: "web-rapida-vs-web-linda",
    title: "Web rapida vs web linda: cual convierte mas?",
    excerpt:
      "El diseño atrae, la velocidad y los datos hacen que funcione.",
  },
  {
    slug: "automatizacion-ia-pymes-primeros-pasos",
    title: "Automatizacion con IA para pymes: primeros pasos",
    excerpt:
      "Como detectar tareas repetitivas, conectar herramientas y medir el impacto antes de escalar.",
  },
];
