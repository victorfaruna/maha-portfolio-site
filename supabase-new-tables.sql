-- =============================================================
-- Maha Portfolio – Publications Rich Text & Storage Migration
-- Run this SQL in your Supabase SQL Editor
-- =============================================================

-- 1. Add slug and content columns to publications table
alter table public.publications 
  add column if not exists slug text unique,
  add column if not exists content jsonb;

-- 2. Storage Bucket for inline publication images
insert into storage.buckets (id, name, public)
values ('publication-images', 'publication-images', true)
on conflict (id) do nothing;

drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated upload" on storage.objects;

create policy "Public Access" on storage.objects
  for select using (bucket_id = 'publication-images');

create policy "Authenticated upload" on storage.objects
  for insert with check (bucket_id = 'publication-images');
