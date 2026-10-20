-- Never lose data: every replaced copy of an app document is kept, and a copy with less history can never replace one with more.
create table if not exists public.docs_history (
  id bigserial primary key,
  user_id uuid not null,
  path text not null,
  data jsonb,
  kind text not null default 'replaced',           -- replaced | rejected | restore-point
  was_updated_at timestamptz,
  archived_at timestamptz not null default now()
);
alter table public.docs_history enable row level security;
drop policy if exists "own history" on public.docs_history;
create policy "own history" on public.docs_history for select to authenticated using (auth.uid() = user_id);
create index if not exists docs_history_idx on public.docs_history (user_id, path, archived_at desc);

-- how many days of lived history a state holds
create or replace function public.days_of(d jsonb) returns int language sql immutable as $$
  select coalesce((select count(*) from jsonb_object_keys(case when jsonb_typeof(d->'days')='object' then d->'days' else '{}'::jsonb end)), 0)::int
$$;

create or replace function public.docs_guard() returns trigger language plpgsql security definer set search_path = public as $$
declare od int; nd int; last_arch timestamptz;
begin
  if new.path like 'okr/%' and old.data is distinct from new.data then
    od := public.days_of(old.data); nd := public.days_of(new.data);
    -- a blank or thinner copy (fresh install, wiped phone storage) must never replace real history
    if (new.path = 'okr/state' or new.path = 'okr/auto-backup') and od >= 5 and nd < od - 1 and coalesce(current_setting('tega.restore', true), '') <> '1' then
      insert into public.docs_history(user_id, path, data, kind, was_updated_at) values (old.user_id, old.path, new.data, 'rejected', now());
      new.data := old.data;
      return new;                                   -- updated_at still ticks, so every device re-pulls the kept copy
    end if;
    select max(archived_at) into last_arch from public.docs_history h where h.user_id = old.user_id and h.path = old.path and h.kind = 'replaced';
    if last_arch is null or last_arch < now() - interval '2 hours' then
      insert into public.docs_history(user_id, path, data, kind, was_updated_at) values (old.user_id, old.path, old.data, 'replaced', old.updated_at);
      delete from public.docs_history h where h.user_id = old.user_id and h.path = old.path and h.kind = 'replaced' and h.archived_at < now() - interval '30 days';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists docs_guard on public.docs;
create trigger docs_guard before update on public.docs for each row execute function public.docs_guard();

-- what the app lists under Backup › Cloud history (no document bodies)
create or replace view public.docs_history_meta with (security_invoker = true) as
  select id, user_id, path, kind, archived_at, was_updated_at, public.days_of(data) as days, nullif(data->>'lvlSeen','')::int as lvl
  from public.docs_history;
grant select on public.docs_history_meta to authenticated;

-- restore one kept copy over the live document (the live one is archived first as a restore point)
create or replace function public.restore_doc(hid bigint) returns void language plpgsql security definer set search_path = public as $$
declare h public.docs_history%rowtype;
begin
  select * into h from public.docs_history where id = hid and user_id = auth.uid();
  if h.id is null then raise exception 'not found'; end if;
  insert into public.docs_history(user_id, path, data, kind, was_updated_at)
    select user_id, path, data, 'restore-point', updated_at from public.docs where user_id = auth.uid() and path = h.path;
  perform set_config('tega.restore', '1', true);   -- a deliberate restore may go back to a thinner copy
  update public.docs set data = h.data where user_id = auth.uid() and path = h.path;
end $$;
grant execute on function public.restore_doc(bigint) to authenticated;
