import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '../../../../../design-system/react/ui/button';
import { Input } from '../../../../../design-system/react/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../design-system/react/ui/table';

type Row = { name: string; category: string; count: number };
const data: Row[] = [
  { name: '语义色彩', category: '基础', count: 24 },
  { name: '文字层级', category: '基础', count: 8 },
  { name: '表单控件', category: '组件', count: 16 },
  { name: '浮层与菜单', category: '组件', count: 12 },
  { name: '材质配方', category: '参考', count: 5 },
  { name: '布局与间距', category: '基础', count: 10 },
];
const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: '名称' },
  { accessorKey: 'category', header: '分类' },
  {
    accessorKey: 'count',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        条目数 ↕
      </Button>
    ),
  },
];
export default function DataTableExample() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState('');
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: filter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });
  return (
    <div className="grid gap-4 w-full">
      <Input
        aria-label="搜索设计资产"
        placeholder="搜索设计资产…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={header.column.id === 'count' ? 'text-right' : ''}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={
                    cell.column.id === 'count' ? 'text-right tabular-nums' : ''
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {!table.getRowModel().rows.length && (
            <TableRow>
              <TableCell colSpan={3}>没有匹配项，请调整搜索词。</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between gap-4">
        <span className="muted">
          共 {table.getFilteredRowModel().rows.length} 项
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
