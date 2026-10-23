import { AppearanceSettings } from '../components/appearance-settings';
import './catalog.css';
import type { Preferences } from '../lib/preferences';
import { docGroups, docTopics } from '../registry/docs';
import { Materials } from '../sections/materials';
import { StateGallery } from '../sections/states';
import { Foundations } from './foundations';

export function Docs({
  topic,
  prefs,
  appearance,
  update,
}: {
  topic: string;
  prefs: Preferences;
  appearance: 'light' | 'dark';
  update: (key: keyof Preferences, value: string) => void;
}) {
  const current = docTopics.find((item) => item.id === topic);
  const link = (item: { id: string; title: string }) => (
    <a
      className="doc-link"
      href={`#/docs/${item.id}`}
      aria-current={topic === item.id ? 'page' : undefined}
    >
      {item.title}
    </a>
  );
  return (
    <div className="site-container docs-layout">
      <aside className="docs-sidebar">
        <nav aria-label="文档导航">
          {docGroups.map((group) => (
            <div className="docs-nav-group" key={group.title}>
              <p className="docs-nav-label">{group.title}</p>
              {group.items.map((item) => (
                <div key={item.id}>
                  {link(item)}
                  {item.children && (
                    <div className="docs-nav-children">
                      {item.children.map((child) => (
                        <div key={child.id}>{link(child)}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <AppearanceSettings prefs={prefs} update={update} />
      </aside>
      <main className="docs-content" id="main" tabIndex={-1}>
        <nav className="docs-breadcrumb" aria-label="当前位置">
          <a href="#/docs/introduction">文档</a>
          <span>/</span>
          <span>{current?.group}</span>
          <span>/</span>
          <span>{current?.title}</span>
        </nav>
        {topic === 'introduction' && (
          <>
            <h1>阅读指南</h1>
            <p className="page-description">
              从共同规则，到设计体系，再到组件实现。
            </p>
            <section className="prose">
              <p>
                Craftbase
                用来沉淀可复用的设计基础，并在真实组件和业务场景中验证。文档按三个层级组织，设计体系可以持续扩展。
              </p>
              <div className="reading-index">
                <a href="#/docs/foundations">
                  <strong>01 · 基础设计</strong>
                  <span>共享的语义色彩、文字角色、空间、密度与交互状态。</span>
                </a>
                <a href="#/docs/systems">
                  <strong>02 · 设计体系</strong>
                  <span>
                    各体系独立记录视觉语言、来源与适用范围。macOS 是其中之一。
                  </span>
                </a>
                <a href="#/docs/adapters/shadcn">
                  <strong>03 · 组件适配</strong>
                  <span>
                    使用 shadcn/ui 官方组件，以 Token 和 CSS 映射设计规则。
                  </span>
                </a>
              </div>
              <h2>如何使用展示站</h2>
              <p>
                先在 ShowCase
                查看真实场景，再到组件目录检查单个组件。左侧外观设置同步影响整站；默认使用实色，半透明材质可按需开启。
              </p>
              <h2>参考与实现</h2>
              <p>
                设计参考值与 Web
                实现值分别标注。体系专有的色板、字号和材质研究保留在对应体系下，组件适配层负责将设计规则应用到交互实现。
              </p>
            </section>
          </>
        )}
        {topic === 'foundations' && (
          <Foundations prefs={prefs} appearance={appearance} />
        )}
        {topic === 'states' && <StateGallery />}
        {topic === 'systems' && (
          <>
            <h1>设计体系</h1>
            <p className="page-description">共同基础之上的独立视觉语言。</p>
            <section className="prose">
              <p>
                每个体系独立记录设计来源、色彩、排版、控件和材质规则。共享语义
                Token 提供一致的用途命名，具体视觉选择由各体系定义。
              </p>
              <div className="reading-index">
                <a href="#/docs/systems/macos">
                  <strong>macOS</strong>
                  <span>当前已收录：色彩与字号参考、材质与层级研究。</span>
                </a>
              </div>
              <h2>扩展约定</h2>
              <p>
                新增体系时，在设计体系下建立独立入口，再补充基础映射与组件适配。当前站点尚未提供完整的设计体系切换器；外观、密度和材质选项只调整现有展示。
              </p>
            </section>
          </>
        )}
        {topic === 'systems/macos' && (
          <>
            <h1>macOS</h1>
            <p className="page-description">设计体系 / macOS</p>
            <section className="prose">
              <p>
                以 macOS 27 Community
                为设计参考，研究系统色彩、文字角色与半透明材质。参考样片与 Web
                近似实现分别保留，便于核对差异。
              </p>
              <div className="reading-index">
                <a href="#/docs/systems/macos/foundations">
                  <strong>色彩与字号参考</strong>
                  <span>系统色板、原稿字号与 Web 设计值对照。</span>
                </a>
                <a href="#/docs/systems/macos/materials">
                  <strong>材质与层级</strong>
                  <span>实色、普通材质、Liquid Glass 与可访问性降级。</span>
                </a>
              </div>
              <p>
                Liquid Glass 使用透色、模糊、高光与阴影呈现 Web
                近似；本站默认表面为实色。SF Pro 字体不随项目分发。
              </p>
              <a
                className="text-link"
                href="https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-"
                target="_blank"
                rel="noopener noreferrer"
              >
                macOS Figma 参考 ↗
              </a>
            </section>
          </>
        )}
        {topic === 'systems/macos/foundations' && (
          <Foundations prefs={prefs} appearance={appearance} reference />
        )}
        {topic === 'systems/macos/materials' && <Materials />}
        {topic === 'adapters/shadcn' && (
          <>
            <h1>shadcn/ui</h1>
            <p className="page-description">
              官方组件源码 + 语义 Token + 外部样式覆盖。
            </p>
            <section className="prose">
              <h2>接入方式</h2>
              <p>
                通过官方 registry
                引入组件源码，保留交互、键盘行为和可访问性结构。页面直接引用这些组件；主题映射与样式规则统一放在适配层。
              </p>
              <h2>覆盖顺序</h2>
              <p>
                基础 Token → shadcn 语义变量 → 控件与表面样式 →
                可选材质。优先调整变量，只有变量无法表达的形态才增加受作用域限制的
                CSS 规则。
              </p>
              <h2>更新与验证</h2>
              <p>
                上游文件有独立来源与哈希记录，通过显式同步更新。组件目录覆盖 66
                个展示项，ShowCase 验证表单、表格、图表和设置等组合场景。
              </p>
              <div className="reading-index">
                <a href="#/components">
                  <strong>组件目录</strong>
                  <span>浏览组件与交互状态。</span>
                </a>
                <a href="#/">
                  <strong>ShowCase</strong>
                  <span>检查真实场景中的统一样式。</span>
                </a>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
