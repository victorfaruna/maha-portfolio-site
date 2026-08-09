-- ============================================================
-- Maha Portfolio CMS — Initial Schema Migration
-- Run this in your Supabase project: SQL Editor → New Query
-- ============================================================

-- ── EXTENSIONS ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── PUBLICATIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS publications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  category      TEXT NOT NULL,  -- 'Policy Brief' | 'Academic Paper' | 'Article'
  excerpt       TEXT NOT NULL,
  source_label  TEXT,           -- e.g. "HIKMA AI Policy Group"
  year          TEXT NOT NULL,
  link          TEXT,           -- external "Read More" URL
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── BOOKS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS books (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_arabic      TEXT NOT NULL,
  title_english     TEXT NOT NULL,
  published_year    TEXT NOT NULL,
  description       TEXT NOT NULL,
  cover_image_url   TEXT,        -- Supabase Storage URL
  external_link     TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── MEDIA GALLERY ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS media_gallery (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url     TEXT NOT NULL,  -- Supabase Storage URL
  category_tag  TEXT,           -- e.g. "Community Workshop"
  title         TEXT,
  context_note  TEXT,           -- descriptive paragraph shown next to image
  year          TEXT,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── RLS POLICIES ─────────────────────────────────────────────
-- Allow anyone to read (public site fetches data)
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "publications_select_public" ON publications FOR SELECT USING (true);
CREATE POLICY "books_select_public" ON books FOR SELECT USING (true);
CREATE POLICY "media_gallery_select_public" ON media_gallery FOR SELECT USING (true);

-- Service role key bypasses RLS automatically (used in server actions)
-- No additional write policies needed for anon role

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER books_updated_at
  BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER media_gallery_updated_at
  BEFORE UPDATE ON media_gallery
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── STORAGE BUCKETS ───────────────────────────────────────────
-- Run these separately in Supabase Storage or via the dashboard:
-- 1. Create bucket "book-covers"    (public: true)
-- 2. Create bucket "media-gallery"  (public: true)
--
-- SQL alternative (requires storage extension):
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-covers', 'book-covers', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('media-gallery', 'media-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read on storage
CREATE POLICY "book_covers_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'book-covers');

CREATE POLICY "media_gallery_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-gallery');

-- ── SEED DATA — existing static content ───────────────────────
INSERT INTO publications (title, category, excerpt, source_label, year, link) VALUES
(
  'Pan-African AI Governance: Building Ethical Frameworks for Digital Sovereignty',
  'Policy Brief',
  'An investigation into how African nations can define sovereign AI policy frameworks that prioritize local data ownership, cultural preservation, and equitable economic growth.',
  'HIKMA AI Policy Group',
  '2024',
  '#'
),
(
  'AI & Gender Equity in Healthcare: Community-Led Innovation in North Africa',
  'Academic Paper',
  'Analyzing the role of survivor-led technology solutions in improving healthcare accessibility and ethical medical AI for women affected by breast and cervical cancer.',
  'CHIFAA Research Initiative',
  '2023',
  '#'
),
(
  'Decolonizing Algorithmic Infrastructure: Lived Experience as Policy',
  'Article',
  'Exploring how lived experience in African communities should directly inform algorithmic auditing, international AI standards, and multilateral tech policy.',
  'Global AI Ethics Review',
  '2023',
  '#'
),
(
  'Ethical AI Architecture: Safeguarding Digital Dignity in the Global South',
  'Policy Brief',
  'Formulating actionable guidelines for multilateral tech governance that respect human dignity, language rights, and economic inclusion in developing AI ecosystems.',
  'African Technology Policy Network',
  '2022',
  '#'
),
(
  'Cultural Heritage and Machine Learning: Preserving Indigenous Knowledges',
  'Academic Paper',
  'Examining natural language processing datasets and advocating for inclusive AI representations of North African and Pan-African linguistic heritage.',
  'Digital Humanities & Ethics Journal',
  '2022',
  '#'
),
(
  'Multilateral Governance & Sovereign Dataspaces across the African Continent',
  'Article',
  'Strategic recommendations for regional data sovereignty, cross-border privacy safeguards, and collaborative tech innovation.',
  'Pan-African Digital Futures',
  '2021',
  '#'
);

INSERT INTO books (title_arabic, title_english, published_year, description, cover_image_url, external_link) VALUES
(
  'عاشقة من إفريقيا',
  'A Lover from Africa',
  '2018',
  'A deeply evocative narrative exploring identity, heritage, and the cultural bonds uniting African literature and human story-telling.',
  '/images/mahaholdingbook.jpeg',
  '#'
),
(
  'الرقصة الأخيرة: من قرطاج إلى الصين',
  'The Last Dance: From Carthage to China',
  '2021',
  'An extraordinary journey connecting North African heritage with East Asian culture, reflecting on cross-continental dialogue and personal transformation.',
  '/images/booksimages.jpeg',
  '#'
);

INSERT INTO media_gallery (image_url, category_tag, title, context_note, year, sort_order) VALUES
(
  '/images/event.webp',
  'Keynote Address',
  'Keynote at African Union AI Governance Summit',
  'Maha Jouini delivering the opening address on Pan-African digital sovereignty and ethical AI frameworks for regional governance.',
  '2024',
  1
),
(
  '/images/chifaa.jpeg',
  'Community Workshop',
  'CHIFAA Women''s Healthcare AI Workshop',
  'Collaborating with local medical practitioners, survivors, and data scientists in North Africa to develop survivor-led healthcare technology.',
  '2023',
  2
),
(
  '/images/advice.jpeg',
  'Policy Panel',
  'UNESCO High-Level Panel on Algorithmic Ethics',
  'Discussing multilateral tech regulation, indigenous language preservation in AI models, and human rights safeguards in the Global South.',
  '2023',
  3
),
(
  '/images/mahaholdingbook.jpeg',
  'Literary Presentation',
  'Book Launch & Literary Cultural Exchange',
  'Presenting published works exploring North African identity, cultural heritage, and cross-continental storytelling from Carthage to East Asia.',
  '2022',
  4
),
(
  '/images/research.jpg',
  'Research Colloquium',
  'Research Convening on Ethical AI Architecture',
  'Engaging global AI ethics scholars on integrating lived experiences and civilizational wisdom into international technology policy.',
  '2023',
  5
),
(
  '/images/myjourneyimage.jpeg',
  'International Forum',
  'International Digital Policy Dialogue',
  'Advocating for equitable technology access and Pan-African data ecosystems at international multilateral forums.',
  '2022',
  6
);
