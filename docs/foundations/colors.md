# 色彩与色板

当前提供 15 组浅色／深色语义颜色，源文件是 [基础语义变量](../../design-system/tokens/semantic.json)。这些值是 Craftbase 的 Web 提案；Figma 原稿颜色另存于 [参考证据](../references/figma/macos-27-evidence.json)，两者不可混用为同一套已验证参数。

## 当前语义色板

| 用途             | Token                | 浅色    | 深色    |
| ---------------- | -------------------- | ------- | ------- |
| 页面背景         | surface.canvas       | #f5f5f7 | #18191c |
| 面板背景         | surface.panel        | #ffffff | #24262b |
| 浮层背景         | surface.overlay      | #ffffff | #2e3036 |
| 主要文字         | text.primary         | #202124 | #f5f5f7 |
| 次要文字         | text.secondary       | #595b63 | #b6b8c1 |
| 弱分隔线         | border.subtle        | #d8d9df | #454851 |
| 控件边界         | border.control       | #737680 | #9296a3 |
| 主要操作         | action.primary       | #005ac1 | #9ac3ff |
| 主要操作上的文字 | action.on-primary    | #ffffff | #132642 |
| 主要操作悬停     | action.hover         | #004b9f | #bdd8ff |
| 选中背景         | selection.background | #e0ecff | #263e60 |
| 选中文字         | selection.text       | #00478f | #c5ddff |
| 危险状态         | status.danger        | #b42318 | #ffb4ab |
| 键盘焦点         | focus.ring           | #005ac1 | #9ac3ff |

CSS 名称将点替换为连字符并加 `--cb-` 前缀，例如 `var(--cb-action-primary)`。业务组件按用途引用 Token，不直接复制十六进制值。主题 JSON 是唯一运行时来源；本表用于阅读。

`border.subtle` 只用于非必要分隔；需要辨认的控件边界使用 `border.control`。透明浮层的 tint、shadow 属于材质参数，不计入上述不透明色板。透明材质仍需在实际背景上验证对比度。

补充：`status.on-danger` 为危险操作的配对文字色，浅色 `#ffffff`、深色 `#35100b`。两主题均已纳入对比度测试。

## 尚未完成

可视色卡已进入展示站：运行 `pnpm dev`，采用 macOS 风格，可切换浅／深色。

以下仍待补齐：
- 中性色、主色、辅助色的连续色阶及其选择依据。
- success、warning、info 等语义状态及前景／背景配对。
- 色觉差异与真实界面中的对比度验证。

补色阶时应先确定实际用途和可读性，再映射到语义 Token；不能将补齐颜色数量视为完成主题验证。
