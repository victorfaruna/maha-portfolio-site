'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Newspaper, AlertCircle, Upload, Globe } from 'lucide-react';
import { createSpeakingItem, updateSpeakingItem } from '@/app/actions/speaking';
import type { SpeakingItem, SpeakingItemInsert } from '@/lib/supabase/types';

const MAX_DESCRIPTION_LENGTH = 180;

const CATEGORIES: SpeakingItemInsert['category'][] = [
  'Keynote & Talk',
  'Press Feature',
  'Podcast & Broadcast',
  'Arabic Media',
];

interface PressFormProps {
  item?: SpeakingItem;
}

export function PressForm({ item }: PressFormProps) {
  const isEditing = Boolean(item && item.id && !item.id.startsWith('static-'));

  const actionFn = isEditing
    ? updateSpeakingItem.bind(null, item!.id, 'press')
    : createSpeakingItem.bind(null, 'press');

  const [state, formAction, pending] = useActionState(actionFn, undefined);

  // Form input states for live preview & character counter
  const [category, setCategory] = useState<SpeakingItemInsert['category']>(item?.category || 'Press Feature');
  const [title, setTitle] = useState(item?.title || '');
  const [outlet, setOutlet] = useState(item?.outlet || '');
  const [description, setDescription] = useState(item?.description || '');
  const [link, setLink] = useState(item?.link || '');
  const [ogImage, setOgImage] = useState(item?.og_image || '');
  const [isRTL, setIsRTL] = useState(item?.is_rtl || false);

  const descCount = description.length;
  const isOverLimit = descCount > MAX_DESCRIPTION_LENGTH;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
      {/* Back button */}
      <Link
        href="/dashboard/speaking/press"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Press &amp; Media Archive
      </Link>

      <div className="bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center text-[#EC4899]">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Edit Press Feature' : 'Add New Press Feature'}
            </h1>
            <p className="text-xs text-gray-500">
              Select category to automatically place item in the corresponding carousel row on /speaking.
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
          {item?.og_image && <input type="hidden" name="existing_og_image" value={item.og_image} />}
          {item?.video_id && <input type="hidden" name="existing_video_id" value={item.video_id} />}

          {/* 1. Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Category Row Assignment <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as SpeakingItemInsert['category'])}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D] bg-white font-medium text-gray-900"
            >
              <option value="Press Feature">Press Feature (Pertains to PRESS FEATURES row)</option>
              <option value="Keynote & Talk">Keynote &amp; Talk (Pertains to KEYNOTES &amp; TALKS row)</option>
              <option value="Podcast & Broadcast">Podcast &amp; Broadcast (Pertains to PODCASTS &amp; BROADCASTS row)</option>
              <option value="Arabic Media">Arabic Media (Pertains to ARABIC MEDIA row)</option>
            </select>
            <p className="text-[11px] text-[#EC4899] font-medium mt-1">
              ✓ Selecting &quot;{category}&quot; routes this item directly to the matching {category.toUpperCase()} row on the /speaking page.
            </p>
          </div>

          {/* 2. Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Article / Feature Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Maha Jouini: Pioneering AI and Digital Tech for Underprivileged Women"
              dir={isRTL ? 'rtl' : 'ltr'}
              required
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
            />
          </div>

          {/* 3. Outlet & Year (2-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Outlet / Publication Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="outlet"
                value={outlet}
                onChange={(e) => setOutlet(e.target.value)}
                placeholder="e.g. CIO Views Magazine, Women in AI Ethics"
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

          {/* 4. Article Link URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Article Link / Read Feature URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://medium.com/women-in-ai-ethics/..."
              required
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
            />
          </div>

          {/* 5. Media Image (File upload + direct URL) */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Feature Thumbnail Image
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[11px] text-gray-500 mb-1">Option A: Upload Image File</span>
                <label className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 hover:border-[#0B1F4D] cursor-pointer bg-slate-50 text-xs font-medium text-gray-700">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span>Choose file...</span>
                  <input type="file" name="media_file" accept="image/*" className="hidden" />
                </label>
              </div>

              <div>
                <span className="block text-[11px] text-gray-500 mb-1">Option B: Direct Image URL</span>
                <input
                  type="text"
                  name="og_image"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://... image URL"
                  className="w-full px-3 py-2 text-xs border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
                />
              </div>
            </div>

            {/* Image Preview */}
            {ogImage && (
              <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded flex items-center gap-3">
                <img src={ogImage} alt="Preview" className="w-16 h-10 object-cover rounded shrink-0" />
                <span className="text-[11px] text-gray-500 truncate">Image preview linked</span>
              </div>
            )}
          </div>

          {/* 6. Optional YouTube Video URL / Video ID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              YouTube Video URL / Video ID (Optional for Video Media)
            </label>
            <input
              type="text"
              name="video_input"
              defaultValue={item?.video_id ? `https://www.youtube.com/watch?v=${item.video_id}` : ''}
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#0B1F4D]"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              If provided, clicking the card will open a video player modal instead of an external link.
            </p>
          </div>

          {/* 7. Description with Character Counter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Short Description / Excerpt
              </label>
              <span
                className={`text-xs font-mono font-medium ${
                  isOverLimit ? 'text-red-600 font-bold' : descCount > 150 ? 'text-amber-600' : 'text-gray-400'
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
              placeholder="Cover story and profile on empowering women through human-centered tech initiatives and culturally grounded AI governance."
              dir={isRTL ? 'rtl' : 'ltr'}
              className={`w-full px-3.5 py-2.5 text-sm border ${
                isOverLimit ? 'border-red-500 focus:border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-[#0B1F4D]'
              } focus:outline-none`}
            />
            {isOverLimit ? (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Description exceeds recommended length limit. Keep within 180 characters so the featured carousel card maintains consistent height.
              </p>
            ) : (
              <p className="text-[11px] text-gray-400 mt-1">
                This excerpt is displayed on the featured (leftmost) card in the 4-slot rotating carousel.
              </p>
            )}
          </div>

          {/* 8. RTL / Arabic Toggle */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-xs font-semibold text-gray-900 block">Is Arabic / RTL Text?</span>
                <span className="text-[11px] text-gray-500 block">Enable right-to-left layout formatting for Arabic titles &amp; excerpts.</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_rtl"
                checked={isRTL}
                onChange={(e) => setIsRTL(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              href="/dashboard/speaking/press"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors disabled:opacity-50"
            >
              {pending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Press Feature'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
