import Link from 'next/link';
import { Plus, Newspaper, Globe, Mic, Radio } from 'lucide-react';
import { createAnonServerClient } from '@/lib/supabase/server';
import { DashboardTable, type ColumnDef, type RowDef } from '../../_components/DashboardTable';
import { deleteSpeakingItem } from '@/app/actions/speaking';
import { speakingData, type MediaCategory } from '@/data/speaking';
import type { SpeakingItem } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getPressData(): Promise<{ items: SpeakingItem[]; isUsingFallback: boolean }> {
  try {
    const supabase = createAnonServerClient();
    const { data } = await supabase
      .from('speaking_items')
      .select('*')
      .eq('section_type', 'press')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      return { items: data as SpeakingItem[], isUsingFallback: false };
    }
  } catch {
    // Fallback if table not yet created
  }

  // Fallback to static static press items
  const fallback = speakingData.map((item, idx) => ({
    id: `static-press-${idx}`,
    section_type: 'press' as const,
    category: item.category,
    title: item.title,
    outlet: item.outlet,
    description: item.description || null,
    link: item.link,
    video_id: item.videoId || null,
    og_image: item.ogImage || null,
    is_rtl: item.isRTL || false,
    year: item.year || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  return { items: fallback, isUsingFallback: true };
}

function getCategoryBadge(cat: MediaCategory) {
  switch (cat) {
    case 'Keynote & Talk':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 font-semibold rounded-full">
          <Mic className="w-3 h-3 text-purple-600" />
          KEYNOTES &amp; TALKS
        </span>
      );
    case 'Press Feature':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-pink-50 text-pink-700 border border-pink-200 font-semibold rounded-full">
          <Newspaper className="w-3 h-3 text-pink-600" />
          PRESS FEATURES
        </span>
      );
    case 'Podcast & Broadcast':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 font-semibold rounded-full">
          <Radio className="w-3 h-3 text-blue-600" />
          PODCASTS &amp; BROADCASTS
        </span>
      );
    case 'Arabic Media':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-full">
          <Globe className="w-3 h-3 text-emerald-600" />
          ARABIC MEDIA
        </span>
      );
  }
}

export default async function PressArchiveDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string }>;
}) {
  const { flash } = await searchParams;
  const { items, isUsingFallback } = await getPressData();

  const columns: ColumnDef[] = [
    { header: 'Image / Media', className: 'w-20' },
    { header: 'Title & Outlet', className: 'max-w-xs' },
    { header: 'Category' },
    { header: 'Language' },
    { header: 'Year' },
  ];

  const rows: RowDef[] = items.map((p) => ({
    id: p.id,
    cells: [
      <div key="img" className="relative w-14 h-10 rounded overflow-hidden bg-slate-900 border border-gray-200 shrink-0">
        {p.og_image ? (
          <img src={p.og_image} alt={p.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white/50 text-[9px] font-mono text-center p-1 leading-tight">
            {p.outlet}
          </div>
        )}
      </div>,
      <div key="title" className="flex flex-col">
        <span className="font-medium line-clamp-1 text-gray-900" dir={p.is_rtl ? 'rtl' : 'ltr'}>
          {p.title}
        </span>
        <span className="text-xs text-[#EC4899] font-semibold uppercase tracking-wider">{p.outlet}</span>
      </div>,
      getCategoryBadge(p.category),
      p.is_rtl ? (
        <span key="rtl" className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
          RTL (Arabic)
        </span>
      ) : (
        <span key="rtl" className="text-xs text-gray-400">English</span>
      ),
      p.year || '—',
    ],
  }));

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Newspaper className="w-5 h-5 text-[#EC4899]" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Press &amp; Media Archive</h1>
          </div>
          <p className="text-sm text-gray-500">
            Manage media articles, keynote talks, podcasts, and Arabic features categorized in the 4-slot carousel rows.
          </p>
        </div>
        <Link
          href="/dashboard/speaking/press/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Press Feature
        </Link>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-sm text-green-700">
          {flash === 'created' ? '✓ Press feature added successfully.' : '✓ Press feature updated successfully.'}
        </div>
      )}

      {isUsingFallback && (
        <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 text-xs text-blue-800">
          ℹ Displaying initial static media features. Click &quot;Add New Press Feature&quot; to add custom entries to your database.
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <DashboardTable
          columns={columns}
          rows={rows}
          editBasePath="/dashboard/speaking/press"
          onDelete={deleteSpeakingItem}
          emptyMessage="No press features added yet. Click 'Add New Press Feature' to create one."
        />
      </div>
    </main>
  );
}
