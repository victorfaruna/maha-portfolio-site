'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { updatePublication, savePublicationDraft } from '@/app/actions/publications';
import { FormField, inputClass, textareaClass } from '../../../_components/FormField';
import { RichTextEditor } from '../../../_components/RichTextEditor';
import { slugify } from '@/lib/slug';
import type { Publication } from '@/lib/supabase/types';

type State = { error?: string } | undefined;

const CATEGORIES = ['Policy Brief', 'Academic Paper', 'Article'];

export default function EditPublicationForm({ publication }: { publication: Publication }) {
  const updateWithId = updatePublication.bind(null, publication.id);
  const [state, action, isPending] = useActionState<State, FormData>(
    updateWithId,
    undefined,
  );

  const [title, setTitle] = useState(publication.title);
  const [slug, setSlug] = useState(publication.slug || slugify(publication.title));
  const [contentJson, setContentJson] = useState<any>(publication.content);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!publication.slug) {
      setSlug(slugify(newTitle));
    }
  };

  const handleAutoSave = async (json: any) => {
    await savePublicationDraft(publication.id, json);
  };

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-4xl">
      <Link
        href="/dashboard/publications"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Publications
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Edit Publication Article</h1>
      <p className="text-sm text-gray-500 mb-8 line-clamp-1 max-w-lg">{publication.title}</p>

      <form action={action} className="space-y-6 bg-white border border-gray-100 shadow-sm p-8">
        {/* Hidden Content Field */}
        <input
          type="hidden"
          name="content"
          value={contentJson ? JSON.stringify(contentJson) : ''}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Title" name="title" required>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              className={inputClass}
            />
          </FormField>

          <FormField
            label="URL Slug"
            name="slug"
            hint="URL identifier for /research/[slug]"
          >
            <input
              id="slug"
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="Category" name="category" required>
            <select id="category" name="category" required className={inputClass} defaultValue={publication.category}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Source / Publisher Label" name="source_label">
            <input
              id="source_label"
              name="source_label"
              type="text"
              defaultValue={publication.source_label ?? ''}
              className={inputClass}
            />
          </FormField>

          <FormField label="Year" name="year" required>
            <input
              id="year"
              name="year"
              type="text"
              required
              defaultValue={publication.year}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Excerpt" name="excerpt" required hint="Short description shown on the research page card.">
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            defaultValue={publication.excerpt}
            className={textareaClass}
          />
        </FormField>

        {/* Rich Text Editor */}
        <FormField
          label="Article Body Content"
          name="content_editor"
          hint="Edit the article body content using the editor below. Drafts automatically save periodically."
        >
          <RichTextEditor
            initialValue={publication.content}
            onChange={(json) => setContentJson(json)}
            onAutoSave={handleAutoSave}
            placeholder="Write the full publication content here…"
          />
        </FormField>

        <FormField
          label="Custom Cover Image URL (Optional)"
          name="cover_image_url"
          hint="Optional custom cover image URL. If left empty, it automatically uses the first image inserted in the article content above."
        >
          <input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            defaultValue={publication.cover_image_url ?? ''}
            placeholder="https://..."
            className={inputClass}
          />
        </FormField>

        <FormField label="Original Source / External Link (Optional)" name="link">
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={publication.link ?? ''}
            placeholder="https://..."
            className={inputClass}
          />
        </FormField>

        {state?.error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-[#0B1F4D] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Changes'}
          </button>
          <Link href="/dashboard/publications" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
