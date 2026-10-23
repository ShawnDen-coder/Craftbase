import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../../design-system/react/ui/chart';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '../../../../../design-system/react/ui/tabs';

const data = [
  { day: '周一', views: 24 },
  { day: '周二', views: 36 },
  { day: '周三', views: 28 },
  { day: '周四', views: 48 },
  { day: '周五', views: 42 },
];
export default function ChartExample() {
  const [kind, setKind] = useState('bar');
  const config = { views: { label: '预览次数', color: 'var(--chart-1)' } };
  return (
    <div className="grid grid-cols-1 gap-6 w-full min-w-0">
      <Tabs value={kind} onValueChange={setKind}>
        <TabsList aria-label="图表类型">
          <TabsTrigger value="bar">柱状图</TabsTrigger>
          <TabsTrigger value="line">折线图</TabsTrigger>
        </TabsList>
      </Tabs>
      <ChartContainer
        config={config}
        className="h-64 w-full min-w-0 aspect-auto"
      >
        {kind === 'bar' ? (
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              isAnimationActive={false}
              dataKey="views"
              fill="var(--color-views)"
              radius={4}
            />
          </BarChart>
        ) : (
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              isAnimationActive={false}
              dataKey="views"
              stroke="var(--color-views)"
              strokeWidth={2}
            />
          </LineChart>
        )}
      </ChartContainer>
      <p className="muted">
        示例数据 · 本周共 {data.reduce((sum, row) => sum + row.views, 0)} 次预览
      </p>
    </div>
  );
}
