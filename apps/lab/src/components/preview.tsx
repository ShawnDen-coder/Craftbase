import { type ComponentType, lazy, Suspense } from 'react';

const modules = import.meta.glob<{ default: ComponentType }>(
  '../examples/*.tsx',
);
const previews = Object.fromEntries(
  Object.entries(modules).map(([file, load]) => [
    file.split('/').pop()?.replace('.tsx', ''),
    lazy(load),
  ]),
);
export function Preview({ id }: { id: string }) {
  const Example = previews[id];
  return (
    <Suspense fallback={<p className="muted">正在加载预览…</p>}>
      {Example ? <Example /> : <p>暂无预览</p>}
    </Suspense>
  );
}
