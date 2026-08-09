'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { updateBook } from '@/app/actions/books';
import { FormField, inputClass, textareaClass } from '../../../_components/FormField';
import type { Book } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

export default function EditBookForm({ book }: { book: Book }) {
  const updateWithId = updateBook.bind(null, book.id);
  const [state, action, isPending] = useActionState<State, FormData>(
    updateWithId,
    undefined,
  );

  return (
    <main className="flex-1 px-8 py-8 max-w-2xl">
      <Link
        href="/dashboard/books"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Books
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Edit Book</h1>
      <p className="text-sm text-gray-500 mb-8">{book.title_english}</p>

      <form action={action} className="space-y-6 bg-white border border-gray-100 shadow-sm p-8" encType="multipart/form-data">
        {/* Hidden existing cover url */}
        <input type="hidden" name="existing_cover_url" value={book.cover_image_url ?? ''} />

        <FormField label="Arabic Title" name="title_arabic" required hint="Renders right-to-left.">
          <input
            id="title_arabic"
            name="title_arabic"
            type="text"
            required
            dir="rtl"
            lang="ar"
            defaultValue={book.title_arabic}
            className={`${inputClass} text-right`}
          />
        </FormField>

        <FormField label="English Title" name="title_english" required>
          <input
            id="title_english"
            name="title_english"
            type="text"
            required
            defaultValue={book.title_english}
            className={inputClass}
          />
        </FormField>

        <FormField label="Published Year" name="published_year" required>
          <input
            id="published_year"
            name="published_year"
            type="text"
            required
            defaultValue={book.published_year}
            maxLength={4}
            className={inputClass}
          />
        </FormField>

        <FormField label="Description" name="description" required>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={book.description}
            className={textareaClass}
          />
        </FormField>

        <FormField label="Cover Image" name="cover_image" hint="Upload a new image to replace the current cover (leave blank to keep existing).">
          {book.cover_image_url && (
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Current cover:</p>
              <div className="relative w-24 h-32 border border-gray-200 overflow-hidden">
                <Image
                  src={book.cover_image_url}
                  alt="Current cover"
                  fill
                  className="object-cover"
                  unoptimized={book.cover_image_url.startsWith('/')}
                />
              </div>
            </div>
          )}
          <input
            id="cover_image"
            name="cover_image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-200 file:text-xs file:font-semibold file:text-[#0B1F4D] file:bg-gray-50 hover:file:bg-gray-100 file:cursor-pointer"
          />
        </FormField>

        <FormField label="External Link" name="external_link">
          <input
            id="external_link"
            name="external_link"
            type="url"
            defaultValue={book.external_link ?? ''}
            placeholder="https://..."
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
          <Link href="/dashboard/books" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
