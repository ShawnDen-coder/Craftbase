import { ChevronDown, Copy, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../design-system/react/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../../../design-system/react/ui/dropdown-menu';
export default function MenuExample() {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const duplicate = () => setFeedback('已创建项目副本（预览）');
  const [feedback, setFeedback] = useState('支持方向键与 Escape');
  return (
    <div className="example-stack example-surface menu-example">
      <div className="example-copy">
        <strong>设计基础</strong>
        <p>主题、组件与交互约定</p>
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            项目操作 <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          aria-label="项目操作"
          onKeyDown={(event) => {
            if (event.altKey && event.shiftKey && event.code === 'KeyD') {
              event.preventDefault();
              duplicate();
              setOpen(false);
            }
          }}
        >
          <DropdownMenuItem
            inset
            aria-keyshortcuts="Alt+Shift+D"
            onSelect={duplicate}
          >
            <Copy aria-hidden="true" /> 创建副本
            <DropdownMenuShortcut>⌥⇧D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={favorite}
            onCheckedChange={(next) => {
              const selected = next === true;
              setFavorite(selected);
              setFeedback(
                selected ? '已加入收藏（预览）' : '已取消收藏（预览）',
              );
            }}
          >
            <Star aria-hidden="true" /> 收藏项目
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled inset>
            发布（暂未开放）
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="demo-feedback" role="status">
        {feedback}
      </p>
    </div>
  );
}
