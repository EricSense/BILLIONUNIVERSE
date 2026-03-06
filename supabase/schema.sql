-- Billion Universe (MVP1) — Supabase schema
-- Apply in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  type text not null,
  message text not null,
  email text null,

  status text not null default 'new',
  tags text[] not null default '{}'
);

create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
create index if not exists feedback_status_idx on public.feedback (status);
