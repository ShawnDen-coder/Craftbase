# macOS 27 UI Kit 原稿审查

> 这是首次读取时的历史差异记录，表格中的“当前实现”不代表最新状态。最近的复查与修正见 [ShowCase 审查](../../reviews/figma-showcase-final.md)。

读取日期：2026-10-22。文件：[macOS 27 (Community)](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-)。
文件 Change log 标注最新版本 **27.0.1，October 16, 2026**，不是 Figma 历史版本 ID。该文件是用户提供的副本；以下数值描述此次副本读取结果，不推断其与 Community 上游永久一致。

## 实际读取范围

通过 Figma MCP 读取顶层页面目录、本地变量和样式；深入检查 Buttons、Text Fields、Menus、Dialogs、Materials、Sidebars、Getting Started、Change log。视觉检查了浅色内容区按钮、浅色 Liquid Glass、浅色侧栏、Small Save Dialog 四张节点截图。没有修改 Figma 文件，也没有逐页穷尽所有组件。

本地清单：147 个变量、22 个文字样式、10 个 Paint Styles、0 个独立 Effect Styles。效果实际存在于节点上，不能将 Effect Styles 为空理解为没有阴影或玻璃效果。

| Collection | 变量数 | Modes                                                    |
| ---------- | ------ | -------------------------------------------------------- |
| Colors     | 63     | Light / Dark（其中也包含 Mode 等字符串，并非 63 个颜色） |
| Sizes      | 65     | Medium / Mini / Small / Large / XL                       |
| Kit        | 18     | Mode 1，含素材展示与 Liquid Glass 参数                   |
| Context    | 1      | Content Area / Over-glass                                |

可机器读取的节选见 [证据记录](macos-27-evidence.json)，保留原始变量 ID、模式 ID、别名和浮点精度；它不参与运行时生成，也不是整库导出。

## 与 Craftbase 的主要差异

| 主题       | 原稿证据                                                                                                                             | 当前实现                             | 处理判断                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | --------------------------------------------------------------------- |
| 控件尺寸   | Global/Height：Mini 16、Small 20、Medium 24、Large 28、XL 36                                                                         | compact 28、comfortable 36           | size 与 density 分开建模；现值仅数值上对应 Large/XL，不能称为原稿密度 |
| 圆角       | Global/Radius 为 4/5/6/7/9；Button/Radius 在 Large/XL 为 1000（胶囊）                                                                | control 固定 8                       | 需要组件＋尺寸配方，不能所有控件统一圆角                              |
| 内边距     | Medium Button 横向 16；Fields 左右各 8                                                                                               | 同一 control.padding.inline 为 8/12  | Button 与 Input 应有各自映射，共享基础尺度不等于共享每个值            |
| 正文       | Body/Regular：SF Pro 13px，行高 16px                                                                                                 | system-ui 14px，行高 1.5（21px）     | 保留 Web 可读性提案，明确是调整；不要伪称原稿值                       |
| 文字层级   | Large Title 26/32、Title 1 22/26、Title 2 17/22、Title 3 15/20、Body 13/16、Callout 12/15、Subheadline 11/14、Footnote/Caption 10/13 | 仅 12/14/20 三档                     | 后续增加语义文字角色；小字号不直接作为 Web 默认                       |
| 强调色     | Accents/Blue：Light #0088ff、Dark #0091ff                                                                                            | action.primary #005ac1 / #9ac3ff     | accent 与可访问操作色不是同一语义；保留对比度验证后的操作色           |
| 文字颜色   | Labels/Primary：黑/白 85%；Secondary：黑 50% / 白 55%                                                                                | 固定不透明灰色                       | Alpha 必须结合背景计算；不能只抄 HEX 或透明度                         |
| 窗口背景   | Window Background：白 / #1e1e1e                                                                                                      | canvas 与 panel 另有角色             | 应记录用途映射，不将窗口背景等同所有 surface                          |
| 按钮上下文 | Buttons 72 个变体，包含 Active、Context、State、Style；Toggle 另有 24 个变体                                                         | 4 种 variant，尚无上下文实现         | 增加上下文与窗口活跃态的规格；不要把 Active 当作 CSS :active          |
| 输入框     | Text Field 6 个变体：Idle/Focused/Disabled × Show Text                                                                               | 另有 invalid/readonly                | Web 增补合法，注明非 Figma 原生变体；不向每个组件强塞 Over-glass      |
| 菜单       | Menu Items 32 个变体，区分 Hover / Hover + Key、Action / Submenu；有勾选、快捷键与图标保留空间                                       | 行为契约有键盘，但内容结构未定义完整 | 补菜单内容槽位和状态说明，子菜单仍可延后                              |
| 材质       | 普通材质 5 档；Liquid Glass 分 Small/Medium/Large；Hard/Soft Scroll Edge 独立组件                                                    | 单一 overlay 近似                    | 区分材质家族与角色，再选择实现范围，不用同一 blur 代表全部            |
| 对话框     | Small Save Dialog 390×318、半径 16；Large 1000×448；阴影有多层                                                                       | overlay 半径 16、单层阴影            | 16 的数值吻合不等于整个配方已匹配；尺寸是样例，不是 Web 固定宽高      |

