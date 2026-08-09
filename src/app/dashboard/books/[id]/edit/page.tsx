import { notFound } from 'next/navigation';
import { createAnonServerClient } from '@/lib/supabase/server';
import EditBookForm from './EditBookForm';
import type { Book } from '@/lib/supabase/types';

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAnonServerClient();
  const { data } = await supabase.from('books').select('*').eq('id', id).single();

  if (!data) notFound();

  return <EditBookForm book={data as Book} />;
}
