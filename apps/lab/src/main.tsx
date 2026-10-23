import { Layers2 } from 'lucide-react';
import { lazy, StrictMode, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { apply, initial, type Preferences } from './lib/preferences';
import { catalog } from './registry/catalog';
import { docTopics } from './registry/docs';
import './styles.css';
import './site-material.css';
import { Toaster } from '../../../design-system/react/ui/sonner';
import { TooltipProvider } from '../../../design-system/react/ui/tooltip';

const Catalog = lazy(() =>
  import('./pages/catalog').then((m) => ({ default: m.Catalog })),
);
const ComponentDirectory = lazy(() =>
  import('./pages/component-directory').then((m) => ({
    default: m.ComponentDirectory,
  })),
);
const Detail = lazy(() =>
  import('./pages/detail').then((m) => ({ default: m.Detail })),
);
const Docs = lazy(() =>
  import('./pages/docs').then((m) => ({ default: m.Docs })),
);
const docIds = docTopics.map((item) => item.id);
function readRoute() {
  const legacy: Record<string, string> = {
    foundation: '/',
    components: '/components',
    colors: '/docs/foundations',
    typography: '/docs/foundations',
    states: '/docs/states',
    materials: '/docs/materials',
    patterns: '/docs/materials',
  };
  const hash = location.hash.slice(1);
  if (hash === '/shadcn') return '/components';
  if (hash === '/components/menu') return '/components/dropdown-menu';
  const route = legacy[hash] ?? (hash || '/');
  if (['/docs/patterns', '/docs/materials'].includes(route))
    return '/docs/systems/macos/materials';
  return route;
}
function App() {
  const [route, setRoute] = useState(readRoute);
  const [prefs, setPrefs] = useState(initial);
  const [appearance, setAppearance] = useState(() => apply(initial));
  useEffect(() => {
    const sync = () => setRoute(readRoute());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => {
    document
      .querySelector('.site-scroll-region')
      ?.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${route.startsWith('/docs') ? 'Docs' : route.startsWith('/components') ? '组件' : 'ShowCase'} · Craftbase`;
  }, [route]);
  useEffect(() => {
    const sync = () => setAppearance(apply(prefs));
    sync();
    try {
      localStorage.setItem('craftbase-preferences', JSON.stringify(prefs));
    } catch {}
    const media = matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [prefs]);
  const update = (key: keyof Preferences, value: string) =>
    setPrefs((p) => ({ ...p, [key]: value }));
  const selected = catalog.find((item) => route === `/components/${item.id}`);
  const topic =
    route === '/docs' ? 'introduction' : route.replace('/docs/', '');
  const isDocs =
    (route === '/docs' || route.startsWith('/docs/')) && docIds.includes(topic);
  return (
    <>
      <button
        type="button"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        跳到主要内容
      </button>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#/" aria-label="Craftbase 首页">
            <Layers2 size={24} />
            <strong>Craftbase</strong>
          </a>
          <nav className="top-nav" aria-label="主导航">
            <a href="#/" aria-current={route === '/' ? 'page' : undefined}>
              ShowCase
            </a>
            <a
              href="#/components"
              aria-current={
                route.startsWith('/components') ? 'page' : undefined
              }
            >
              组件
            </a>
            <a
              href="#/docs/introduction"
              aria-current={isDocs ? 'page' : undefined}
            >
              Docs
            </a>
          </nav>
          <nav className="resource-nav" aria-label="项目资源">
            <a href="#/docs/systems" aria-label="设计体系" title="设计体系">
              <span className="sr-only">设计体系</span>
              <Layers2 size={18} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/ShawnDen-coder/Craftbase"
              aria-label="GitHub 仓库"
              title="GitHub 仓库"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub 仓库</span>
              <span
                className="brand-icon brand-icon-github"
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>
      </header>
      <div className="site-scroll-region">
        <Suspense
          fallback={
            <main
              className="site-container loading-page"
              id="main"
              tabIndex={-1}
            >
              <p role="status">正在加载页面…</p>
            </main>
          }
        >
          {route === '/components' ? (
            <ComponentDirectory prefs={prefs} update={update} />
          ) : route === '/' ? (
            <Catalog prefs={prefs} update={update} />
          ) : selected ? (
            <Detail
              key={selected.id}
              item={selected}
              prefs={prefs}
              update={update}
            />
          ) : isDocs ? (
            <Docs
              key={topic}
              topic={topic}
              prefs={prefs}
              appearance={appearance}
              update={update}
            />
          ) : (
            <main
              className="site-container empty-results"
              id="main"
              tabIndex={-1}
            >
              <h1>这个页面不存在</h1>
              <p>可以从Docs重新开始。</p>
              <a className="primary-link" href="#/">
                浏览ShowCase
              </a>
            </main>
          )}
        </Suspense>
      </div>
      <Toaster theme={appearance} />
      <footer className="site-footer">
        <div className="site-footer-inner site-container">
          <div>
            <a className="brand" href="#/">
              <Layers2 size={20} />
              <strong>Craftbase</strong>
            </a>
          </div>
          <div className="footer-links">
            <a href="#/">ShowCase</a>
            <a href="#/docs/introduction">Docs</a>
            <a href="#/docs/systems">设计体系</a>
          </div>
          <p>Personal Design Foundations</p>
        </div>
      </footer>
    </>
  );
}
const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </StrictMode>,
  );
