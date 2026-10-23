# 开发指南

环境要求和首次运行命令见 [README](../README.md#本地预览)。本项目统一使用 pnpm，依赖版本由 `pnpm-lock.yaml` 固定。

## 修改流程

1. 按 [仓库结构](structure.md) 找到源文件，修改变量、主题、CSS 配方或组件规格。
2. 修改变量或组件规格后执行 `pnpm build`，同时保留源文件与生成产物的变更。
3. 执行 `pnpm format` 和 `pnpm verify`，检查差异后提交。

| 命令          | 用途                                              |
| ------------- | ------------------------------------------------- |
| `pnpm build`  | 生成 CSS 变量、Tailwind 映射与规格目录            |
| `pnpm check`  | 只读检查生成文件是否与源同步                      |
| `pnpm lint`   | Biome 格式、lint 与导入顺序检查                   |
| `pnpm format` | Biome 格式化并应用安全修复                        |
| `pnpm test`   | 运行 Node 测试                                    |
| `pnpm verify` | 依次运行 lint、check、test、TypeScript 与网站构建 |

生成文件清单与路径约定由 [仓库结构](structure.md#生成文件与路径约定) 维护。生成文件的格式由生成器负责，Biome 排除这些文件；其同步性仍由 `pnpm check` 检查。

## Git hooks 与 CI

`pnpm install` 在 prepare 阶段安装 Husky。[pre-commit](../.husky/pre-commit) 执行 `pnpm verify`，校验整个工作区，不自动修改、暂存或提交文件。部分暂存时，仍需确保提交内容自身一致。

[CI](../.github/workflows/verify.yml) 使用锁文件安装依赖，再校验提交快照；通过 `HUSKY=0` 跳过 CI 中的钩子安装。

## 验证边界

当前自动测试覆盖主题字段一致性、不透明颜色对比度、生成引用，以及网站元数据与组件、规格、预览示例的关联。`pnpm test` 只运行 `tests/*.test.mjs`，避免扫描工作区内的参考仓库与临时产物。它们不替代浏览器、键盘、辅助技术或真实背景下的材质验证。组件和页面完成后，应按照 [设计基础](foundations/principles.md#组件实现验收) 验收，再更新资产状态。

Figma 原始证据保留在参考文档中，不参与运行时生成。新增 Token 或改变 Web 参数时，记录来源、用途与调整理由；真实项目验证通过后再将资产标记为稳定。

## 展示站

`pnpm dev` 启动 Vite 展示站；`pnpm build:site` 执行类型检查并输出 `dist/`。运行时代码在 `apps/lab/`，复用组件和主题适配在 `design-system/react/`。`pnpm-lock.yaml` 由 pnpm 管理，Biome 不重排锁文件。

### GitHub Pages

在仓库 Settings → Pages → Build and deployment 中将 Source 设为 GitHub Actions。将改动合入默认分支后，[部署工作流](../.github/workflows/pages.yml) 会执行 `pnpm verify`，通过后将 `dist/` 发布到 Pages；也可在默认分支手动运行工作流。

构建路径通过 Pages 返回的 `base_path` 自动设置，兼容 `/Craftbase/` 仓库路径和自定义域名。页面使用 hash 路由，直接访问或刷新 `#/docs/materials` 等页面无需服务器重写。运行时图片使用 Vite 的 `BASE_URL`，CSS 内的图片与字体路径由 Vite 在构建时转换。

本地模拟仓库子路径构建：`SITE_BASE_PATH=/Craftbase/ pnpm build:site`。默认构建仍使用相对路径。站点完全静态，外观偏好保存在访问者浏览器的 localStorage 中。

## shadcn 上游与浏览器检查

- `pnpm check:upstream`：检查锁定官方源码的 SHA-256；不访问网络。
- `node scripts/sync-shadcn.mjs --refresh`：显式同步官方 radix-nova 组件与示例。需要网络；审阅新增依赖、清单和所有差异，更新展示元数据后验收。
- 官方源码目录和导入的示例不由 Biome 重写；本地样式、组合和工具仍执行完整检查。
- `pnpm exec playwright install chromium` 后运行 `pnpm test:browser`。测试使用本地 43180 端口，覆盖全目录四种配色／密度组合、表单、浮层、筛选、桌面布局和材质切换。
- CI 自动安装 Chromium 并运行浏览器测试，失败时上传 artifacts。

仅完成源码接入时将条目标为 integrated；可安装组件库和跨基线兼容仍不作承诺。
