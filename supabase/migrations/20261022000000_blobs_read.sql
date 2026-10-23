-- Pictures: uploads were sent as "upsert", which Supabase only allows with a SELECT policy too.
-- There was none, so every photo upload (and the first-run photo import) was refused and the bucket stayed empty.
drop policy if exists "blobs read" on storage.objects;
create policy "blobs read" on storage.objects for select to authenticated using (bucket_id = 'blobs');
