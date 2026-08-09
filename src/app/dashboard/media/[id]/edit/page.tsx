import { notFound } from 'next/navigation';
import { createAnonServerClient } from '@/lib/supabase/server';
import EditMediaForm from './EditMediaForm';
import type { MediaItem } from '@/lib/supabase/types';

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAnonServerClient();
  const { data } = await supabase.from('media_gallery').select('*').eq('id', id).single();

  if (!data) notFound();

  return <EditMediaForm item={data as MediaItem} />;
}
