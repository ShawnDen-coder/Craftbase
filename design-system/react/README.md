> 项目以样式适配为主；本目录组件用于交互预览。独立接入已有 shadcn/ui 项目见 [样式适配说明](../adapters/shadcn/README.md)。

# React 实验组件

四个组件来自 shadcn 官方 `new-york-v4` registry，读取于 2026-10-22。原始入口：`https://ui.shadcn.com/r/styles/new-york-v4/{button,input,dialog,dropdown-menu}.json`。保留 [MIT 许可](LICENSE.shadcn.md)。组件交互基于 Radix；不是仅模仿外观的静态样例。

当前调整：本地 import、Button 默认 type=button、中文关闭标签、通过 `theme.css` 映射 Craftbase Token 与控件密度。展示站将主题应用在 html 根节点，使 Portal 浮层继承主题。

源码入口：`ui/button.tsx`、`ui/input.tsx`、`ui/dropdown-menu.tsx`、`ui/dialog.tsx`。消费端需要 React、radix-ui、lucide-react、class-variance-authority、clsx、tailwind-merge、tabbable 和 Tailwind v4，版本见根 package.json。

复制本目录时同时保留相邻的 `adapters/` 目录，`theme.css` 通过相对路径转发到其中的样式适配文件。

在 Tailwind 主样式中依次引入 Craftbase `styles/index.css`、`tailwind/theme.css` 和本目录 `theme.css`，并通过 `@source` 包含本目录源码；完整接入示例见 `apps/lab/src/styles.css`。组件需与主题适配样式一同使用。

状态为 experimental：已补加载阻断、危险操作配对、独立小尺寸和 dismissible 控制，展示站包含保存失败／重试及未保存确认。强制颜色、辅助技术与真实业务项目仍需扩大验收。Vue 与可安装 Registry 尚未提供。

Button 支持规格名称 primary / secondary / quiet / danger，并保留 shadcn 的 variant 别名。`loading` 保持内容和宽度、设置 aria-busy 并禁用重复操作。Button `size="small"`、Input `controlSize="small"` 与根节点 density 独立。DialogContent `dismissible={false}` 阻止 Escape／遮罩和关闭图标，显式提交或取消按钮由调用方控制。

Menu 的 Tab 行为经过适配：Radix 默认拦截 Tab，本项目按共享规格使用 tabbable 计算触发器前后的可聚焦元素，关闭菜单后将焦点移出；Escape 仍返回触发器。已在展示站验证 Tab → 后一按钮、Shift+Tab → 前一输入框。

Button 按共享规格固定为原生 `<button>`，不暴露上游 Button 的 `asChild`：导航使用链接，避免嵌套子元素点击先于 loading 阻断。DialogTrigger / DropdownMenuTrigger 的 `asChild` 仍可组合 Button，不改变其原生按钮语义。
