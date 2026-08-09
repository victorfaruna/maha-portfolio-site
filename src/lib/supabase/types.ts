// Database types matching Supabase table schemas

export type Publication = {
  id: string;
  title: string;
  slug: string | null;
  category: string; // 'Policy Brief' | 'Academic Paper' | 'Article'
  excerpt: string;
  source_label: string | null;
  year: string;
  link: string | null;
  content: any | null; // Tiptap JSON content object
  created_at: string;
  updated_at: string;
};

export type Book = {
  id: string;
  title_arabic: string;
  title_english: string;
  published_year: string;
  description: string;
  cover_image_url: string | null;
  external_link: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaItem = {
  id: string;
  image_url: string;
  category_tag: string | null;
  title: string | null;
  context_note: string | null;
  year: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// Insert types (omit auto-generated fields)
export type PublicationInsert = Omit<Publication, 'id' | 'created_at' | 'updated_at'>;
export type BookInsert = Omit<Book, 'id' | 'created_at' | 'updated_at'>;
export type MediaItemInsert = Omit<MediaItem, 'id' | 'created_at' | 'updated_at'>;
