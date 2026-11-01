-- Row Level Security for the website chat (table: public.messages)
--
-- What this does:
--   * Visitors can only read and write their OWN conversation.
--   * Visitors can't post messages pretending to be "admin".
--   * Visitors can only mark admin replies in their own chat as read.
--   * Your admin account can read and reply to every conversation.
--
-- BEFORE RUNNING:
--   1. Replace you@example.com below with the email you log in with on your
--      chat admin page.
--   2. If your admin page logs in some other way (e.g. uses the service_role
--      key), tell your developer — that key bypasses these rules anyway.
--   3. Run this in Supabase → SQL Editor. Then test: open the chat on the site
--      in a private window, send a message, and reply from your admin page.

alter table public.messages enable row level security;

-- Remove any older, looser policies on this table first (check names in
-- Supabase → Authentication → Policies and drop them), e.g.:
-- drop policy if exists "Enable read access for all users" on public.messages;

create or replace function public.is_chat_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'you@example.com'
$$;

-- Read: visitors see their own thread; admin sees everything
drop policy if exists "chat read own or admin" on public.messages;
create policy "chat read own or admin" on public.messages
  for select to authenticated
  using (user_id = auth.uid() or public.is_chat_admin());

-- Insert: visitors can only add visitor messages to their own thread
drop policy if exists "chat visitor insert" on public.messages;
create policy "chat visitor insert" on public.messages
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and sender = 'visitor'
    and source = 'website'
    and char_length(message) between 1 and 2000
  );

-- Insert: admin can reply in any thread
drop policy if exists "chat admin insert" on public.messages;
create policy "chat admin insert" on public.messages
  for insert to authenticated
  with check (public.is_chat_admin());

-- Update: visitors can only mark admin replies in their own thread as read
drop policy if exists "chat visitor mark read" on public.messages;
create policy "chat visitor mark read" on public.messages
  for update to authenticated
  using (user_id = auth.uid() and sender = 'admin')
  with check (user_id = auth.uid() and sender = 'admin');

-- Update: admin can mark any message read (only the "read" column is
-- editable, see the grant below)
drop policy if exists "chat admin update" on public.messages;
create policy "chat admin update" on public.messages
  for update to authenticated
  using (public.is_chat_admin())
  with check (public.is_chat_admin());

-- Visitors may only change the "read" flag, not edit message text.
revoke update on public.messages from authenticated;
grant update (read) on public.messages to authenticated;

-- No deletes from the website.
drop policy if exists "chat no delete" on public.messages;
