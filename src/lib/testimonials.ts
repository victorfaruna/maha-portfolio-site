import type { Testimonial } from '@/data/testimonials';
import type { TestimonialRecord } from '@/lib/supabase/types';

export const MAX_TESTIMONIAL_PHOTO_BYTES = 2 * 1024 * 1024;
export const TESTIMONIAL_PHOTO_BUCKET = 'testimonial-photos';
export const TESTIMONIAL_MIGRATION = 'supabase/migrations/003_testimonials.sql';
export const TESTIMONIAL_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type TestimonialActionState = { error?: string } | undefined;

export function isTestimonialId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function parseTestimonialForm(form: FormData) {
  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };
  const quote = text('quote');
  const name = text('name');
  const role = text('role');
  const organization = text('organization');
  const order = text('sort_order') || '0';

  if (!quote || !name) return { error: 'A quote and a name are required.' } as const;
  if (quote.length > 1600) return { error: 'Keep the quote within 1,600 characters.' } as const;
  if (name.length > 120 || role.length > 160 || organization.length > 160) {
    return { error: 'Name must be at most 120 characters; role and organisation at most 160 each.' } as const;
  }
  if (!/^\d{1,4}$/.test(order)) {
    return { error: 'Display order must be a whole number between 0 and 9999.' } as const;
  }

  return {
    data: {
      quote, name, role: role || null, organization: organization || null,
      sort_order: Number(order), is_published: form.get('is_published') === 'on',
    },
  } as const;
}

export function isValidTestimonialPhoto(bytes: Uint8Array, mime: string): boolean {
  if (mime === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mime === 'image/png') {
    return [137, 80, 78, 71, 13, 10, 26, 10].every((value, index) => bytes[index] === value);
  }
  if (mime === 'image/webp') {
    return String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  }
  return false;
}

export function toPublicTestimonial(item: Pick<TestimonialRecord, 'id' | 'quote' | 'name' | 'role' | 'organization' | 'photo_url'>): Testimonial {
  return {
    id: item.id, quote: item.quote, name: item.name,
    title: [item.role, item.organization].filter(Boolean).join(', '),
    avatar: item.photo_url || undefined,
  };
}

export function testimonialStorageError(error: { code?: string } | null | undefined) {
  const setupRequired = error?.code === 'PGRST205' || error?.code === '42P01';
  return {
    setupRequired,
    error: setupRequired
      ? `Testimonials storage is not set up yet. Run ${TESTIMONIAL_MIGRATION} in the Supabase SQL Editor, then refresh this page.`
      : 'Testimonials storage is unavailable. Check the database connection and try again.',
  };
}
