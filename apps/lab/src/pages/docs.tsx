import type { Preferences } from '../lib/preferences';
import { Materials } from '../sections/materials';
import { StateGallery } from '../sections/states';
import { Foundations } from './foundations';
export const topics = [
  { id: 'introduction', title: '阅读指南' },
  { id: 'foundations', title: '设计基础' },
  { id: 'states', title: '状态与尺寸' },
  { id: 'materials', title: '材质与层级' },
];
export function Docs({
  topic,
  prefs,
  appearance,
}: {
  topic: string;
  prefs: Preferences;
  appearance: 'light' | 'dark';
}) {
  return (
    <div className="site-container docs-layout">
      <aside className="docs-sidebar">
        <p>文档</p>
        <nav aria-label="文档导航">
          {topics.map((item) => (
            <a
              className="doc-link"
              key={item.id}
              href={`#/docs/${item.id}`}
              aria-current={topic === item.id ? 'page' : undefined}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>
      <main className="docs-content" id="main" tabIndex={-1}>
        {topic === 'introduction' && (
          <>
            <h1>个人设计基础</h1>
            <p className="page-description">材质、色彩、字体与空间。</p>
            <section className="prose">
              <h2>内容索引</h2>
              <p>
                Craftbase
                用来沉淀个人基础设计：语义色彩、文字层级、空间尺度、尺寸、状态与材质规则。展示站帮助观察设计选择，适配层让这些规则应用到现有组件库。
              </p>
              <p>
                展示页左侧的外观设置会同步改变整站。切换浅色、深色或密度，观察同一套规则如何作用于表面、文字与控件。
              </p>
              <div className="reading-index">
                <a href="#/docs/materials">
                  <strong>材质与层级</strong>
                  <span>比较实色、普通材质与玻璃，观察不同背景下的表现。</span>
                </a>
                <a href="#/docs/foundations">
                  <strong>设计基础</strong>
                  <span>查看语义色板、文字层级与空间尺度。</span>
                </a>
                <a href="#/docs/states">
                  <strong>状态与尺寸</strong>
                  <span>区分尺寸、密度、窗口状态和交互反馈。</span>
                </a>
                <a href="#/components">
                  <strong>ShowCase</strong>
                  <span>用按钮、输入框、菜单和对话框观察当前外观。</span>
                </a>
                <a href="#/shadcn">
                  <strong>样式适配</strong>
                  <span>观察基础设计在 shadcn/ui 组件上的表现。</span>
                </a>
              </div>
              <h2>基础设计、参考研究与组件适配</h2>
              <p>
                macOS 27 Community
                是当前材质与控件外观的一项参考，不代表项目只服务于
                macOS。参考值与自己的 Web 设计值分开保留。当前展板默认使用 Ultra
                Thin，通过降低背景对比保持文字清晰；原稿样片保留各自的材质参数。Liquid
                Glass 通过透色、模糊、高光与阴影呈现 Web 近似。
              </p>
              <p>
                组件样例用于验证设计规则与状态。当前提供 shadcn/ui
                样式适配；未来可根据实际需要扩展其他组件库，基础设计不绑定某个组件实现。
              </p>
              <a
                className="text-link"
                href="https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-"
              >
                查看 Figma 参考 ↗
              </a>
            </section>
          </>
        )}
        {topic === 'foundations' && (
          <Foundations prefs={prefs} appearance={appearance} />
        )}
        {topic === 'states' && <StateGallery />}
        {topic === 'materials' && <Materials />}
      </main>
    </div>
  );
}
