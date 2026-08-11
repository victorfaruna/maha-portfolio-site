'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createMediaItem } from '@/app/actions/media';
import { FormField, inputClass, textareaClass } from '../../_components/FormField';

type State = { error?: string } | undefined;

export default function NewMediaPage() {
  const [state, action, isPending] = useActionState<State, FormData>(
    createMediaItem,
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

      <h1 className="text-2xl font-semibold text-gray-900 mb-1">New Gallery Image</h1>
      <p className="text-sm text-gray-500 mb-8">Add a new image to the Research &amp; Events photo carousel.</p>

      <form action={action} className="space-y-6 bg-white border border-gray-100 shadow-sm p-8" encType="multipart/form-data">
        <FormField
          label="Image File"
          name="image"
          hint="Upload the gallery image (JPG, PNG, WebP). Recommended: 16:10 aspect ratio."
        >
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-200 file:text-xs file:font-semibold file:text-[#0B1F4D] file:bg-gray-50 hover:file:bg-gray-100 file:cursor-pointer"
          />
        </FormField>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="shrink mx-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <FormField label="Image URL" name="image_url" hint="Or paste a direct web link to an image (e.g. https://... or /images/...)">
          <input
            id="image_url"
            name="image_url"
            type="text"
            placeholder="https://example.com/photo.jpg"
            className={inputClass}
          />
        </FormField>

        <FormField label="Title" name="title" hint="Short descriptive title shown in the carousel.">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Keynote at African Union AI Summit"
            className={inputClass}
          />
        </FormField>

        <FormField label="Category Tag" name="category_tag" hint="e.g. Keynote Address, Community Workshop, Policy Panel">
          <input
            id="category_tag"
            name="category_tag"
            type="text"
            placeholder="Community Workshop"
            className={inputClass}
          />
        </FormField>

        <FormField
          label="Context Note"
          name="context_note"
          hint="The descriptive paragraph shown next to the image in the carousel."
        >
          <textarea
            id="context_note"
            name="context_note"
            rows={4}
            placeholder="Describe what's happening in this image…"
            className={textareaClass}
          />
        </FormField>

        <FormField label="Year" name="year">
          <input
            id="year"
            name="year"
            type="text"
            placeholder="2024"
            maxLength={4}
            className={inputClass}
          />
        </FormField>

        <FormField label="Sort Order" name="sort_order" hint="Lower numbers appear first in the carousel (e.g. 1, 2, 3…).">
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            placeholder="1"
            defaultValue={0}
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
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Image'}
          </button>
          <Link href="/dashboard/media" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
