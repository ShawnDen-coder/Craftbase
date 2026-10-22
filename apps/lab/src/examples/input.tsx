import { useId, useState } from 'react';
import { Input } from '../../../../design-system/react/ui/input';
export default function InputExample() {
  const id = useId();
  const [value, setValue] = useState('我的设计基础');
  const invalid = !value.trim();
  return (
    <div className="example-stack example-surface field-example">
      <div className="example-copy">
        <strong>项目设置</strong>
      </div>
      <label htmlFor={id}>项目名称</label>
      <Input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={`${id}-help`}
      />
      <p id={`${id}-help`} className={invalid ? 'error' : 'demo-feedback'}>
        {invalid ? '请输入项目名称。' : '名称只保存在当前预览中。'}
      </p>
    </div>
  );
}
