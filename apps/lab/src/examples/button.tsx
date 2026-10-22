import { useState } from 'react';
import { Button } from '../../../../design-system/react/ui/button';
export default function ButtonExample() {
  const [count, setCount] = useState(0);
  return (
    <div className="example-stack example-surface button-example">
      <div className="example-copy">
        <strong>保存这次修改</strong>
        <p>编辑当前项目。</p>
      </div>
      <div className="demo-row">
        <Button onClick={() => setCount(count + 1)}>保存修改</Button>
        <Button variant="secondary" onClick={() => setCount(0)}>
          重置
        </Button>
        <Button variant="quiet" disabled>
          已同步
        </Button>
      </div>
      <p className="demo-feedback" role="status">
        {count ? `已保存 ${count} 次修改` : '主要与次要操作。'}
      </p>
    </div>
  );
}
