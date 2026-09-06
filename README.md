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

Crear `.env.local` tomando `.env.example` como base. Vercel Analytics no
requiere variables; Google Search Console se configura fuera del proyecto con
la verificación del dominio.

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/59800000000
NEXT_PUBLIC_EMAIL=hola@tu-dominio.com
NEXT_PUBLIC_CALENDAR_URL=https://cal.com/tu-usuario
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_GA_ID=
```

El formulario envía las consultas directamente a `CONTACT_TO_EMAIL` mediante
SMTP. Para Gmail, usar una contraseña de aplicación en `SMTP_PASS`; nunca la
clave habitual de la cuenta.

## Validacion

```bash
npm run lint
npm run build
npm run test:seo
```

Las pruebas SEO requieren un build reciente y Node.js 24. Comprueban las ocho
rutas públicas, canonicals, schema, sitemap y dimensiones de la imagen principal.

Para recorrer el build con Chromium (Playwright), iniciá el servidor y ejecutá
la auditoría en otra terminal:

```bash
npm run start -- --hostname 127.0.0.1 --port 3100
npm run audit:seo -- latest
```

La auditoría guarda HTML resumido, métricas de laboratorio y capturas en
`.seo-audit/` (ignorado por Git). Bloquea analytics externos e intercepta el
envío del formulario: no envía correos reales. LCP, CLS e interacciones locales
no sustituyen los datos de campo de Search Console.

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Configurar las variables de entorno.
3. Deploy con el preset automatico de Next.js.

La web genera `/sitemap.xml`, `/robots.txt` y OpenGraph desde App Router.

El dominio oficial de este proyecto es `https://bprsoluciones.uy`. Definí
`NEXT_PUBLIC_SITE_URL=https://bprsoluciones.uy` en Production antes del build.
La variable acepta un origen HTTP(S), sin rutas, consultas ni credenciales;
un valor vacío usa el dominio oficial. El dominio debe trasladarse desde el
proyecto de la página en construcción cuando se autorice la publicación.
Comprobá también que `www` redirija al dominio oficial y no a la inversa.
