import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

// Run against a local production server. No real contact messages or analytics.
const base = process.env.SEO_AUDIT_URL || 'http://127.0.0.1:3100';
const label = process.argv[2] || 'latest';
if (!/^[a-z0-9-]+$/.test(label)) throw new Error('Invalid report label');
const output = '.seo-audit';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { date: new Date().toISOString(), base, label, pages: [], statuses: [], failures: [] };
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const links = new Set();

try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1 });
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    await context.addInitScript(() => {
      window.auditMetrics = { lcp: 0, cls: 0, longTasks: 0, interaction: 0 };
      new PerformanceObserver(list => { for (const e of list.getEntries()) window.auditMetrics.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.auditMetrics.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { for (const e of list.getEntries()) window.auditMetrics.longTasks += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (e.interactionId) window.auditMetrics.interaction = Math.max(window.auditMetrics.interaction, e.duration); }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
    });
    const page = await context.newPage();
    let errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const path of routes) {
      errors = [];
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      const data = await page.evaluate(() => ({
        title: document.title,
        descriptions: [...document.querySelectorAll('meta[name="description"]')].map(e => e.content),
        canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map(e => e.href),
        robots: [...document.querySelectorAll('meta[name="robots"]')].map(e => e.content),
        ogType: document.querySelector('meta[property="og:type"]')?.content,
        language: document.documentElement.lang,
        headings: [...document.querySelectorAll('h1,h2,h3')].map(e => ({ level: Number(e.tagName[1]), text: e.textContent.trim() })),
        landmarks: ['header', 'main', 'footer'].map(s => document.querySelectorAll(s).length),
        links: [...document.querySelectorAll('a[href]')].map(e => ({ href: e.getAttribute('href'), name: e.getAttribute('aria-label') || e.textContent.trim() })),
        images: [...document.images].map(e => ({ src: e.currentSrc, alt: e.getAttribute('alt'), width: e.getAttribute('width'), height: e.getAttribute('height'), naturalWidth: e.naturalWidth, naturalHeight: e.naturalHeight, renderedWidth: e.getBoundingClientRect().width, renderedHeight: e.getBoundingClientRect().height })),
        schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => JSON.parse(e.textContent)),
        overflow: document.documentElement.scrollWidth > innerWidth,
        wordCount: (() => {
          const content = document.querySelector('main').cloneNode(true);
          content.querySelectorAll('script,style').forEach(e => e.remove());
          return content.textContent.trim().split(/\s+/).length;
        })(),
        metrics: window.auditMetrics,
        resources: performance.getEntriesByType('resource').filter(e => e.name.startsWith(location.origin)).map(e => ({ url: e.name, bytes: e.encodedBodySize, kind: e.initiatorType })),
      }));
      report.pages.push({ path, width, status: response.status(), errors: [...errors], ...data });
      for (const link of data.links) if (link.href.startsWith('/')) links.add(link.href);
      assert.equal(response.status(), 200, path);
      assert.equal(data.headings.filter(h => h.level === 1).length, 1, `${path}: H1`);
      assert.equal(data.descriptions.length, 1, `${path}: description`);
      assert.equal(data.canonicals.length, 1, `${path}: canonical`);
      assert(!data.robots.some(r => r.includes('noindex')), `${path}: noindex`);
      if (data.overflow || errors.length) report.failures.push({ path, width, overflow: data.overflow, errors: [...errors] });
      if (path === '/' || path === '/servicios') await page.screenshot({ path: `${output}/${label}-${path === '/' ? 'home' : 'services'}-${width}.png`, fullPage: true });
    }
    // Exercise navigation and form success with a mocked local response.
    await page.goto(base + '/');
    if (width < 768) {
      await page.getByRole('button', { name: /Abrir men/ }).click();
      await page.locator('header nav').filter({ visible: true }).getByRole('link', { name: 'Servicios', exact: true }).click();
      await page.waitForURL(base + '/servicios');
    } else await page.goto(base + '/servicios');
    await page.locator('button[aria-controls="service-detail-0"]').click();
    await page.waitForTimeout(1100);
    assert.equal(await page.locator('button[aria-controls="service-detail-0"]').getAttribute('aria-expanded'), 'true');
    const interaction = await page.evaluate(() => window.auditMetrics.interaction);
    await page.goto(base + '/contacto');
    await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, requestId: 'seo-test' }) }));
    await page.locator('[name="name"]').fill('Prueba SEO local');
    await page.locator('[name="email"]').fill('seo@example.com');
    await page.locator('[name="message"]').fill('Prueba interceptada: no enviar correo.');
    await page.getByRole('button', { name: 'Enviar consulta' }).click();
    await page.getByRole('dialog').waitFor();
    await page.getByRole('button', { name: 'Entendido' }).click();
    report.statuses.push({ width, navigation: 'passed', accordion: 'passed', contactMock: 'passed', observedInteractionMs: interaction });
    await context.close();
  }
  for (const path of [...links, '/robots.txt', '/sitemap.xml', '/icon.svg', '/opengraph-image', '/servicios/', '/ruta-inexistente', '/blog/no-existe', '/?utm_source=seo-audit']) {
    const response = await fetch(base + path, { redirect: 'manual' });
    const html = await response.text();
    const expectedStatus = path === '/servicios/' ? 308 : ['/ruta-inexistente', '/blog/no-existe'].includes(path) ? 404 : 200;
    assert.equal(response.status, expectedStatus, path);
    if (path.includes('#')) assert(html.includes(`id="${decodeURIComponent(path.split('#')[1])}"`), `${path}: missing anchor`);
    if (expectedStatus === 404) assert(/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: missing noindex`);
    report.statuses.push({ path, status: response.status, location: response.headers.get('location'), contentType: response.headers.get('content-type'), robots: [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map(m => m[1]) });
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const page = await nojs.newPage();
  for (const path of routes) {
    await page.goto(base + path);
    assert.equal(await page.locator('h1').count(), 1);
    assert(await page.locator('h1').isVisible());
  }
  report.noJavaScript = '8 routes: H1 visible and HTML available';
  await nojs.close();
  assert.equal(report.failures.length, 0, 'Browser errors or horizontal overflow');
} finally {
  await browser.close();
  await writeFile(`${output}/${label}.json`, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ routes: routes.length, pages: report.pages.length, failures: report.failures, checks: report.statuses.length, noJavaScript: report.noJavaScript }));
