import { Suspense } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Quote, UserRound } from 'lucide-react';
import { getAdminTestimonials } from '@/lib/testimonials-server';
import { StorageNotice } from './_components/StorageNotice';
import { DeleteTestimonialButton } from './_components/DeleteTestimonialButton';

export const dynamic = 'force-dynamic';

async function TestimonialsList({ searchParams }: { searchParams: Promise<{ flash?: string }> }) {
  const [{ flash }, result] = await Promise.all([searchParams, getAdminTestimonials()]);
  return (
    <>
      {(flash === 'created' || flash === 'updated') && <p role="status" className="mb-6 border border-green-200 bg-green-50 p-4 text-sm text-green-800">Testimonial {flash === 'created' ? 'created' : 'updated'} successfully.</p>}
      {result.error && <StorageNotice message={result.error} setupRequired={result.setupRequired} />}
      {result.items.length === 0 ? (
        <div className="border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <Quote className="mx-auto mb-4 size-8 text-brand-pink" strokeWidth={1.75} aria-hidden="true" />
          <h2 className="mb-2 text-xl text-brand-navy">No testimonials added yet</h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-500">The Speaking &amp; Media page currently shows clearly labelled temporary samples. Add an approved testimonial and publish it to replace those samples.</p>
          <Link href="/dashboard/speaking/testimonials/new" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline underline-offset-4">Add your first testimonial</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {result.items.map(item => (
            <article key={item.id} className="min-w-0 border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                {item.photo_url ? <img src={item.photo_url} alt={item.name} className="size-12 shrink-0 rounded-full object-cover" />
                  : <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-soft-pink text-brand-pink"><UserRound className="size-5" strokeWidth={1.75} aria-hidden="true" /></div>}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="break-words text-xl font-semibold text-brand-navy">{item.name}</h2>
                    <span className={`px-2.5 py-1 text-xs font-semibold ${item.is_published ? 'bg-green-50 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{item.is_published ? 'Published' : 'Draft'}</span>
                  </div>
                  <p className="mt-1 break-words text-xs text-gray-500">{[item.role, item.organization].filter(Boolean).join(', ')}</p>
                  <blockquote className="mt-4 line-clamp-3 break-words text-sm leading-relaxed text-gray-700">&ldquo;{item.quote}&rdquo;</blockquote>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-start justify-between gap-3 border-t border-gray-100 pt-4">
                <span className="pt-2 text-xs text-gray-500">Display order: {item.sort_order}</span>
                <div className="flex flex-wrap items-start gap-2">
                  <Link href={`/dashboard/speaking/testimonials/${item.id}/edit`} className="inline-flex items-center gap-2 border border-brand-navy/20 px-3 py-2 text-xs font-semibold text-brand-navy hover:bg-brand-soft-blue"><Pencil className="size-3.5" strokeWidth={1.75} aria-hidden="true" /> Edit</Link>
                  <DeleteTestimonialButton id={item.id} name={item.name} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default function TestimonialsDashboardPage({ searchParams }: { searchParams: Promise<{ flash?: string }> }) {
  return (
    <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-semibold text-brand-navy"><Quote className="size-5 shrink-0 text-brand-pink" strokeWidth={1.75} aria-hidden="true" /> Testimonials</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">Manage quotes, names, roles, photos and display order. Only published testimonials appear on the Speaking &amp; Media page.</p>
          <Link href="/speaking#testimonials" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold text-brand-navy underline underline-offset-4">View public section</Link>
        </div>
        <Link href="/dashboard/speaking/testimonials/new" className="inline-flex items-center gap-2 bg-brand-navy px-4 py-3 text-sm font-semibold text-white"><Plus className="size-4" strokeWidth={1.75} aria-hidden="true" /> Add testimonial</Link>
      </div>
      <Suspense fallback={<p role="status" className="border border-gray-100 bg-white p-8 text-sm text-gray-500">Loading testimonials…</p>}>
        <TestimonialsList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
