import { lazy, Suspense, useState } from 'react';
import { toast } from 'sonner';
import { GlassSwatch } from '../../../../design-system/react/material-swatch';
import { Button } from '../../../../design-system/react/ui/button';
import { Checkbox } from '../../../../design-system/react/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../design-system/react/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../../../../design-system/react/ui/field';
import { Input } from '../../../../design-system/react/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../design-system/react/ui/select';
import { Slider } from '../../../../design-system/react/ui/slider';
import { Switch } from '../../../../design-system/react/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../design-system/react/ui/tabs';
import { Textarea } from '../../../../design-system/react/ui/textarea';
import {
  type AppearanceProps,
  AppearanceSettings,
} from '../components/appearance-settings';
import DataTableExample from '../examples/local/data-table';
import './catalog.css';
import './component-directory.css';

const ChartExample = lazy(() => import('../examples/local/chart'));
export function Catalog(props: AppearanceProps) {
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState([60]);
  const [name, setName] = useState('Craftbase');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  return (
    <main id="main" tabIndex={-1} className="specimen-layout">
      <aside className="specimen-settings">
        <h1>ShowCase</h1>
        <p>在真实组合中观察基础设计。</p>
        <AppearanceSettings {...props} />
        <nav aria-label="设计参考">
          <a href="#/components">浏览全部组件 →</a>
          <a href="#/docs/foundations">色彩与文字 ↗</a>
          <a href="#/docs/materials">材质与层级 ↗</a>
          <a href="#/docs/states">状态与尺寸 ↗</a>
        </nav>
        <p className="specimen-note">场景使用本地示例数据。</p>
      </aside>
      <div className="specimen-canvas">
        <header className="directory-heading">
          <div>
            <h2>样式与场景</h2>
            <p>同一套组件，不同的表面、密度与字体。</p>
          </div>
          <a className="text-link" href="#/components">
            全部组件 ↗
          </a>
        </header>
        <div className="showcase-grid">
          <section className="specimen-panel">
            <header>
              <h2>偏好设置</h2>
              <a href="#/components/switch">Switch / Slider ↗</a>
            </header>
            <Tabs defaultValue="general">
              <TabsList aria-label="偏好分类">
                <TabsTrigger value="general">通用</TabsTrigger>
                <TabsTrigger value="sound">声音</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="grid gap-6 mt-6">
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="notifications">允许通知</FieldLabel>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="sync">自动同步</FieldLabel>
                  <Switch id="sync" defaultChecked />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="preview-tips" defaultChecked />
                  <FieldLabel htmlFor="preview-tips">显示操作提示</FieldLabel>
                </Field>
              </TabsContent>
              <TabsContent value="sound" className="grid gap-6 mt-6">
                <Field>
                  <div className="scene-row">
                    <FieldLabel>提醒音量</FieldLabel>
                    <output>{volume[0]}%</output>
                  </div>
                  <Slider
                    aria-label="提醒音量"
                    value={volume}
                    onValueChange={setVolume}
                  />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="sound" defaultChecked />
                  <FieldLabel htmlFor="sound">播放提示音</FieldLabel>
                </Field>
              </TabsContent>
            </Tabs>
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">打开设置弹窗</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>通知设置</DialogTitle>
                    <DialogDescription>
                      浮层继承当前配色、字体与材质。
                    </DialogDescription>
                  </DialogHeader>
                  <Select defaultValue="important">
                    <SelectTrigger aria-label="通知频率">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部通知</SelectItem>
                      <SelectItem value="important">仅重要通知</SelectItem>
                      <SelectItem value="none">关闭通知</SelectItem>
                    </SelectContent>
                  </Select>
                </DialogContent>
              </Dialog>
            </div>
          </section>
          <section className="specimen-panel">
            <header>
              <h2>表单与校验</h2>
              <a href="#/components/field">Field / Input ↗</a>
            </header>
            <form
              className="grid gap-6"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (!name.trim()) {
                  setError('请输入项目名称。');
                  setSaved(false);
                  return;
                }
                setError('');
                setSaved(true);
                toast.success('示例已保存');
              }}
            >
              <Field data-invalid={Boolean(error)}>
                <FieldLabel htmlFor="project-name">项目名称</FieldLabel>
                <Input
                  id="project-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSaved(false);
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'project-error' : 'project-help'}
                />
                <FieldDescription id="project-help">
                  用于识别当前设计工作区。
                </FieldDescription>
                {error && <FieldError id="project-error">{error}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="project-notes">设计说明</FieldLabel>
                <Textarea
                  id="project-notes"
                  defaultValue="提炼自己的颜色、文字、空间与状态规则。"
                  rows={3}
                />
              </Field>
              <div className="scene-row">
                <Button type="submit">保存示例</Button>
                <span role="status" className="muted">
                  {saved ? '已保存到本次演示' : '内容仅用于样式观察'}
                </span>
              </div>
            </form>
          </section>
          <section className="specimen-panel">
            <header>
              <h2>设计资产</h2>
              <a href="#/components/data-table">Data Table ↗</a>
            </header>
            <DataTableExample />
          </section>
          <section className="specimen-panel">
            <header>
              <h2>数据概览</h2>
              <a href="#/components/chart">Chart ↗</a>
            </header>
            <Suspense fallback={<p role="status">正在加载图表…</p>}>
              <ChartExample />
            </Suspense>
          </section>
        </div>
        <section className="specimen-panel scene-reference">
          <header>
            <h2>材质参考</h2>
            <p>材质作为可选环境，与基础控件样式分开观察。</p>
          </header>
          <div className="flex items-center gap-8">
            <GlassSwatch size="small" />
            <div>
              <p>实色承载内容，浮层通过材质与阴影表达层级。</p>
              <a className="text-link" href="#/docs/materials">
                查看材质样片与配方 →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
