import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('website metadata resolves to unique components, specs, and live examples', async () => {
  const directory = new URL('../design-system/react/ui/', import.meta.url);
  const files = (await readdir(directory)).filter((file) =>
    file.endsWith('.meta.json'),
  );
  const ids = new Set();
  for (const file of files) {
    const meta = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
    assert(!ids.has(meta.id), `duplicate component ${meta.id}`);
    ids.add(meta.id);
    assert(meta.name && meta.title && meta.category && meta.description);
    assert(meta.features.length > 0);
    await access(new URL(meta.source, directory));
    await access(
      new URL(`../apps/lab/src/examples/${meta.id}.tsx`, import.meta.url),
    );
    const spec = JSON.parse(
      await readFile(
        new URL(`../design-system/specs/${meta.id}.json`, import.meta.url),
        'utf8',
      ),
    );
    assert.equal(spec.id, meta.id);
    assert(spec.behavior.length > 0);
  }
  const implementations = (await readdir(directory)).filter((file) =>
    file.endsWith('.tsx'),
  );
  assert.equal(
    files.length,
    implementations.length,
    'every exported UI module needs website metadata',
  );
});
