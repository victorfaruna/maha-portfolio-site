const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const filename = path.resolve(__dirname, '../src/app/work/ServicesScrollLink.tsx');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  fileName: filename,
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true,
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = Module._nodeModulePaths(path.dirname(filename));
loaded._compile(compiled.outputText, filename);
const { ServicesScrollLink } = loaded.exports;

function fixture(t, { reducedMotion = false, hash = '', missing = false } = {}) {
  const previousWindow = global.window;
  const previousDocument = global.document;
  t.after(() => {
    if (previousWindow === undefined) delete global.window; else global.window = previousWindow;
    if (previousDocument === undefined) delete global.document; else global.document = previousDocument;
  });
  const calls = [];
  const target = {
    focus(options) { calls.push(['focus', options]); },
    scrollIntoView(options) { calls.push(['scroll', options]); },
  };
  global.document = { getElementById(id) { assert.equal(id, 'ways-to-work'); return missing ? null : target; } };
  global.window = {
    matchMedia(query) { assert.equal(query, '(prefers-reduced-motion: reduce)'); return { matches: reducedMotion }; },
    location: { hash },
    history: { pushState(...args) { calls.push(['history', ...args]); global.window.location.hash = args[2]; } },
  };
  const event = { defaultPrevented: false, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false,
    preventDefault() { calls.push(['preventDefault']); } };
  return { calls, event, link: ServicesScrollLink({ className: 'existing-button-style', children: 'Explore the services' }) };
}

test('retains a native hash link and original presentation for no-JavaScript use', () => {
  const link = ServicesScrollLink({ className: 'original-style', children: 'Explore the services' });
  assert.equal(link.type, 'a');
  assert.equal(link.props.href, '#ways-to-work');
  assert.equal(link.props.className, 'original-style');
  assert.equal(link.props.children, 'Explore the services');
});

test('scrolls smoothly, updates the hash without jumping and moves keyboard focus', t => {
  const { calls, event, link } = fixture(t);
  link.props.onClick(event);
  assert.deepEqual(calls, [
    ['preventDefault'], ['history', null, '', '#ways-to-work'],
    ['focus', { preventScroll: true }], ['scroll', { behavior: 'smooth', block: 'start' }],
  ]);
});

test('respects reduced-motion preferences', t => {
  const { calls, event, link } = fixture(t, { reducedMotion: true });
  link.props.onClick(event);
  assert.deepEqual(calls.at(-1), ['scroll', { behavior: 'auto', block: 'start' }]);
});

test('repeated clicks still scroll without creating duplicate history entries', t => {
  const { calls, event, link } = fixture(t, { hash: '#ways-to-work' });
  link.props.onClick(event);
  assert.ok(!calls.some(call => call[0] === 'history'));
  assert.deepEqual(calls.at(-1), ['scroll', { behavior: 'smooth', block: 'start' }]);
});

test('missing targets retain the native link fallback', t => {
  const { calls, event, link } = fixture(t, { missing: true });
  link.props.onClick(event);
  assert.deepEqual(calls, []);
});

test('modified, non-primary and already-handled clicks retain native behaviour', t => {
  const { calls, event, link } = fixture(t);
  for (const modifier of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { button: 2 }, { defaultPrevented: true }]) {
    link.props.onClick({ ...event, ...modifier });
  }
  assert.deepEqual(calls, []);
});

test('services destination is focusable and its existing scroll margin is preserved', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/app/work/page.tsx'), 'utf8');
  assert.match(source, /id="ways-to-work"\s+tabIndex=\{-1\}/);
  assert.match(source, /className="scroll-mt-28 /);
  assert.match(source, /<ServicesScrollLink/);
});
