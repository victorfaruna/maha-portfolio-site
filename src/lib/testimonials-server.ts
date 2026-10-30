import 'server-only';

import { createAnonServerClient, createServerClient } from '@/lib/supabase/server';
import { requireAdminSession } from '@/lib/admin-session';
import { testimonialStorageError, toPublicTestimonial } from '@/lib/testimonials';
import type { Testimonial } from '@/data/testimonials';
import type { TestimonialRecord } from '@/lib/supabase/types';

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await createAnonServerClient().from('testimonials')
      .select('id, quote, name, role, organization, photo_url')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
      .abortSignal(AbortSignal.timeout(6000));
    if (error) return [];
    return (data || []).map(toPublicTestimonial);
  } catch {
    return [];
  }
}

export async function getAdminTestimonials(id?: string): Promise<{
  items: TestimonialRecord[]; error?: string; setupRequired?: boolean;
}> {
  await requireAdminSession();
  try {
    let query = createServerClient().from('testimonials').select('*')
      .order('sort_order', { ascending: true }).order('created_at', { ascending: true });
    if (id) query = query.eq('id', id);
    const { data, error } = await query.abortSignal(AbortSignal.timeout(8000));
    if (error) return { items: [], ...testimonialStorageError(error) };
    return { items: (data || []) as TestimonialRecord[] };
  } catch {
    return { items: [], ...testimonialStorageError(null) };
  }
}
