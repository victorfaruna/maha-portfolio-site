'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, AlertCircle, Video } from 'lucide-react';
import { createSpeakingItem, updateSpeakingItem } from '@/app/actions/speaking';
import type { SpeakingItem } from '@/lib/supabase/types';

const MAX_DESCRIPTION_LENGTH = 120;

interface VideoFormProps {
  item?: SpeakingItem;
}

export function VideoForm({ item }: VideoFormProps) {
  const isEditing = Boolean(item && item.id && !item.id.startsWith('static-'));

  const actionFn = isEditing
    ? updateSpeakingItem.bind(null, item!.id, 'video')
    : createSpeakingItem.bind(null, 'video');

  const [state, formAction, pending] = useActionState(actionFn, undefined);

  // Form input states for live preview & character counter
  const [videoInput, setVideoInput] = useState(item?.video_id ? `https://www.youtube.com/watch?v=${item.video_id}` : '');
  const [description, setDescription] = useState(item?.description || '');
  const [title, setTitle] = useState(item?.title || '');
  const [outlet, setOutlet] = useState(item?.outlet || '');

  // Extract video ID for live preview
  function extractId(urlOrId: string): string | null {
    const trimmed = urlOrId.trim();
    if (!trimmed) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const match = trimmed.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const extractedId = extractId(videoInput);
  const descCount = description.length;
  const isOverLimit = descCount > MAX_DESCRIPTION_LENGTH;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
      {/* Back button */}
      <Link
        href="/dashboard/speaking/videos"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Videos
      </Link>

      <div className="bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center text-[#EC4899]">
            <Play className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Edit Watch & Listen Video' : 'Add New Watch & Listen Video'}
            </h1>
            <p className="text-xs text-gray-500">
              Configure video details for the 3-column video section on the /speaking page.
            </p>
          </div>
        </div>

        {/* Error alert */}
        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {item?.video_id && <input type="hidden" name="existing_video_id" value={item.video_id} />}

          {/* YouTube URL input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              YouTube Video URL or Video ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="video_input"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=PmxVEMKEm16vQY85 or PmxVEMKEm16vQY85"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D] pr-10"
              />
              <Video className="w-5 h-5 text-[#EC4899] absolute right-3 top-2.5 pointer-events-none" />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Paste the full YouTube URL or just the 11-character video ID.
            </p>

            {/* Live YouTube Preview */}
            {extractedId && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded flex items-center gap-4">
                <div className="relative w-24 h-14 bg-black rounded overflow-hidden shrink-0">
                  <img
                    src={`https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <div className="text-xs">
                  <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 font-mono font-medium rounded text-[10px] mb-1">
                    ✓ Valid Video ID: {extractedId}
                  </span>
                  <p className="text-gray-500">Thumbnail extracted from YouTube automatically.</p>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Building an AI-Powered Africa, by Africans for Africans"
              required
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
            />
          </div>

          {/* Outlet & Year (2-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Outlet / Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="outlet"
                value={outlet}
                onChange={(e) => setOutlet(e.target.value)}
                placeholder="e.g. ITWeb TV, CNN Africa"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Year (Optional)
              </label>
              <input
                type="text"
                name="year"
                defaultValue={item?.year || ''}
                placeholder="e.g. 2024"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
              />
            </div>
          </div>

          {/* Description with Character Counter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Short Description
              </label>
              <span
                className={`text-xs font-mono font-medium ${
                  isOverLimit ? 'text-red-600 font-bold' : descCount > 100 ? 'text-amber-600' : 'text-gray-400'
                }`}
              >
                {descCount} / {MAX_DESCRIPTION_LENGTH} chars max
              </span>
            </div>
            <textarea
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="In-depth interview on shaping sovereign AI infrastructure, local talent development, and responsible governance."
              className={`w-full px-3.5 py-2.5 text-sm border ${
                isOverLimit ? 'border-red-500 focus:border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-[#0B1F4D]'
              } focus:outline-none`}
            />
            {isOverLimit ? (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Description exceeds recommended length limit. Truncate text so card layout fits cleanly.
              </p>
            ) : (
              <p className="text-[11px] text-gray-400 mt-1">
                Keep description concise so all 3 video cards maintain uniform height on the public site.
              </p>
            )}
          </div>

          {/* External Link (Optional override) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Full Video Link (Optional)
            </label>
            <input
              type="text"
              name="link"
              defaultValue={item?.link || ''}
              placeholder="e.g. https://www.itweb.co.za/article/..."
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              If left empty, YouTube URL will be used automatically.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              href="/dashboard/speaking/videos"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors disabled:opacity-50"
            >
              {pending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Video Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
