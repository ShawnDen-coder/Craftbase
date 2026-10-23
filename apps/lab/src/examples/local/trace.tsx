import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceLine,
  TraceTitle,
} from '../../../../../design-system/react/ui/trace';
export default function TraceExample() {
  return (
    <Trace>
      <TraceLine>
        <TraceTitle>读取基础变量</TraceTitle>
        <TraceDescription>已完成</TraceDescription>
      </TraceLine>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>检查组件样式</TraceTitle>
            <TraceDescription>展开记录</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          依次检查文字、表面、边界、焦点和选中状态。这是一份静态示例记录。
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine status="pending">
        <TraceTitle>等待确认</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceTitle>失败状态示例</TraceTitle>
        <TraceDescription>保留上下文以便重试。</TraceDescription>
      </TraceLine>
    </Trace>
  );
}
