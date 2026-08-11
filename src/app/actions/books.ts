'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import type { BookInsert } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

async function uploadBookCover(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = createServerClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `covers/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

  try {
    const { error } = await supabase.storage
      .from('book-covers')
      .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: true });

    if (!error) {
      const { data } = supabase.storage.from('book-covers').getPublicUrl(path);
      if (data?.publicUrl) return data.publicUrl;
    }
  } catch {
    // Fallback if storage upload fails
  }

  // Fallback to Data URL so cover image upload never fails
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = file.type || 'image/jpeg';
  return `data:${mimeType};base64,${base64}`;
}

export async function createBook(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  let coverUrl: string | null = null;
  const coverFile = formData.get('cover_image') as File | null;
  const directUrl = (formData.get('cover_image_url') as string | null)?.trim();

  if (coverFile && coverFile.size > 0) {
    try {
      coverUrl = await uploadBookCover(coverFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'Upload failed.' };
    }
  } else if (directUrl) {
    coverUrl = directUrl;
  }

  const data: BookInsert = {
    title_arabic: (formData.get('title_arabic') as string).trim(),
    title_english: (formData.get('title_english') as string).trim(),
    published_year: (formData.get('published_year') as string).trim(),
    description: (formData.get('description') as string).trim(),
    cover_image_url: coverUrl,
    external_link: (formData.get('external_link') as string)?.trim() || null,
  };

  if (!data.title_arabic || !data.title_english || !data.published_year || !data.description) {
    return { error: 'Arabic title, English title, year, and description are required.' };
  }

  const { error } = await supabase.from('books').insert(data);
  if (error) return { error: error.message };

  revalidatePath('/research');
  redirect('/dashboard/books?flash=created');
}

/**
 * updateBook(id, prevState, formData) — use with .bind(null, id) for useActionState
 */
export async function updateBook(
  id: string,
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  let coverUrl: string | null = null;
  const coverFile = formData.get('cover_image') as File | null;
  const directUrl = (formData.get('cover_image_url') as string | null)?.trim();
  const existingUrl = (formData.get('existing_cover_url') as string | null)?.trim();

  if (coverFile && coverFile.size > 0) {
    try {
      coverUrl = await uploadBookCover(coverFile);
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : 'Upload failed.' };
    }
  } else if (directUrl) {
    coverUrl = directUrl;
  } else {
    coverUrl = existingUrl || null;
  }

  const data: Partial<BookInsert> = {
    title_arabic: (formData.get('title_arabic') as string).trim(),
    title_english: (formData.get('title_english') as string).trim(),
    published_year: (formData.get('published_year') as string).trim(),
    description: (formData.get('description') as string).trim(),
    cover_image_url: coverUrl,
    external_link: (formData.get('external_link') as string)?.trim() || null,
  };

  const { error } = await supabase.from('books').update(data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/research');
  redirect('/dashboard/books?flash=updated');
}

export async function deleteBook(id: string): Promise<{ error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/research');
  return {};
}
