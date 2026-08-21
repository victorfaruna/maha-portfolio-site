import { notFound } from 'next/navigation';
import { createAnonServerClient } from '@/lib/supabase/server';
import { PressForm } from '../_components/PressForm';
import { speakingData } from '@/data/speaking';
import type { SpeakingItem } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getPressItem(id: string): Promise<SpeakingItem | null> {
  if (!id) return null;

  // Try Supabase first
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

  // Static fallback item search
  if (id.startsWith('static-press-')) {
    const idx = parseInt(id.replace('static-press-', ''), 10);
    const item = speakingData[idx];
    if (item) {
      return {
        id,
        section_type: 'press',
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

export default async function EditPressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPressItem(id);

  if (!item) {
    notFound();
  }

  return <PressForm item={item} />;
}
