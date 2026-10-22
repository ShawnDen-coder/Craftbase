# 仓库结构

根目录只保留项目入口、工具配置，以及有实际内容的源码与文档目录。

```text
craftbase/
├── design-system/            # 可复用的设计系统资产
│   ├── react/                # shadcn / Radix 实验组件及主题适配
│   ├── tokens/               # 框架无关的基础变量源
│   ├── themes/               # 主题源：仅 macOS
│   ├── specs/                # 框架无关的组件行为与状态规格
│   ├── styles/               # 手写 CSS 配方与生成的 tokens.css
│   ├── tailwind/             # 生成的 Tailwind v4 映射
│   └── registry/             # 生成的规格目录，尚不可安装
├── apps/lab/                 # Vite + React 设计语言展示站
├── docs/
│   ├── foundations/          # 面向实施的设计原则与 Web 契约
│   ├── references/           # 外部来源、Figma 原始证据及对照分析
│   ├── reviews/              # 针对当前实现的阶段审查
│   ├── decisions.md          # 项目决策与理由
│   ├── roadmap.md            # 未完成工作与验收条件
│   └── structure.md          # 本文：文件归属与扩展规则
├── scripts/                  # 生成与维护工具
├── tests/                    # 自动化验证
├── .github/workflows/        # CI
├── .husky/                   # 本地 Git hooks
├── README.md                 # 项目定位与浏览说明
├── package.json
├── pnpm-lock.yaml
└── biome.json
```

## 放在哪里

- 要改变运行时值：改 `design-system/tokens/` 或 `design-system/themes/`。
- 要定义组件行为、状态和支持范围：改 `design-system/specs/`。
- 要改变材质与焦点等 CSS 配方：改 `design-system/styles/index.css`。
- 要记录应遵循的规则：放 `docs/foundations/`。
- 要保留参考原值、来源与提取差异：放 `docs/references/`。证据不参与运行时构建。
- 要说明已有实现哪里不足：放 `docs/reviews/`；后续任务进入路线，已采纳取舍进入决策。

## 生成文件与路径约定

`pnpm build` 生成以下文件并纳入版本管理，禁止直接编辑：
- `design-system/styles/tokens.css`
- `design-system/tailwind/theme.css`
- `design-system/registry/catalog.json`

生成文件仍放在对应消费入口旁，方便按目录复制使用；Biome 排除这三项，`pnpm check` 验证其与源同步。`styles/index.css` 是手写文件，不能整体忽略 styles 目录。

Registry 中的 `spec` 和组件规格中的 `sources` 均是**相对仓库根目录**的路径；Markdown 链接相对所在文件。移动目录时要同时更新生成器、测试、Biome 排除项、元数据引用和文档链接。

## 后续扩展

当前是单个私有 pnpm 项目，不创建仅用于占位的 packages、apps 或 workspace 配置。

React 实验实现已位于 `design-system/react/`，展示站位于 `apps/lab/`；Vue 后续进入 `design-system/vue/`，共享 specs。页面模式进入 `design-system/patterns/`；起始模板有可运行内容后再引入 starters。需要独立依赖、版本或发布边界时，再将对应资产迁入 workspace packages。

## 展示站组织

展示站参考 EasyUI 的实际仓库组织，页面与可复用组件分开维护：

```text
apps/lab/src/
├── main.tsx                 # 顶部导航、主题与 URL 路由
├── pages/                   # 首页、目录、详情与文档页面
├── components/              # 网站卡片与预览容器
├── examples/                # 用于观察外观的交互示例
├── registry/catalog.ts      # 自动发现样例元数据
├── lib/preferences.ts       # 主题解析与持久化
└── sections/                # 文档中的状态、材质和列表详情示例

design-system/react/ui/
├── button.tsx
├── button.meta.json         # 与组件共置的网站元数据
└── ...
```

元数据记录名称、分类、说明与源文件；交互规格仍读取 `design-system/specs/`，不在网站重复维护。新增组件时增加对应 `.meta.json` 和 `examples/<id>.tsx`，目录自动发现；`pnpm test` 校验元数据、规格与示例之间的引用。

首页 `#/` 直接展示 ShowCase，`#/components` 是兼容入口，`#/components/<id>` 保留单项外观观察，`#/docs/<topic>` 是阅读文档。使用 hash URL 支持静态托管与子目录预览。旧的列表详情入口转向材质规则。

展板用 Radix 的无样式交互基础与项目共享样式呈现控件，不提供源码浏览、安装或 API 教程。`artifacts/` 保存本地测试工具与截图，已被 Git 忽略，不参与构建与发布。
