import Link from 'next/link';
import { Plus, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createAnonServerClient } from '@/lib/supabase/server';
import { DashboardTable, type ColumnDef, type RowDef } from '../_components/DashboardTable';
import { deletePublication } from '@/app/actions/publications';
import type { Publication } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getData() {
  const supabase = createAnonServerClient();
  const { data } = await supabase
    .from('publications')
    .select('*')
    .order('year', { ascending: false });
  return (data ?? []) as Publication[];
}

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string }>;
}) {
  const { flash } = await searchParams;
  const publications = await getData();

  const columns: ColumnDef[] = [
    { header: 'Title', className: 'max-w-xs' },
    { header: 'Category' },
    { header: 'Article Status' },
    { header: 'Year' },
  ];

  const rows: RowDef[] = publications.map((p) => {
    const hasContent = Boolean(p.content && Object.keys(p.content).length > 0);
    return {
      id: p.id,
      cells: [
        <div key="title" className="flex flex-col">
          <span className="font-medium line-clamp-1 text-gray-900">{p.title}</span>
          {p.slug ? (
            <span className="text-[11px] text-gray-400 font-mono">/research/{p.slug}</span>
          ) : (
            <span className="text-[11px] text-amber-600 font-mono">No slug set</span>
          )}
        </div>,
        p.category,
        hasContent ? (
          <span key="status" className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-green-50 text-green-700 border border-green-200 font-medium">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            Article Ready
          </span>
        ) : (
          <span key="status" className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 font-medium">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            No content yet
          </span>
        ),
        p.year,
      ],
    };
  });

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-[#0B1F4D]" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Publications &amp; Articles</h1>
          </div>
          <p className="text-sm text-gray-500">
            Manage policy briefs, academic papers, and full rich-text articles.
          </p>
        </div>
        <Link
          href="/dashboard/publications/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Article
        </Link>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-sm text-green-700">
          {flash === 'created' ? '✓ Publication created successfully.' : '✓ Publication updated successfully.'}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <DashboardTable
          columns={columns}
          rows={rows}
          editBasePath="/dashboard/publications"
          onDelete={deletePublication}
          emptyMessage="No publications yet. Click 'Add New Article' to create one."
        />
      </div>
    </main>
  );
}
