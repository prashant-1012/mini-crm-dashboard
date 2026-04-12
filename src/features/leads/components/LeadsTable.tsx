import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
//   SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import type { Lead } from '../leadsTypes';
import LeadStatusBadge from './LeadStatusBadge';

interface LeadsTableProps {
  data: Lead[];
  isLoading: boolean;
}

// columnHelper gives us a type-safe way to define columns.
// It knows the shape of Lead, so autocomplete works on accessorKey.
const columnHelper = createColumnHelper<Lead>();

const COLUMNS = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
        <p className="text-xs text-gray-400">{info.row.original.phone}</p>
      </div>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400 text-sm">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <LeadStatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400 text-sm">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: (info) => (
      <span className="text-gray-900 dark:text-white text-sm font-medium">
        ₹{info.getValue().toLocaleString('en-IN')}
      </span>
    ),
  }),
  columnHelper.accessor('assignedTo', {
    header: 'Assigned To',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400 text-sm">{info.getValue()}</span>
    ),
  }),
];

// Skeleton row shown while data is loading
const TableRowSkeleton = () => (
  <tr>
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </td>
    ))}
  </tr>
);

const LeadsTable = ({ data, isLoading }: LeadsTableProps) => {
  // SortingState is an array because you can sort by multiple columns
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: COLUMNS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">

        <thead className="bg-gray-50 dark:bg-gray-800/60">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {/* Sort direction indicator */}
                    <span className="text-gray-300 dark:text-gray-600">
                      {{ asc: '↑', desc: '↓' }[header.column.getIsSorted() as string] ?? '↕'}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50 bg-white dark:bg-gray-900">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
            : table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}

          {/* Empty state — no results found */}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
                <p className="text-base font-medium">No leads found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter</p>
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default LeadsTable;