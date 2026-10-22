import { Check, FileText, Folder, Search, Volume2 } from 'lucide-react';
import { Checkbox, Slider, Switch, Tabs } from 'radix-ui';
import { useState } from 'react';
import { GlassSwatch } from '../../../../design-system/react/material-swatch';
import { Button } from '../../../../design-system/react/ui/button';
import { Input } from '../../../../design-system/react/ui/input';
import { Preview } from '../components/preview';
import { materials, type Preferences } from '../lib/preferences';
import './catalog.css';

export function Catalog({
  prefs,
  update,
}: {
  prefs: Preferences;
  update: (key: keyof Preferences, value: string) => void;
}) {
  const [notifications, setNotifications] = useState(true);
  const [sync, setSync] = useState(false);
  const [volume, setVolume] = useState([64]);
  const [selected, setSelected] = useState('材质研究');
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const files = ['材质研究', '色彩规范', '文字层级', '空间与布局'].filter(
    (name) => name.includes(query),
  );
  return (
    <main className="specimen-layout" id="main" tabIndex={-1}>
      <aside className="specimen-settings" aria-label="ShowCase 外观">
        <h1>ShowCase</h1>
        <p>macOS · {materials[prefs.material]}</p>
        <div className="specimen-setting">
          <span>风格</span>
          <strong>macOS</strong>
        </div>
        <label className="specimen-setting">
          材质
          <select
            aria-label="网站材质"
            value={prefs.material}
            onChange={(e) => update('material', e.target.value)}
          >
            {Object.entries(materials).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="specimen-setting">
          配色
          <select
            aria-label="ShowCase 外观"
            value={prefs.appearance}
            onChange={(e) => update('appearance', e.target.value)}
          >
            <option value="system">跟随系统</option>
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </label>
        <label className="specimen-setting">
          密度
          <select
            aria-label="ShowCase 密度"
            value={prefs.density}
            onChange={(e) => update('density', e.target.value)}
          >
            <option value="comfortable">舒适</option>
            <option value="compact">紧凑</option>
          </select>
        </label>
        <label className="specimen-setting">
          英文字体
          <select
            aria-label="英文字体"
            value={prefs.fontLatin}
            onChange={(e) => update('fontLatin', e.target.value)}
          >
            <option value="system">System</option>
            <option value="jetbrains">JetBrains Mono</option>
            <option value="sarasa">Sarasa Term SC</option>
          </select>
        </label>
        <label className="specimen-setting">
          中文字体
          <select
            aria-label="中文字体"
            value={prefs.fontCjk}
            onChange={(e) => update('fontCjk', e.target.value)}
          >
            <option value="system">System</option>
            <option value="sarasa">Sarasa Term SC</option>
          </select>
        </label>
        <nav aria-label="设计参考">
          <a href="#/docs/materials">材质与层级 ↗</a>
          <a href="#/docs/foundations">色彩与文字 ↗</a>
          <a href="#/docs/states">状态与尺寸 ↗</a>
        </nav>
        <p className="specimen-note">示例内容不保存。</p>
      </aside>
      <div className="specimen-canvas">
        <div className="specimen-grid">
          <div className="specimen-column">
            <section className="specimen-panel">
              <header>
                <h2>偏好设置</h2>
                <p>开关、滑块与分段选择</p>
              </header>
              <Tabs.Root defaultValue="general" className="specimen-tabs">
                <Tabs.List aria-label="偏好分类">
                  <Tabs.Trigger value="general">通用</Tabs.Trigger>
                  <Tabs.Trigger value="sound">声音</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="general">
                  <div className="specimen-switch-row">
                    <label htmlFor="preview-notifications">
                      允许通知<span>显示提醒与横幅</span>
                    </label>
                    <Switch.Root
                      id="preview-notifications"
                      className="specimen-switch"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    >
                      <Switch.Thumb />
                    </Switch.Root>
                  </div>
                  <div className="specimen-switch-row">
                    <label htmlFor="preview-sync">
                      自动同步<span>在设备间保持一致</span>
                    </label>
                    <Switch.Root
                      id="preview-sync"
                      className="specimen-switch"
                      checked={sync}
                      onCheckedChange={setSync}
                    >
                      <Switch.Thumb />
                    </Switch.Root>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="sound">
                  <p className="specimen-explanation">
                    拖动下方滑块，观察轨道与手柄的状态。
                  </p>
                  <label className="specimen-check" htmlFor="preview-sound">
                    <Checkbox.Root
                      id="preview-sound"
                      className="specimen-checkbox"
                      defaultChecked
                    >
                      <Checkbox.Indicator>
                        <Check size={12} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    播放提示音
                  </label>
                </Tabs.Content>
              </Tabs.Root>
              <div className="specimen-volume">
                <Volume2 size={16} />
                <span>提醒音量</span>
                <output>{volume[0]}%</output>
              </div>
              <Slider.Root
                className="specimen-slider"
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
              >
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb aria-label="提醒音量" />
              </Slider.Root>
            </section>
            <section className="specimen-panel">
              <header>
                <h2>输入与校验</h2>
                <p>标签、输入边界与焦点</p>
              </header>
              <Preview id="input" />
              <label className="specimen-notes" htmlFor="specimen-notes">
                设计说明
              </label>
              <textarea
                id="specimen-notes"
                defaultValue="切换材质和配色，观察控件的状态与边界。"
                rows={3}
              />
              <label className="specimen-check" htmlFor="specimen-readonly">
                只读字段
              </label>
              <Input id="specimen-readonly" readOnly value="macOS 样式参考" />
            </section>
          </div>
          <div className="specimen-column">
            <section className="specimen-panel specimen-glass-panel">
              <header>
                <h2>玻璃与浮层</h2>
                <p>透色、高光与悬浮层级</p>
              </header>
              <div className="specimen-glass-stage">
                <GlassSwatch size="small" />
                <div
                  className="cb-overlay specimen-glass-caption"
                  data-material="glass"
                >
                  <strong>Liquid Glass</strong>
                  <span>功能层材质</span>
                </div>
              </div>
              <Preview id="menu" />
            </section>
            <section className="specimen-panel specimen-files">
              <header>
                <h2>列表与选择</h2>
                <p>搜索、选择与空状态</p>
              </header>
              <div className="specimen-search">
                <Search size={15} />
                <Input
                  aria-label="搜索示例文件"
                  placeholder="搜索文件…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="specimen-file-list">
                {files.map((name) => (
                  <button
                    type="button"
                    key={name}
                    aria-pressed={selected === name}
                    onClick={() => setSelected(name)}
                  >
                    <FileText size={17} />
                    <span>{name}</span>
                    {selected === name && <Check size={15} />}
                  </button>
                ))}
                {files.length === 0 && (
                  <div className="specimen-empty">
                    <p>没有匹配的文件</p>
                    <Button variant="quiet" onClick={() => setQuery('')}>
                      清除搜索
                    </Button>
                  </div>
                )}
              </div>
              <p className="specimen-selection">当前选择：{selected}</p>
            </section>
          </div>
          <div className="specimen-column">
            <section className="specimen-panel">
              <header>
                <h2>操作与反馈</h2>
                <p>主要、次要与不可用状态</p>
              </header>
              <Preview id="button" />
              <div className="specimen-size-row">
                {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
                  <Button
                    key={size}
                    nativeSize={size}
                    variant="secondary"
                    onClick={() => setFeedback(`已观察 ${size} 按钮`)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <div className="specimen-secondary-actions">
                <Button variant="secondary" disabled>
                  暂不可用
                </Button>
                <label className="specimen-check" htmlFor="preview-keep">
                  <Checkbox.Root
                    id="preview-keep"
                    className="specimen-checkbox"
                    defaultChecked
                  >
                    <Checkbox.Indicator>
                      <Check size={12} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  保留当前选择
                </label>
              </div>
            </section>
            <section className="specimen-panel">
              <header>
                <h2>窗口与确认</h2>
                <p>{materials[prefs.material]} 承载内容，阴影表达层级</p>
              </header>
              <div className="specimen-window-copy">
                <strong>项目设置</strong>
                <p>修改名称后，观察窗口中的输入边界、焦点和主次操作。</p>
              </div>
              <Preview id="dialog" />
              <div className="specimen-folder">
                <Folder size={22} />
                <div>
                  <strong>设计资料</strong>
                  <span>本地示例文件夹</span>
                </div>
                <Button
                  variant="quiet"
                  size="small"
                  onClick={() => setFeedback('已选择“设计资料”作为示例位置')}
                >
                  选择
                </Button>
              </div>
              <p className="specimen-feedback" role="status">
                {feedback}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
