-- Screenplay writers' room: seasons, beats, community contributions, admin roles

do $$ begin
  create type public.app_role as enum ('admin', 'moderator', 'user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "Users can read own roles" on public.user_roles;
create policy "Users can read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create table if not exists public.screenplay_seasons (
  slug text primary key,
  number int not null,
  title text not null,
  subtitle text not null default '',
  logline text not null default '',
  status text not null default 'treatment',
  era text not null default '',
  intro_markdown text not null default '',
  honesty_note text not null default '',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.screenplay_seasons to anon, authenticated;
grant all on public.screenplay_seasons to service_role;
alter table public.screenplay_seasons enable row level security;

drop policy if exists "Published seasons are public" on public.screenplay_seasons;
create policy "Published seasons are public" on public.screenplay_seasons
  for select to anon, authenticated using (published = true);

drop policy if exists "Admins manage seasons" on public.screenplay_seasons;
create policy "Admins manage seasons" on public.screenplay_seasons
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table if not exists public.screenplay_beats (
  id uuid primary key default gen_random_uuid(),
  season_slug text not null references public.screenplay_seasons(slug) on delete cascade,
  sort_order int not null default 0,
  kind text not null default 'scene',
  title text not null,
  body text not null default '',
  credit text,
  media_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists screenplay_beats_season_idx
  on public.screenplay_beats (season_slug, sort_order);

grant select on public.screenplay_beats to anon, authenticated;
grant all on public.screenplay_beats to service_role;
alter table public.screenplay_beats enable row level security;

drop policy if exists "Published beats are public" on public.screenplay_beats;
create policy "Published beats are public" on public.screenplay_beats
  for select to anon, authenticated using (published = true);

drop policy if exists "Admins manage beats" on public.screenplay_beats;
create policy "Admins manage beats" on public.screenplay_beats
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table if not exists public.screenplay_contributions (
  id uuid primary key default gen_random_uuid(),
  season_slug text references public.screenplay_seasons(slug) on delete set null,
  beat_id uuid references public.screenplay_beats(id) on delete set null,
  kind text not null default 'scene',
  contributor_name text not null,
  contributor_email text,
  pitch text not null,
  ai_draft text,
  final_body text,
  media_url text,
  status text not null default 'pending',
  reviewer_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists screenplay_contributions_status_idx
  on public.screenplay_contributions (status, created_at desc);

grant all on public.screenplay_contributions to service_role;
grant select, update on public.screenplay_contributions to authenticated;
alter table public.screenplay_contributions enable row level security;

drop policy if exists "Admins read contributions" on public.screenplay_contributions;
create policy "Admins read contributions" on public.screenplay_contributions
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins update contributions" on public.screenplay_contributions;
create policy "Admins update contributions" on public.screenplay_contributions
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));