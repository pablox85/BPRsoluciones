export const siteConfig = {
  name: "BPR Soluciones",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bprsoluciones.com",
  description:
    "Webs modernas, SEO tecnico, automatizacion e integraciones digitales para empresas que quieren convertir mas visitas en clientes.",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/59800000000",
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
    features: ["Estructura conversion-first", "SEO base", "Carga rapida"],
  },
  {
    name: "Business",
    price: "USD 450",
    description:
      "Web corporativa con SEO tecnico, secciones comerciales y analitica.",
    features: ["Arquitectura comercial", "Core Web Vitals", "GA4 y eventos"],
  },
  {
    name: "Premium",
    price: "USD 1000",
    description:
      "Web completa con estrategia SEO, automatizacion, metricas y arquitectura escalable.",
    features: ["Estrategia SEO", "Automatizacion", "Sistema escalable"],
  },
  {
    name: "Soluciones a medida",
    price: "Proyecto",
    description:
      "Integraciones, automatizacion, CRM, dashboards o flujos personalizados.",
    features: ["CRM y APIs", "Dashboards", "Flujos IA"],
  },
];

export const serviceDetails = [
  {
    name: "Starter",
    price: "USD 150",
    tagline: "Para validar una oferta o lanzar una presencia comercial rapida.",
    description:
      "Ideal para profesionales, negocios locales o empresas que necesitan una landing clara, veloz y preparada para captar consultas sin construir una web grande desde el inicio.",
    includes: [
      "Landing responsive con estructura enfocada en conversion",
      "Copy comercial ordenado por secciones",
      "SEO base, metadata y OpenGraph",
      "Integracion de WhatsApp, email o agenda",
      "Analitica esencial para medir visitas y contactos",
    ],
    bestFor: "Lanzamientos, campanas puntuales, servicios concretos o primeras webs.",
  },
  {
    name: "Business",
    price: "USD 450",
    tagline: "Para empresas que necesitan una web corporativa profesional y medible.",
    description:
      "Pensado para negocios que quieren explicar sus servicios, posicionarse mejor en Google y convertir visitas en oportunidades comerciales con secciones claras y analitica real.",
    includes: [
      "Web corporativa con arquitectura comercial",
      "Paginas o secciones para servicios, propuesta de valor y contacto",
      "SEO tecnico, titles, descriptions, sitemap y robots",
      "Core Web Vitals y performance mobile-first",
      "GA4, Clarity y eventos principales configurados",
    ],
    bestFor: "Empresas de servicios, marcas B2B, consultoras, estudios y pymes en crecimiento.",
  },
  {
    name: "Premium",
    price: "USD 1000",
    tagline: "Para escalar captacion, SEO, automatizacion y arquitectura digital.",
    description:
      "Una solucion completa para empresas que necesitan una plataforma mas robusta: estrategia SEO, contenidos escalables, automatizaciones, medicion avanzada e integraciones listas para crecer.",
    includes: [
      "Arquitectura web escalable con foco en SEO y conversion",
      "Estrategia de paginas, landings o categorias comerciales",
      "Automatizaciones para leads, respuestas o flujos internos",
      "Dashboard de metricas y eventos de conversion",
      "Base tecnica preparada para crecer en contenido e integraciones",
    ],
    bestFor: "Empresas que ya venden y quieren mejorar captacion, medicion y procesos.",
  },
  {
    name: "Soluciones a medida",
    price: "Proyecto",
    tagline: "Para integrar herramientas, automatizar procesos o crear sistemas internos.",
    description:
      "Cuando la necesidad excede una web tradicional, disenamos flujos personalizados que conectan CRM, formularios, APIs, dashboards, bases de datos, IA o herramientas del equipo.",
    includes: [
      "Diagnostico de procesos y puntos de friccion",
      "Integraciones con CRM, APIs, formularios o herramientas internas",
      "Automatizacion de tareas repetitivas con IA o reglas de negocio",
      "Dashboards operativos o comerciales",
      "Documentacion y arquitectura preparada para mantenimiento",
    ],
    bestFor: "Equipos que necesitan ahorrar tiempo, ordenar datos o conectar sistemas.",
  },
];

export const differentiators = [
  "SEO desde el inicio",
  "Performance extrema",
  "Diseno premium orientado a conversion",
  "Automatizacion con IA",
  "Metricas reales",
  "Arquitectura moderna y escalable",
];

export const processSteps = [
  ["01", "Diagnostico"],
  ["02", "Estrategia"],
  ["03", "Diseno"],
  ["04", "Desarrollo"],
  ["05", "SEO tecnico"],
  ["06", "Lanzamiento y medicion"],
] as const;

export const blogPosts = [
  {
    slug: "seo-tecnico-desde-el-dia-uno",
    title: "Por que tu empresa necesita SEO tecnico desde el dia uno",
    excerpt:
      "La base tecnica define si Google puede entender, medir y posicionar tu web sin friccion.",
  },
  {
    slug: "web-rapida-vs-web-linda",
    title: "Web rapida vs web linda: cual convierte mas",
    excerpt:
      "El diseno premium vende mejor cuando esta sostenido por velocidad, claridad y medicion real.",
  },
  {
    slug: "automatizacion-ia-pymes-primeros-pasos",
    title: "Automatizacion con IA para pymes: primeros pasos",
    excerpt:
      "Como detectar tareas repetitivas, conectar herramientas y medir el impacto antes de escalar.",
  },
];
