# Craftbase × shadcn/ui

使用官方组件，通过外部 CSS 应用 Craftbase 的基础设计。当前锁定和验证的基线是 **radix-nova + Tailwind CSS v4**。

## 接入已有项目

保留项目里的官方 shadcn 组件，复制 `design-system/styles/` 和整个 `design-system/adapters/shadcn/`。主 CSS 按以下顺序组织；现有 Tailwind、动画与 shadcn import 只保留一份：

```css
@layer theme, base, components, utilities, craftbase, preview;
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./design-system/styles/index.css";
@import "./design-system/adapters/shadcn/theme.css";
@source "./components/ui";
```

业务局部覆盖可放在 `@layer preview` 中；不要用全局标签规则覆盖组件。适配入口需要 Tailwind 编译，不能作为普通浏览器 link 样式表直接使用。

将主题属性放在 html 上，以覆盖 Portal 浮层：

```html
<html class="cb-root" data-appearance="light" data-density="comfortable">
```

深色同时设置 `.dark` 和 `data-appearance="dark"`。跟随系统由应用现有主题管理器同步。继续直接使用官方 API：

```tsx
<Button variant="default">保存修改</Button>
<Button variant="outline">取消</Button>
<Input aria-invalid={hasError} />
```

## 样式职责

- `theme.css`：Craftbase Token → shadcn 语义变量及 Tailwind 映射，包括 chart 和 sidebar。
- `recipes/controls.css`：控件尺寸、密度、焦点、错误和参考尺寸。
- `recipes/surfaces.css`：卡片、菜单、弹窗等承载表面。
- 展示站 `site-material.css`：可选透明材质环境，不属于业务接入的必要依赖。

所有配方限定在 `.cb-root` 下，基于官方公开 slot 和状态属性。组件尺寸和密度分别表达；日历单元格保留官方尺寸，不强制套用普通按钮高度。

## 展示与维护

`#/` 展示四个组合场景，`#/components` 提供完整组件浏览，旧 `#/shadcn` 链接继续有效。默认实色，可选择五档材质。颜色、密度及中英字体偏好在浏览器内持久化。

[官方源码清单](upstream-lock.json)记录 63 个组件；展示目录额外包含 Date Picker、Data Table 和 Typography 组合示例。Form 空 Registry 条目由 Field 表单组合替代，弃用 Toast 由 Sonner 替代。AI Elements 独立集合及全部 Blocks 不在范围内。

当前支持范围以固定基线和测试为准；不承诺所有 shadcn 风格、历史 HSL 变量格式及其他底层实现兼容。原有 specs 是历史研究记录，不再约束官方组件 API。
