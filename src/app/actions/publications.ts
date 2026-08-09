'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';
import type { PublicationInsert } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

export async function generateUniqueSlug(title: string, existingId?: string): Promise<string> {
  const supabase = createServerClient();
  const baseSlug = slugify(title) || 'article';

  let query = supabase.from('publications').select('slug').like('slug', `${baseSlug}%`);
  if (existingId) {
    query = query.neq('id', existingId);
  }
  const { data } = await query;

  if (!data || data.length === 0) {
    return baseSlug;
  }

  const existingSlugs = new Set(data.map((row: any) => row.slug));
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let count = 2;
  while (existingSlugs.has(`${baseSlug}-${count}`)) {
    count++;
  }
  return `${baseSlug}-${count}`;
}

export async function uploadPublicationImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const supabase = createServerClient();
  const file = formData.get('image') as File | null;
  if (!file || file.size === 0) return { error: 'No image file provided.' };

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `inline/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

  const { error } = await supabase.storage
    .from('publication-images')
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from('publication-images').getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function createPublication(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const title = (formData.get('title') as string).trim();
  const customSlug = (formData.get('slug') as string)?.trim();
  const category = formData.get('category') as string;
  const excerpt = (formData.get('excerpt') as string).trim();
  const sourceLabel = (formData.get('source_label') as string)?.trim() || null;
  const year = (formData.get('year') as string).trim();
  const link = (formData.get('link') as string)?.trim() || null;
  const contentRaw = formData.get('content') as string;

  if (!title || !category || !excerpt || !year) {
    return { error: 'Title, category, excerpt, and year are required.' };
  }

  let contentJson = null;
  if (contentRaw) {
    try {
      contentJson = JSON.parse(contentRaw);
    } catch {
      contentJson = null;
    }
  }

  const slug = customSlug ? slugify(customSlug) : await generateUniqueSlug(title);

  const data: PublicationInsert = {
    title,
    slug,
    category,
    excerpt,
    source_label: sourceLabel,
    year,
    link,
    content: contentJson,
  };

  const { error } = await supabase.from('publications').insert(data);
  if (error) return { error: error.message };

  revalidatePath('/research');
  redirect('/dashboard/publications?flash=created');
}

export async function updatePublication(
  id: string,
  _prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createServerClient();

  const title = (formData.get('title') as string).trim();
  const customSlug = (formData.get('slug') as string)?.trim();
  const category = formData.get('category') as string;
  const excerpt = (formData.get('excerpt') as string).trim();
  const sourceLabel = (formData.get('source_label') as string)?.trim() || null;
  const year = (formData.get('year') as string).trim();
  const link = (formData.get('link') as string)?.trim() || null;
  const contentRaw = formData.get('content') as string;

  if (!title || !category || !excerpt || !year) {
    return { error: 'Title, category, excerpt, and year are required.' };
  }

  let contentJson = null;
  if (contentRaw) {
    try {
      contentJson = JSON.parse(contentRaw);
    } catch {
      contentJson = null;
    }
  }

  const slug = customSlug ? slugify(customSlug) : await generateUniqueSlug(title, id);

  const data: Partial<PublicationInsert> = {
    title,
    slug,
    category,
    excerpt,
    source_label: sourceLabel,
    year,
    link,
    content: contentJson,
  };

  const { error } = await supabase.from('publications').update(data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/research');
  if (slug) revalidatePath(`/research/${slug}`);
  redirect('/dashboard/publications?flash=updated');
}

export async function savePublicationDraft(
  id: string,
  contentJson: any
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from('publications')
    .update({ content: contentJson })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deletePublication(id: string): Promise<{ error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from('publications').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/research');
  return {};
}
