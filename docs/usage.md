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

## 官方 React 组件

组件直接引用官方源码，接口见官方文档及 [源码说明](../design-system/react/README.md)。已有 shadcn 项目只需接入 [样式适配层](../design-system/adapters/shadcn/README.md)，不需要复制或改写 Craftbase 组件。

使用官方 variant、size 和组合接口。历史 loading / nativeSize / controlSize / dismissible 扩展已移除；加载状态用 Spinner + disabled + aria-busy 表达。根主题放在 html 上，确保 Portal 一致。默认实色，可选材质为展示环境设置。
