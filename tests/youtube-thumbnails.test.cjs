const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = path.resolve(__dirname, '..');
function load(relative, mocks = {}) {
  const filename = path.join(root, relative);
  let source = fs.readFileSync(filename, 'utf8');
  // Exercise the actual async archive renderer without changing the route's exports.
  if (relative === 'src/app/dashboard/speaking/press/page.tsx') source += '\nexport { PressArchiveContent };';
  const code = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)(specifier => {
    if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
    if (specifier.startsWith('@/') || specifier.startsWith('.')) {
      const base = specifier.startsWith('@/') ? path.join(root, 'src', specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
      const resolved = ['.ts', '.tsx'].map(ext => base + ext).find(file => fs.existsSync(file));
      if (resolved) return load(path.relative(root, resolved).replaceAll('\\', '/'), mocks);
    }
    return require(specifier);
  }, module, module.exports);
  return module.exports;
}

const helpers = load('src/lib/youtube.ts');
const id = 'c7lJ-CJEbGo';
const otherId = 'LxkZd6NEKoQ';
const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

test('YouTube watch, share, Shorts, live, embed, mobile and bare IDs use the same thumbnail', () => {
  for (const value of [
    id, ` https://www.youtube.com/watch?v=${id}&t=20s `,
    `https://www.youtube.com/watch?feature=shared&v=${id}`,
    `https://youtu.be/${id}?si=example`, `https://m.youtube.com/watch?v=${id}`,
    `https://music.youtube.com/watch?v=${id}`, `youtube.com/watch?v=${id}`,
    `https://www.youtube.com/shorts/${id}`, `https://www.youtube.com/live/${id}`,
    `https://www.youtube.com/embed/${id}`, `https://www.youtube-nocookie.com/embed/${id}`,
    `https://www.youtube.com/v/${id}`, `https://www.youtube.com/u/0/${id}`,
  ]) {
    assert.equal(helpers.extractYouTubeId(value), id, value);
    assert.equal(helpers.getYouTubeThumbnail(value), thumbnail, value);
  }
});

test('non-video links, malformed IDs and lookalike domains do not generate YouTube thumbnails', () => {
  for (const value of [undefined, null, '', 'not a URL', 'short', `${id}x`,
    'https://www.youtube.com/@MahaJouini-l1u', 'https://www.youtube.com/playlist?list=abc',
    `https://youtube.com.evil.test/watch?v=${id}`, `https://evil.test/watch?v=${id}`,
    `https://evil.test/?next=https://youtu.be/${id}`, `https://youtube.com@evil.test/watch?v=${id}`,
    `javascript:https://youtu.be/${id}`, `ftp://youtube.com/watch?v=${id}`,
    `https://youtube.com/watch?v=${id.slice(0, -1)}!`,
  ]) {
    assert.equal(helpers.extractYouTubeId(value), null, String(value));
    assert.equal(helpers.getYouTubeThumbnail(value), null, String(value));
  }
});

test('existing link-only entries get thumbnails without a migration; linked videos override stale images and IDs', () => {
  assert.equal(helpers.getSpeakingThumbnail({ link: `https://youtu.be/${id}` }), thumbnail);
  assert.equal(helpers.getSpeakingThumbnail({ link: `https://youtu.be/${id}`, videoId: otherId, ogImage: '/old.jpg' }), thumbnail);
  assert.equal(helpers.getSpeakingThumbnail({ link: 'https://example.test/article', videoId: id, ogImage: '/old.jpg' }), thumbnail);
  assert.equal(helpers.getSpeakingThumbnail({ link: 'https://example.test/article', ogImage: ' /article.jpg ' }), '/article.jpg');
  assert.equal(helpers.getSpeakingThumbnail({ link: 'https://example.test/article' }), null);
});

function form(values = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ title: 'Video feature', outlet: 'Outlet', link: `https://youtu.be/${id}`, ...values })) data.set(key, value);
  return data;
}

