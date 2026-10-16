-- Tega.exe storage: every app document (state, prefs, backups, inbox) is one row per user + path.
create table if not exists public.docs (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  path text not null,
  data jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, path)
);
alter table public.docs enable row level security;
drop policy if exists "own docs" on public.docs;
create policy "own docs" on public.docs for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
drop trigger if exists docs_touch on public.docs;
create trigger docs_touch before insert or update on public.docs for each row execute function public.touch_updated_at();

-- photos & clips: random 32-character names, readable by link, uploadable only when signed in
insert into storage.buckets (id, name, public) values ('blobs', 'blobs', true) on conflict (id) do nothing;
drop policy if exists "blobs upload" on storage.objects;
create policy "blobs upload" on storage.objects for insert to authenticated with check (bucket_id = 'blobs');
drop policy if exists "blobs update" on storage.objects;
create policy "blobs update" on storage.objects for update to authenticated using (bucket_id = 'blobs' and owner = auth.uid());
