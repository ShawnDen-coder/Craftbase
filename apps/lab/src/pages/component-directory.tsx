import { useState } from 'react';
import { Button } from '../../../../design-system/react/ui/button';
import { Input } from '../../../../design-system/react/ui/input';
import {
  type AppearanceProps,
  AppearanceSettings,
} from '../components/appearance-settings';
import { catalog, categories } from '../registry/catalog';
import './catalog.css';
import './component-directory.css';
export function ComponentDirectory(props: AppearanceProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const matches = catalog.filter(
    (item) =>
      (category === '全部' || item.category === category) &&
      `${item.title} ${item.name}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main id="main" tabIndex={-1} className="specimen-layout">
      <aside className="specimen-settings">
        <h1>组件</h1>
        <p>{catalog.length} 个组件与组合示例</p>
        <AppearanceSettings {...props} />
      </aside>
      <div className="specimen-canvas">
        <header className="directory-heading">
          <div>
            <h2>浏览组件</h2>
            <p>在同一套设计规则下观察外观与状态。</p>
          </div>
          <Input
            aria-label="搜索组件"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索名称 / Search…"
            className="max-w-72"
          />
        </header>
        <nav className="directory-filters" aria-label="组件分类">
          {['全部', ...categories].map((name) => (
            <Button
              key={name}
              variant={category === name ? 'secondary' : 'ghost'}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </Button>
          ))}
        </nav>
        <p role="status" className="directory-count">
          {matches.length} 个结果
        </p>
        <div className="directory-grid">
          {matches.map((item) => (
            <a
              key={item.id}
              href={`#/components/${item.id}`}
              className="directory-entry"
            >
              <span className="directory-category">{item.category}</span>
              <h3>{item.title}</h3>
              <span>{item.name}</span>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
        {!matches.length && (
          <p className="empty-results">没有匹配的组件，请调整搜索词或分类。</p>
        )}
      </div>
    </main>
  );
}
