# BPR Soluciones

Web corporativa premium para captar leads de servicios IT: desarrollo web, SEO tecnico, automatizacion e integraciones digitales.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel
- Vercel Analytics
- Microsoft Clarity
- Google Analytics 4
- Schema.org JSON-LD
- Sitemap y robots dinamicos
- OpenGraph
- Lucide Icons

## Instalacion

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Variables de entorno

Crear `.env.local` tomando `.env.example` como base:

```bash
NEXT_PUBLIC_SITE_URL=https://bprsoluciones.com
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/59800000000
NEXT_PUBLIC_EMAIL=hola@bprsoluciones.com
NEXT_PUBLIC_CALENDAR_URL=https://cal.com/bprsoluciones
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_GA_ID=
```

## Validacion

```bash
npm run lint
npm run build
```

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Configurar las variables de entorno.
3. Deploy con el preset automatico de Next.js.

La web genera `/sitemap.xml`, `/robots.txt` y OpenGraph desde App Router.
