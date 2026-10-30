/* eslint-disable @typescript-eslint/no-require-imports -- Node test fixtures load TypeScript without a separate build. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');

const project = path.resolve(__dirname, '..');
function load(relative, mocks = {}, cache = new Map()) {
  const filename = path.resolve(project, relative);
  if (cache.has(filename)) return cache.get(filename).exports;
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
    reportDiagnostics: true,
  });
  assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, filename);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = id => {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.endsWith('.css')) return {};
    if (id.startsWith('@/') || id.startsWith('./') || id.startsWith('../')) {
      const stem = id.startsWith('@/') ? path.join(project, 'src', id.slice(2)) : path.resolve(path.dirname(filename), id);
      const target = [`${stem}.ts`, `${stem}.tsx`].find(fs.existsSync);
      if (target) return load(target, mocks, cache);
    }
    return originalRequire(id);
  };
  cache.set(filename, loaded);
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}

const metadata = load('src/lib/site-metadata.ts');
const sharing = load('src/lib/article-sharing.ts');
const article = {
  title: 'Responsible AI & digital sovereignty', excerpt: 'An article about inclusive technology.',
  slug: 'responsible-ai', category: 'Article', updated_at: '2026-10-01T12:00:00Z',
  cover_image_url: 'https://example.com/article-cover.jpg',
};

test('home metadata uses the production origin and a public, fully described logo image', () => {
  const home = metadata.getPageMetadata('/');
  assert.equal(home.alternates.canonical, 'https://mahajouini.net/');
  assert.equal(home.openGraph.url, home.alternates.canonical);
  assert.equal(home.openGraph.type, 'website');
  assert.equal(home.openGraph.siteName, 'Maha Jouini');
  assert.deepEqual(home.openGraph.images[0], {
    url: 'https://mahajouini.net/images/social-logo.png',
    secureUrl: 'https://mahajouini.net/images/social-logo.png',
    width: 1200, height: 630, type: 'image/png',
    alt: 'Maha Jouini logo — Responsible AI Technologist',
  });
  const root = load('src/app/layout.tsx').metadata;
  assert.equal(root.metadataBase.href, 'https://mahajouini.net/');
  assert.equal(root.openGraph.images[0].url, home.openGraph.images[0].url);
});

test('every public page gets its own title, description, canonical and social URL', () => {
  for (const [pathname, content] of Object.entries(metadata.publicPages)) {
    const page = metadata.getPageMetadata(pathname);
    assert.equal(page.title, content.title);
    assert.equal(page.description, content.description);
    assert.equal(page.openGraph.title, page.title);
    assert.equal(page.openGraph.description, page.description);
    assert.equal(page.openGraph.url, new URL(pathname, metadata.SITE_URL).href);
    assert.equal(page.alternates.canonical, page.openGraph.url);
    assert.equal(page.openGraph.images[0].url, metadata.SOCIAL_IMAGE_URL);
    assert.equal(page.twitter.title, page.title);
    assert.equal(page.twitter.description, page.description);
    assert.equal(page.twitter.card, 'summary_large_image');
    assert.equal(page.twitter.images[0].url, metadata.SOCIAL_IMAGE_URL);
    assert.ok(page.description.trim());
  }
});

test('all existing public routes are wired to the shared metadata, including client-rendered pages', () => {
  const app = path.join(project, 'src/app');
  const routes = fs.readdirSync(app, { withFileTypes: true })
    .filter(item => item.isDirectory() && item.name !== 'dashboard' && fs.existsSync(path.join(app, item.name, 'page.tsx')))
    .map(item => `/${item.name}`);
  assert.deepEqual(Object.keys(metadata.publicPages).sort(), ['/', ...routes].sort());
  for (const route of routes) {
    const candidates = ['page.tsx', 'layout.tsx'].map(file => path.join(app, route.slice(1), file)).filter(fs.existsSync);
    assert.ok(candidates.some(file => fs.readFileSync(file, 'utf8').includes(`getPageMetadata("${route}")`)), route);
  }
  for (const route of ['about', 'ai-solutions', 'books']) {
    const source = fs.readFileSync(path.join(app, route, 'layout.tsx'), 'utf8');
    assert.ok(!source.includes('use client'), 'Metadata must remain server-rendered');
    assert.match(source, /return children/);
  }
});

test('social card is a small, valid 1200 × 630 PNG and original logo remains the generator input', () => {
  const png = fs.readFileSync(path.join(project, 'public', metadata.SOCIAL_IMAGE_PATH));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 300000, 'Keep preview downloads small for messaging apps');
  const generator = fs.readFileSync(path.join(project, 'scripts/generate-social-preview.cjs'), 'utf8');
  assert.ok(generator.includes('public/images/logo.png'));
});

test('article previews retain article information but always use the logo instead of the cover photo', () => {
  const result = metadata.getArticleMetadata(article, 'old-alias');
  assert.equal(result.title, `${article.title} | Maha Jouini`);
  assert.equal(result.description, article.excerpt);
  assert.equal(result.openGraph.type, 'article');
  assert.equal(result.openGraph.title, result.title);
  assert.equal(result.openGraph.url, 'https://mahajouini.net/research/responsible-ai');
  assert.equal(result.alternates.canonical, result.openGraph.url);
  assert.equal(result.openGraph.images[0].url, metadata.SOCIAL_IMAGE_URL);
  assert.equal(result.twitter.images[0].url, metadata.SOCIAL_IMAGE_URL);
  assert.equal(result.twitter.title, result.title);
  assert.equal(result.openGraph.modifiedTime, '2026-10-01T12:00:00.000Z');
  assert.deepEqual(result.authors, [{name: 'Maha Jouini', url: metadata.SITE_URL}]);
  assert.ok(!Object.hasOwn(result.openGraph, 'publishedTime'), 'Do not treat CMS insertion as original publication time');
});

test('legacy article slugs, empty excerpts and invalid dates get sensible fallbacks', () => {
  const result = metadata.getArticleMetadata({...article, slug: null, excerpt: '  ', updated_at: 'invalid'}, 'responsible-ai-digital-sovereignty');
  assert.equal(result.openGraph.url, 'https://mahajouini.net/research/responsible-ai-digital-sovereignty');
  assert.equal(result.description, `Read ${article.title} by Maha Jouini.`);
  assert.ok(!Object.hasOwn(result.openGraph, 'modifiedTime'));
  const cleaned = metadata.getArticleMetadata({...article, excerpt: ' A summary\n across   lines. '}, 'legacy');
  assert.equal(cleaned.description, 'A summary across lines.');
});

test('non-Latin slugs and URL-like stored slugs remain on the canonical website', () => {
  for (const slug of ['سياسات الذكاء الاصطناعي', '//example.com/other?x=1#part']) {
    const result = metadata.getArticleMetadata({...article, slug}, 'fallback');
    const url = new URL(result.alternates.canonical);
    assert.equal(url.origin, metadata.SITE_URL);
    assert.equal(url.pathname, `/research/${encodeURIComponent(slug)}`);
    assert.equal(url.search, '');
    assert.equal(url.hash, '');
  }
  const arabic = metadata.getArticleMetadata({...article, title: 'الذكاء الاصطناعي', slug: null}, 'مقال');
  assert.ok(arabic.openGraph.url.endsWith(encodeURIComponent('مقال')));
});

function articlePage(rows) {
  let queries = 0;
  const client = {
    from(table) {
      assert.equal(table, 'publications');
      let slug;
      const query = {
        select() { return this; },
        eq(column, value) { assert.equal(column, 'slug'); slug = value; return this; },
        maybeSingle() { queries++; return Promise.resolve({data: rows.find(row => row.slug === slug) || null}); },
        then(resolve, reject) { queries++; return Promise.resolve({data: rows}).then(resolve, reject); },
      };
      return query;
    },
  };
  const page = load('src/app/research/[slug]/page.tsx', {
    '@/lib/supabase/server': {createAnonServerClient: () => client},
    '@/components/sections/Navbar': {}, '@/components/sections/Footer': {},
    '@/components/sections/ArticleBody': {}, '@/components/sections/ArticleShareBar': {},
    '@/lib/publicationUtils': {},
    'next/navigation': {notFound() { const error = new Error('Not found'); error.status = 404; throw error; }},
  });
  return {page, queryCount: () => queries};
}

test('dynamic article metadata reads the selected publication and does not fetch every row on an exact match', async () => {
  const fixture = articlePage([article]);
  const result = await fixture.page.generateMetadata({params: Promise.resolve({slug: article.slug})});
  assert.equal(result.openGraph.title, `${article.title} | Maha Jouini`);
  assert.equal(result.openGraph.images[0].url, metadata.SOCIAL_IMAGE_URL);
  assert.equal(fixture.queryCount(), 1);
});

test('legacy article URLs still resolve and unknown articles produce a 404', async () => {
  const fixture = articlePage([{...article, slug: null}]);
  const result = await fixture.page.generateMetadata({params: Promise.resolve({slug: 'responsible-ai-digital-sovereignty'})});
  assert.equal(result.openGraph.type, 'article');
  assert.equal(fixture.queryCount(), 2);
  const missing = articlePage([]);
  await assert.rejects(missing.page.generateMetadata({params: Promise.resolve({slug: 'missing'})}), error => error.status === 404);
});

test('LinkedIn, Facebook and X receive the exact URL after one decode', () => {
  const url = 'https://mahajouini.net/research/ai?topic=data%20rights&lang=ar#quote';
  const title = 'AI & ethics: "Who decides?"';
  const links = sharing.createArticleShareLinks(url, title);
  assert.equal(new URL(links.linkedin).searchParams.get('url'), url);
  assert.equal(new URL(links.facebook).searchParams.get('u'), url);
  assert.equal(new URL(links.x).searchParams.get('url'), url);
  assert.equal(new URL(links.x).searchParams.get('text'), `Read "${title}" by Maha Jouini`);
});

test('WhatsApp receives a readable, clickable URL rather than a double-encoded URL', () => {
  const url = 'https://mahajouini.net/research/responsible-ai';
  const title = 'Responsible AI & حقوق رقمية';
  const link = sharing.createArticleShareLinks(url, title).whatsapp;
  const message = new URL(link).searchParams.get('text');
  assert.equal(message, `Read "${title}" by Maha Jouini: ${url}`);
  assert.ok(message.includes('https://mahajouini.net/'));
  assert.ok(!message.includes('https%3A%2F%2F'));
});

test('article share buttons share the canonical URL and open safely without sending a post', t => {
  const windowBefore = global.window;
  const documentBefore = global.document;
  t.after(() => {
    if (windowBefore === undefined) delete global.window; else global.window = windowBefore;
    if (documentBefore === undefined) delete global.document; else global.document = documentBefore;
  });
  const opened = [];
  const canonical = 'https://mahajouini.net/research/responsible-ai';
  global.window = {location: {href: 'http://localhost:3000/research/responsible-ai?utm_source=test#bottom'}, open: (...args) => opened.push(args)};
  global.document = {querySelector(selector) { assert.equal(selector, 'link[rel="canonical"]'); return {href: canonical}; }};
  const {ArticleShareBar} = load('src/components/sections/ArticleShareBar.tsx', {
    react: {...React, useState: value => [value, () => {}], useEffect() {}},
  });
  const tree = ArticleShareBar({title: article.title, year: '2026', shareOnly: true});
  const buttons = [];
  function visit(element) {
    if (!React.isValidElement(element)) return;
    if (element.type === 'button') buttons.push(element);
    React.Children.forEach(element.props.children, visit);
  }
  visit(tree);
  for (const label of ['Share on LinkedIn', 'Share on X / Twitter', 'Share on Facebook', 'Share on WhatsApp']) {
    const button = buttons.find(item => item.props['aria-label'] === label);
    assert.ok(button, label);
    button.props.onClick();
  }
  const expected = sharing.createArticleShareLinks(canonical, article.title);
  assert.deepEqual(opened.map(args => args[0]), [expected.linkedin, expected.x, expected.facebook, expected.whatsapp]);
  assert.ok(opened.every(args => args[1] === '_blank' && args[2] === 'noopener,noreferrer'));
});

test('metadata remains in the initial HTML for social apps with standard or unrecognized user agents', () => {
  const {htmlLimitedBots} = load('next.config.ts').default;
  for (const bot of ['facebookexternalhit/1.1', 'LinkedInBot/1.0', 'WhatsApp/2.24', 'Twitterbot/1.0', 'Slackbot-LinkExpanding 1.0', 'Discordbot/2.0', 'TelegramBot', 'Facebot', 'Pinterestbot', 'Mozilla/5.0']) {
    assert.ok(htmlLimitedBots.test(bot), bot);
  }
});
