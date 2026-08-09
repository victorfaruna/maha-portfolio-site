import { notFound } from 'next/navigation';
import { createAnonServerClient } from '@/lib/supabase/server';
import EditPublicationForm from './EditPublicationForm';
import type { Publication } from '@/lib/supabase/types';

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAnonServerClient();
  const { data } = await supabase.from('publications').select('*').eq('id', id).single();

  if (!data) notFound();

  return <EditPublicationForm publication={data as Publication} />;
}
