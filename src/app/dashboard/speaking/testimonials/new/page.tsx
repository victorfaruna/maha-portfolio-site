import { getAdminTestimonials } from '@/lib/testimonials-server';
import { TestimonialForm } from '../_components/TestimonialForm';

export const dynamic = 'force-dynamic';

export default async function NewTestimonialPage() {
  const result = await getAdminTestimonials();
  return <TestimonialForm storageError={result.error} setupRequired={result.setupRequired} />;
}
