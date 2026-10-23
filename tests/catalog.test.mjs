import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const read = async (path) =>
  JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
test('official inventory has unique catalog entries and resolvable live examples', async () => {
  const catalog = await read('apps/lab/src/registry/components.json');
  const lock = await read('design-system/adapters/shadcn/upstream-lock.json');
  assert.equal(new Set(catalog.map((item) => item.id)).size, catalog.length);
  for (const item of lock.components)
    assert(
      catalog.some((entry) => entry.id === item.id),
      `missing ${item.id}`,
    );
  for (const item of catalog) {
    assert(item.title && item.category && item.observations.length);
    await access(
      new URL(`../apps/lab/src/examples/${item.example}.tsx`, import.meta.url),
    );
    if (item.source)
      await access(new URL(`../${item.source}`, import.meta.url));
    assert(item.docs.startsWith('https://ui.shadcn.com/'));
  }
  assert.deepEqual(
    catalog
      .filter((x) => x.kind === 'composition')
      .map((x) => x.id)
      .sort(),
    ['data-table', 'date-picker', 'typography'],
  );
});
test('adapter maps every chart and sidebar variable and scopes component recipes', async () => {
  const theme = await readFile(
    new URL('../design-system/adapters/shadcn/theme.css', import.meta.url),
    'utf8',
  );
  for (let i = 1; i <= 5; i++)
    assert(theme.includes(`--chart-${i}: var(--cb-chart-${i})`));
  assert(theme.includes('--sidebar-ring: var(--cb-focus-ring)'));
  assert(!theme.includes('data-native-size'));
});
