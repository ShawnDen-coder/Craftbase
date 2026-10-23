# 上下文与决策

2026-10-22 从 Lody 会话 `7b58b930-a687-404c-b178-22ed945d0ca2` 恢复，完整读取 12 条消息。Nowledge 工作记忆与历史查询因 DNS 失败未取得结果。

## 会话已确认的方向

- 项目使用 Craftbase 名称；定位为长期复用的个人 UI/UX 开发基础。
- 核心保存稳定语义和行为；macOS 是首套可替换风格主题。
- 主要面向 Tailwind CSS、React、Vue；各框架共享 Token、组件规格、验收标准。
- 借鉴 EasyUI 的源码与元数据共置、目录生成和源码分发思路，不直接复制整个组件库。
- 首批聚焦 Button、Input、Menu、Dialog 与列表详情页；先完成闭环，再扩展。
- 留存来源、Web 调整理由、验证项目和限制；区分实验资产与稳定资产。

## 本轮实施选择（可调整）

1. 空仓库先建立无第三方依赖的 Node 生成链路，避免基础阶段绑定框架。
2. JSON 是唯一 Token 源，提交生成 CSS 便于审阅，并用 --check 检测漂移。
3. Tailwind 采用 v4 的 @theme inline，引用运行时主题变量。
4. 组件仅标记 specified；React/Vue 均 planned；目录不可安装。框架实现完成前不发布假 Registry。
5. 所有主题数值标记 craftbase-web-proposal。Figma 原稿与 Web 调整分开保存，已完成首轮提取；运行时仍标记为 Web 提案。
6. 下一阶段先落地 React 的最小闭环，随后依据同一行为规格补 Vue；这是实施默认顺序，不是用户已明确的框架偏好。

未导入 Apple 字体、图标或 Figma 资产，也未复制 EasyUI 代码。未来引入第三方资产需单独记录来源和许可。

## 目录整理（2026-10-22）

将运行时源、共享规格与生成资产归入 `design-system/`，将设计原则、原始参考与审查归入 `docs/`。当前保留单项目 pnpm，不为了规划中的 React/Vue/Lab 提前创建空包；出现真实依赖或发布边界时再拆 workspace。详见 [仓库结构](structure.md)。

## 展示网站、shadcn 与主题（2026-10-22）

用户提出接入 shadcn，并明确网站用于呈现基础设计语言、支持主题切换。下一阶段采用 React + Tailwind 的展示站，以 shadcn 作为首批组件的源码起点，按 Craftbase 规格调整并验收；当前尚未安装或实现。
- 网站展示色卡／语义色板、字体、间距、圆角、材质与可操作组件；先不扩展为模板商城或大型营销站。
- 将风格主题 `theme`、明暗 `appearance`、密度 `density` 分开。macOS 是首套风格；浅色和深色是同一主题的两种外观。第二套 Neutral 作为计划中的对照主题，完成 Token 和验证前不显示可用切换选项。
- Craftbase Token 仍为唯一源；通过适配层映射 shadcn 的 background、foreground、primary、input、ring 等语义。不能由初始化命令覆盖已有 Token，也不能机械套用默认圆角比例代替控件／面板契约。
- 网站与组件预览消费同一套真实组件与主题。切换主题保持组件行为和状态；明暗支持系统偏好，显式选择可持久化。
- shadcn React 源码不等于 Vue 实现；Vue 后续按共享规格独立适配。Registry 分发仍待实际组件验收后完成。

