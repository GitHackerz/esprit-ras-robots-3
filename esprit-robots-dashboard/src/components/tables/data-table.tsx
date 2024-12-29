'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';

import { Pagination } from '@nextui-org/pagination';
import { ArrowDown, ArrowUp, ArrowUpDown, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isSorting?: boolean;
    isFiltering?: boolean;
    isPaginating?: boolean;
    isSelecting?: boolean;
    isDeletable?: boolean;
    title?: string;
    limit?: number;
    setSelectedData?: (data: TData[]) => void;
    onRowClick?: (row: TData) => void;
    onDelete?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isSorting = false,
    isFiltering = false,
    isPaginating = false,
    isSelecting = false,
    isDeletable = false,
    title,
    limit = 10,
    setSelectedData,
    onRowClick,
    onDelete
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');

    const finalColumns = isDeletable
        ? [
              ...columns,
              {
                  id: 'actions',
                  cell: ({ row }: any) => (
                      <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={(e) => {
                              e.stopPropagation();
                              onDelete?.(row.original);
                          }}
                      >
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  )
              }
          ]
        : columns;

    const table = useReactTable({
        data,
        columns: finalColumns,
        state: {
            rowSelection,
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: isSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: isFiltering ? getFilteredRowModel() : undefined,
        getPaginationRowModel: isPaginating
            ? getPaginationRowModel()
            : undefined,
        onRowSelectionChange: isSelecting ? setRowSelection : undefined,
        globalFilterFn: 'auto',
        initialState: {
            pagination: {
                pageSize: limit
            }
        }
    });

    useEffect(() => {
        if (setSelectedData) {
            setSelectedData(
                table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original)
            );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [table.getFilteredSelectedRowModel()]);

    return (
        <div className='flex flex-col gap-3'>
            <div className='rounded-md border bg-white'>
                {(title !== '' || isFiltering) && (
                    <div className='inline-flex items-center justify-between w-full p-4'>
                        {title && <h2 className='font-semibold'>{title}</h2>}
                        <div className='inline-flex items-center gap-4'>
                            {isFiltering && (
                                <Input
                                    type='text'
                                    value={globalFilter}
                                    className='py-2'
                                    onChange={(e) =>
                                        setGlobalFilter(e.target.value)
                                    }
                                    placeholder='Search...'
                                />
                            )}
                        </div>
                    </div>
                )}

                <Table>
                    <TableHeader className='bg-gray-100'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isSortable = header.column.getCanSort();
                                    return (
                                        <TableHead 
                                            key={header.id}
                                            className={isSortable ? 'cursor-pointer select-none' : ''}
                                            onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                                        >
                                            <div className="flex items-center gap-2">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {isSortable && (
                                                    <div className="w-4 h-4">
                                                        {header.column.getIsSorted() === 'asc' ? (
                                                            <ArrowUp className="h-4 w-4" />
                                                        ) : header.column.getIsSorted() === 'desc' ? (
                                                            <ArrowDown className="h-4 w-4" />
                                                        ) : (
                                                            <ArrowUpDown className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getPaginationRowModel().rows?.length ? (
                            table.getPaginationRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={
                                                onRowClick &&
                                                (cell.column.columnDef as any)
                                                    .accessorKey
                                                    ? 'cursor-pointer'
                                                    : ''
                                            }
                                            onClick={() =>
                                                onRowClick &&
                                                (cell.column.columnDef as any)
                                                    .accessorKey &&
                                                onRowClick(row.original)
                                            }>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {isPaginating && table.getPageCount() > 1 && (
                <Pagination
                    total={table.getPageCount()}
                    initialPage={1}
                    variant={'bordered'}
                    onChange={(page) => table.setPageIndex(page - 1)}
                    className='self-center space-x-4'
                />
            )}
        </div>
    );
}
