# 官方 shadcn/ui 源码

此目录保存官方 **radix-nova** 组件、依赖 hook 和工具文件，供展示站直接引用。Craftbase 不扩展组件 API 或交互；外观由 [shadcn 适配层](../adapters/shadcn/README.md) 提供。

组件清单、来源 URL、获取日期、原始与本地 SHA-256 见 [upstream-lock.json](../adapters/shadcn/upstream-lock.json)。保留 [MIT 许可](LICENSE.shadcn.md)。安装转换仅处理路径与 Lucide 图标选择；源码不做业务修改。
- 导入具体文件，如 `design-system/react/ui/button`。`index.ts` 仅保留原有四个入口的转发，不是完整发行 API。
- 使用官方 `variant`、`size`、`asChild`、`open` 等接口；非提交按钮在表单中显式设置 `type="button"`。
- 加载由调用方组合 Spinner、`aria-busy` 和 `disabled`；确认流程由页面状态管理。
- `loading`、`nativeSize`、`controlSize`、`dismissible` 和 primary/quiet/danger 别名已移除。历史菜单 Tab 改写已移除。
- 依赖以根 package.json 和 pnpm-lock.yaml 为准。Radix 目录的 Combobox 按官方实现依赖 Base UI；Sonner 按官方实现依赖 next-themes，展示站通过公开 `theme` 属性传入现有外观。

`pnpm check:upstream` 检查文件是否偏离锁定源码。显式升级使用 `node scripts/sync-shadcn.mjs --refresh`，审阅来源清单和全部差异，并重新运行静态与浏览器验收。升级不会在构建中自动发生。

此目录不是独立发布的组件库。不对 Base UI / React Aria 的其他风格基线作兼容承诺。
