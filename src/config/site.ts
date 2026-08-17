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
    category: "SEO técnico",
    excerpt:
      "La base de tu web es lo que permite que Google la encuentre, la entienda y la muestre a más personas.",
  },
      {
    slug: "seo-score",
    title: "Seo Score: que es y como usarlo para mejorar tu posicionamiento",
    category: "SEO y posicionamiento",
    excerpt:
      "Una herramienta gratuita que te permite medir la salud SEO de tu web y detectar problemas de indexacion, velocidad y optimizacion.",
  },
  {
    slug: "web-rapida-vs-web-linda",
    title: "Web rapida vs web linda: cual convierte mas?",
    category: "Performance y conversion",
    excerpt:
      "El diseño atrae, la velocidad y los datos hacen que funcione.",
  },
  {
    slug: "automatizacion-ia-pymes-primeros-pasos",
    title: "Automatizacion con IA para pymes: primeros pasos",
    category: "Automatización e IA",
    excerpt:
      "Como detectar tareas repetitivas, conectar herramientas y medir el impacto antes de escalar.",
  },
];

export const blogArticles = [
  {
    slug: "seo-tecnico-desde-el-dia-uno",
    title: "Por que tu empresa necesita SEO tecnico desde el dia uno",
    category: "SEO técnico",
    readingTime: "4 min de lectura",
    lead:
      "El SEO técnico no es un agregado para cuando una web ya está publicada. Es la base que permite que los buscadores la encuentren, la entiendan y la muestren a las personas correctas.",
    sections: [
      {
        title: "Google necesita entender antes de recomendar",
        paragraphs: [
          "Una web puede tener buenos servicios y un diseño cuidado, pero si sus páginas no se pueden rastrear o sus títulos no explican de qué tratan, Google tiene menos señales para mostrarla en una búsqueda relevante.",
          "La arquitectura, los enlaces internos, los encabezados y los metadatos ordenan esa información. Prepararlos desde el inicio evita tener que reconstruir páginas enteras cuando querés posicionarte.",
        ],
      },
      {
        title: "La velocidad también forma parte del SEO",
        paragraphs: [
          "Un sitio lento perjudica la experiencia de quien llega desde Google y puede hacer que abandone antes de consultar. Por eso las imágenes optimizadas, el código liviano y una carga estable son decisiones comerciales, no solo técnicas.",
          "Trabajar el rendimiento desde el desarrollo ayuda a que cada visita tenga una experiencia consistente, especialmente desde celulares y conexiones móviles.",
        ],
      },
      {
        title: "Corregir tarde suele costar más",
        paragraphs: [
          "Cuando la estructura se define sin SEO técnico, aparecen páginas duplicadas, URLs poco claras o contenidos difíciles de ampliar. Resolverlo después implica redirecciones, revisiones y riesgo de perder visibilidad ya ganada.",
          "Pensar la base antes de publicar permite crecer de forma ordenada: sumar servicios, casos de éxito o artículos sin desarmar lo que ya funciona.",
        ],
      },
    ],
    conclusion:
      "El SEO técnico no promete resultados instantáneos: construye las condiciones para que tu contenido, tu propuesta y tus futuras mejoras puedan posicionarse. Empezar bien es la forma más eficiente de sostener el crecimiento.",
  },
  {
    slug: "seo-score",
    title: "Seo Score: que es y como usarlo para mejorar tu posicionamiento",
    category: "SEO y posicionamiento",
    readingTime: "3 min de lectura",
    lead:
      "Un SEO Score resume señales técnicas de un sitio para detectar oportunidades de mejora. Sirve como punto de partida para priorizar, no como una nota definitiva sobre la calidad de tu negocio o de tu contenido.",
    sections: [
      {
        title: "Qué suele medir una evaluación SEO",
        paragraphs: [
          "Estas herramientas revisan aspectos como títulos y descripciones, enlaces, encabezados, versión móvil, velocidad, seguridad y posibilidad de indexación. Son señales que ayudan a los buscadores a interpretar una página.",
          "Un resultado bajo no significa que una web esté perdida; indica dónde conviene investigar primero. Un resultado alto tampoco reemplaza una estrategia de contenidos ni una propuesta comercial clara.",
        ],
      },
      {
        title: "Usalo para ordenar prioridades",
        paragraphs: [
          "Empezá por los problemas que impiden ser encontrado: páginas bloqueadas, errores de carga, enlaces rotos o títulos duplicados. Después seguí por mejoras de rendimiento y estructura que afecten a muchas páginas a la vez.",
          "No hace falta corregir todo en un día. Elegir unas pocas acciones de alto impacto permite medir qué cambió y evitar trabajo técnico sin una razón comercial.",
        ],
      },
      {
        title: "Medí junto a datos reales de negocio",
        paragraphs: [
          "El score es útil cuando se conecta con visitas, consultas y páginas que generan interés. Si una mejora técnica hace que una página importante cargue más rápido o aparezca mejor en búsquedas, ahí se vuelve relevante.",
          "Revisalo de manera periódica, especialmente después de publicar nuevas secciones, cambiar una plataforma o detectar una caída en la visibilidad.",
        ],
      },
    ],
    conclusion:
      "Un SEO Score es un tablero de control, no el destino. Usalo para detectar fricciones, priorizar correcciones y comprobar que tu sitio sigue preparado para ser encontrado y convertir visitas.",
  },
  {
    slug: "web-rapida-vs-web-linda",
    title: "Web rapida vs web linda: cual convierte mas?",
    category: "Performance y conversion",
    readingTime: "4 min de lectura",
    lead:
      "Una web atractiva puede captar atención. Pero si tarda en cargar, confunde o no guía a la persona hacia una acción, esa atención se pierde antes de convertirse en una consulta.",
    sections: [
      {
        title: "El diseño abre la puerta; la velocidad decide si entran",
        paragraphs: [
          "El diseño comunica confianza, ordena la información y ayuda a que una empresa se vea profesional. Es importante, pero no alcanza por sí solo.",
          "Cuando una página demora, salta mientras carga o responde lento en celular, la persona abandona antes de conocer la propuesta. Una web rápida reduce esa fricción y permite que el diseño haga su trabajo.",
        ],
      },
      {
        title: "La conversión no es una elección entre estética y rendimiento",
        paragraphs: [
          "La pregunta útil no es si conviene una web linda o una rápida. Convierte mejor una web que combina ambas cosas: identidad clara, textos entendibles, carga ágil y un camino simple para contactar.",
          "En la práctica, esto significa priorizar imágenes optimizadas, tipografías ligeras, botones visibles y formularios breves. Cada decisión debe ayudar a que el visitante entienda qué ofrecés y qué tiene que hacer después.",
        ],
      },
      {
        title: "En móvil, cada segundo y cada acción pesan más",
        paragraphs: [
          "Gran parte de las visitas llega desde un teléfono, con una conexión que no siempre es ideal. Ahí una animación pesada, un video automático o una imagen sin optimizar pueden costar una oportunidad real.",
          "La experiencia móvil tiene que ser directa: contenido principal visible rápido, navegación clara y acceso inmediato al canal de contacto que usa tu negocio.",
        ],
      },
    ],
    conclusion:
      "Una web que convierte no sacrifica diseño por velocidad: usa el diseño para generar confianza y el rendimiento para que la intención no se enfríe. Medir carga, interacción y consultas permite mejorar con datos, no con intuición.",
  },
  {
    slug: "automatizacion-ia-pymes-primeros-pasos",
    title: "Automatizacion con IA para pymes: primeros pasos",
    category: "Automatización e IA",
    readingTime: "4 min de lectura",
    lead:
      "La automatización con IA aporta valor cuando resuelve una tarea concreta y repetitiva. El mejor primer paso no es automatizar todo, sino elegir un proceso que hoy consume tiempo y se puede medir.",
    sections: [
      {
        title: "Buscá tareas repetitivas, no ideas de moda",
        paragraphs: [
          "Las mejores oportunidades suelen estar en consultas que se responden siempre igual, datos que se copian entre herramientas, seguimientos manuales o información que el equipo busca una y otra vez.",
          "Describir el proceso actual ayuda a decidir si conviene automatizarlo: qué lo inicia, quién interviene, qué datos necesita y cómo sabrás que el resultado fue correcto.",
        ],
      },
      {
        title: "Conectá lo que ya usa tu negocio",
        paragraphs: [
          "Una automatización útil no obliga a cambiar todas las herramientas. Puede conectar el formulario web con el correo, una planilla, un CRM o un calendario para que la información llegue al lugar correcto sin repetirla.",
          "La IA puede clasificar consultas, resumir mensajes o preparar una respuesta inicial, pero las reglas importantes y la revisión humana deben seguir claras.",
        ],
      },
      {
        title: "Probá, medí y recién después escalá",
        paragraphs: [
          "Empezá con un flujo pequeño y definí una métrica simple: tiempo ahorrado, consultas respondidas más rápido, menos errores de carga o más reuniones agendadas.",
          "Cuando el proceso demuestra valor, es más fácil ampliar la automatización con datos reales y sin sumar complejidad innecesaria al equipo.",
        ],
      },
    ],
    conclusion:
      "La IA no reemplaza una operación desordenada: la hace más rápida. Elegir un problema puntual, conectarlo bien y medir el resultado permite automatizar con criterio y construir sobre una base útil.",
  },
] as const;
