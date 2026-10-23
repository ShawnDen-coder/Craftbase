import {
  type AppearanceProps,
  AppearanceSettings,
} from '../components/appearance-settings';
import { Preview } from '../components/preview';
import { type ComponentMeta, catalog } from '../registry/catalog';
import './catalog.css';
import './component-directory.css';
export function Detail({
  item,
  ...props
}: { item: ComponentMeta } & AppearanceProps) {
  return (
    <main id="main" tabIndex={-1} className="specimen-layout">
      <aside className="specimen-settings">
        <a href="#/components">← 全部组件</a>
        <h1 className="mt-4">{item.title}</h1>
        <p>{item.name}</p>
        <AppearanceSettings {...props} />
        <nav aria-label="同类组件">
          {catalog
            .filter((entry) => entry.category === item.category)
            .map((entry) => (
              <a
                key={entry.id}
                href={`#/components/${entry.id}`}
                aria-current={entry.id === item.id ? 'page' : undefined}
              >
                {entry.title}
              </a>
            ))}
        </nav>
      </aside>
      <div className="specimen-canvas">
        <header className="directory-heading">
          <div>
            <p>{item.category}</p>
            <h2>
              {item.title} <span className="muted">{item.name}</span>
            </h2>
          </div>
          <a
            href={item.docs}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            官方文档 ↗
          </a>
        </header>
        <div
          className="component-preview"
          onSubmitCapture={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            const link = (event.target as HTMLElement).closest('a');
            if (link?.getAttribute('href') === '#') event.preventDefault();
          }}
        >
          <Preview id={item.id} />
        </div>
        <section className="detail-section">
          <h2>观察要点</h2>
          <ul>
            {item.observations.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
