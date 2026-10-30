'use server';

import { randomUUID } from 'node:crypto';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdminSession } from '@/lib/admin-session';
import { createServerClient } from '@/lib/supabase/server';
import {
  MAX_TESTIMONIAL_PHOTO_BYTES, TESTIMONIAL_PHOTO_BUCKET,
  isTestimonialId, isValidTestimonialPhoto, parseTestimonialForm, testimonialStorageError,
  type TestimonialActionState,
} from '@/lib/testimonials';
import type { TestimonialRecord } from '@/lib/supabase/types';

async function removeOwnedPhoto(path: string | null) {
  if (!path || !/^portraits\/[0-9a-f-]{36}\.(jpg|png|webp)$/.test(path)) return;
  try {
    await createServerClient().storage.from(TESTIMONIAL_PHOTO_BUCKET).remove([path]);
  } catch {
    // A storage cleanup failure must not undo a successfully saved testimonial.
  }
}

export async function saveTestimonial(
  id: string | null, _previous: TestimonialActionState, form: FormData,
): Promise<TestimonialActionState> {
  if (!(await isAdminSession())) return { error: 'Your admin session expired. Sign in again before saving.' };
  if (id && !isTestimonialId(id)) return { error: 'Invalid testimonial ID.' };
  const parsed = parseTestimonialForm(form);
  if (parsed.error) return { error: parsed.error };

  const photo = form.get('photo');
  let photoBytes: Uint8Array | undefined;
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_TESTIMONIAL_PHOTO_BYTES) return { error: 'Photo must be 2 MB or smaller.' };
    photoBytes = new Uint8Array(await photo.arrayBuffer());
    if (!isValidTestimonialPhoto(photoBytes, photo.type)) {
      return { error: 'Upload a valid JPG, PNG or WebP image. SVG and other file types are not supported.' };
    }
  }

  try {
    const supabase = createServerClient();
    let existing: TestimonialRecord | null = null;
    if (id) {
      const { data, error } = await supabase.from('testimonials').select('*').eq('id', id)
        .abortSignal(AbortSignal.timeout(8000)).maybeSingle();
      if (error) return { error: testimonialStorageError(error).error };
      if (!data) return { error: 'This testimonial no longer exists. Return to the list and try again.' };
      existing = data as TestimonialRecord;
    } else {
      // Check schema availability before uploading a file.
      const { error } = await supabase.from('testimonials').select('id').limit(1)
        .abortSignal(AbortSignal.timeout(8000));
      if (error) return { error: testimonialStorageError(error).error };
    }

    let photoUrl = form.get('remove_photo') === 'on' ? null : existing?.photo_url || null;
    let photoPath = form.get('remove_photo') === 'on' ? null : existing?.photo_path || null;
    if (photo instanceof File && photoBytes) {
      const extension = photo.type === 'image/png' ? 'png' : photo.type === 'image/webp' ? 'webp' : 'jpg';
      photoPath = `portraits/${randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from(TESTIMONIAL_PHOTO_BUCKET)
        .upload(photoPath, photoBytes, { contentType: photo.type, upsert: false });
      if (error) return { error: 'The photo could not be uploaded. Check that the testimonial-photos bucket has been created, then try again.' };
      photoUrl = supabase.storage.from(TESTIMONIAL_PHOTO_BUCKET).getPublicUrl(photoPath).data.publicUrl;
    }

    const values = { ...parsed.data, photo_url: photoUrl, photo_path: photoPath };
    const query = id
      ? supabase.from('testimonials').update(values).eq('id', id)
      : supabase.from('testimonials').insert(values);
    const { data, error } = await query.select('id').abortSignal(AbortSignal.timeout(15000)).maybeSingle();
    if (error || !data) return { error: 'The testimonial could not be saved. Check the list before retrying.' };
    if (existing?.photo_path && existing.photo_path !== photoPath) await removeOwnedPhoto(existing.photo_path);
  } catch {
    return { error: 'Saving was interrupted. Check the testimonials list before retrying.' };
  }

  revalidatePath('/speaking');
  revalidatePath('/dashboard/speaking/testimonials');
  if (id) revalidatePath(`/dashboard/speaking/testimonials/${id}/edit`);
  redirect(`/dashboard/speaking/testimonials?flash=${id ? 'updated' : 'created'}`);
}

export async function deleteTestimonial(id: string): Promise<TestimonialActionState> {
  if (!(await isAdminSession())) return { error: 'Your admin session expired. Sign in again before deleting.' };
  if (!isTestimonialId(id)) return { error: 'Invalid testimonial ID.' };
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('testimonials').delete().eq('id', id)
      .select('id, photo_path').abortSignal(AbortSignal.timeout(15000)).maybeSingle();
    if (error) return { error: 'The testimonial could not be deleted. Please try again.' };
    if (!data) return { error: 'This testimonial no longer exists. Refresh the list.' };
    await removeOwnedPhoto(data.photo_path);
  } catch {
    return { error: 'Deleting was interrupted. Refresh the list before retrying.' };
  }
  revalidatePath('/speaking');
  revalidatePath('/dashboard/speaking/testimonials');
  return {};
}
