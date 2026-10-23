# 接入指南

首次使用见 [README 快速开始](../README.md#快速开始)。本文说明源码接入的主题属性、样式配方与实验性 React 组件接口。

当前提供基础 CSS、变量与 React 实验组件；Vue 尚未实现。可先将 `design-system/styles/` 复制到业务项目的 `craftbase/styles/`，保留 `index.css` 与生成的 `tokens.css` 相邻。项目主样式表导入 `./craftbase/styles/index.css`。

## 主题与密度

在 `.cb-root` 应用根元素上集中设置属性：

```html
<main class="cb-root" data-appearance="dark" data-density="compact">
  <!-- 页面内容 -->
</main>
```

| 属性                | 取值与作用                                      |
| ------------------- | ----------------------------------------------- |
| `data-appearance`   | `light` / `dark`，省略时为 light                |
| `data-density`      | `comfortable` / `compact`，省略时为 comfortable |
| `data-motion`       | `reduced` 将动效时长变量归零                    |
| `data-transparency` | `reduced` 将浮层材质回退为实色                  |
| `data-contrast`     | `increased` 强化浮层边界并关闭透明效果          |

暂不支持嵌套主题。根元素会响应系统减少动态效果的偏好；浮层还响应减少透明度、增加对比度和 forced-colors。属性本身不会提供开关 UI，也不会让未使用这些变量的业务动画自动停止。完整高对比度主题仍待实现。

## Tailwind CSS v4

业务项目需已配置 Tailwind v4。将 `design-system/tailwind/` 复制到 `craftbase/tailwind/`，在主样式表中按顺序导入：

```css
@import "tailwindcss";
@import "./craftbase/styles/index.css";
@import "./craftbase/tailwind/theme.css";
```

```html
<main class="cb-root" data-appearance="light" data-density="comfortable">
  <section class="bg-surface-panel text-text-primary rounded-panel p-cb-4">
    使用语义类名组织内容。
  </section>
</main>
```

映射还提供 `border-border-control`、`rounded-control`、`h-control` 等工具类。不要只引入 Tailwind 映射而遗漏主题变量。映射已通过生成检查、Vite/Tailwind 实际生产编译与展示站浏览器验证。

## 基础配方

| 类名            | 用途与限制                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------- |
| `.cb-root`      | 应用根容器的字体、前景、背景和颜色模式                                                      |
| `.cb-focus`     | 可聚焦元素的 focus-visible 轮廓，不会使普通 div 自动可聚焦                                  |
| `.cb-overlay`   | 浮层表面、边界和阴影；添加 `data-material="glass"` 可试用玻璃近似                           |
| `.cb-selection` | 根据 `aria-selected="true"` 、`aria-current="page"` 或 `aria-current="location"` 呈现选中态 |

这些类只提供样式，不实现菜单、对话框的角色、焦点管理或键盘行为。ARIA 属性应与元素语义匹配；玻璃只用于适合的操作层，不能代替可读性检查。

## 修改变量

变量定义见 [基础变量](../design-system/tokens/base.json) 和 [语义变量](../design-system/tokens/semantic.json)；macOS 材质参考单独保存在 [风格配方](../design-system/themes/macos/tokens.json)。要维护自己的变体，应修改源后重新生成，流程见 [开发指南](development.md)。复制到业务项目的文件不会自动随本仓库更新。

原稿依据与 Web 调整理由见 [macOS 落地契约](foundations/macos.md) 和 [Figma 原稿审查](references/figma/macos-27-review.md)。

## React 组件

源码和依赖说明见 [React 入口](../design-system/react/README.md)。展示站的可运行示例位于 `apps/lab/`；这不是 npm 包或 Registry 安装命令。

将 `design-system/react/`、`design-system/adapters/` 与基础样式一起复制到项目后，还需引入 `react/theme.css` 并让 Tailwind 扫描 React 源码。不要仅复制 TSX 而遗漏主题适配。对有 Portal 的应用，将主题属性放在 `html` 上，避免浮层脱离主题容器；`.dark` 与 `data-appearance="dark"` 应保持同步。

| 共享规格                                    | React 对应接口                                                    |
| ------------------------------------------- | ----------------------------------------------------------------- |
| Button primary / secondary / quiet / danger | `Button variant`；保留 shadcn 别名以兼容源码                      |
| Button size / loading                       | `size="small"`、`loading`；默认原生 type=button                   |
| Input size / invalid                        | `controlSize="small"`、`aria-invalid`，避免与原生 input size 冲突 |
| Menu                                        | `DropdownMenu`、Trigger、Content、Item；触发器承担 disabled       |
| Dialog open / dismissible                   | Root 的 `open` / `onOpenChange`；Content 的 `dismissible`         |

标签、错误说明及不可恢复操作的确认由消费端提供，组件不会根据占位文字推断可访问名称。状态与密度分别配置；触屏项目需要自行评估并调整控件的点击区域。

## macOS 尺寸与材质

Button 与 Input 可指定 `nativeSize="mini|small|medium|large|xl"`，高度分别为16/20/24/28/36px。它表示原稿尺寸，不受 density 影响；小尺寸用于桌面密集场景与原稿对照，不建议作为触屏默认。未指定时仍使用现有 Web 密度。

Button 支持 `context="content|over-glass"`；抽查原稿中两种上下文的普通按钮填充相同，因此不额外嵌套玻璃。次要按钮使用透明填充，呈现由底层表面决定。Input 保留独立圆角与内边距。

`.cb-scroll-edge` 配合 `data-edge="hard|soft"` 提供 sticky 边缘，`data-position="bottom"` 切换到底部。父级需要有明确高度与 overflow；可滚动区域需可被键盘聚焦。soft 蒙版位于 styles/assets，复制共享 styles 时需一并保留。

`data-glass-size="small|medium|large"` 提供材质样片的圆角与投影角色；无文字原稿对照使用 React `GlassSwatch`，其填充与混合层独立于承载文字的可读配方。

文字角色使用 `.cb-type` 与 `data-type-role="large-title|title-1|title-2|title-3|body|callout|subheadline|footnote|caption"`，默认是 Web 可读尺寸。`data-type-scale="native"` 仅在原稿对照或明确桌面密集场景中使用。
