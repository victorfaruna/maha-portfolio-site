import Link from 'next/link';
import { Plus, Play, ExternalLink } from 'lucide-react';
import { createAnonServerClient } from '@/lib/supabase/server';
import { DashboardTable, type ColumnDef, type RowDef } from '../../_components/DashboardTable';
import { deleteSpeakingItem } from '@/app/actions/speaking';
import { speakingData } from '@/data/speaking';
import type { SpeakingItem } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getVideosData(): Promise<{ items: SpeakingItem[]; isUsingFallback: boolean }> {
  try {
    const supabase = createAnonServerClient();
    const { data } = await supabase
      .from('speaking_items')
      .select('*')
      .eq('section_type', 'video')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      return { items: data as SpeakingItem[], isUsingFallback: false };
    }
  } catch {
    // Fallback if table not yet created
  }

  // Fallback to static static YouTube items
  const fallback = speakingData
    .filter((item) => Boolean(item.videoId))
    .map((item, idx) => ({
      id: `static-${idx}`,
      section_type: 'video' as const,
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

export default async function WatchAndListenDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string }>;
}) {
  const { flash } = await searchParams;
  const { items, isUsingFallback } = await getVideosData();

  const columns: ColumnDef[] = [
    { header: 'Video / Thumbnail', className: 'w-24' },
    { header: 'Title & Outlet', className: 'max-w-xs' },
    { header: 'YouTube Video ID' },
    { header: 'Year' },
  ];

  const rows: RowDef[] = items.map((v) => {
    const thumbUrl = v.video_id
      ? `https://img.youtube.com/vi/${v.video_id}/hqdefault.jpg`
      : v.og_image;

    return {
      id: v.id,
      cells: [
        <div key="thumb" className="relative w-16 h-10 rounded overflow-hidden bg-navy-900 border border-gray-200 shrink-0">
          {thumbUrl ? (
            <img src={thumbUrl} alt={v.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white">
              <Play className="w-4 h-4" />
            </div>
          )}
        </div>,
        <div key="title" className="flex flex-col">
          <span className="font-medium line-clamp-1 text-gray-900">{v.title}</span>
          <span className="text-xs text-[#EC4899] font-semibold uppercase tracking-wider">{v.outlet}</span>
        </div>,
        v.video_id ? (
          <a
            key="yt"
            href={`https://www.youtube.com/watch?v=${v.video_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-mono"
          >
            {v.video_id}
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span key="yt" className="text-xs text-gray-400 font-mono">No video ID</span>
        ),
        v.year || '—',
      ],
    };
  });

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Play className="w-5 h-5 text-[#EC4899]" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Watch &amp; Listen (YouTube Videos)</h1>
          </div>
          <p className="text-sm text-gray-500">
            Manage video highlights, keynotes, and interviews featured in the 3-column &quot;Watch &amp; Listen&quot; section.
          </p>
        </div>
        <Link
          href="/dashboard/speaking/videos/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Video
        </Link>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-sm text-green-700">
          {flash === 'created' ? '✓ Video added successfully.' : '✓ Video updated successfully.'}
        </div>
      )}

      {isUsingFallback && (
        <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 text-xs text-blue-800">
          ℹ Displaying initial static videos. Click &quot;Add New Video&quot; to save custom videos directly to your Supabase database.
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <DashboardTable
          columns={columns}
          rows={rows}
          editBasePath="/dashboard/speaking/videos"
          onDelete={deleteSpeakingItem}
          emptyMessage="No videos added yet. Click 'Add New Video' to create one."
        />
      </div>
    </main>
  );
}
