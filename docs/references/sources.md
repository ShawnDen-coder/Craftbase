# 来源与提取记录

核查日期：2026-10-22。区分当前读取与历史会话描述，不将未读取的内容写成已验证事实。

| 来源                                                                                                          | 本轮状态                                         | 用途                                                         |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| [Apple Design Resources](https://developer.apple.com/design/resources/)                                       | 已读取官方资源页                                 | 设计资源入口与版本追溯                                       |
| [macOS 27 Figma Community](https://www.figma.com/community/file/1651309434229735362/macos-27)                 | Community 上游入口；已读取用户提供的 Design 副本 | 详见下方原稿审查                                             |
| [HIG: Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) | 已读取官方 Markdown 正文                         | 布局、密度、键盘与个性化原则                                 |
| [HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)                     | 已读取官方 Markdown 正文                         | 功能层与内容层区分、材质选择及可读性                         |
| [WWDC26: Modernize your AppKit app](https://developer.apple.com/videos/play/wwdc2026/289/)                    | 已重新读取官方文字稿                             | 侧栏、滚动边缘、同心性与状态恢复；CSS 参数仍为 Web 提案      |
| [EasyUI](https://github.com/Surajmaurya1/easyui)                                                              | 已读取网站与仓库页面、元数据、源码加载及架构实现 | 采用首页／目录／详情／文档组织及元数据共置，保留自身设计语言 |
| [Tailwind Theme variables](https://tailwindcss.com/docs/theme)                                                | 已读取                                           | @theme inline 映射机制                                       |

## 后续 Figma 提取表

每条提取须填写以下字段，缺失的原始值保留 null，不能用 Web 值填补。

```json
{
  "id": "surface.overlay",
  "sourceUrl": null,
  "nodeId": null,
  "sourceVersion": null,
  "originalName": null,
  "originalValue": null,
  "webValue": "#ffffff",
  "status": "web-proposal",
  "adjustmentReason": "实色回退先保证可读性，等待原稿核对",
  "verifiedAt": null
}
```

源值发生变化时先评估语义与行为影响，再更换主题；不让平台版本号改变业务接口。

## Figma 原稿读取完成记录

已通过 [Design 副本](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-) 读取本地变量与样式清单、首批组件与侧栏/材质样例。版本标记 27.0.1（2026-10-16）。[审查与差异](figma/macos-27-review.md)、[变量及样式证据节选](figma/macos-27-evidence.json)。原始浮点值保留，未写入运行时主题；全库组件尚未穷尽。

### 本地原稿资源

`design-system/styles/assets/scroll-edge-mask.svg` 来自用户提供的 macOS 27 Community 副本节点 `4363:18560`，通过 Figma MCP 临时资源链接下载，用于滚动边缘 CSS 蒙版。资源随样式目录一起使用；来源文件与组件证据见 control-context-recipes.json。未导入 Apple 字体或 SF Symbols。

底部软边缘另使用 `design-system/styles/assets/scroll-edge-bottom-mask.svg`，来源 `4363:18557`；独立保留原稿蒙版方向，证据见 scroll-bottom-recipes.json。
