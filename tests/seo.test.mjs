import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import sharp from 'sharp';
import { normalizeSiteUrl } from '../src/lib/seo/site-url.ts';
import { serializeJsonLd } from '../src/lib/seo/json-ld.ts';

test('site URL: blank fallback, trailing slash normalization, invalid origins', () => {
  for (const input of [undefined, '', '  ']) assert.equal(normalizeSiteUrl(input), 'https://bprsoluciones.uy');
  assert.equal(normalizeSiteUrl(' https://bprsoluciones.uy/ '), 'https://bprsoluciones.uy');
  for (const input of ['javascript:alert(1)', 'not-a-url', 'https://user:pass@example.com', 'https://example.com/blog', 'https://example.com?q=x', 'https://example.com#fragment']) {
    assert.throws(() => normalizeSiteUrl(input), input);
  }
});

test('JSON-LD escapes script termination without changing data', () => {
  const data = { name: '</script><script>alert(1)</script>', description: 'IA & automatización' };
  const json = serializeJsonLd(data);
  assert(!json.includes('<'));
  assert.deepEqual(JSON.parse(json), data);
});

const root = '.next/server/app/';
const articles = readdirSync(root + 'blog').filter(f => f.endsWith('.html')).map(f => 'blog/' + f);
const files = ['index.html', 'servicios.html', 'desarrollo-web-uruguay.html', 'blog.html', 'contacto.html', ...articles];
const nodesOf = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => {
  const data = JSON.parse(m[1]);
  return data['@graph'] || [data];
});

test('eleven public pages: unique metadata, matching schema, correct canonicals', () => {
  assert.equal(files.length, 11);
  const titles = new Set(), descriptions = new Set(), canonicals = new Set();
  for (const file of files) {
    const html = readFileSync(root + file, 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
    titles.add(title); descriptions.add(description); canonicals.add(canonical);
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, file);
    assert.equal([...html.matchAll(/<title>/g)].length, 1, file);
    assert.equal([...html.matchAll(/<link rel="canonical"/g)].length, 1, file);
    assert.equal(new URL(canonical).origin, 'https://bprsoluciones.uy');
    const expectedPath = file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '');
    assert.equal(new URL(canonical).pathname, expectedPath);
    assert(html.includes(`property="og:url" content="${canonical}"`));
    assert(html.includes('name="twitter:card" content="summary_large_image"'));
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html));
    assert(html.includes('href="/icon.svg?'));
    const nodes = nodesOf(html);
    const organization = nodes.filter(n => n['@type'] === 'Organization');
    const website = nodes.filter(n => n['@type'] === 'WebSite');
    assert.equal(organization.length, 1);
    assert.equal(website.length, 1);
    assert.equal(website[0].publisher['@id'], organization[0]['@id']);
    assert.equal(organization[0].areaServed.name, 'Uruguay');
    assert(!nodes.some(n => ['ProfessionalService', 'LocalBusiness'].includes(n['@type'])));
    const faqPages = new Set(['index.html', 'servicios.html']);
    const faq = nodes.filter(n => n['@type'] === 'FAQPage');
    if (faqPages.has(file)) {
      assert.equal(faq.length, 1, file);
      assert(faq[0].mainEntity.length > 0, file);
      assert(faq[0].mainEntity.every(item => item['@type'] === 'Question' && item.acceptedAnswer['@type'] === 'Answer'), file);
    } else assert.equal(faq.length, 0, file);
    if (file !== 'index.html') {
      const breadcrumbs = nodes.filter(n => n['@type'] === 'BreadcrumbList');
      assert.equal(breadcrumbs.length, 1);
      assert.equal(breadcrumbs[0].itemListElement.at(-1).item, canonical);
      assert.deepEqual(breadcrumbs[0].itemListElement.map(n => n.position), breadcrumbs[0].itemListElement.map((_, i) => i + 1));
    }
    const post = nodes.find(n => n['@type'] === 'BlogPosting');
    if (articles.includes(file)) {
      assert.equal(post.description, description);
      assert.equal(post.url, canonical);
      assert.equal(post.headline, html.match(/<h1[^>]*>([^<]+)<\/h1>/)[1]);
      assert.equal(post.publisher['@id'], organization[0]['@id']);
      assert(!('author' in post || 'datePublished' in post));
      assert(html.includes('property="og:type" content="article"'));
    } else assert(html.includes('property="og:type" content="website"'));
  }
  for (const collection of [titles, descriptions, canonicals]) assert.equal(collection.size, 11);
});

test('Service offers match the visible plans and their actual anchors', () => {
  const html = readFileSync(root + 'servicios.html', 'utf8');
  const services = nodesOf(html).filter(n => n['@type'] === 'Service');
  assert.equal(services.length, 4);
  assert.deepEqual(services.filter(n => n.offers).map(n => [n.name, n.offers.price]), [['Starter', '150'], ['Business', '450'], ['Premium', '1000']]);
  for (const service of services) {
    assert(html.includes(`id="${new URL(service.url).hash.slice(1)}"`));
    if (service.offers) assert(html.includes(`USD ${service.offers.price}`));
  }
});

test('hero reserves the real image aspect ratio and supplies responsive sizes', async () => {
  const { width, height } = await sharp('public/images/bpr2.png').metadata();
  const html = readFileSync(root + 'index.html', 'utf8');
  const image = html.match(/<img[^>]+hero-logo-glow[^>]*>/)[0];
  assert(image.includes(`width="${width}"`));
  assert(image.includes(`height="${height}"`));
  assert(image.includes('sizes="'));
  assert(!image.includes('loading="lazy"'));
  assert(html.includes('rel="preload" as="image"'));
});

test('sitemap and robots use canonical origin, contain only public pages', () => {
  const xml = readFileSync(root + 'sitemap.xml.body', 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, 11);
  assert.equal(new Set(urls).size, 11);
  assert(urls.every(url => new URL(url).origin === 'https://bprsoluciones.uy' && !url.includes('/api/')));
  assert(readFileSync(root + 'robots.txt.body', 'utf8').includes('Sitemap: https://bprsoluciones.uy/sitemap.xml'));
});
