# Craftbase × shadcn/ui

Craftbase 的样式适配层。保留业务项目已有的 shadcn/ui 组件及交互，用 Craftbase 设计变量和 CSS 配方统一外观。无需导入本项目的 React 组件。

## 接入

适用于 Tailwind CSS v4、采用完整颜色值变量的 shadcn 项目。把本目录及 `design-system/styles/` 复制到项目中，在主 CSS 的现有 Tailwind import 后、业务覆盖样式前引入：

```css
@import "tailwindcss";
@import "./design-system/styles/index.css";
@import "./design-system/adapters/shadcn/theme.css";
@source "./components/ui";
```

路径按业务项目调整；已有 Tailwind import 保留一份。适配文件含 `@theme inline`，需要经过 Tailwind 编译，不应直接用浏览器 `<link>` 加载。它接管页面的 shadcn 语义主题变量及本轮组件的 slot 样式。

把主题放到 `html`，保证 Portal 中的菜单和弹窗继承相同变量：

```html
<html class="cb-root" data-appearance="light" data-density="comfortable">
```

深色模式同时使用 `class="cb-root dark"` 与 `data-appearance="dark"`。紧凑模式改为 `data-density="compact"`。跟随系统时，由业务应用的主题管理器同步这两项，不需要引入本站的 preferences 模块。

组件继续按业务项目原来的方式使用：

```tsx
<Button>保存修改</Button>
<Button variant="secondary">取消</Button>
<Input placeholder="项目名称" />
```

## 本轮支持边界

- Button：标准 `data-slot="button"`，default / secondary / outline / ghost / destructive / link；默认高度跟随密度。带 `data-size` 的 sm、lg 和 icon 尺寸单独处理。
- Input：字段填充、边界、占位文字、焦点、错误、只读和禁用；普通输入框跟随密度。
- DropdownMenu：菜单表面、子菜单表面、行高、高亮、危险项及图标继承。交互由业务项目原有 Radix / Base UI 实现负责。
- Dialog：表面、文字、圆角、窗口阴影和滚动限制。关闭和焦点行为由已有组件负责。
- 颜色映射包含 card、popover 和 sidebar 语义；这只提供基础色彩，不表示已完成这些组件的全部样式验收。图表色板未提供。

当前用仓库已有的 new-york-v4 样例及不带 Craftbase 自定义属性的按钮验证。Nova / Base UI 等变体可使用语义颜色映射；其不同的 slot、尺寸和交互结构还未逐项验证，不能视为完整兼容认证。缺少 `data-slot` 的旧组件需要补标记或单独适配。旧版 `hsl(var(--primary))` 形式也需要先迁移为完整颜色值主题。

普通内容默认使用实色，便于移植和确保可读性。展示站的壁纸及五档整站透明材质属于独立演示背景，不是接入此适配层的必要依赖。

## 本地预览

运行 `pnpm dev`，打开 `#/shadcn`。可切换明暗、密度及演示材质，操作六种按钮、输入校验、菜单和弹窗。顶部导航提供入口。`design-system/react/theme.css` 保留为旧入口的兼容转发。
