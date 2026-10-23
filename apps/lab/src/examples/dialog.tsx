import { useId, useState } from 'react';
import { Button } from '../../../../design-system/react/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../design-system/react/ui/dialog';
import { Input } from '../../../../design-system/react/ui/input';
export default function DialogExample() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('我的设计基础');
  const [draft, setDraft] = useState(name);
  const [error, setError] = useState('');
  return (
    <div className="example-stack example-surface dialog-example">
      <div className="example-copy">
        <strong>工作空间</strong>
        <p>编辑项目名称。</p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            onClick={() => {
              setDraft(name);
              setError('');
            }}
          >
            编辑项目
          </Button>
        </DialogTrigger>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>编辑项目</DialogTitle>
            <DialogDescription>
              修改项目名称，取消不会改变已有内容。
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) {
                setError('请输入项目名称。');
                return;
              }
              setName(draft.trim());
              setOpen(false);
            }}
          >
            <label htmlFor={id}>项目名称</label>
            <Input
              id={id}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
              <p className="error" id={`${id}-error`}>
                {error}
              </p>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  取消
                </Button>
              </DialogClose>
              <Button type="submit">保存修改</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <p className="demo-feedback" role="status">
        {name}
      </p>
    </div>
  );
}
