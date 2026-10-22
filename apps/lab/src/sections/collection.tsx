import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../design-system/react/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../design-system/react/ui/dialog';
import { Input } from '../../../../design-system/react/ui/input';

type Entry = { id: string; title: string; note: string };
const seed: Entry[] = [
  { id: 'button', title: '操作层级', note: '同一任务区域只保留一个主要操作。' },
  {
    id: 'input',
    title: '输入反馈',
    note: '标签持续可见，错误通过文字明确表达。',
  },
  {
    id: 'material',
    title: '功能层材质',
    note: '玻璃只用于导航与操作层，正文保持实色。',
  },
];
function restore() {
  const url = new URL(location.href);
  const id = url.searchParams.get('record');
  return {
    query: url.searchParams.get('q') ?? '',
    id: seed.some((e) => e.id === id) ? id : null,
    invalid: !!id && !seed.some((e) => e.id === id),
  };
}
export function Collection() {
  const [initial] = useState(restore);
  const [entries, setEntries] = useState(seed);
  const [query, setQuery] = useState(initial.query);
  const [selected, setSelected] = useState<string | null>(initial.id);
  const [draft, setDraft] = useState(
    () => seed.find((e) => e.id === initial.id)?.note ?? '',
  );
  const [pending, setPending] = useState<{ id: string | null } | null>(null);
  const [fail, setFail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(
    initial.invalid ? '记录已失效，已返回列表。' : '',
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLFieldSetElement>(null);
  const entry = entries.find((e) => e.id === selected);
  const dirty = !!entry && draft !== entry.note;
  const filtered = entries.filter((e) => (e.title + e.note).includes(query));
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (selected) url.searchParams.set('record', selected);
    else url.searchParams.delete('record');
    history.replaceState(null, '', url);
  }, [query, selected]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function choose(id: string | null) {
    setSelected(id);
    setDraft(entries.find((e) => e.id === id)?.note ?? '');
    setError('');
    setNotice('');
    requestAnimationFrame(() => (noteRef.current ?? listRef.current)?.focus());
  }
  function request(id: string | null) {
    if (saving) return;
    if (dirty) setPending({ id });
    else choose(id);
  }
  function save() {
    if (!entry || saving) return;
    if (!draft.trim()) {
      setError('设计说明不能为空。');
      return;
    }
    setSaving(true);
    setError('');
    timer.current = setTimeout(() => {
      setSaving(false);
      if (fail) {
        setError('模拟保存失败。草稿已保留，关闭“模拟失败”后重试。');
        return;
      }
      setEntries((rows) =>
        rows.map((row) =>
          row.id === entry.id ? { ...row, note: draft } : row,
        ),
      );
      setNotice('已保存到本次预览；刷新后恢复示例数据。');
    }, 650);
  }
  return (
    <section id="patterns">
      <div className="section-heading">
        <div>
          <h2>
            列表与详情 <span>Pattern</span>
          </h2>
          <p>用同一套组件完成查找、选择与编辑，检验状态的连续性。</p>
        </div>
        <span className="meta">本地演示数据</span>
      </div>
      <div className="collection-toolbar">
        <label htmlFor="collection-search">搜索设计记录</label>
        <Input
          id="collection-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入关键词"
        />
        <span>{filtered.length} 条记录</span>
      </div>
      {!selected && notice && (
        <p className="collection-notice" role="status">
          {notice}
        </p>
      )}
      <div className="collection" data-detail={!!selected}>
        <fieldset
          className="collection-list"
          ref={listRef}
          tabIndex={-1}
          aria-label="设计记录列表"
        >
          {filtered.length ? (
            filtered.map((row) => (
              <button
                type="button"
                key={row.id}
                className="collection-row cb-focus"
                aria-current={row.id === selected ? 'true' : undefined}
                onClick={() => request(row.id)}
                disabled={saving}
              >
                <strong>{row.title}</strong>
                <span>{row.note}</span>
              </button>
            ))
          ) : (
            <div className="collection-empty">
              <p>没有匹配的设计记录。</p>
              <Button variant="quiet" onClick={() => setQuery('')}>
                清除搜索
              </Button>
            </div>
          )}
        </fieldset>
        <div className="collection-detail">
          {entry ? (
            <>
              <div className="detail-heading">
                <h3>{entry.title}</h3>
                <Button
                  variant="quiet"
                  size="small"
                  disabled={saving}
                  onClick={() => request(null)}
                >
                  返回列表
                </Button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  save();
                }}
              >
                <label htmlFor="entry-note">设计说明</label>
                <textarea
                  ref={noteRef}
                  id="entry-note"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'save-error' : 'draft-help'}
                  disabled={saving}
                />
                <p id="draft-help" className="muted">
                  {dirty
                    ? '有未保存修改；切换记录前需要确认。'
                    : '当前内容与保存版本一致。'}
                </p>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={fail}
                    disabled={saving}
                    onChange={(e) => setFail(e.target.checked)}
                  />
                  模拟失败
                </label>
                {error && (
                  <p className="error" id="save-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="demo-row">
                  <Button type="submit" loading={saving} disabled={!dirty}>
                    {error ? '重试保存' : '保存说明'}
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={!dirty || saving}
                    onClick={() => {
                      setDraft(entry.note);
                      setError('');
                    }}
                  >
                    还原修改
                  </Button>
                </div>
                <p role="status" className="muted">
                  {saving ? '正在保存…' : notice}
                </p>
              </form>
            </>
          ) : (
            <div className="collection-empty">
              <h3>选择一条设计记录</h3>
              <p>列表保留上下文，详情承担编辑。</p>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={!!pending}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
      >
        <DialogContent
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            cancel.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            (noteRef.current ?? listRef.current)?.focus();
          }}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>保留未保存修改？</DialogTitle>
            <DialogDescription>
              当前设计说明尚未保存。可以继续编辑，或明确放弃后切换。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              ref={cancel}
              variant="secondary"
              onClick={() => setPending(null)}
            >
              继续编辑
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (pending) choose(pending.id);
                setPending(null);
              }}
            >
              放弃修改并切换
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
