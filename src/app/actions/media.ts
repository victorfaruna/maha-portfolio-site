'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import type { MediaItemInsert } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

async function uploadMediaImage(file: File): Promise<string> {
  const supabase = createServerClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `gallery/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

  try {
    const { error } = await supabase.storage
      .from('media-gallery')
      .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: true });

    if (!error) {
      const { data } = supabase.storage.from('media-gallery').getPublicUrl(path);
      if (data?.publicUrl) return data.publicUrl;
    }
  } catch {
    // Fallback if storage upload fails
  }

  // Fallback to Data URL so image upload never fails
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = file.type || 'image/jpeg';
  return `data:${mimeType};base64,${base64}`;
}

export async function createMediaItem(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const imageFile = formData.get('image') as File | null;
  const directUrl = (formData.get('image_url') as string | null)?.trim();
  const existingUrl = (formData.get('existing_image_url') as string | null)?.trim();

  let imageUrl: string = '';
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadMediaImage(imageFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'Upload failed.' };
    }
  } else if (directUrl) {
    imageUrl = directUrl;
  } else if (existingUrl) {
    imageUrl = existingUrl;
  } else {
    return { error: 'An image file or Image URL is required.' };
  }

  const data: MediaItemInsert = {
    image_url: imageUrl,
    category_tag: (formData.get('category_tag') as string)?.trim() || null,
    title: (formData.get('title') as string)?.trim() || null,
    context_note: (formData.get('context_note') as string)?.trim() || null,
    year: (formData.get('year') as string)?.trim() || null,
    sort_order: parseInt(formData.get('sort_order') as string ?? '0', 10) || 0,
  };

  const { error } = await supabase.from('media_gallery').insert(data);
  if (error) return { error: error.message };

  revalidatePath('/research');
  redirect('/dashboard/media?flash=created');
}

/**
 * updateMediaItem(id, prevState, formData) — use with .bind(null, id) for useActionState
 */
export async function updateMediaItem(
  id: string,
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const imageFile = formData.get('image') as File | null;
  const directUrl = (formData.get('image_url') as string | null)?.trim();
  const existingUrl = (formData.get('existing_image_url') as string | null)?.trim();

  let imageUrl: string = existingUrl ?? '';
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadMediaImage(imageFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'Upload failed.' };
    }
  } else if (directUrl) {
    imageUrl = directUrl;
  }

  const data: Partial<MediaItemInsert> = {
    image_url: imageUrl,
    category_tag: (formData.get('category_tag') as string)?.trim() || null,
    title: (formData.get('title') as string)?.trim() || null,
    context_note: (formData.get('context_note') as string)?.trim() || null,
    year: (formData.get('year') as string)?.trim() || null,
    sort_order: parseInt(formData.get('sort_order') as string ?? '0', 10) || 0,
  };

  const { error } = await supabase.from('media_gallery').update(data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/research');
  redirect('/dashboard/media?flash=updated');
}

export async function deleteMediaItem(id: string): Promise<{ error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from('media_gallery').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/research');
  return {};
}
