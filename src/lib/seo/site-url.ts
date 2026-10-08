export const defaultSiteUrl = "https://bprsoluciones.uy";

export function normalizeSiteUrl(value?: string): string {
  const url = new URL(value?.trim() || defaultSiteUrl);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_SITE_URL debe ser un origen HTTP(S) sin credenciales.');
  }
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL debe contener solo el dominio, sin rutas, consultas ni fragmentos.');
  }
  return url.origin;
}
