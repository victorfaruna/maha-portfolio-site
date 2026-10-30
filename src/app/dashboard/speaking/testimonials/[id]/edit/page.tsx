import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminTestimonials } from '@/lib/testimonials-server';
import { isTestimonialId } from '@/lib/testimonials';
import { StorageNotice } from '../../_components/StorageNotice';
import { TestimonialForm } from '../../_components/TestimonialForm';

export const dynamic = 'force-dynamic';

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isTestimonialId(id)) notFound();
  const result = await getAdminTestimonials(id);
  if (result.error) return <main className="p-8"><Link href="/dashboard/speaking/testimonials" className="mb-6 inline-block text-sm underline">Back to testimonials</Link><StorageNotice message={result.error} setupRequired={result.setupRequired} /></main>;
  const item = result.items[0];
  if (!item) notFound();
  return <TestimonialForm item={item} />;
}
