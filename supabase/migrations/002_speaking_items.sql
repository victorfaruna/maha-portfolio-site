-- ============================================================
-- Maha Portfolio CMS — Speaking & Media Schema Migration
-- Run this in your Supabase project: SQL Editor → New Query
-- ============================================================

CREATE TABLE IF NOT EXISTS public.speaking_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type  TEXT NOT NULL DEFAULT 'press', -- 'video' | 'press'
  category      TEXT NOT NULL,                 -- 'Keynote & Talk' | 'Press Feature' | 'Podcast & Broadcast' | 'Arabic Media'
  title         TEXT NOT NULL,
  outlet        TEXT NOT NULL,
  description   TEXT,
  link          TEXT NOT NULL,
  video_id      TEXT,
  og_image      TEXT,
  is_rtl        BOOLEAN DEFAULT false,
  year          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS & allow public select
ALTER TABLE public.speaking_items ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'speaking_items'
      AND policyname = 'speaking_items_public_select'
  ) THEN
    CREATE POLICY "speaking_items_public_select"
      ON public.speaking_items FOR SELECT USING (true);
  END IF;
END;
$$;

-- Standalone timestamp function: does not depend on the initial schema migration.
CREATE OR REPLACE FUNCTION public.set_speaking_item_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgrelid = 'public.speaking_items'::regclass
      AND tgname = 'speaking_items_updated_at' AND NOT tgisinternal
  ) THEN
    CREATE TRIGGER speaking_items_updated_at
      BEFORE UPDATE ON public.speaking_items
      FOR EACH ROW EXECUTE FUNCTION public.set_speaking_item_updated_at();
  END IF;
END;
$$;

-- Storage bucket for speaking media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('speaking-media', 'speaking-media', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'speaking_media_public_read'
  ) THEN
    CREATE POLICY "speaking_media_public_read" ON storage.objects
      FOR SELECT USING (bucket_id = 'speaking-media');
  END IF;
END;
$$;

-- Make the new table immediately visible to the data API.
NOTIFY pgrst, 'reload schema';
