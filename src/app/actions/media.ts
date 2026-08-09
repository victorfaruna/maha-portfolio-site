'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import type { MediaItemInsert } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

async function uploadMediaImage(file: File): Promise<string> {
  const supabase = createServerClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `gallery/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('media-gallery')
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from('media-gallery').getPublicUrl(path);
  return data.publicUrl;
}

export async function createMediaItem(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const imageFile = formData.get('image') as File | null;
  const existingUrl = formData.get('existing_image_url') as string | null;

  let imageUrl: string;
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadMediaImage(imageFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'Upload failed.' };
    }
  } else if (existingUrl) {
    imageUrl = existingUrl;
  } else {
    return { error: 'An image is required.' };
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
  const existingUrl = formData.get('existing_image_url') as string | null;

  let imageUrl: string = existingUrl ?? '';
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadMediaImage(imageFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'Upload failed.' };
    }
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
