# Craftbase

macOS 材质与样式规则的桌面网页参考。

从透色、模糊和层级，到语义色彩、文字与空间，Craftbase 把设计规则放进可观察、可切换的页面。仅保留 macOS 风格，支持浅色、深色、跟随系统及舒适／紧凑密度。

主要表面默认使用 Ultra Thin：浅色为 36% 的 `#F6F6F6`，深色为 10% 的黑色，背景模糊 30px。背景壁纸降低对比以保持文字清晰；输入状态与原稿材质样片保留各自规则。减少透明度、增强对比或强制色彩模式下使用实色回退。

## 浏览内容

- **材质与层级**：实色、普通材质五档、玻璃样片与滚动边缘；可切换背景和透明度偏好。
- **设计基础**：15 组语义色板、9 个文字角色，以及空间与圆角规则。
- **ShowCase**：同屏比较表单、按钮、菜单、窗口、开关、滑块和列表在不同外观下的表现。
- **状态与尺寸**：尺寸与密度的区别，以及焦点、加载、错误和不可用状态。

组件只是样式观察用的交互示例。本站不提供组件安装、源码接入或组件库 API 教程；示例数据只在当前预览中生效。页面以桌面浏览器为目标，不维护独立手机布局。

## 本地查看

需要 Node.js 22.13+ 和 pnpm 11.0.9：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址即可进入 ShowCase；材质与规则通过 Docs 查看。ShowCase 左侧统一设置全站材质、配色、密度与字体。材质可选 Ultra Thin、Thin、Medium、Thick、Ultra Thick，直接引用仓库 macOS 主题 token；配色使用同一主题内的浅色／深色配置。英文字体可选 System、JetBrains Mono 或 Sarasa Term SC；中文字体独立选择 System 或 Sarasa Term SC。设置自动保存。

## 设计依据

参考 [macOS 27 Community Figma](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-) 的变量、样式与代表组件。网页玻璃使用透色、背景模糊、高光和阴影近似；文字承载表面与无文字原稿样片分开，优先保证可读性。
- [材质实施记录](docs/reviews/material-implementation.md)
- [macOS 设计规则](docs/foundations/macos.md)
- [语义色板](docs/foundations/colors.md)
- [Figma 原稿对照](docs/references/figma/macos-27-review.md)

## 维护项目

展示站使用 React、Radix 无样式交互基础与共享 CSS 变量。实现代码服务于样式展示，不作为对外组件发行承诺。

修改与验证方式见 [开发指南](docs/development.md)，文件归属见 [仓库结构](docs/structure.md)。`pnpm verify` 检查格式、生成物同步、基础契约和网站构建。
