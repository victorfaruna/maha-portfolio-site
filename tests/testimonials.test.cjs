const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Load just these modules with mocked infrastructure. Tests never connect to Supabase.
const root = path.resolve(__dirname, '..');
function load(relative, mocks = {}) {
  const filename = path.join(root, relative);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)(specifier => {
    if (specifier === 'server-only') return {};
    if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
    if (specifier.startsWith('@/')) return load(`src/${specifier.slice(2)}.ts`, mocks);
    return require(specifier);
  }, module, module.exports);
  return module.exports;
}

const helpers = load('src/lib/testimonials.ts');
const id = '11111111-1111-4111-8111-111111111111';
const newId = '22222222-2222-4222-8222-222222222222';
const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0]);
function form(values = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ quote: ' Approved feedback. ', name: ' Person ', sort_order: '2', ...values })) data.set(key, value);
  return data;
}
function row(values = {}) {
  return { id, quote: 'Approved feedback.', name: 'Person', role: 'Organiser', organization: 'Event',
    photo_url: null, photo_path: null, sort_order: 0, is_published: false,
    created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z', ...values };
}

function infrastructure(options = {}) {
  const state = { rows: [...(options.rows || [])], operations: [], uploads: [], removed: [], revalidated: [], clientCalls: 0, authCalls: 0 };
  const client = {
    from(table) {
      assert.equal(table, 'testimonials');
      let mode = 'select', values, single = false;
      const filters = [], ordering = [];
      const builder = {
        select() { return this; }, limit() { return this; },
        eq(key, value) { filters.push([key, value]); return this; },
        order(key, { ascending }) { ordering.push([key, ascending]); return this; },
        abortSignal(signal) { assert.ok(signal instanceof AbortSignal); return this; },
        maybeSingle() { single = true; return this; },
        insert(data) { mode = 'insert'; values = data; return this; },
        update(data) { mode = 'update'; values = data; return this; },
        delete() { mode = 'delete'; return this; },
        then(resolve, reject) {
          state.operations.push({ mode, filters, values, ordering });
          if (options.missing) return Promise.resolve({ data: null, error: { code: 'PGRST205' } }).then(resolve, reject);
          if (mode !== 'select' && options.writeError) return Promise.resolve({ data: null, error: { code: '23514' } }).then(resolve, reject);
          let selected = state.rows.filter(item => filters.every(([key, value]) => item[key] === value));
          if (mode === 'insert') {
            const created = row({ id: newId, ...values }); state.rows.push(created); selected = [created];
          } else if (mode === 'update') {
            selected.forEach(item => Object.assign(item, values));
          } else if (mode === 'delete') {
            state.rows = state.rows.filter(item => !selected.includes(item));
          } else {
            selected.sort((a, b) => {
              for (const [key, asc] of ordering) {
                if (a[key] < b[key]) return asc ? -1 : 1;
                if (a[key] > b[key]) return asc ? 1 : -1;
              }
              return 0;
            });
          }
          const returned = selected.map(item => ({ ...item }));
          return Promise.resolve({ data: single ? returned[0] || null : returned, error: null }).then(resolve, reject);
        },
      };
      return builder;
    },
    storage: { from(bucket) {
      assert.equal(bucket, 'testimonial-photos');
      return {
        async upload(filePath, bytes, settings) {
          state.uploads.push({ filePath, bytes, settings });
          return { error: options.uploadError ? { message: 'upload failed' } : null };
        },
        getPublicUrl(filePath) { return { data: { publicUrl: `https://example.test/${filePath}` } }; },
        async remove(paths) { state.removed.push(...paths); return { error: null }; },
      };
    } },
  };
  const mocks = {
    '@/lib/admin-session': {
      async isAdminSession() { state.authCalls++; return options.authorized !== false; },
      async requireAdminSession() { state.authCalls++; if (options.authorized === false) throw new Error('unauthorized'); },
    },
    '@/lib/supabase/server': {
      createServerClient() { state.clientCalls++; return client; },
      createAnonServerClient() { state.clientCalls++; return client; },
    },
    'next/cache': { revalidatePath(value) { state.revalidated.push(value); } },
    'next/navigation': { redirect(value) { throw new Error(`redirect:${value}`); } },
  };
  return { state, actions: load('src/app/actions/testimonials.ts', mocks), data: load('src/lib/testimonials-server.ts', mocks) };
}

test('validation trims text, defaults to a draft, and validates order', () => {
  const parsed = helpers.parseTestimonialForm(form());
  assert.equal(parsed.data.quote, 'Approved feedback.');
  assert.equal(parsed.data.name, 'Person');
  assert.equal(parsed.data.is_published, false);
  assert.equal(parsed.data.role, null);
  assert.equal(parsed.data.sort_order, 2);
  for (const values of [{ quote: ' ' }, { name: '' }, { quote: 'x'.repeat(1601) }, { name: 'x'.repeat(121) }, { role: 'x'.repeat(161) }, { organization: 'x'.repeat(161) }, { sort_order: '-1' }, { sort_order: '1.5' }, { sort_order: '10000' }]) {
    assert.ok(helpers.parseTestimonialForm(form(values)).error);
  }
  assert.equal(helpers.isTestimonialId(id), true);
  assert.equal(helpers.isTestimonialId('static-test-1'), false);
});

test('photo signature validation rejects SVG and mismatched formats', () => {
  assert.equal(helpers.isValidTestimonialPhoto(png, 'image/png'), true);
  assert.equal(helpers.isValidTestimonialPhoto(new Uint8Array([255, 216, 255]), 'image/jpeg'), true);
  assert.equal(helpers.isValidTestimonialPhoto(new TextEncoder().encode('RIFF0000WEBP'), 'image/webp'), true);
  assert.equal(helpers.isValidTestimonialPhoto(png, 'image/jpeg'), false);
  assert.equal(helpers.isValidTestimonialPhoto(new TextEncoder().encode('<svg/>'), 'image/svg+xml'), false);
});

test('temporary content is unmistakably labelled and the public DTO excludes admin fields', () => {
  const { testimonials } = load('src/data/testimonials.ts');
  assert.equal(testimonials.length, 3);
  assert.ok(testimonials.every(item => item.isPlaceholder && item.title.includes('not a real endorsement')));
  const dto = helpers.toPublicTestimonial(row());
  assert.equal(dto.title, 'Organiser, Event');
  assert.equal(dto.is_published, undefined);
  assert.equal(dto.photo_path, undefined);
  assert.equal(dto.created_at, undefined);
});

test('unauthenticated actions cannot read, write, or upload anything', async () => {
  const { actions, state } = infrastructure({ authorized: false });
  assert.match((await actions.saveTestimonial(null, undefined, form())).error, /session expired/);
  assert.match((await actions.deleteTestimonial(id)).error, /session expired/);
  assert.equal(state.clientCalls, 0);
});

test('invalid IDs and invalid form input never reach storage', async () => {
  const { actions, state } = infrastructure();
  assert.ok((await actions.saveTestimonial('invalid', undefined, form())).error);
  assert.ok((await actions.deleteTestimonial('invalid')).error);
  assert.ok((await actions.saveTestimonial(null, undefined, form({ name: '' }))).error);
  assert.equal(state.clientCalls, 0);
});

test('creating a draft persists content and revalidates the admin and public pages', async () => {
  const { actions, state } = infrastructure();
  await assert.rejects(actions.saveTestimonial(null, undefined, form()), /redirect:.*flash=created/);
  assert.equal(state.rows.length, 1);
  assert.equal(state.rows[0].is_published, false);
  assert.deepEqual(state.revalidated, ['/speaking', '/dashboard/speaking/testimonials']);
});

test('publishing with a portrait uploads safely using a generated filename', async () => {
  const { actions, state } = infrastructure();
  const data = form({ is_published: 'on' });
  data.set('photo', new File([png], '../../unsafe.svg', { type: 'image/png' }));
  await assert.rejects(actions.saveTestimonial(null, undefined, data), /redirect:.*flash=created/);
  assert.equal(state.rows[0].is_published, true);
  assert.match(state.uploads[0].filePath, /^portraits\/[a-f0-9-]{36}\.png$/);
  assert.equal(state.uploads[0].settings.upsert, false);
  assert.match(state.rows[0].photo_url, /^https:\/\/example\.test\/portraits\//);
});

test('oversized or mismatched images are rejected before database access', async () => {
  for (const photo of [new File([new Uint8Array(2097153)], 'large.png', { type: 'image/png' }), new File(['<svg/>'], 'fake.png', { type: 'image/png' })]) {
    const { actions, state } = infrastructure();
    const data = form(); data.set('photo', photo);
    assert.ok((await actions.saveTestimonial(null, undefined, data)).error);
    assert.equal(state.clientCalls, 0);
  }
});

test('editing preserves the existing photo and ignores client-supplied photo URLs', async () => {
  const existing = row({ photo_url: 'https://example.test/current.png', photo_path: `portraits/${id}.png`, is_published: true });
  const { actions, state } = infrastructure({ rows: [existing] });
  await assert.rejects(actions.saveTestimonial(id, undefined, form({ quote: 'Updated quote', photo_url: 'javascript:bad' })), /flash=updated/);
  assert.equal(state.rows[0].quote, 'Updated quote');
  assert.equal(state.rows[0].photo_url, existing.photo_url);
  assert.equal(state.rows[0].is_published, false);
  assert.deepEqual(state.removed, []);
});

test('removing a photo clears both fields and cleans up only the owned file', async () => {
  const oldPath = `portraits/${id}.png`;
  const { actions, state } = infrastructure({ rows: [row({ photo_url: 'https://example.test/photo.png', photo_path: oldPath })] });
  await assert.rejects(actions.saveTestimonial(id, undefined, form({ remove_photo: 'on' })), /flash=updated/);
  assert.equal(state.rows[0].photo_url, null);
  assert.equal(state.rows[0].photo_path, null);
  assert.deepEqual(state.removed, [oldPath]);
});

test('storage failure never silently creates a testimonial without the requested photo', async () => {
  const { actions, state } = infrastructure({ uploadError: true });
  const data = form(); data.set('photo', new File([png], 'portrait.png', { type: 'image/png' }));
  assert.match((await actions.saveTestimonial(null, undefined, data)).error, /photo could not be uploaded/);
  assert.equal(state.rows.length, 0);
});

test('missing schema produces setup guidance before any file upload', async () => {
  const { actions, state } = infrastructure({ missing: true });
  const data = form(); data.set('photo', new File([png], 'portrait.png', { type: 'image/png' }));
  assert.match((await actions.saveTestimonial(null, undefined, data)).error, /003_testimonials.sql/);
  assert.equal(state.uploads.length, 0);
  assert.equal(state.operations.filter(item => item.mode !== 'select').length, 0);
});

test('failed database writes never clean up the old photo or report success', async () => {
  const { actions, state } = infrastructure({ rows: [row({ photo_path: `portraits/${id}.png` })], writeError: true });
  assert.ok((await actions.saveTestimonial(id, undefined, form({ remove_photo: 'on' }))).error);
  assert.deepEqual(state.removed, []);
  assert.deepEqual(state.revalidated, []);
});

test('deleting removes the row, cleans up its photo, and revalidates both views', async () => {
  const oldPath = `portraits/${id}.png`;
  const { actions, state } = infrastructure({ rows: [row({ photo_path: oldPath })] });
  assert.deepEqual(await actions.deleteTestimonial(id), {});
  assert.equal(state.rows.length, 0);
  assert.deepEqual(state.removed, [oldPath]);
  assert.deepEqual(state.revalidated, ['/speaking', '/dashboard/speaking/testimonials']);
});

test('photo replacement only cleans up the old portrait after the new testimonial is saved', async () => {
  const oldPath = `portraits/${id}.png`;
  const { actions, state } = infrastructure({ rows: [row({ photo_path: oldPath, photo_url: 'https://example.test/old.png' })] });
  const data = form(); data.set('photo', new File([png], 'new.png', { type: 'image/png' }));
  await assert.rejects(actions.saveTestimonial(id, undefined, data), /flash=updated/);
  assert.notEqual(state.rows[0].photo_path, oldPath);
  assert.deepEqual(state.removed, [oldPath]);
});

test('cleanup cannot target an arbitrary storage path', async () => {
  const { actions, state } = infrastructure({ rows: [row({ photo_path: '../unrelated/photo.png' })] });
  await actions.deleteTestimonial(id);
  assert.deepEqual(state.removed, []);
});

test('public reads return published testimonials only, ordered by display order', async () => {
  const { data, state } = infrastructure({ rows: [row(), row({ id: newId, is_published: true, sort_order: 2 }), row({ id: '33333333-3333-4333-8333-333333333333', is_published: true, sort_order: 1 })] });
  const published = await data.getPublishedTestimonials();
  assert.equal(published.length, 2);
  assert.equal(published[0].id, '33333333-3333-4333-8333-333333333333');
  assert.ok(state.operations[0].filters.some(([key, value]) => key === 'is_published' && value === true));
  assert.equal(state.authCalls, 0);
});

test('public read failure falls back safely; admin reads require authentication', async () => {
  const missing = infrastructure({ missing: true });
  assert.deepEqual(await missing.data.getPublishedTestimonials(), []);
  assert.equal((await missing.data.getAdminTestimonials()).setupRequired, true);
  const denied = infrastructure({ authorized: false });
  await assert.rejects(denied.data.getAdminTestimonials(), /unauthorized/);
  assert.equal(denied.state.clientCalls, 0);
});

test('admin session validation checks signed JWT algorithm and role', async () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'local-unit-test-secret-not-a-real-key-1234';
  let role = 'admin', token = 'signed-test-token', fail = false;
  const session = load('src/lib/admin-session.ts', {
    'next/headers': { async cookies() { return { get() { return token ? { value: token } : undefined; } }; } },
    'next/navigation': { redirect() { throw new Error('redirected'); } },
    jose: { async jwtVerify(value, secret, options) {
      assert.equal(value, 'signed-test-token');
      assert.ok(secret instanceof Uint8Array);
      assert.deepEqual(options.algorithms, ['HS256']);
      if (fail) throw new Error('invalid signature');
      return { payload: { role } };
    } },
  });
  try {
    assert.equal(await session.isAdminSession(), true);
    role = 'viewer'; assert.equal(await session.isAdminSession(), false);
    fail = true; assert.equal(await session.isAdminSession(), false);
    token = ''; assert.equal(await session.isAdminSession(), false);
    await assert.rejects(session.requireAdminSession(), /redirected/);
  } finally {
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  }
});
