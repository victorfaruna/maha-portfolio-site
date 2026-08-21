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
  cover_image_url?: string | null;
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

export type SpeakingItem = {
  id: string;
  section_type: 'video' | 'press';
  category: 'Keynote & Talk' | 'Press Feature' | 'Podcast & Broadcast' | 'Arabic Media';
  title: string;
  outlet: string;
  description: string | null;
  link: string;
  video_id: string | null;
  og_image: string | null;
  is_rtl: boolean;
  year: string | null;
  created_at: string;
  updated_at: string;
};

// Insert types (omit auto-generated fields)
export type PublicationInsert = Omit<Publication, 'id' | 'created_at' | 'updated_at'>;
export type BookInsert = Omit<Book, 'id' | 'created_at' | 'updated_at'>;
export type MediaItemInsert = Omit<MediaItem, 'id' | 'created_at' | 'updated_at'>;
export type SpeakingItemInsert = Omit<SpeakingItem, 'id' | 'created_at' | 'updated_at'>;
