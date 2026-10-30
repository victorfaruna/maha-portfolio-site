-- Testimonials CMS: run once in the Supabase SQL Editor.
-- Safe to rerun. No existing content is deleted or changed; no fake testimonials are seeded.
BEGIN;

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL CHECK (char_length(btrim(quote)) BETWEEN 1 AND 1600),
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 120),
  role TEXT CHECK (char_length(role) <= 160),
  organization TEXT CHECK (char_length(organization) <= 160),
  photo_url TEXT,
  photo_path TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order BETWEEN 0 AND 9999),
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO service_role;
REVOKE INSERT, UPDATE, DELETE ON public.testimonials FROM anon, authenticated;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public'
    AND tablename = 'testimonials' AND policyname = 'testimonials_published_read') THEN
    CREATE POLICY testimonials_published_read ON public.testimonials
      FOR SELECT TO anon, authenticated USING (is_published = true);
  END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS testimonials_display_order
  ON public.testimonials (is_published, sort_order, created_at);

CREATE OR REPLACE FUNCTION public.set_testimonial_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgrelid = 'public.testimonials'::regclass
    AND tgname = 'testimonials_updated_at' AND NOT tgisinternal) THEN
    CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials
      FOR EACH ROW EXECUTE FUNCTION public.set_testimonial_updated_at();
  END IF;
END;
$$;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('testimonial-photos', 'testimonial-photos', true, 2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage'
    AND tablename = 'objects' AND policyname = 'testimonial_photos_public_read') THEN
    CREATE POLICY testimonial_photos_public_read ON storage.objects
      FOR SELECT TO anon, authenticated USING (bucket_id = 'testimonial-photos');
  END IF;
END;
$$;

NOTIFY pgrst, 'reload schema';
COMMIT;
