'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import type { SpeakingItemInsert } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

/**
 * Extracts a 11-character YouTube video ID from various YouTube URL formats.
 * E.g. https://www.youtube.com/watch?v=PmxVEMKEm16vQY85 -> PmxVEMKEm16vQY85
 * E.g. https://youtu.be/PmxVEMKEm16vQY85 -> PmxVEMKEm16vQY85
 */
export async function extractYouTubeId(urlOrId: string): Promise<string | null> {
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;

  // Direct 11-char ID check
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // RegEx for youtube.com and youtu.be URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return null;
}

async function uploadSpeakingMedia(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = createServerClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `media/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

  try {
    const { error } = await supabase.storage
      .from('speaking-media')
      .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: true });

    if (!error) {
      const { data } = supabase.storage.from('speaking-media').getPublicUrl(path);
      if (data?.publicUrl) return data.publicUrl;
    }
  } catch {
    // Fallback if storage fails
  }

  // Fallback to Data URL
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = file.type || 'image/jpeg';
  return `data:${mimeType};base64,${base64}`;
}

export async function createSpeakingItem(
  sectionType: 'video' | 'press',
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const title = (formData.get('title') as string || '').trim();
  const outlet = (formData.get('outlet') as string || '').trim();
  const description = (formData.get('description') as string || '').trim();
  const linkInput = (formData.get('link') as string || '').trim();
  const category = (formData.get('category') as string || 'Press Feature').trim() as any;
  const year = (formData.get('year') as string || '').trim();
  const isRTL = formData.get('is_rtl') === 'on' || formData.get('is_rtl') === 'true';

  let videoId: string | null = null;
  const videoInput = (formData.get('video_input') as string || '').trim();
  if (videoInput) {
    videoId = await extractYouTubeId(videoInput);
  }

  let ogImage: string | null = null;
  const mediaFile = formData.get('media_file') as File | null;
  const directImage = (formData.get('og_image') as string || '').trim();

  if (mediaFile && mediaFile.size > 0) {
    try {
      ogImage = await uploadSpeakingMedia(mediaFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'File upload failed.' };
    }
  } else if (directImage) {
    ogImage = directImage;
  }

  if (!title || !outlet) {
    return { error: 'Title and Outlet name are required.' };
  }

  let finalLink = linkInput;
  if (sectionType === 'video' && videoId && !finalLink) {
    finalLink = `https://www.youtube.com/watch?v=${videoId}`;
  }
  if (!finalLink) {
    finalLink = '#';
  }

  const data: SpeakingItemInsert = {
    section_type: sectionType,
    category: sectionType === 'video' ? 'Podcast & Broadcast' : category,
    title,
    outlet,
    description: description || null,
    link: finalLink,
    video_id: videoId,
    og_image: ogImage,
    is_rtl: isRTL,
    year: year || null,
  };

  const { error } = await supabase.from('speaking_items').insert(data);
  if (error) {
    return { error: error.message };
  }

  revalidatePath('/speaking');
  const redirectPath = sectionType === 'video' ? '/dashboard/speaking/videos?flash=created' : '/dashboard/speaking/press?flash=created';
  redirect(redirectPath);
}

export async function updateSpeakingItem(
  id: string,
  sectionType: 'video' | 'press',
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const title = (formData.get('title') as string || '').trim();
  const outlet = (formData.get('outlet') as string || '').trim();
  const description = (formData.get('description') as string || '').trim();
  const linkInput = (formData.get('link') as string || '').trim();
  const category = (formData.get('category') as string || 'Press Feature').trim() as any;
  const year = (formData.get('year') as string || '').trim();
  const isRTL = formData.get('is_rtl') === 'on' || formData.get('is_rtl') === 'true';

  let videoId: string | null = null;
  const videoInput = (formData.get('video_input') as string || '').trim();
  const existingVideoId = (formData.get('existing_video_id') as string || '').trim();
  if (videoInput) {
    videoId = await extractYouTubeId(videoInput);
  } else {
    videoId = existingVideoId || null;
  }

  let ogImage: string | null = null;
  const mediaFile = formData.get('media_file') as File | null;
  const directImage = (formData.get('og_image') as string || '').trim();
  const existingOgImage = (formData.get('existing_og_image') as string || '').trim();

  if (mediaFile && mediaFile.size > 0) {
    try {
      ogImage = await uploadSpeakingMedia(mediaFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'File upload failed.' };
    }
  } else if (directImage) {
    ogImage = directImage;
  } else {
    ogImage = existingOgImage || null;
  }

  if (!title || !outlet) {
    return { error: 'Title and Outlet name are required.' };
  }

  let finalLink = linkInput;
  if (sectionType === 'video' && videoId && !finalLink) {
    finalLink = `https://www.youtube.com/watch?v=${videoId}`;
  }
  if (!finalLink) {
    finalLink = '#';
  }

  const data: Partial<SpeakingItemInsert> = {
    section_type: sectionType,
    category: sectionType === 'video' ? 'Podcast & Broadcast' : category,
    title,
    outlet,
    description: description || null,
    link: finalLink,
    video_id: videoId,
    og_image: ogImage,
    is_rtl: isRTL,
    year: year || null,
  };

  const { error } = await supabase.from('speaking_items').update(data).eq('id', id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath('/speaking');
  const redirectPath = sectionType === 'video' ? '/dashboard/speaking/videos?flash=updated' : '/dashboard/speaking/press?flash=updated';
  redirect(redirectPath);
}

export async function deleteSpeakingItem(id: string): Promise<{ error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from('speaking_items').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/speaking');
  return {};
}
