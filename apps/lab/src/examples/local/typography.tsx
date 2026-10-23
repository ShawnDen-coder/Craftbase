export default function TypographyExample() {
  return (
    <div className="grid gap-6">
      <h1 className="cb-type" data-type-role="title-1">
        文字承载信息
      </h1>
      <h2 className="cb-type" data-type-role="title-2">
        Typography / 字体层级
      </h2>
      <p className="text-base leading-relaxed">
        通过左侧分别设置中英文字体，观察同一段内容的节奏、字符宽度和层级。The
        same content, a different reading rhythm.
      </p>
      <blockquote className="border-l-2 pl-4 text-muted-foreground">
        样式服务于内容的阅读顺序。
      </blockquote>
      <p className="text-sm text-muted-foreground">辅助说明 · 2026 / 10 / 23</p>
      <code className="rounded bg-muted px-2 py-1">--cb-font-body</code>
    </div>
  );
}
