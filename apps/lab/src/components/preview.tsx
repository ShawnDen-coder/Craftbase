import {
  Component,
  type ComponentType,
  lazy,
  type ReactNode,
  Suspense,
} from 'react';
import { catalog } from '../registry/catalog';

const modules = import.meta.glob<{ default: ComponentType }>(
  '../examples/**/*.tsx',
);
const previews = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => [
    path.replace('../examples/', '').replace('.tsx', ''),
    lazy(load),
  ]),
);
class PreviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert">预览加载失败，请刷新页面重试。</p>
    ) : (
      this.props.children
    );
  }
}
export function Preview({
  id,
  legacy = false,
}: {
  id: string;
  legacy?: boolean;
}) {
  const canonical = id === 'menu' ? 'dropdown-menu' : id;
  const key = legacy
    ? id
    : catalog.find((item) => item.id === canonical)?.example;
  const Example = key ? previews[key] : undefined;
  return (
    <PreviewBoundary key={key}>
      <Suspense fallback={<p role="status">正在加载预览…</p>}>
        {Example ? <Example /> : <p role="alert">暂无预览</p>}
      </Suspense>
    </PreviewBoundary>
  );
}
