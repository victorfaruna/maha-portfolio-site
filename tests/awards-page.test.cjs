/* eslint-disable @typescript-eslint/no-require-imports -- Node's test runner loads this CommonJS fixture directly. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const filename = path.resolve(__dirname, '../src/app/awards/AwardsFellowshipsPage.tsx');
const source = fs.readFileSync(filename, 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: filename,
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
  reportDiagnostics: true,
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = Module._nodeModulePaths(path.dirname(filename));
const originalRequire = loaded.require.bind(loaded);
loaded.require = id => {
  if (id === '@/components/sections/Navbar') {
    return { Navbar: props => React.createElement('nav', {
      'data-solid': props.solid,
      'data-mobile-font': props.mobileMenuFont,
    }) };
  }
  if (id === '@/components/sections/Footer') {
    return { Footer: () => React.createElement('footer') };
  }
  return originalRequire(id);
};
loaded._compile(compiled.outputText, filename);
const html = renderToStaticMarkup(React.createElement(loaded.exports.default));
const text = html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');

test('renders every supplied recognition and the separately verified UNESCO programme', () => {
  assert.equal((html.match(/<article\b/g) || []).length, 11);
  for (const title of [
    'She Shapes AI', 'Global Awards', 'UNESCO MENA Top 20 Women Change Makers',
    'Google Women Techmakers Ambassador', 'Microsoft Elevate Changemaker Fellowship',
    'UNESCO Intercultural Leadership Programme',
    'Stanford Ethics, Technology & Public Policy Practitioner Program',
    'Global Center on AI Governance', 'TechForward Policy Fellowship', 'UNDP Arab States',
    'ARIN Publishing Academy — First Cohort',
    'UNFPA Tunisia — Pool of Experts in AI & Technology-Facilitated Gender-Based Violence (TFGBV)',
  ]) assert.ok(text.includes(title), `Missing programme: ${title}`);
  assert.match(text, /Practitioner · 2025 \/ Cohort leader · 2026/);
  assert.match(text, /Business Mentor · 2023/);
  assert.match(text, /Research Fellow · Women in Focus/);
  assert.match(text, /Youth for Peace · 2026–2027/);
  assert.match(text, /regional dialects and data privacy/);
  assert.ok(!text.includes('2011'), 'Do not reintroduce unsupported journey statistics');
});

test('includes all three official source links with secure new-tab behavior', () => {
  const links = [...html.matchAll(/<a\b[^>]+>/g)].map(m => m[0]);
  for (const href of [
    'https://www.unesco.org/en/interculturaldialogue/youthforpeace/maha-jouini',
    'https://www.sheshapes.ai/202526-awards/thought-leadership-in-ai-winner',
    'https://ms-elevate.caribou.global/meet-the-fellows/',
  ]) {
    const link = links.find(tag => tag.includes(`href="${href}"`));
    assert.ok(link, href);
    assert.ok(link.includes('target="_blank"'));
    assert.ok(link.includes('rel="noopener noreferrer"'));
  }
  const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(m => m[0]);
  const mena = articles.find(article => article.includes('UNESCO MENA'));
  assert.ok(mena.includes('2022'));
  assert.ok(!mena.includes('/youthforpeace/'), 'Do not conflate UNESCO programmes');
});

test('the entire She Shapes AI award card is covered by one native, keyboard-accessible winner link', () => {
  const card = html.match(/<article\b[^>]*data-award-card[^>]*>[\s\S]*?<\/article>/)?.[0];
  assert.ok(card);
  assert.match(card, /class="relative isolate grid/);
  const links = [...card.matchAll(/<a\b[^>]+>/g)].map(match => match[0]);
  assert.equal(links.length, 1, 'Do not nest or duplicate interactive links');
  assert.ok(links[0].includes('href="https://www.sheshapes.ai/202526-awards/thought-leadership-in-ai-winner"'));
  assert.ok(links[0].includes('target="_blank"'));
  assert.ok(links[0].includes('rel="noopener noreferrer"'));
  for (const utility of ['after:absolute', 'after:inset-0', 'after:z-10', 'focus-visible:after:outline-2', 'focus-visible:after:outline-brand-pink']) {
    assert.ok(links[0].includes(utility), utility);
  }
  assert.doesNotMatch(links[0], /tabindex="-1"|role="button"/);
  assert.ok(card.includes('View the award &amp; winner profile'));
  assert.ok(card.includes('opens in a new tab'));
  assert.ok(card.includes('she-shapes-ai-winner.png'));
});

test('uses Arial utilities for the page and every heading, including mobile navigation', () => {
  assert.match(html, /<main class="[^"]*font-sans/);
  const headings = [...html.matchAll(/<h[1-6]\b([^>]*)>/g)];
  assert.ok(headings.length >= 14);
  assert.ok(headings.every(m => /class="[^"]*font-sans/.test(m[1])));
  assert.doesNotMatch(source, /font-serif|font-mono|font-script|fontFamily/);
  assert.match(html, /data-solid="true" data-mobile-font="sans"/);
});

test('uses local photographs and the complete official winner graphic with alt text', () => {
  for (const name of ['maha-jouini-portrait.jpg', 'she-shapes-ai-winner.png']) {
    const asset = path.resolve(__dirname, '../public/images/awards-fellowships', name);
    assert.ok(fs.statSync(asset).size > 100000, `Missing or incomplete asset: ${name}`);
    assert.ok(source.includes(`/images/awards-fellowships/${name}`));
  }
  const images = [...html.matchAll(/<img\b[^>]+>/g)].map(m => m[0]);
  assert.equal(images.length, 4);
  assert.ok(images.every(tag => /alt="[^"]+"/.test(tag)));
  const winner = images.find(tag => tag.includes('Official She Shapes'));
  assert.ok(winner.includes('width="1080" height="1080"'));
  assert.ok(!winner.includes('object-cover'), 'Keep the official announcement uncropped');
});

test('each featured programme has its own profile image, linked source and responsive layout', () => {
  const articles = [...html.matchAll(/<article\b[^>]*data-featured-programme[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0]);
  assert.equal(articles.length, 2);
  for (const item of [
    {title: 'Microsoft Elevate Changemaker Fellowship', file: 'chifaa-tunisia-profile-card.png', fit: 'contain', position: '50% 50%', href: 'https://ms-elevate.caribou.global/meet-the-fellows/'},
    {title: 'UNESCO Intercultural Leadership Programme', file: 'unesco.png', fit: 'contain', position: '50% 50%', href: 'https://www.unesco.org/en/interculturaldialogue/youthforpeace/maha-jouini'},
  ]) {
    const article = articles.find(value => value.includes(item.title));
    assert.ok(article, item.title);
    assert.equal((article.match(/<img\b/g) || []).length, 1);
    assert.ok(article.includes(item.file));
    assert.match(article, /alt="[^"]+"/);
    assert.match(article, /sizes="[^"]+"/);
    assert.match(article, /aspect-\[3\/2\]/);
    assert.ok(article.includes(`object-${item.fit}`));
    assert.ok(article.includes(`object-position:${item.position}`));
    assert.match(article, /mt-auto pt-6/);
    const links = [...article.matchAll(/<a\b[^>]+>/g)].map(match => match[0]);
    assert.equal(links.length, 2);
    assert.ok(links.every(link => link.includes(`href="${item.href}"`) && link.includes('target="_blank"') && link.includes('rel="noopener noreferrer"')));
    assert.ok(fs.statSync(path.resolve(__dirname, '../public/images/awards-fellowships', item.file)).size > 10000);
  }
  assert.match(source, /grid items-stretch gap-8 md:grid-cols-2/);
  assert.ok(fs.existsSync(path.resolve(__dirname, '../public/images/awards-fellowships/maha-jouini-reading.jpg')), 'Do not delete the original reading portrait');
});

test('Microsoft fellowship uses the full CHIFAA Tunisia profile graphic instead of the previous portrait', () => {
  const article = [...html.matchAll(/<article\b[^>]*data-featured-programme[^>]*>[\s\S]*?<\/article>/g)]
    .map(match => match[0]).find(value => value.includes('Microsoft Elevate Changemaker Fellowship'));
  const image = article.match(/<img\b[^>]+>/)[0];
  assert.match(image, /object-contain/);
  assert.doesNotMatch(image, /object-cover/);
  assert.match(image, /alt="CHIFAA Tunisia profile card featuring Maha Jouini/);
  assert.doesNotMatch(article, /microsoft-elevate-maha-jouini\.jpg/);
  const asset = fs.readFileSync(path.resolve(__dirname, '../public/images/awards-fellowships/chifaa-tunisia-profile-card.png'));
  assert.equal(asset.subarray(1, 4).toString(), 'PNG');
  assert.ok(asset.readUInt32BE(16) > asset.readUInt32BE(20), 'Preserve the complete landscape graphic');
  assert.ok(fs.existsSync(path.resolve(__dirname, '../public/images/awards-fellowships/microsoft-elevate-maha-jouini.jpg')), 'Keep the original portrait asset');
});

test('UNESCO uses the supplied full-page screenshot without cropping or the previous portrait', () => {
  const article = [...html.matchAll(/<article\b[^>]*data-featured-programme[^>]*>[\s\S]*?<\/article>/g)]
    .map(match => match[0]).find(value => value.includes('UNESCO Intercultural Leadership Programme'));
  const image = article.match(/<img\b[^>]+>/)[0];
  assert.match(image, /object-contain/);
  assert.doesNotMatch(image, /object-cover/);
  assert.match(image, /alt="UNESCO Youth for Peace website showing Maha Jouini/);
  assert.match(article, /overflow-hidden bg-white/);
  assert.doesNotMatch(article, /unesco-youth-for-peace-maha-jouini\.webp/);
  const asset = fs.readFileSync(path.resolve(__dirname, '../public/images/awards-fellowships/unesco.png'));
  assert.equal(asset.subarray(1, 4).toString(), 'PNG');
  assert.ok(asset.readUInt32BE(16) > asset.readUInt32BE(20), 'Preserve the landscape screenshot');
  assert.ok(fs.existsSync(path.resolve(__dirname, '../public/images/awards-fellowships/unesco-youth-for-peace-maha-jouini.webp')), 'Keep the original portrait asset');
});

test('secondary recognitions retain their text and source links without images or empty frames', () => {
  const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(m => m[0]);
  for (const item of [
    {
      title: 'UNESCO MENA Top 20 Women Change Makers',
      file: 'unesco-asfari-maha-jouini.jpeg',
      href: 'https://asfariinstitute.org/2022/01/28/maha-jouini-artificial-intelligence-and-beyond/',
      label: 'Read the 2022 profile',
    },
    {
      title: 'Google Women Techmakers Ambassador',
      file: 'women-techmakers-maha-jouini.jpg',
      href: 'https://www.linkedin.com/posts/maha-jouini_google-technology-team-activity-6998359240415264768-GpQj',
      label: 'View the ambassador announcement',
    },
  ]) {
    const article = articles.find(value => value.includes(item.title));
    assert.ok(article, item.title);
    assert.doesNotMatch(article, /<img\b/);
    assert.ok(!article.includes(item.file));
    assert.doesNotMatch(article, /aspect-\[|bg-white/);
    assert.ok(article.includes(item.label));
    const links = [...article.matchAll(/<a\b[^>]+>/g)].map(m => m[0]);
    assert.equal(links.length, 1, 'Keep the source text link');
    assert.ok(links.every(link => link.includes(`href="${item.href}"`) && link.includes('target="_blank"') && link.includes('rel="noopener noreferrer"')));
    assert.ok(fs.existsSync(path.resolve(__dirname, '../public/images/awards-fellowships', item.file)), 'Keep original assets in the project');
  }
});

test('section links and heading labels resolve to unique IDs without animation dependencies', () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/(?:href="#|aria-labelledby=")([^"]+)"/g)) {
    assert.ok(ids.includes(match[1]), `Unresolved anchor or label: ${match[1]}`);
  }
  assert.doesNotMatch(source, /framer-motion|whileInView|initial=|Sparkles|rounded-|hover:scale|hover:-translate/);
});
