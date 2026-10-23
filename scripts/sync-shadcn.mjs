import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const lockPath = resolve(
  root,
  'design-system/adapters/shadcn/upstream-lock.json',
);
const sha = (s) => createHash('sha256').update(s).digest('hex');
const base = 'https://ui.shadcn.com/r/styles/radix-nova/';
const customExamples = new Set([
  'chart',
  'code-block',
  'message',
  'message-scroller',
  'trace',
  'sidebar',
]);
export function transform(source) {
  const icons = new Set();
  let content = source.replace(
    /import\s*\{\s*IconPlaceholder\s*\}\s*from\s*"@\/app\/\(create\)\/components\/icon-placeholder"\s*/g,
    '',
  );
  content = content.replace(/<IconPlaceholder\b([\s\S]*?)\/>/g, (_, attrs) => {
    const name = attrs.match(/lucide="([^"]+)"/)?.[1];
    if (!name) throw Error('Unresolved official icon');
    icons.add(name);
    return `<${name}${attrs.replace(/\s*(?:lucide|tabler|hugeicons|phosphor|remixicon)="[^"]*"/g, '')}/>`;
  });
  content = content
    .replaceAll(
      '@/registry/radix-nova/examples/',
      '@/apps/lab/src/examples/upstream/',
    )
    .replaceAll(
      '@/registry/radix-nova/components/example',
      '@/apps/lab/src/components/official-example',
    )
    .replaceAll('@/registry/radix-nova/', '@/design-system/react/')
    .replaceAll('from "cn"', 'from "@/design-system/react/lib/utils"')
    .replaceAll('@/components/ui/', '@/design-system/react/ui/');
  // Host-only adapters: official examples use Next links/images. Components remain unchanged.
  content = content
    .replaceAll(
      'from "next/image"',
      'from "@/apps/lab/src/components/example-image"',
    )
    .replaceAll(
      'from "next/link"',
      'from "@/apps/lab/src/components/example-link"',
    );
  if (icons.size)
    content = content.startsWith('"use client"')
      ? content.replace(
          '"use client"',
          `"use client"\nimport { ${[...icons].sort().join(', ')} } from "lucide-react"`,
        )
      : `import { ${[...icons].sort().join(', ')} } from "lucide-react"\n${content}`;
  return content;
}
if (process.argv.includes('--check')) {
  const lock = JSON.parse(await readFile(lockPath, 'utf8'));
  for (const f of lock.files)
    if (sha(await readFile(resolve(root, f.target))) !== f.sha256)
      throw Error(`Official source drift: ${f.target}`);
  console.log(`Verified ${lock.files.length} official files (${lock.style}).`);
} else {
  const cache = process.argv
    .find((x) => x.startsWith('--from-cache='))
    ?.split('=')[1];
  if (!cache && !process.argv.includes('--refresh'))
    throw Error(
      'Use --check, --from-cache=<directory>, or --refresh (explicit upstream update).',
    );
  const get = async (name) => {
    if (cache) return readFile(resolve(cache, `${name}.json`), 'utf8');
    const response = await fetch(`${base}${name}.json`);
    if (!response.ok) throw Error(`${name}: ${response.status}`);
    return response.text();
  };
  const index = JSON.parse(await get('registry'));
  const entries = index.items.filter(
    (x) => x.files?.length && ['registry:ui', 'registry:hook'].includes(x.type),
  );
  const examples = index.items.filter(
    (x) =>
      x.type === 'registry:example' &&
      !['demo', 'component-example'].includes(x.name) &&
      !x.name.startsWith('sidebar-') &&
      !customExamples.has(x.name.replace(/-example$/, '')),
  );
  const files = [];
  for (const item of [...entries, ...examples]) {
    const raw = await get(item.name);
    const entry = JSON.parse(raw);
    for (const file of entry.files || []) {
      if (!file.content) continue;
      const relative = file.path.replace('registry/radix-nova/', '');
      const target = relative.startsWith('examples/')
        ? `apps/lab/src/examples/upstream/${relative.slice(9)}`
        : `design-system/react/${relative}`;
      const content = transform(file.content);
      await mkdir(dirname(resolve(root, target)), { recursive: true });
      await writeFile(resolve(root, target), content);
      files.push({
        item: item.name,
        url: `${base}${item.name}.json`,
        target,
        upstreamSha256: sha(file.content),
        sha256: sha(content),
      });
    }
  }
  const components = entries
    .filter((x) => x.type === 'registry:ui')
    .map((x) => ({
      id: x.name,
      kind: 'component',
      source: `design-system/react/ui/${x.name}.tsx`,
      docs:
        x.meta?.links?.docs ||
        `https://ui.shadcn.com/docs/components/radix/${x.name}`,
      example: customExamples.has(x.name) ? 'local' : 'upstream',
    }));
  const lock = {
    schemaVersion: 1,
    style: 'radix-nova',
    retrievedAt: new Date().toISOString(),
    registrySha256: sha(JSON.stringify(index)),
    transformVersion: 1,
    components,
    excluded: [
      {
        id: 'form',
        reason: 'Registry entry has no source; use Field and form composition.',
      },
      { id: 'toast', reason: 'Deprecated upstream; replaced by Sonner.' },
    ],
    files,
  };
  await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  console.log(
    `Synced ${components.length} components and ${files.length} files.`,
  );
}
