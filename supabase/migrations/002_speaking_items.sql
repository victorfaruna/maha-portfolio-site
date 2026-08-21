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

CREATE POLICY "speaking_items_public_select"
  ON public.speaking_items FOR SELECT USING (true);

-- Updated at trigger
CREATE TRIGGER speaking_items_updated_at
  BEFORE UPDATE ON public.speaking_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Storage bucket for speaking media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('speaking-media', 'speaking-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "speaking_media_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'speaking-media');
