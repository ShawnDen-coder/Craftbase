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
            <h1>macOS 设计语言</h1>
            <p className="page-description">材质、色彩、字体与空间。</p>
            <section className="prose">
              <h2>内容索引</h2>
              <p>
                Craftbase 是面向桌面网页的 macOS
                样式参考。这里整理材质、语义色彩、字体、间距与状态规则，帮助你判断界面应该呈现怎样的视觉层级。
              </p>
              <p>
                右上角的外观设置会同步改变整站。切换浅色、深色或密度，观察同一套规则如何作用于表面、文字与控件。
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
              </div>
              <h2>如何理解原稿与网页的差异</h2>
              <p>
                macOS 27 Community 原稿是材质和样式的研究来源。本站主要表面使用
                Ultra
                Thin，通过降低背景对比保持文字清晰；原稿样片保留各自的材质参数。Liquid
                Glass 通过透色、模糊、高光与阴影呈现 Web 近似。
              </p>
              <p>
                每个示例用于说明视觉规则。站点不提供组件安装、接入教程或 API
                文档。
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
