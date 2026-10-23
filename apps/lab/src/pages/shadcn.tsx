import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../../../design-system/react/ui/input';
import { PreferenceSelect } from '../components/preference-select';
import { Preview } from '../components/preview';
import { materials, type Preferences } from '../lib/preferences';
import './catalog.css';

// These buttons deliberately use only upstream data-slot and utility classes.
// They do not use Craftbase Button, data-cb-button, nativeSize or custom variants.
const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};
export function ShadcnPreview({
  prefs,
  update,
}: {
  prefs: Preferences;
  update: (key: keyof Preferences, value: string) => void;
}) {
  const [feedback, setFeedback] = useState('选择一个按钮，观察操作反馈。');
  return (
    <main className="specimen-layout" id="main" tabIndex={-1}>
      <aside className="specimen-settings" aria-label="适配预览外观">
        <h1>shadcn/ui</h1>
        <p>Craftbase 样式适配</p>
        <PreferenceSelect
          label="配色"
          ariaLabel="适配预览配色"
          value={prefs.appearance}
          onValueChange={(v) => update('appearance', v)}
          options={{ system: '跟随系统', light: '浅色', dark: '深色' }}
        />
        <PreferenceSelect
          label="密度"
          ariaLabel="适配预览密度"
          value={prefs.density}
          onValueChange={(v) => update('density', v)}
          options={{ comfortable: '舒适', compact: '紧凑' }}
        />
        <PreferenceSelect
          label="材质"
          ariaLabel="适配预览材质"
          value={prefs.material}
          onValueChange={(v) => update('material', v)}
          options={materials}
        />
        <nav>
          <a href="#/">返回 ShowCase</a>
        </nav>
        <p className="specimen-note">
          按钮、输入、菜单与弹窗。交互示例仅在当前页面生效。
        </p>
      </aside>
      <div className="specimen-canvas shadcn-preview">
        <div className="specimen-heading">
          <h2>基础设计，应用到 shadcn/ui</h2>
        </div>
        <div className="shadcn-grid">
          <div className="specimen-column">
            <section className="specimen-panel">
              <header>
                <h2>按钮层级</h2>
                <p>填充、描边、轻量与危险操作</p>
              </header>
              <div className="shadcn-actions">
                {Object.entries(variants).map(([variant, classes]) => (
                  <button
                    key={variant}
                    type="button"
                    data-slot="button"
                    className={`inline-flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 ${classes}`}
                    onClick={() => setFeedback(`已点击 ${variant}`)}
                  >
                    {variant}
                  </button>
                ))}
                <button
                  type="button"
                  data-slot="button"
                  className="bg-secondary text-secondary-foreground disabled:opacity-50"
                  disabled
                >
                  不可用
                </button>
                <button
                  type="button"
                  data-slot="button"
                  data-size="icon"
                  className="inline-flex items-center justify-center bg-secondary text-secondary-foreground"
                  aria-label="新建项目"
                  onClick={() => setFeedback('已新建示例项目')}
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="specimen-feedback" role="status">
                {feedback}
              </p>
            </section>
            <section className="specimen-panel">
              <header>
                <h2>菜单与选择</h2>
                <p>展开菜单，观察高亮、勾选与禁用项</p>
              </header>
              <Preview id="menu" />
            </section>
          </div>
          <div className="specimen-column">
            <section className="specimen-panel">
              <header>
                <h2>输入与状态</h2>
                <p>常规、错误、只读与禁用</p>
              </header>
              <Preview id="input" />
              <div className="shadcn-fields">
                <label htmlFor="shadcn-error">错误状态</label>
                <Input
                  id="shadcn-error"
                  aria-invalid="true"
                  aria-describedby="shadcn-error-help"
                  defaultValue=""
                  placeholder="输入项目名称"
                />
                <p className="error" id="shadcn-error-help">
                  项目名称不能为空。
                </p>
                <label htmlFor="shadcn-readonly">只读</label>
                <Input
                  id="shadcn-readonly"
                  value="Craftbase / 设计基础"
                  readOnly
                />
                <label htmlFor="shadcn-disabled">不可用</label>
                <Input
                  id="shadcn-disabled"
                  value="暂时无法编辑"
                  disabled
                  readOnly
                />
              </div>
            </section>
            <section className="specimen-panel">
              <header>
                <h2>弹窗与确认</h2>
                <p>打开窗口，编辑名称并保存或取消</p>
              </header>
              <Preview id="dialog" />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