function infrastructure(items = []) {
  const state = { writes: [], revalidated: [], uploads: 0 };
  const client = {
    from(table) {
      assert.equal(table, 'speaking_items');
      return {
        select() { return this; }, eq() { return this; }, order() { return this; }, abortSignal() { return this; },
        insert(data) { state.writes.push({ mode: 'insert', data }); return this; },
        update(data) { state.writes.push({ mode: 'update', data }); return this; },
        then(resolve, reject) { return Promise.resolve({ data: items, error: null }).then(resolve, reject); },
      };
    },
    storage: { from() { state.uploads++; throw new Error('YouTube thumbnails must not upload a file'); } },
  };
  const mocks = {
    '@/lib/supabase/server': { createServerClient: () => client, createAnonServerClient: () => client },
    'next/cache': { revalidatePath: value => state.revalidated.push(value) },
    'next/navigation': { redirect: value => { throw new Error(`redirect:${value}`); } },
  };
  return { state, mocks, actions: load('src/app/actions/speaking.ts', mocks) };
}

test('create and edit automatically persist the thumbnail for a YouTube article link', async () => {
  const { state, actions } = infrastructure();
  await assert.rejects(actions.createSpeakingItem('press', undefined, form({ og_image: '/old.jpg' })), /redirect:.*flash=created/);
  await assert.rejects(actions.updateSpeakingItem('existing', 'press', undefined, form({ existing_og_image: '/old.jpg', existing_video_id: otherId })), /redirect:.*flash=updated/);
  for (const { data } of state.writes) {
    assert.equal(data.video_id, id);
    assert.equal(data.og_image, thumbnail);
    assert.equal(data.link, `https://youtu.be/${id}`);
  }
  assert.equal(state.uploads, 0);
});

test('an optional video URL supplies thumbnails for articles; video-only forms generate a watch link', async () => {
  const { state, actions } = infrastructure();
  await assert.rejects(actions.createSpeakingItem('press', undefined, form({ link: 'https://example.test/article', video_input: `https://youtube.com/shorts/${id}` })), /redirect:/);
  await assert.rejects(actions.createSpeakingItem('video', undefined, form({ link: '', video_input: id })), /redirect:/);
  assert.equal(state.writes[0].data.og_image, thumbnail);
  assert.equal(state.writes[0].data.link, 'https://example.test/article');
  assert.equal(state.writes[1].data.link, `https://www.youtube.com/watch?v=${id}`);
  assert.equal(state.writes[1].data.og_image, thumbnail);
});

test('YouTube auto thumbnails skip uploads; non-YouTube image URLs remain unchanged', async () => {
  const { state, actions } = infrastructure();
  const youtube = form();
  youtube.set('media_file', new File(['unused'], 'image.jpg', { type: 'image/jpeg' }));
  await assert.rejects(actions.createSpeakingItem('press', undefined, youtube), /redirect:/);
  await assert.rejects(actions.createSpeakingItem('press', undefined, form({ link: 'https://example.test/article', og_image: '/article.jpg' })), /redirect:/);
  await assert.rejects(actions.updateSpeakingItem('existing', 'press', undefined, form({ link: 'https://example.test/article', video_input: '', existing_video_id: id, existing_og_image: '/article.jpg' })), /redirect:/);
  assert.equal(state.uploads, 0);
  assert.equal(state.writes[1].data.og_image, '/article.jpg');
  assert.equal(state.writes[1].data.video_id, null);
  assert.equal(state.writes[2].data.og_image, '/article.jpg');
  assert.equal(state.writes[2].data.video_id, null);
});

const item = { id: 'existing', section_type: 'press', category: 'Arabic Media', title: 'YouTube feature', outlet: 'Outlet',
  link: `https://youtu.be/${id}`, video_id: null, og_image: '/old.jpg', is_rtl: false, description: null, year: '2026' };
const linkMock = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
const tableMock = { DashboardTable: ({ rows }) => React.createElement('div', null, rows.map(row => React.createElement('div', { key: row.id }, row.cells.map((cell, index) => React.createElement('div', { key: index }, cell))))) };