节点入口：[Buttons](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-?node-id=121-11923)、[Text Field](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-?node-id=121-12220)、[Menu Items](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-?node-id=121-12600)、[Materials](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-?node-id=483-8848)、[Save Dialog](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-?node-id=171-9049)。

## 材质不能直接翻译成一个 CSS blur

普通 Medium 样例 `4331:12154` 使用 #f6f6f6、60% opacity、BACKGROUND_BLUR radius 60。Liquid Glass Medium 样例 `483:9257` 则由 Fill + Shadow、Glass Effect 多层构成；GLASS effect 的 radius=16、refraction≈0.7、depth=30，另外有高光、内阴影和混合模式。Figma 的数值与 CSS backdrop-filter 的单位/渲染语义不保证等价。

这些是参考配方，不应直接替换现有 `material.overlay.blur=20px`。Web 端先保持可读性与回退策略，再在复杂背景、深浅模式中比较视觉；如有意做原稿近似，应以单独配方命名和验证。

## 必须保留的冲突与例外

- 侧栏 Item `655:2379`（Small、Selected、Active=True、Level=0）与 `655:2419`（同条件 Idle）的 Label 均读到 SF Pro Medium、wght 510、11px。WWDC 的半粗体指导与这一对副本节点不完全一致。现有 `weight.selected=600` 属于 Craftbase/HIG 转译，不能标为该节点提取值。
- 同一组侧栏节点的 Symbol 使用 `Accents - Vibrant/Blue`，Label 使用 `Labels - Vibrant/Primary`。侧栏图标与文字有独立语义，不能一律 currentColor。[Sidebar Item](https://www.figma.com/design/OU1BDEU71XD2Dc5l2ZAAVD/macOS-27--Community-?node-id=655-2379)
- `Title 2/Emphasized` 本地文字样式读到 **Inter Bold**，其他多数角色为 SF Pro。需复核副本/源样式，不能自动宣称 Apple 要求混用 Inter。
- 按钮 Style 的原始选项有 `Bordered - Prominent (Default) D` 这样的命名；证据原样保留，不擅自扩写后当作原名。
- Change log 明确区分 Toggle 与普通按钮；也记录移除部分 over-glass 文本/搜索字段。Context 不是每个组件都必须支持的通用开关。

## 下一步实施顺序

1. 将 size、density、context、window activity 与 pressed/selected 分开定义，组件按需声明适用维度。
2. 建立 Button/Input/Menu 的独立尺寸映射，补文字角色和选择用途（sidebar/table），保留 Web 调整理由。
3. 在 Lab 对比：原稿参考值 / Web 调整值、内容区 / 玻璃上、活跃 / 非活跃，以及无障碍偏好。
4. 通过真实页面验收再修改运行时主题。原始证据、Web 决策、实际实现状态分别保存。

本轮只更新证据与规则；运行时 Token 保持 `craftbase-web-proposal`，不因完成阅读就改为已验证原稿实现。
