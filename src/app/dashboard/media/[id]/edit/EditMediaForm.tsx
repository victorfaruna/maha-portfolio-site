'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { updateMediaItem } from '@/app/actions/media';
import { FormField, inputClass, textareaClass } from '../../../_components/FormField';
import type { MediaItem } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

export default function EditMediaForm({ item }: { item: MediaItem }) {
  const updateWithId = updateMediaItem.bind(null, item.id);
  const [state, action, isPending] = useActionState<State, FormData>(
    updateWithId,
    undefined,
  );

  return (
    <main className="flex-1 px-8 py-8 max-w-2xl">
      <Link
        href="/dashboard/media"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Media Gallery
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Edit Gallery Image</h1>
      <p className="text-sm text-gray-500 mb-8 line-clamp-1">{item.title ?? 'Untitled'}</p>

      <form action={action} className="space-y-6 bg-white border border-gray-100 shadow-sm p-8" encType="multipart/form-data">
        <input type="hidden" name="existing_image_url" value={item.image_url} />

        <FormField label="Image" name="image" hint="Upload a new image to replace the current one (leave blank to keep existing).">
          {item.image_url && (
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Current image:</p>
              <div className="relative w-36 h-24 border border-gray-200 overflow-hidden">
                <Image
                  src={item.image_url}
                  alt="Current gallery image"
                  fill
                  className="object-cover"
                  unoptimized={item.image_url.startsWith('/')}
                />
              </div>
            </div>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-200 file:text-xs file:font-semibold file:text-[#0B1F4D] file:bg-gray-50 hover:file:bg-gray-100 file:cursor-pointer"
          />
        </FormField>

        <FormField label="Title" name="title">
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={item.title ?? ''}
            placeholder="e.g. Keynote at African Union AI Summit"
            className={inputClass}
          />
        </FormField>

        <FormField label="Category Tag" name="category_tag">
          <input
            id="category_tag"
            name="category_tag"
            type="text"
            defaultValue={item.category_tag ?? ''}
            placeholder="Community Workshop"
            className={inputClass}
          />
        </FormField>

        <FormField label="Context Note" name="context_note" hint="Descriptive paragraph shown next to the image in the carousel.">
          <textarea
            id="context_note"
            name="context_note"
            rows={4}
            defaultValue={item.context_note ?? ''}
            className={textareaClass}
          />
        </FormField>

        <FormField label="Year" name="year">
          <input
            id="year"
            name="year"
            type="text"
            defaultValue={item.year ?? ''}
            placeholder="2024"
            maxLength={4}
            className={inputClass}
          />
        </FormField>

        <FormField label="Sort Order" name="sort_order" hint="Lower numbers appear first in the carousel.">
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={item.sort_order}
            min={0}
            className={inputClass}
          />
        </FormField>

        {state?.error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-[#0B1F4D] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Changes'}
          </button>
          <Link href="/dashboard/media" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
