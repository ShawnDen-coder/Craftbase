# Materials / Colors 逐项复查

2026-10-23。按用户两张 Figma 截图，重新读取 Colors 与 Materials 页面目录、具体节点上下文、截图与变量定义。不是沿用上一轮截图结论。

## 确认的缺口与修正

1. 网站原先只有 15 组 Web 语义色，不能代表原稿 Colors。现增加 46 组 Light / Dark 配对：13 Accents、12 Vibrant Accents、5 Fills、5 Vibrant Fills、6 Text、5 Vibrant Text。Web 语义色另列，避免混淆。
2. 原稿色板的透明度棋盘、上下两种背景、Vibrant 混合层都影响最终颜色。现使用原稿棋盘与文字 SVG，并保留实际色值；不将截图取色当 token。
3. 深色玻璃展示实例 `488:17470` / `488:17474` 使用两层 50% luminosity，主组件 `483:9251` 是 70% / 90%。新增比较区采用实例配方，独立样本保留主组件，未覆盖二者差异。
4. 原稿玻璃跨越六档明暗背景；以前只有单一灰背景。现同时展示 Light / Dark、Small、六色 Small tinted、Medium 和 Large。
5. 小样本缩小尺寸却保留原尺寸阴影会夸大边缘。比较区现整体缩放原尺寸几何和效果；共用 GlassSwatch 去掉重复叠加的边界阴影。
6. 五档普通材质原先各自放在重复渐变背景上。新增同一张原稿 wallpaper 上的比较，按 Ultra Thick → Ultra Thin 排列。原有交互和回退检查保留在后面。

## 原稿自身的差异

Fills · Vibrant 的浅色 Secondary 实例实际绑定 Primary `#d9d9d9`，与组名不一致。本轮按实例展示，没有擅自改成猜测值；证据在原始 context 中。

## 浏览器边界

- CSS 的 Plus Darker 支持不齐，浅色 Vibrant 的色块在不支持时用 Multiply 近似；页面明确标注。Plus Lighter 按原稿使用。
- 原稿文字 SVG 完整保留，浏览器内嵌 SVG 与 Figma 的跨层混合仍可能不同。
- Glass 的层色、阴影、几何已映射，但 CSS 不包含 Figma / 系统的完整玻璃渲染器。高光和折射不能声称像素级一致，尤其小尺寸有色玻璃。
- 原始 wallpaper 仅用于材质比较，不作为全站背景。

## 验证

`pnpm verify` 检查生成文件、格式、6 项测试、TypeScript 和构建。Playwright 检查两页、两种网站外观、1024 / 1440 / 1920 宽度、46 组色板与全部图片加载；截图逐张查看。所有浏览器文件留在工作区。

品味审查保留既有文档结构，不重抽方向。色板用重复网格是比较任务本身；高光、渐变、重阴影仅限原稿材质样本。首次 inspector 0 FAIL / 2 WARN：材质大样本被判为空白（有意保留无文字表面），40px 标题过大已改为 28px。

最终 inspector：0 FAIL / 1 WARN，仅保留无文字材质表面的空白提示。已复看最终桌面整页及 1024px 截图。两张原稿 16-bit PNG 共约 54 MB，保留在工作区；网页使用约 8.6 MB 的 WebP，保留原尺寸、ICC 与解码后的 8-bit RGB 像素，未裁剪或改色。
