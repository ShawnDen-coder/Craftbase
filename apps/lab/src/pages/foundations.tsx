import macos from '../../../../design-system/themes/macos/tokens.json';
import type { Preferences } from '../lib/preferences';
import { ReferenceColors } from '../sections/reference-colors';

const labels: Record<string, string> = {
  'surface.canvas': '画布',
  'surface.panel': '面板',
  'surface.overlay': '浮层',
  'text.primary': '主要文字',
  'text.secondary': '次要文字',
  'border.subtle': '分隔线',
  'border.control': '控件边界',
  'action.primary': '主要操作',
  'action.on-primary': '操作文字',
  'action.hover': '操作悬停',
  'selection.background': '选中背景',
  'selection.text': '选中文字',
  'status.danger': '危险状态',
  'status.on-danger': '危险操作文字',
  'focus.ring': '焦点',
};

export function Foundations({
  prefs,
  appearance,
}: {
  prefs: Preferences;
  appearance: 'light' | 'dark';
}) {
  const tokens = macos.appearance[appearance];
  return (
    <>
      <h1>设计基础</h1>
      <p className="page-description">色彩、文字角色与间距。</p>{' '}
      <ReferenceColors />
      <section id="colors">
        <div className="section-heading">
          <div>
            <h2>
              Web 语义色 <span>Semantic colors</span>
            </h2>
            <p>按用途命名，让主题变化不改变语义。</p>
          </div>
          <span className="meta">
            {Object.keys(tokens).filter((key) => key in labels).length}{' '}
            组语义颜色 · {appearance === 'dark' ? '深色' : '浅色'}
          </span>
        </div>
        <div className="swatches">
          {Object.entries(tokens)
            .filter(([key]) => key in labels)
            .map(([key, value]) => (
              <div className="swatch" key={key}>
                <div className="color-chip" style={{ background: value }} />
                <div className="swatch-label">
                  <strong>{labels[key]}</strong>
                  <code>{value.toUpperCase()}</code>
                </div>
                <code className="token-name">{key}</code>
              </div>
            ))}
        </div>
      </section>
      <section id="typography" className="foundations">
        <div>
          <div className="section-heading">
            <h2>
              字体 <span>Typography</span>
            </h2>
            <span className="meta">
              英文{' '}
              {prefs.fontLatin === 'jetbrains'
                ? 'JetBrains Mono'
                : prefs.fontLatin === 'sarasa'
                  ? 'Sarasa Term SC'
                  : 'System'}
              {' · '}中文{' '}
              {prefs.fontCjk === 'sarasa' ? 'Sarasa Term SC' : 'System'}
            </span>
          </div>
          <p className="muted">
            左侧为原稿字号／行高，右侧为 Web 调整。字体跟随当前设置，未分发 SF
            Pro。
          </p>
          <div className="type-role-list">
            {(
              [
                ['large-title', 'Large Title', '26/32', '28/34'],
                ['title-1', 'Title 1', '22/26', '22/28'],
                ['title-2', 'Title 2', '17/22', '18/24'],
                ['title-3', 'Title 3', '15/20', '16/22'],
                ['body', 'Body', '13/16', '14/21'],
                ['callout', 'Callout', '12/15', '13/18'],
                ['subheadline', 'Subheadline', '11/14', '13/18'],
                ['footnote', 'Footnote', '10/13', '12/17'],
                ['caption', 'Caption', '10/13', '12/17'],
              ] as const
            ).map(([role, label, native, web]) => (
              <div className="type-role-row" key={role}>
                <strong className="type-role-label">{label}</strong>
                <div className="type-role-value">
                  <p
                    className="cb-type"
                    data-type-role={role}
                    data-type-scale="native"
                  >
                    清晰的设计基础
                  </p>
                  <span className="type-role-measure">原稿 {native}</span>
                </div>
                <div className="type-role-value">
                  <p className="cb-type" data-type-role={role}>
                    清晰的设计基础
                  </p>
                  <span className="type-role-measure">Web {web}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-heading">
            <h2>
              空间 <span>Spacing</span>
            </h2>
            <span className="meta">4px 基准</span>
          </div>
          <div className="spacing-scale">
            {[4, 8, 12, 16, 24, 32].map((n) => (
              <div key={n}>
                <div style={{ height: n, width: n }} />
                <code>{n}</code>
              </div>
            ))}
          </div>
          <p className="muted">
            控件高度 {prefs.density === 'compact' ? '28' : '36'}px · 控件圆角{' '}
            按钮为胶囊，输入框为 9px
          </p>
        </div>
      </section>
    </>
  );
}