参考：[shadcn 主题机制](https://ui.shadcn.com/docs/theming)、[EasyUI 网站与源码分发介绍](https://easyui.site/docs/introduction/)。EasyUI 的网站组织与源码分发可借鉴，其动效和视觉不作为 Craftbase 的默认设计语言。

实施进度：已接入官方 shadcn new-york-v4 四个组件源码并保留 MIT 许可，React 标为 experimental。展示站现有 macOS / Neutral 两主题、明暗与密度控制；完整验收未结束。

## 2026-10-22：采用 EasyUI 的网站组织

用户明确要求参考 EasyUI 仓库组织网站。核查提交 `d5f660fb6db1a4bc0d02dbbe2e3d581b14783373` 的 `src/App.tsx`、`HeroSection`、`ComponentCard`、`AllComponentsPage`、`ComponentDetailPage`、`Button.meta.ts`、`source-loader.ts` 与 `docs/ARCHITECTURE.md` 后，采用“首页展示 → 组件目录 → 组件详情”及独立文档区，替换此前将色卡放在首屏的长文档页面。

组件元数据与实现共置，网站自动发现目录，预览与源码延迟加载；保留 Craftbase 的主题、变量与交互规格。参考信息架构并自行实现，没有复制 EasyUI 组件或接入其分析服务。卡片预览可独立交互，详情链接放在卡片底部，避免把按钮和输入框嵌套进整张卡片链接。颜色与规范移入文档；组件命名始终可见，不依赖悬停。尚无可安装 Registry，因此不照搬 CLI 安装按钮。

## 2026-10-22：仅保留 macOS

按用户最新决定移除 Neutral 的运行时 Token、生成逻辑与风格选择入口，仅维护 macOS 风格。浅色、深色、跟随系统及密度设置保留；已有 Neutral 本地偏好读取时归一为 macOS。首页预览改为浅色／深色外观选择。此前多主题测试与审查记录保留为历史，不代表当前支持范围。

## 2026-10-23：以桌面样式参考为主

按用户最新定位，仅维护 macOS 桌面网页。网站主要呈现材质和样式规则；控件作为外观对照样例，使用已有 Radix 交互基础。移除网站接入指南、用法／源码页和手机专属布局。样式展板固定外观控制与多种控件同屏比较，保留独立规则文档。此前关于组件发行、Vue、Registry 和手机端的计划不属于当前站点交付范围。

## 2026-10-23：ShowCase 首页与字体

移除独立宣传首页，根路径直接展示 ShowCase，旧 components 链接继续可用。文案采用功能名称，去除口号。字体选择随全站偏好保存：系统字体、JetBrains Mono（中文回退 Sarasa Term SC）、Sarasa Term SC。字体在站内托管，原始许可随文件分发。

## 2026-10-23：独立中英字体设置

移除页头右上角重复的外观入口，ShowCase 左侧作为唯一设置入口。英文可选 System、JetBrains Mono、Sarasa Term SC；中文可选 System、Sarasa Term SC。两项分别持久化并应用到全站，通过 Unicode 范围限制避免全字符字体覆盖另一语言。旧合并字体设置迁移为等效组合。

## 2026-10-23：明确个人基础设计为核心

用户纠正项目定位：Craftbase 用于沉淀自己的基础设计，不针对 macOS，也不以构建完整组件库为目标。此前“仅维护 macOS 桌面网页”的定位不再代表当前方向；macOS 保留为一项已研究的风格参考。

实施上将语义颜色与密度迁入 `tokens/semantic.json`，基础尺度保留在 `tokens/base.json`，macOS 专属材质留在 `themes/macos/`。生成器组合当前已实现的基础设计和材质配方，保持已有视觉值。shadcn 适配独立位于 `adapters/shadcn/`，消费共享变量；展示站用于观察和验证设计。删除无实际切换行为的固定 macOS 主题偏好，不添加尚未实现的主题或组件库入口。

### 定位补充：来源与应用目标均开放

基础设计由用户持续选择、提炼和验证，可以吸收多种设计体系、真实产品、实践经验及自己的原创判断。macOS 只是当前参考来源之一；shadcn/ui 只是当前样式适配目标之一。项目不固定绑定任何参考体系、平台、框架或组件库，也不以两者定义其边界。新的来源和应用目标按实际需要引入，尚未实现的适配不标记为已支持。
