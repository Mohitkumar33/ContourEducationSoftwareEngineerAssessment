-- 1) PROFILES: stores user metadata (name/phone) separately from auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name  text not null,
  phone      text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());


-- 2) CONSULTATIONS: stores consultation details (spec) + ownership + status
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  first_name text not null,
  last_name  text not null,
  reason     text not null,
  scheduled_at timestamptz not null,

  is_complete boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists consultations_user_id_idx on public.consultations(user_id);
create index if not exists consultations_scheduled_at_idx on public.consultations(scheduled_at);

alter table public.consultations enable row level security;

create policy "consultations_select_own"
on public.consultations
for select
to authenticated
using (user_id = auth.uid());

create policy "consultations_insert_own"
on public.consultations
for insert
to authenticated
with check (user_id = auth.uid());

create policy "consultations_update_own"
on public.consultations
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());