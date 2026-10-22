# macOS 原则到 Web 的落地契约

这是一份 Web 转译规则，不是原生 macOS 实现。颜色、尺寸、模糊均为 Craftbase 提案；已读取 UI Kit 27.0.1 的本地 Variables 与组件样例，详见 [原稿审查](../references/figma/macos-27-review.md)；当前运行时数值仍是 Web 提案。

## 材质：区分内容与操作层

Apple 将 Liquid Glass 用于导航与控件的功能层，内容层使用标准材质；清透变体适合视觉丰富的背景，文字密集区域优先考虑可读性。[HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

Craftbase 的 `surface.canvas/panel` 承载内容；`.cb-overlay` 为菜单、弹层提供实色基线。`data-material="glass"` 是可选的 Web 近似，仅用于操作层，不用于正文卡片。暂不提供 clear 变体，不模拟原生折射或背景自适应亮度。无 backdrop-filter、减少透明度、增加对比度、强制颜色时回退实色。

模糊与饱和度在 `design-system/themes/macos/tokens.json` 的 material 配方中集中维护。需要更改主题材质时修改源而不是修改组件 CSS。字体与图标颜色仍须在真实背景中测试。

## 侧栏、工具栏与选择

macOS 27 更新侧栏边缘布局、选中项半粗体和侧栏上方工具栏材质；自由悬浮标题需要明确的滚动边缘区分。[WWDC26 14:24](https://developer.apple.com/videos/play/wwdc2026/289/?time=864)

Web 页面模式规定：侧栏背景贴近应用容器边缘，内部内容保留安全间距；工具栏和内容区职责清楚。长标题和滚动内容不能穿过工具栏文字。现有 cb-scroll-edge 提供顶部清晰边缘与柔和边缘的 Web 配方，均保留不透明标题区域与系统偏好回退；顶部与底部均已实现，并验证系统媒体偏好回退。

`.cb-selection` 将选中背景、文字颜色与 600 字重组合起来；链接使用 `aria-current="page"`，支持选中的 widget 使用 `aria-selected`，不要在任意 div 上添加无效 ARIA。普通同色图标可继承 currentColor；侧栏等使用独立图标强调色的场景需单独映射。焦点继续独立使用 `.cb-focus`。应预留字重变化所需空间，不让文字截断或相邻控件跳动。

## 同心圆角与反馈

Apple 的同心性会根据元素与容器角落的关系调整；点击弹动只适合少量交互玻璃控件。[WWDC26 15:41](https://developer.apple.com/videos/play/wwdc2026/289/?time=941)

Web 暂保留 control/panel 角色。`外圆角−内边距` 只是简单等距嵌套的几何近似，不代表原生算法。不同边距、靠边而不靠角、响应式布局必须用截图验证。不要给全部容器应用同一公式。

首期不实现弹簧动画。后续 Button 的按压反馈须由交互状态触发，减少动态效果时移除位移；不能借动画掩盖加载或错误状态。

## 桌面效率与连续性

大屏需要合理密度、可调整布局、键盘快捷方式和较少模态打断；这些是平台体验原则。[Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)

列表详情页应优先并排阅读与编辑，窄屏再切换分区；侧栏可收起，返回后保留选择。公开命令应有可发现入口，快捷键不能覆盖输入法与浏览器常用行为。非破坏性任务优先内联完成。

状态恢复是 macOS 体验的一部分。[WWDC26 8:57](https://developer.apple.com/videos/play/wwdc2026/289/?time=537)

Web 模式保存可恢复的筛选、选中记录 ID 和面板状态；URL 优先承担可分享状态。恢复前校验记录是否仍存在且可访问；失败时回到列表并解释。草稿与服务端数据分开管理，敏感数据不默认写入 localStorage。普通提示不阻止离开，有未保存编辑时才进入明确的保存/放弃流程。

## 桌面参考验收矩阵

| 场景                   | 必须检查                                              | 当前状态                           |
| ---------------------- | ----------------------------------------------------- | ---------------------------------- |
| 两种明暗 × 两密度      | 字体层级、选中态、长中文文本、图标继承                | 明暗 × 密度控件验证通过            |
| 玻璃覆盖亮/暗/复杂背景 | 正文对比度与实色降级                                  | 对照区已实现；显式实色回退已验证   |
| 系统偏好与显式偏好     | reduced motion、transparency、contrast、forced colors | 系统媒体仿真及显式回退通过         |
| 键盘与弹层             | Tab 顺序、Escape、关闭后焦点恢复                      | React 实验实现；主要焦点流程已验证 |
| 页面布局               | 桌面阅读布局、上下工具栏滚动边缘                      | 上下边缘已验证；桌面排版见最新审查 |
| 状态恢复               | 刷新/返回/记录失效/保存失败                           | URL 恢复/失效/返回与失败重试已验证 |
| 圆角与按压             | 几何协调、无布局跳动、减少动态效果                    | 原稿尺寸实测；按压与减少动态已验证 |

原稿补充：size 不等于 density；window activity 不等于 pressed。抽查侧栏 Small 的 Selected/Idle 字重均为 510，因此此处的 600 是 Web/HIG 转译，并非该节点实测值。详见原稿审查中的冲突记录。

2026-10-23 定位调整：网站仅维护桌面样式参考，手机布局不再作为验收目标。历史状态恢复流程保留在实现记录中，网站导航已改为材质规则与样式展板。
