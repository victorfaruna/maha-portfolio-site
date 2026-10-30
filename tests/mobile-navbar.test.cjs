/* eslint-disable @typescript-eslint/no-require-imports -- Node test runner loads this CommonJS fixture directly. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');

const filename = path.resolve(__dirname, '../src/components/sections/Navbar.tsx');
const source = fs.readFileSync(filename, 'utf8');
let hookIndex = 0;
const compiled = ts.transpileModule(source, {
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
  if (id === 'react') return {...React, useState: () => [hookIndex++ === 1, () => {}], useEffect() {}};
  if (id === '@/lib/utils') return {cn: (...args) => args.filter(Boolean).join(' ')};
  return originalRequire(id);
};
loaded._compile(compiled.outputText, filename);

function tree(props) {
  hookIndex = 0;
  const elements = [];
  function visit(element) {
    if (!React.isValidElement(element)) return;
    elements.push(element);
    React.Children.forEach(element.props.children, visit);
  }
  visit(loaded.exports.Navbar(props));
  return elements;
}

test('mobile menu defaults to the site’s Arial font on pages without a font override', () => {
  const elements = tree();
  const links = elements.filter(element => element.props.href && element.props.className?.includes('text-2xl'));
  assert.equal(links.length, 7);
  assert.ok(links.every(element => element.props.className.includes('font-sans') && !element.props.className.includes('font-serif')));
  const css = fs.readFileSync(path.resolve(__dirname, '../src/app/globals.css'), 'utf8');
  assert.match(css, /--font-sans:\s*Arial,\s*sans-serif/);
});

test('existing explicit Arial overrides still work and menu links retain their close handlers', () => {
  const elements = tree({solid: true, mobileMenuFont: 'sans'});
  const links = elements.filter(element => element.props.href && element.props.className?.includes('text-2xl'));
  assert.ok(links.every(element => element.props.className.includes('font-sans') && typeof element.props.onClick === 'function'));
  assert.ok(elements.some(element => element.props['aria-label'] === 'Open menu'));
  assert.ok(elements.some(element => element.props['aria-label'] === 'Close menu'));
});

test('logo is 15% smaller below lg and returns to full size on desktop', () => {
  const logo = tree().find(element => element.props.alt === 'Maha Jouini Logo');
  assert.equal(logo.props.src, '/images/logo.png');
  assert.match(logo.props.className, /\bscale-\[0\.85\]/);
  assert.match(logo.props.className, /\blg:scale-100\b/);
  assert.match(logo.props.className, /\borigin-left\b/);
});

test('desktop navigation styling and the logo’s layout box remain unchanged', () => {
  const elements = tree();
  const desktopNav = elements.find(element => element.type === 'nav' && element.props.className.includes('hidden lg:flex'));
  assert.equal(desktopNav.props.className, 'hidden lg:flex items-center gap-6');
  const logoLink = elements.find(element => element.props.href === '/' && element.props.className?.includes('lg:w-96'));
  for (const size of ['w-48', 'h-24', 'sm:w-64', 'sm:h-32', 'md:w-80', 'md:h-40', 'lg:w-96', 'lg:h-48']) {
    assert.ok(logoLink.props.className.split(' ').includes(size), size);
  }
  const desktopLinks = [];
  function visit(element) {
    if (!React.isValidElement(element)) return;
    if (element.props.href) desktopLinks.push(element);
    React.Children.forEach(element.props.children, visit);
  }
  visit(desktopNav);
  assert.equal(desktopLinks.length, 7);
  assert.ok(desktopLinks.every(link => link.props.className === 'text-sm font-semibold tracking-wide transition-colors flex items-center gap-1 text-white hover:text-white/80'));
});