test('both dashboard tables render real thumbnails for existing link-only rows', async () => {
  const { mocks } = infrastructure([item]);
  const tableMocks = { ...mocks, 'next/link': linkMock, '../../_components/DashboardTable': tableMock };
  const press = load('src/app/dashboard/speaking/press/page.tsx', tableMocks);
  const videos = load('src/app/dashboard/speaking/videos/page.tsx', tableMocks);
  for (const element of [
    await press.PressArchiveContent({ searchParams: Promise.resolve({}) }),
    await videos.default({ searchParams: Promise.resolve({}) }),
  ]) {
    const html = renderToStaticMarkup(element);
    assert.ok(html.includes(`src="${thumbnail}"`));
    assert.ok(!html.includes('src="/old.jpg"'));
  }
});

test('press and video forms preview thumbnails immediately for saved YouTube URLs', () => {
  const formMocks = {
    'next/link': linkMock,
    '@/app/actions/speaking': { createSpeakingItem() {}, updateSpeakingItem() {} },
    react: { ...React, useActionState: () => [undefined, '/test-only', false] },
  };
  for (const [file, name] of [['press/_components/PressForm.tsx', 'PressForm'], ['videos/_components/VideoForm.tsx', 'VideoForm']]) {
    const Component = load(`src/app/dashboard/speaking/${file}`, formMocks)[name];
    const html = renderToStaticMarkup(React.createElement(Component, { item }));
    assert.ok(html.includes(`src="${thumbnail}"`));
    assert.ok(!html.includes('src="/old.jpg"'));
  }
});

test('pasting or changing a YouTube URL updates the form preview immediately, without saving', () => {
  const states = [];
  let cursor = 0;
  const { PressForm } = load('src/app/dashboard/speaking/press/_components/PressForm.tsx', {
    'next/link': linkMock,
    '@/app/actions/speaking': { createSpeakingItem() {}, updateSpeakingItem() {} },
    react: {
      ...React,
      useActionState: () => [undefined, '/test-only', false],
      useState(initial) {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], value => { states[index] = value; }];
      },
    },
  });
  function render() {
    cursor = 0;
    const elements = [];
    function visit(element) {
      if (!React.isValidElement(element)) return;
      elements.push(element);
      React.Children.forEach(element.props.children, visit);
    }
    visit(PressForm({}));
    return elements;
  }
  const change = (name, value) => render().find(el => el.props.name === name).props.onChange({ target: { value } });
  const preview = () => render().find(el => el.type === 'img')?.props.src;
  assert.equal(preview(), undefined);
  change('og_image', '/article.jpg');
  assert.equal(preview(), '/article.jpg');
  change('link', `https://youtu.be/${id}`);
  assert.equal(preview(), thumbnail);
  change('link', `https://youtube.com/shorts/${otherId}`);
  assert.equal(preview(), `https://img.youtube.com/vi/${otherId}/hqdefault.jpg`);
  change('link', 'https://example.test/article');
  assert.equal(preview(), '/article.jpg');
  change('video_input', `https://youtube.com/live/${id}`);
  assert.equal(preview(), thumbnail);
});

test('public media cards use YouTube thumbnails while ordinary article images stay intact', () => {
  const PressSection = load('src/components/sections/PressSection.tsx').default;
  const html = renderToStaticMarkup(React.createElement(PressSection, {
    selectedTab: 'ALL', setSelectedTab() {}, setModalState() {}, customItems: [
      { ...item, category: 'Arabic Media', ogImage: '/old.jpg' },
      { ...item, title: 'Article', category: 'Press Feature', link: 'https://example.test/article', ogImage: '/article.jpg' },
    ],
  }));
  assert.ok(html.includes(`src="${thumbnail}"`));
  assert.ok(html.includes('src="/article.jpg"'));
  assert.ok(!html.includes('src="/old.jpg"'));
});
