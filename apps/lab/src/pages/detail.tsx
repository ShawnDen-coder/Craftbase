import { Preview } from '../components/preview';
import { type ComponentMeta, catalog } from '../registry/catalog';

const observations: Record<string, string[]> = {
  button: [
    '主要操作使用强调色，次要操作降低表面强调。',
    '悬停、按压和不可用状态保持可辨识；加载时保留原有尺寸。',
  ],
  input: [
    '输入表面与内容背景保持轻微差异，边界清晰而克制。',
    '焦点环与错误提示分别表达当前位置和校验状态。',
  ],
  menu: [
    '玻璃表面与背景分离，文字和图标保持可读。',
    '选中标记、图标、标签与快捷键各占独立槽位。',
  ],
  dialog: [
    '实色窗口承载需要专注阅读的内容，阴影表达层级。',
    '标题、输入与操作按阅读顺序排列，主次操作保持明确。',
  ],
};
export function Detail({ item }: { item: ComponentMeta }) {
  return (
    <div className="site-container docs-layout">
      <aside className="docs-sidebar">
        <a className="back-link" href="#/components">
          ← 全部外观示例
        </a>
        <nav aria-label="示例导航">
          {catalog.map((entry) => (
            <a
              className="doc-link"
              key={entry.id}
              href={`#/components/${entry.id}`}
              aria-current={entry.id === item.id ? 'page' : undefined}
            >
              {entry.title}
              <span className="doc-title">{entry.name}</span>
            </a>
          ))}
        </nav>
        <a className="text-link" href="#/docs/materials">
          材质与层级
        </a>
      </aside>
      <main className="detail-content" id="main" tabIndex={-1}>
        <p className="breadcrumb">外观示例 / {item.category}</p>
        <h1>{item.title}</h1>
        <p className="page-description">
          切换右上角的外观，比较{item.title}的表面、文字和状态变化。
        </p>
        <div className="detail-preview">
          <Preview id={item.id} />
        </div>
        <section className="detail-section">
          <h2>观察要点</h2>
          <ul>
            {observations[item.id].map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </section>
        <a className="text-link" href="#/docs/states">
          对照状态与尺寸 →
        </a>
      </main>
    </div>
  );
}
