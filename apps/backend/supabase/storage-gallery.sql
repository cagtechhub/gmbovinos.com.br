-- Bucket público para uploads da galeria (Supabase SQL editor)
-- Ajuste o nome se SUPABASE_STORAGE_BUCKET for diferente de "gallery".

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

create policy "Public read gallery"
on storage.objects for select
using (bucket_id = 'gallery');

create policy "Service role write gallery"
on storage.objects for all
using (bucket_id = 'gallery')
with check (bucket_id = 'gallery');
