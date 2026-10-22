# 组件清单

共享行为规格已有 React 实验实现，源码位于 [design-system/react](../design-system/react/)，通过 `pnpm dev` 查看交互预览。Vue 尚未实现，完整状态与业务项目验收仍待完成。

| 组件   | 已定义的范围                                   | 规格                                              | React    | Vue    | 交互验收 |
| ------ | ---------------------------------------------- | ------------------------------------------------- | -------- | ------ | -------- |
| Button | 主次操作、危险操作、禁用、加载、键盘激活       | [button.json](../design-system/specs/button.json) | 实验实现 | 待实现 | 待完成   |
| Input  | 标签、说明、错误、禁用、只读、输入法组合输入   | [input.json](../design-system/specs/input.json)   | 实验实现 | 待实现 | 待完成   |
| Menu   | 打开关闭、方向键、首尾定位、字符搜索、焦点返回 | [menu.json](../design-system/specs/menu.json)     | 实验实现 | 待实现 | 待完成   |
| Dialog | 标题、初始焦点、模态隔离、焦点约束、关闭与返回 | [dialog.json](../design-system/specs/dialog.json) | 实验实现 | 待实现 | 待完成   |

四个 React 实验组件已接入 light／dark、comfortable／compact。已有 `.cb-focus`、`.cb-overlay`、`.cb-selection` 是基础 CSS 配方，不能代替 Menu／Dialog 的交互和无障碍实现。

## 实现与验收顺序

先实现 Button 和 Input，验证 Token、控件尺寸及表单状态；再实现 Menu 和 Dialog，验证键盘导航、焦点管理及关闭行为。每个组件都需要可操作的预览和关键状态验收，之后才能将状态从“规格”更新为“可用”。

色板和组件预览应共用运行时 Token，展示浅／深色、密度和相关状态。预览示例不能冒充可复用组件；React／Vue 的实际入口、支持范围和接入方式需要随实现一同公开。

列表／详情已提供本地演示流程；后续的 Sidebar、Toolbar 等可复用组合模式见 [推进计划](roadmap.md)，不计入当前已实现组件。
