import { useState } from 'react';
import { Button } from '../../../../design-system/react/ui/button';
import { Input } from '../../../../design-system/react/ui/input';
export function StateGallery() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <section id="states">
      <div className="section-heading">
        <div>
          <h1>状态与尺寸</h1>
          <p>尺寸与密度独立；状态通过文字、边界与行为共同表达。</p>
        </div>
      </div>
      <article className="native-size-gallery">
        <h3>原稿尺寸</h3>
        <p>Mini 到 XL 是明确尺寸，不随密度改变；小尺寸用于原稿对照。</p>
        <div className="demo-row">
          {(['mini', 'small', 'medium', 'large', 'xl'] as const).map((size) => (
            <Button
              key={size}
              nativeSize={size}
              variant="secondary"
              onClick={() => setCount((c) => c + 1)}
            >
              {size}
            </Button>
          ))}
        </div>
      </article>
      <div className="component-grid">
        <article>
          <h3>操作状态</h3>
          <div className="demo-row">
            <Button
              variant="primary"
              size="small"
              onClick={() => setCount((c) => c + 1)}
            >
              小尺寸
            </Button>
            <Button variant="danger" onClick={() => setCount((c) => c + 1)}>
              危险操作示例
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
                setCount((c) => c + 1);
              }}
            >
              提交示例
            </Button>
            <Button
              variant="quiet"
              disabled={!loading}
              onClick={() => setLoading(false)}
            >
              结束加载
            </Button>
          </div>
          <p role="status">
            已触发 {count} 次操作。
            {loading
              ? '提交处理中：重复点击已阻止，名称与宽度保持不变。'
              : '点击提交后进入可持续检查的加载状态。'}
          </p>
        </article>
        <article>
          <h3>输入状态</h3>
          <div className="field-grid">
            <label htmlFor="state-small">
              小尺寸
              <Input
                id="state-small"
                controlSize="small"
                defaultValue="可编辑"
              />
            </label>
            <label htmlFor="state-readonly">
              只读
              <Input id="state-readonly" readOnly value="只读内容" />
            </label>
            <label htmlFor="state-disabled">
              禁用
              <Input id="state-disabled" disabled value="暂不可用" />
            </label>
            <label htmlFor="state-invalid">
              错误
              <Input
                id="state-invalid"
                aria-invalid="true"
                aria-describedby="state-error"
                defaultValue=""
                placeholder="请输入名称"
              />
            </label>
          </div>
          <p id="state-error" className="error">
            名称不能为空；错误不只依赖颜色。
          </p>
        </article>
      </div>
    </section>
  );
}
