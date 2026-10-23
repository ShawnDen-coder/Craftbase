import { useState } from 'react';
import { GlassSwatch } from '../../../../design-system/react/material-swatch';
import { Button } from '../../../../design-system/react/ui/button';
import { MaterialComparison } from './material-comparison';
export function Materials() {
  const [edge, setEdge] = useState('hard');
  const [feedback, setFeedback] = useState('');
  const [backdrop, setBackdrop] = useState('mixed');
  const [transparency, setTransparency] = useState('normal');
  const [contrast, setContrast] = useState('normal');
  const [motion, setMotion] = useState('normal');
  const [activity, setActivity] = useState('active');
  return (
    <section id="materials">
      <div className="section-heading">
        <div>
          <h1>材质与层级</h1>
          <p>
            本站主要表面默认使用实色，Ultra Thin 为可选参考材质，可在 ShowCase
            切换。下方对照不同材质，并保留实色回退。
          </p>
        </div>
        <span className="meta">Web 近似 · 非原生折射</span>
      </div>
      <MaterialComparison />
      <h2>交互与回退</h2>
      <div className="material-controls">
        <label>
          背景
          <select
            value={backdrop}
            onChange={(e) => setBackdrop(e.target.value)}
          >
            <option value="light">亮背景</option>
            <option value="dark">暗背景</option>
            <option value="mixed">复杂背景</option>
          </select>
        </label>
        <label>
          透明度
          <select
            value={transparency}
            onChange={(e) => setTransparency(e.target.value)}
          >
            <option value="normal">允许透明</option>
            <option value="reduced">减少透明</option>
          </select>
        </label>
        <label>
          对比度
          <select
            value={contrast}
            onChange={(e) => setContrast(e.target.value)}
          >
            <option value="normal">标准</option>
            <option value="increased">增加对比</option>
          </select>
        </label>
        <label>
          动态效果
          <select value={motion} onChange={(e) => setMotion(e.target.value)}>
            <option value="normal">标准</option>
            <option value="reduced">减少动态</option>
          </select>
        </label>
        <label>
          窗口状态
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="active">活动窗口</option>
            <option value="inactive">非活动窗口</option>
          </select>
        </label>
      </div>
      <div
        className="material-stage"
        data-backdrop={backdrop}
        data-transparency={transparency}
        data-contrast={contrast}
        data-motion={motion}
        data-activity={activity}
      >
        <div className="material-backdrop" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="material-examples">
          <div className="cb-overlay material-sample" data-context="content">
            <strong>内容层 · 实色</strong>
            <p>长文本、表单和内容需要稳定的背景。</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFeedback('内容层操作已触发')}
            >
              内容操作
            </Button>
          </div>
          <div className="cb-overlay material-sample" data-material="regular">
            <strong>普通材质 · 文字承载</strong>
            <p>保留背景透色，并增加底色以保障文字可读。</p>
          </div>
          <div
            className="cb-overlay material-sample"
            data-material="glass"
            data-context="over-glass"
          >
            <strong>功能层 · Liquid Glass</strong>
            <p>透色、边缘高光与内阴影共同表现悬浮层级。</p>
            <Button size="sm" onClick={() => setFeedback('功能层操作已触发')}>
              功能操作
            </Button>
          </div>
        </div>
      </div>
      <section
        className="material-reference"
        aria-label="普通材质五档原稿参考"
        data-transparency={transparency}
        data-contrast={contrast}
      >
        <h3>普通材质 · 五档原稿参考</h3>
        <p className="muted">
          透明度保留原稿值。标签放在表面外，便于比较透色程度。
        </p>
        <div className="material-swatch-grid">
          {(
            [
              ['ultra-thin', 'Ultra Thin'],
              ['thin', 'Thin'],
              ['medium', 'Medium'],
              ['thick', 'Thick'],
              ['ultra-thick', 'Ultra Thick'],
            ] as const
          ).map(([weight, label]) => (
            <figure key={weight}>
              <div
                className="material-swatch-backdrop"
                data-backdrop={backdrop}
              >
                <div
                  className="cb-material-swatch"
                  data-material-weight={weight}
                  aria-hidden="true"
                />
              </div>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section
        className="material-reference"
        aria-label="玻璃尺寸与滚动边缘"
        data-transparency={transparency}
        data-contrast={contrast}
      >
        <h3>玻璃尺寸与滚动边缘</h3>
        <div className="glass-size-grid">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <figure key={size}>
              <div className="glass-size-backdrop">
                <GlassSwatch size={size} />
              </div>
              <figcaption>
                {size === 'small'
                  ? 'Small · 控件'
                  : size === 'medium'
                    ? 'Medium · 浮层'
                    : 'Large · 面板'}
              </figcaption>
            </figure>
          ))}
        </div>
        <label className="scroll-edge-choice">
          滚动边缘
          <select value={edge} onChange={(e) => setEdge(e.target.value)}>
            <option value="hard">清晰边缘</option>
            <option value="soft">柔和边缘</option>
          </select>
        </label>
        <section
          className="scroll-material-demo"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: This region must support keyboard scrolling.
          tabIndex={0}
          aria-label="可滚动的设计基础列表"
        >
          <div className="cb-scroll-edge" data-edge={edge}>
            <strong>设计基础</strong>
            <span>滚动查看全部条目</span>
          </div>
          {[
            '色彩与语义',
            '字体与层级',
            '间距与布局',
            '按钮与状态',
            '输入与校验',
            '菜单与快捷操作',
            '对话框与焦点',
            '材质与回退',
          ].map((label) => (
            <a
              key={label}
              href={
                label === '材质与回退'
                  ? '#/docs/materials'
                  : '#/docs/foundations'
              }
            >
              {label}
              <span>查看规范</span>
            </a>
          ))}
          <div
            className="cb-scroll-edge"
            data-edge={edge}
            data-position="bottom"
          >
            <span>8 项设计基础</span>
            <a href="#/docs/foundations">打开设计基础</a>
          </div>
        </section>
      </section>
      <p role="status" className="muted">
        {feedback}
      </p>
      <p className="muted">
        窗口活动状态仅降低框架强调，不等于禁用，也不等于按压。系统减少透明度、增加对比度和强制颜色设置同样优先。
      </p>
    </section>
  );
}
