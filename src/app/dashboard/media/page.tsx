import Link from 'next/link';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { createAnonServerClient } from '@/lib/supabase/server';
import { DashboardTable, type ColumnDef, type RowDef } from '../_components/DashboardTable';
import { deleteMediaItem } from '@/app/actions/media';
import type { MediaItem } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getData() {
  const supabase = createAnonServerClient();
  const { data } = await supabase
    .from('media_gallery')
    .select('*')
    .order('sort_order', { ascending: true });
  return (data ?? []) as MediaItem[];
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string }>;
}) {
  const { flash } = await searchParams;
  const media = await getData();

  const columns: ColumnDef[] = [
    { header: 'Title', className: 'max-w-xs' },
    { header: 'Category Tag' },
    { header: 'Year' },
    { header: 'Order' },
  ];

  const rows: RowDef[] = media.map((m) => ({
    id: m.id,
    cells: [
      <span key="title" className="font-medium line-clamp-1">{m.title ?? '—'}</span>,
      m.category_tag ?? '—',
      m.year ?? '—',
      m.sort_order,
    ],
  }));

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon className="w-5 h-5 text-[#0B1F4D]" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Media Gallery</h1>
          </div>
          <p className="text-sm text-gray-500">
            Manage photo carousel items for the Research &amp; Publications page.
          </p>
        </div>
        <Link
          href="/dashboard/media/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New
        </Link>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-sm text-green-700">
          {flash === 'created' ? '✓ Media item uploaded successfully.' : '✓ Media item updated successfully.'}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <DashboardTable
          columns={columns}
          rows={rows}
          editBasePath="/dashboard/media"
          onDelete={deleteMediaItem}
          emptyMessage="No media gallery items yet. Click 'Add New' to upload one."
        />
      </div>
    </main>
  );
}
