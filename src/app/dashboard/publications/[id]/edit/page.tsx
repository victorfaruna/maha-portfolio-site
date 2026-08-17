import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import EditPublicationForm from './EditPublicationForm';
import type { Publication } from '@/lib/supabase/types';

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) notFound();

  return <EditPublicationForm publication={data as Publication} />;
}
