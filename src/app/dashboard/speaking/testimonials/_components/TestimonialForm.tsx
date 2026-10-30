'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Quote, Upload } from 'lucide-react';
import { saveTestimonial } from '@/app/actions/testimonials';
import { MAX_TESTIMONIAL_PHOTO_BYTES, TESTIMONIAL_PHOTO_TYPES } from '@/lib/testimonials';
import type { TestimonialRecord } from '@/lib/supabase/types';
import { StorageNotice } from './StorageNotice';

const inputClass = 'w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-brand-navy focus:outline-none';
const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700';

export function TestimonialForm({ item, storageError, setupRequired }: {
  item?: TestimonialRecord; storageError?: string; setupRequired?: boolean;
}) {
  const [state, action, pending] = useActionState(saveTestimonial.bind(null, item?.id || null), undefined);
  const [quote, setQuote] = useState(item?.quote || '');
  const [name, setName] = useState(item?.name || '');
  const [role, setRole] = useState(item?.role || '');
  const [organization, setOrganization] = useState(item?.organization || '');
  const [published, setPublished] = useState(item?.is_published || false);
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [removePhoto, setRemovePhoto] = useState(false);

  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);
  const image = photoPreview || (!removePhoto ? item?.photo_url : null);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
      <Link href="/dashboard/speaking/testimonials" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-brand-navy">
        <ArrowLeft className="size-4" strokeWidth={1.75} /> Back to testimonials
      </Link>
      <h1 className="mb-2 text-2xl font-semibold text-brand-navy">{item ? 'Edit testimonial' : 'Add testimonial'}</h1>
      <p className="mb-6 text-sm text-gray-500">Save as a draft, or publish an approved testimonial to the Speaking &amp; Media page.</p>
      {storageError && <StorageNotice message={storageError} setupRequired={setupRequired} />}
      {state?.error && <p role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{state.error}</p>}

      <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
        <form action={action} className="border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <fieldset disabled={pending} className="space-y-5">
            <div>
              <label htmlFor="testimonial-quote" className={labelClass}>Testimonial quote *</label>
              <textarea id="testimonial-quote" name="quote" required maxLength={1600} rows={6}
                value={quote} onChange={event => setQuote(event.target.value)}
                placeholder="Paste the person's approved testimonial here."
                aria-describedby="quote-length" className={inputClass} />
              <p id="quote-length" className="mt-1 text-right text-xs text-gray-400">{quote.length} / 1600</p>
            </div>
            <div>
              <label htmlFor="testimonial-name" className={labelClass}>Person&apos;s name *</label>
              <input id="testimonial-name" name="name" required maxLength={120} value={name}
                onChange={event => setName(event.target.value)} className={inputClass} autoComplete="off" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="testimonial-role" className={labelClass}>Role / job title</label>
                <input id="testimonial-role" name="role" maxLength={160} value={role}
                  onChange={event => setRole(event.target.value)} className={inputClass} placeholder="Conference organiser" />
              </div>
              <div>
                <label htmlFor="testimonial-organization" className={labelClass}>Organisation / event</label>
                <input id="testimonial-organization" name="organization" maxLength={160} value={organization}
                  onChange={event => setOrganization(event.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="testimonial-photo" className={labelClass}>Portrait photo (optional)</label>
              <div className="flex items-center gap-3 border border-dashed border-gray-300 p-4">
                <Upload className="size-5 shrink-0 text-brand-pink" strokeWidth={1.75} aria-hidden="true" />
                <input id="testimonial-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"
                  aria-describedby="photo-help" className="min-w-0 w-full text-xs text-gray-600"
                  onChange={event => {
                    const file = event.target.files?.[0];
                    setPhotoError('');
                    if (!file) { setPhotoPreview(''); return; }
                    if (file.size > MAX_TESTIMONIAL_PHOTO_BYTES || !TESTIMONIAL_PHOTO_TYPES.some(type => type === file.type)) {
                      setPhotoError('Choose a JPG, PNG or WebP image, no larger than 2 MB.');
                      event.target.value = ''; setPhotoPreview(''); return;
                    }
                    setPhotoPreview(URL.createObjectURL(file));
                  }} />
              </div>
              <p id="photo-help" className="mt-2 text-xs leading-relaxed text-gray-500">JPG, PNG or WebP, up to 2 MB. Photos use public storage; only upload images you have permission to share.</p>
              {photoError && <p role="alert" className="mt-2 text-xs text-red-700">{photoError}</p>}
              {item?.photo_url && <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <input name="remove_photo" type="checkbox" checked={removePhoto} onChange={event => setRemovePhoto(event.target.checked)} /> Remove existing photo
              </label>}
            </div>
            <div>
              <label htmlFor="testimonial-order" className={labelClass}>Display order</label>
              <input id="testimonial-order" name="sort_order" type="number" min={0} max={9999} step={1}
                defaultValue={item?.sort_order || 0} className={inputClass + ' max-w-32'} />
              <p className="mt-1 text-xs text-gray-500">Lower numbers appear first. Entries with the same number appear oldest first.</p>
            </div>
            <label className="flex items-start gap-3 border-t border-gray-100 pt-5 text-sm text-gray-700">
              <input name="is_published" type="checkbox" checked={published} onChange={event => setPublished(event.target.checked)} className="mt-1" />
              <span><span className="block font-semibold text-brand-navy">Publish on the website</span>
                <span className="mt-1 block text-xs leading-relaxed text-gray-500">Leave unchecked to save a private draft. Only publish genuine feedback you have permission to share.</span>
              </span>
            </label>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="submit" disabled={pending || Boolean(storageError) || Boolean(photoError)}
                className="bg-brand-navy px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                {pending ? 'Saving…' : published ? 'Save & publish' : 'Save draft'}
              </button>
              <Link href="/dashboard/speaking/testimonials" className="text-sm text-gray-500 underline-offset-4 hover:underline">Cancel</Link>
            </div>
          </fieldset>
        </form>

        <aside className="min-w-0 lg:sticky lg:top-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Live preview — not saved yet</p>
          <figure className="rounded-3xl border border-border bg-white p-7 text-center shadow-sm">
            <Quote className="mx-auto mb-6 size-10 text-brand-pink/25" strokeWidth={1.75} aria-hidden="true" />
            <blockquote className="mb-7 break-words font-serif text-xl italic leading-relaxed text-brand-navy">
              &ldquo;{quote || 'Your testimonial quote will appear here.'}&rdquo;
            </blockquote>
            <figcaption>
              {image && <img src={image} alt="Portrait preview" className="mx-auto mb-3 size-14 rounded-full object-cover" />}
              <p className="break-words text-sm font-bold text-brand-navy">{name || 'Person’s name'}</p>
              <p className="mt-1 break-words text-xs text-gray-500">{[role, organization].filter(Boolean).join(', ') || 'Role / organisation'}</p>
            </figcaption>
          </figure>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">The temporary samples disappear automatically when the first testimonial is published. Drafts do not appear on the public page.</p>
        </aside>
      </div>
    </main>
  );
}
