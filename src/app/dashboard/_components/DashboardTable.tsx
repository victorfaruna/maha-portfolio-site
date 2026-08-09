import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { DeleteButton } from './DeleteButton';

export type ColumnDef = {
  header: string;
  className?: string;
};

export type RowDef = {
  id: string;
  cells: React.ReactNode[];
};

type Props = {
  columns: ColumnDef[];
  rows: RowDef[];
  editBasePath: string;
  onDelete: (id: string) => Promise<{ error?: string } | void>;
  emptyMessage?: string;
};

export function DashboardTable({
  columns,
  rows,
  editBasePath,
  onDelete,
  emptyMessage = 'No entries yet.',
}: Props) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-16 text-sm text-gray-400 border border-dashed border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.cells.map((cell, i) => (
                  <td key={i} className={`px-4 py-3 text-gray-700 ${columns[i]?.className ?? ''}`}>
                    {cell}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`${editBasePath}/${row.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0B1F4D] border border-[#0B1F4D]/20 hover:bg-[#0B1F4D] hover:text-white transition-all duration-200"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </Link>
                    <DeleteButton id={row.id} onDelete={onDelete} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="sm:hidden divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.id} className="bg-white px-4 py-4 space-y-2">
            {/* First cell = title, shown prominently */}
            <div className="font-medium text-gray-900 text-sm pr-4">
              {row.cells[0]}
            </div>

            {/* Remaining cells shown as label: value pairs */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {row.cells.slice(1).map((cell, i) => (
                <div key={i} className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-400 uppercase tracking-wider mr-1">
                    {columns[i + 1]?.header}:
                  </span>
                  {cell}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <Link
                href={`${editBasePath}/${row.id}/edit`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0B1F4D] border border-[#0B1F4D]/20 hover:bg-[#0B1F4D] hover:text-white transition-all duration-200"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </Link>
              <DeleteButton id={row.id} onDelete={onDelete} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
