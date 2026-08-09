import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';
import { createAnonServerClient } from '@/lib/supabase/server';
import { DashboardTable, type ColumnDef, type RowDef } from '../_components/DashboardTable';
import { deleteBook } from '@/app/actions/books';
import type { Book } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getData() {
  const supabase = createAnonServerClient();
  const { data } = await supabase
    .from('books')
    .select('*')
    .order('published_year', { ascending: false });
  return (data ?? []) as Book[];
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string }>;
}) {
  const { flash } = await searchParams;
  const books = await getData();

  const columns: ColumnDef[] = [
    { header: 'English Title' },
    { header: 'Arabic Title' },
    { header: 'Year' },
  ];

  const rows: RowDef[] = books.map((b) => ({
    id: b.id,
    cells: [
      <span key="en" className="font-medium">{b.title_english}</span>,
      <span key="ar" dir="rtl" lang="ar">{b.title_arabic}</span>,
      b.published_year,
    ],
  }));

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#0B1F4D]" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Books</h1>
          </div>
          <p className="text-sm text-gray-500">
            Manage published books featured on the Research &amp; Publications page.
          </p>
        </div>
        <Link
          href="/dashboard/books/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New
        </Link>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-sm text-green-700">
          {flash === 'created' ? '✓ Book added successfully.' : '✓ Book updated successfully.'}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <DashboardTable
          columns={columns}
          rows={rows}
          editBasePath="/dashboard/books"
          onDelete={deleteBook}
          emptyMessage="No books added yet. Click 'Add New' to add one."
        />
      </div>
    </main>
  );
}
