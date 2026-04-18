import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
//   SortingState,
} from '@tanstack/react-table';
import { useState, useEffect, useMemo } from 'react';
import type { Lead } from '../leadsTypes';
import LeadStatusBadge from './LeadStatusBadge';

interface LeadsTableProps {
  data: Lead[];
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

// columnHelper gives us a type-safe way to define columns.
const columnHelper = createColumnHelper<Lead>();

const COLUMNS = (onEdit: (lead: Lead) => void, onDelete: (id: string) => void) => [
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
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => <ActionCell lead={info.row.original} onEdit={onEdit} onDelete={onDelete} />,
  }),
];

const ActionCell = ({ lead, onEdit, onDelete }: { lead: Lead; onEdit: (l: Lead) => void; onDelete: (id: string) => void }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => setIsConfirming(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(lead)}
        className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
        title="Edit Lead"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

      {isConfirming ? (
        <button
          onClick={() => onDelete(lead.id)}
          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase rounded transition-all animate-pulse"
        >
          Confirm?
        </button>
      ) : (
        <button
          onClick={() => setIsConfirming(true)}
          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Delete Lead"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      )}
    </div>
  );
};

const COLUMN_CLASSES: Record<string, string> = {
  name:       '',
  email:      '',
  status:     '',
  source:     '',
  value:      '',
  assignedTo: '',
  actions:    'w-20',
};

// Skeleton row shown while data is loading
const TableRowSkeleton = () => (
  <tr>
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </td>
    ))}
  </tr>
);

const LeadsTable = ({ data, isLoading, onEdit, onDelete }: LeadsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  // Memoize columns so they don't recreate on every render
  const columns = useMemo(() => COLUMNS(onEdit, onDelete), [onEdit, onDelete]);

  const table = useReactTable({
    data,
    columns,
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
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors ${COLUMN_CLASSES[header.column.id] ?? ''}`}
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
                    <td key={cell.id} className={`px-4 py-3.5 whitespace-nowrap ${COLUMN_CLASSES[cell.column.id] ?? ''}`}>
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