# Craftbase

macOS 材质与样式规则的桌面网页参考。

从透色、模糊和层级，到语义色彩、文字与空间，Craftbase 把设计规则放进可观察、可切换的页面。仅保留 macOS 风格，支持浅色、深色、跟随系统及舒适／紧凑密度。

可在展示站观察材质与控件，也可以将共享 CSS 和实验性 React 组件复制到自己的项目。当前没有发布 npm 包或可安装 Registry。

## 快速开始

### 本地预览

需要 Node.js 22.13+ 和 pnpm 11.0.9：

```sh
git clone https://github.com/ShawnDen-coder/Craftbase.git
cd Craftbase
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址即可进入 ShowCase，通过 Docs 浏览材质与设计规则。左侧可切换材质、配色、密度与字体，设置自动保存在浏览器中。

### 接入 React 项目

以下示例面向已经配置好 **React、TypeScript 和 Tailwind CSS v4** 的项目。

**1. 复制共享源码。** 将本仓库的三个目录复制到业务项目，保留目录结构、`styles/assets/`、`tokens.css` 和 React 目录内的许可证文件：

```text
本仓库                          业务项目
 design-system/styles/    →     src/craftbase/styles/
 design-system/tailwind/  →     src/craftbase/tailwind/
 design-system/react/    →     src/craftbase/react/
```

**2. 安装依赖。** 在业务项目根目录执行；已验证的依赖版本见本仓库 [package.json](package.json)。

```sh
pnpm add radix-ui lucide-react class-variance-authority clsx tailwind-merge tabbable
```

**3. 引入样式。** 在业务项目的 `src/index.css` 中按顺序加入，并确保应用入口导入该样式表：

```css
@import "tailwindcss";
@import "./craftbase/styles/index.css";
@import "./craftbase/tailwind/theme.css";
@import "./craftbase/react/theme.css";

@source "./craftbase/react";
```

**4. 设置主题。** 以 Vite 项目为例，修改 `index.html` 的根元素：

```html
<html
  lang="zh-CN"
  class="cb-root"
  data-theme="macos"
  data-appearance="light"
  data-density="comfortable"
>
```

主题放在 `html` 上，让 Dialog、菜单等 Portal 浮层继承样式。深色模式需同时设置 `data-appearance="dark"` 和 `class="cb-root dark"`；紧凑密度使用 `data-density="compact"`。

**5. 使用组件。** 在 `src/App.tsx` 中加入：

```tsx
import { Button, Input } from './craftbase/react';

export default function App() {
  return (
    <section className="grid gap-4 rounded-panel bg-surface-panel p-cb-4 text-text-primary">
      <h1 className="cb-type" data-type-role="title-2">
        项目设置
      </h1>
      <label htmlFor="project-name">项目名称</label>
      <Input id="project-name" defaultValue="My project" />
      <Button variant="primary" onClick={() => alert('已点击保存')}>
        保存
      </Button>
    </section>
  );
}
```

启动业务项目的开发服务器，即可查看应用了 Craftbase 主题的输入框和按钮。示例按钮仅演示交互，保存逻辑由业务项目实现。

只需要颜色、字体、圆角和材质时，可以仅复制 `styles/` 并导入 `styles/index.css`，在 `.cb-root` 下通过 `var(--cb-text-primary)` 等 CSS 变量使用，无需安装 React 组件依赖。更多属性、材质配方和组件接口见 [接入指南](docs/usage.md) 与 [React 组件说明](design-system/react/README.md)。

## 浏览内容

- **材质与层级**：实色、普通材质五档、玻璃样片与滚动边缘。
- **设计基础**：语义色板、文字角色，以及空间与圆角规则。
- **ShowCase**：同屏比较表单、按钮、菜单、窗口、开关、滑块和列表。
- **状态与尺寸**：尺寸与密度的区别，以及焦点、加载、错误和不可用状态。

## 使用边界

React 共享组件目前包含 Button、Input、Dialog 和 DropdownMenu，状态为 experimental，接入真实业务后仍需验证键盘、辅助技术与对比度。ShowCase 中的其他演示控件、布局、壁纸和字体资源不包含在上述快速接入范围内。展示站面向桌面浏览器，不维护独立手机布局。

复制的源码不会自动随本仓库更新。已有 shadcn 或 Tailwind 主题的项目需检查 `react/theme.css` 中的全局语义变量映射，避免覆盖现有主题。Vue 适配尚未实现。

## 设计依据

参考 [macOS 27 Community Figma](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-) 的变量、样式与代表组件。网页玻璃使用透色、背景模糊、高光和阴影近似；文字承载表面与无文字原稿样片分开，优先保证可读性。
- [材质实施记录](docs/reviews/material-implementation.md)
- [macOS 设计规则](docs/foundations/macos.md)
- [语义色板](docs/foundations/colors.md)
- [Figma 原稿对照](docs/references/figma/macos-27-review.md)

## 维护项目

展示站使用 React、Radix 无样式交互基础与共享 CSS 变量。共享源码可供项目适配，尚无稳定组件包的发行承诺。

修改与验证方式见 [开发指南](docs/development.md)，文件归属见 [仓库结构](docs/structure.md)。`pnpm verify` 检查格式、生成物同步、基础契约和网站构建。
