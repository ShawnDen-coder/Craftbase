# 组件与示例目录

展示站直接使用官方 radix-nova 组件，Craftbase 维护外部样式与示例。共有 63 个官方组件和 Date Picker、Data Table、Typography 三个组合示例。
- 完整清单：[展示元数据](../apps/lab/src/registry/components.json)。
- 来源与完整性：[官方源码锁定清单](../design-system/adapters/shadcn/upstream-lock.json)。
- 样式接入：[适配说明](../design-system/adapters/shadcn/README.md)。
- 预览入口：`#/components`，支持分类、搜索、配色、密度和字体。

每个条目提供真实可操作示例。大部分示例来自相同官方 Registry；需要服务端 AI 的示例改为本地静态内容与状态。Form 空条目通过 Field 组合呈现；弃用 Toast 使用 Sonner。

`design-system/specs/` 中四份旧规格是历史研究记录，已标记 historical，不再作为官方组件 API 或键盘行为的实现契约。新增组件不要求复制一份框架无关行为规格。
