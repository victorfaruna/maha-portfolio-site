/* eslint-disable @typescript-eslint/no-require-imports -- Node test runner fixture. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

const root = path.resolve(__dirname, '../src/app/ai-solutions');
const cache = new Map();
function load(filename) {
  if (cache.has(filename)) return cache.get(filename).exports;
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    compilerOptions: {jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true},
    reportDiagnostics: true,
  });
  assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = id => {
    if (id === './content') return load(path.join(root, 'content.ts'));
    if (id === './AiSolutionsExperience') return load(path.join(root, 'AiSolutionsExperience.tsx'));
    if (id === './ParticlePortrait') return load(path.join(root, 'ParticlePortrait.tsx'));
    if (id === '@/components/ui/ParticleImage') return load(path.resolve(root, '../../components/ui/ParticleImage.jsx'));
    if (id.endsWith('.module.css')) return new Proxy({}, {get: (_, key) => key === '__esModule' ? false : String(key)});
    if (id === '@/components/sections/Navbar') return {Navbar: props => React.createElement('header', {'data-mobile-font': props.mobileMenuFont})};
    if (id === '@/components/sections/Footer') return {Footer: () => React.createElement('footer')};
    return originalRequire(id);
  };
  cache.set(filename, loaded);
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}
const {services, principles, initiatives} = load(path.join(root, 'content.ts'));
const html = renderToStaticMarkup(React.createElement(load(path.join(root, 'page.tsx')).default));
const text = html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const source = fs.readFileSync(path.join(root, 'AiSolutionsExperience.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'ai-solutions.module.css'), 'utf8');
const portraitSource = fs.readFileSync(path.join(root, 'ParticlePortrait.tsx'), 'utf8');
const particleFilename = path.resolve(root, '../../components/ui/ParticleImage.jsx');
const particleSource = fs.readFileSync(particleFilename, 'utf8');

test('retains all supplied service and initiative content in server-rendered HTML', () => {
  assert.equal(services.length, 3);
  assert.equal(initiatives.length, 3);
  for (const principle of principles) assert.ok(text.includes(principle), principle);
  for (const item of [...services, ...initiatives]) {
    assert.ok(text.includes(item.title), item.title);
    assert.ok(text.includes(item.description), item.title);
    for (const bullet of item.items) assert.ok(text.includes(bullet), bullet);
  }
  assert.equal(services.flatMap(item => item.items).length, 15);
  assert.equal(initiatives.flatMap(item => item.items).length, 12);
  assert.ok(text.includes('A Global Framework for Human-Centered AI, Peace, and Dialogue of Civilizations'));
  assert.ok(text.includes('Born in Carthage. Built for the Mediterranean. Open to the World.'));
  assert.ok(text.includes('AI should not begin with the technology. It should begin with people, context and purpose.'));
});

test('all headings use Arial and the existing metadata layout remains in place', () => {
  assert.match(html, /<main[^>]*class="[^"]*font-sans/);
  const headings = [...html.matchAll(/<h[1-6]\b([^>]*)>/g)];
  assert.equal(headings.length, 9);
  assert.ok(headings.every(match => /class="[^"]*font-sans/.test(match[1])));
  assert.doesNotMatch(source, /font-serif|font-mono|font-script/);
  assert.match(html, /data-mobile-font="sans"/);
  assert.match(fs.readFileSync(path.join(root, 'layout.tsx'), 'utf8'), /getPageMetadata\("\/ai-solutions"\)/);
});

test('uses the supplied local tech-face image and three uncropped real logos', () => {
  const images = [...html.matchAll(/<img\b[^>]+>/g)].map(match => match[0]).filter(image => !image.includes(encodeURIComponent('/images/1.jpeg')));
  assert.equal(images.length, 4);
  for (const image of images) {
    assert.match(image, /alt="[^"]+"/);
    assert.match(image, /object-contain/);
    assert.match(image, /sizes="[^"]+"/);
  }
  for (const asset of ['/images/aiimage.png', ...initiatives.map(item => item.logo)]) {
    assert.ok(fs.statSync(path.resolve(__dirname, '../public' + asset)).size > 10000, asset);
    assert.ok(html.includes(encodeURIComponent(asset)), asset);
  }
});

test('pairs the closing quote with an existing About-page photo in a responsive layout', () => {
  const section = html.match(/<section aria-label="A people-first approach to AI"[\s\S]*?<\/section>/)[0];
  const photo = section.match(/<img\b[^>]+>/)[0];
  assert.equal([...html.matchAll(/<img\b[^>]+>/g)].length, 5);
  assert.match(photo, /alt="Maha Jouini speaking at a conference"/);
  assert.ok(photo.includes(encodeURIComponent('/images/1.jpeg')));
  assert.match(photo, /object-cover object-center/);
  assert.match(photo, /sizes="\(min-width: 640px\) 384px, calc\(100vw - 48px\)"/);
  assert.match(section, /grid items-center[^\"]*lg:grid-cols-/);
  assert.match(section, /aspect-\[4\/3\][^\"]*lg:aspect-square/);
  assert.match(section, /href="\/work"/);
  assert.match(section, /Start a conversation/);
  assert.match(section, /Maha Jouini<\/p>/);
  const about = fs.readFileSync(path.resolve(__dirname, '../src/app/about/page.tsx'), 'utf8');
  assert.ok(about.includes('src="/images/1.jpeg"'));
  assert.ok(fs.statSync(path.resolve(__dirname, '../public/images/1.jpeg')).size > 10000);
});

test('service controls have unique accessible regions with the first service open', () => {
  assert.ok(text.includes('Expand all services'));
  for (const service of services) {
    const control = html.match(new RegExp(`<button[^>]*id="service-${service.id}"[^>]*>`))[0];
    assert.ok(control.includes(`aria-controls="service-panel-${service.id}"`));
    assert.ok(control.includes(`aria-expanded="${service.id === 'strategy'}"`));
    const panel = html.match(new RegExp(`<div[^>]*id="service-panel-${service.id}"[^>]*>`))[0];
    assert.ok(panel.includes('role="region"'));
    assert.ok(panel.includes(`aria-labelledby="service-${service.id}"`));
    assert.ok(panel.includes(`aria-hidden="${service.id !== 'strategy'}"`));
    if (service.id !== 'strategy') assert.match(panel, /\binert=""/);
  }
});

test('initiative anchors and real external links work without placeholder destinations', () => {
  for (const initiative of initiatives) {
    assert.match(html, new RegExp(`<article[^>]*id="${initiative.id}"[^>]*tabindex="-1"`));
    assert.ok(html.includes(`href="#${initiative.id}"`));
    if ('href' in initiative) {
      const link = [...html.matchAll(/<a\b[^>]+>/g)].map(match => match[0]).find(tag => tag.includes(`href="${initiative.href}"`));
      assert.ok(link.includes('target="_blank"'));
      assert.ok(link.includes('rel="noopener noreferrer"'));
    }
  }
  assert.doesNotMatch(html, /href="#"/);
  assert.ok(html.includes('href="/work"'));
  assert.match(html, /aria-label="Explore the initiatives"/);
});

test('motion is reduced-motion aware, scoped to the page, and does not lift cards on hover', () => {
  assert.match(source, /usePrefersReducedMotion/);
  assert.match(source, /useSyncExternalStore\(subscribeToMotionPreference/);
  assert.match(source, /query\.removeEventListener\("change", onChange\)/);
  assert.match(source, /reduceMotion \? 0 : 0\.28/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation: none/);
  assert.match(source, /if \(event.defaultPrevented \|\| event.button !== 0/);
  assert.match(source, /window\.cancelAnimationFrame\(frame\)/);
  assert.match(source, /observer\.disconnect\(\)/);
  assert.doesNotMatch(source, /whileHover|hover:-translate|hover:scale|rounded-|Sparkles|Robot/);
});

test('the particle portrait progressively enhances the existing accessible image using BCN physics', () => {
  assert.match(source, /<ParticlePortrait reduceMotion=\{reduceMotion\}/);
  assert.match(html, /data-particle-portrait="true"/);
  assert.match(html, /data-particle-active="false"/);
  assert.match(html, /data-particle-ready="false"/);
  assert.doesNotMatch(html, /<canvas\b/);
  assert.match(html, /alt="A woman&#x27;s profile illustrated as an interconnected digital network"/);
  for (const feature of ['Originkit', 'BCN/components/ui/ParticleImage.tsx', 'randomInShape', 'getTransitionParams', 'mkParticle', 'mouseSpeedRef', 'repulsionMode', 'roamTargetX']) {
    assert.ok(particleSource.includes(feature), feature);
  }
  assert.match(portraitSource, /repulsionForce: 10, repulsionRadius: 28/);
  assert.match(portraitSource, /duration: 0\.8, ease: "easeInOut"/);
  assert.doesNotMatch(particleSource, /imagedelivery\.net|bcn-logo-transparent/);
});

test('particle sampling ignores white background pixels but retains the original coloured network', () => {
  const {isVisibleImagePixel} = load(particleFilename);
  assert.equal(isVisibleImagePixel(255, 255, 255, 255, true), false);
  assert.equal(isVisibleImagePixel(249, 250, 251, 255, true), false);
  assert.equal(isVisibleImagePixel(80, 30, 180, 255, true), true);
  assert.equal(isVisibleImagePixel(244, 240, 252, 255, true), true);
  assert.equal(isVisibleImagePixel(80, 30, 180, 0, true), false);
  assert.equal(isVisibleImagePixel(255, 255, 255, 255), true, 'Keep the original BCN default for other images');
});

test('particle animation is input-only, reduced-motion aware and cleaned up offscreen or on navigation', () => {
  assert.match(portraitSource, /!reduceMotion && isVisible && isDocumentVisible/);
  assert.match(portraitSource, /animate=\{isHovered\}/);
  assert.match(portraitSource, /onTouchCancel=/);
  assert.match(portraitSource, /observer\?\.disconnect\(\)/);
  assert.match(portraitSource, /document\.removeEventListener\("visibilitychange"/);
  assert.match(particleSource, /if \(!animate\) return/);
  assert.match(particleSource, /cancelAnimationFrame\(animRef\.current\)/);
  assert.match(particleSource, /loadGenerationRef\.current\+\+/);
  assert.match(particleSource, /clearTimeout\(animTimerRef\.current\)/);
  assert.match(particleSource, /Math\.min\(window\.devicePixelRatio \|\| 1, 2\)/);
  assert.match(particleSource, /if \(!ctx\) return/);
  assert.match(css, /touch-action: pan-y/);
  assert.match(css, /\.particleCanvas \{ display: none; transition: none; \}/);
});
