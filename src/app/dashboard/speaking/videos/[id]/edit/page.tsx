import { notFound } from 'next/navigation';
import { createAnonServerClient } from '@/lib/supabase/server';
import { VideoForm } from '../../_components/VideoForm';
import { speakingData } from '@/data/speaking';
import type { SpeakingItem } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getVideo(id: string): Promise<SpeakingItem | null> {
  if (!id) return null;

  try {
    const supabase = createAnonServerClient();
    const { data } = await supabase
      .from('speaking_items')
      .select('*')
      .eq('id', id)
      .single();

    if (data) return data as SpeakingItem;
  } catch {
    // Fallback search
  }

  if (id.startsWith('static-')) {
    const idx = parseInt(id.replace('static-', ''), 10);
    const videoItems = speakingData.filter((i) => Boolean(i.videoId));
    const item = videoItems[idx];
    if (item) {
      return {
        id,
        section_type: 'video',
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
      };
    }
  }

  return null;
}

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getVideo(id);

  if (!item) {
    notFound();
  }

  return <VideoForm item={item} />;
}
