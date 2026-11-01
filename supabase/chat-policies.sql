-- =====================================================================
-- Chat security rules (Row Level Security)
-- Website chat (jonhro-website) + admin PWA (jorob-chat-app)
-- =====================================================================
--
-- After this runs:
--   * Website visitors can only read and write their OWN conversation.
--   * Visitors can't post messages as "admin" or edit message text.
--   * Only your admin login can see all conversations, reply, mark read
--     and archive.
--   * Push subscriptions can only be read/saved by your admin login.
--     (The notify-push function uses the service role key and is not
--     affected by these rules.)
--
-- HOW TO RUN
--   1. Change the email on the line marked  >>> CHANGE THIS <<<  to the
--      email you log in with on the chat app on your phone.
--   2. Supabase dashboard → SQL Editor → New query → paste all of this → Run.
--   3. Test (see the bottom of this file).
--
-- Safe to run more than once.
-- =====================================================================


-- ---------- 1. Who is the admin ----------------------------------------
create or replace function public.is_chat_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = lower('you@example.com')  -- >>> CHANGE THIS <<<
     and coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false
$$;


-- ---------- 2. Remove any old policies on these tables -----------------
do $$
declare p record;
begin
  for p in
    select policyname, tablename from pg_policies
    where schemaname = 'public' and tablename in ('messages', 'subscriptions')
  loop
    execute format('drop policy if exists %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;


-- ---------- 3. messages ------------------------------------------------
alter table public.messages enable row level security;

-- Read: visitors see their own thread; admin sees all
create policy "messages: read own or admin" on public.messages
  for select to authenticated
  using (user_id = auth.uid() or public.is_chat_admin());

-- Visitor sends a message (website)
create policy "messages: visitor sends" on public.messages
  for insert to authenticated
  with check (
    not public.is_chat_admin()
    and user_id = auth.uid()
    and sender = 'visitor'
    and source = 'website'
    and char_length(message) between 1 and 2000
    and coalesce(char_length(display_name), 0) <= 80
  );

-- Admin replies (chat app)
create policy "messages: admin replies" on public.messages
  for insert to authenticated
  with check (public.is_chat_admin() and sender = 'admin');

-- Visitor marks admin replies in their own thread as read
create policy "messages: visitor marks read" on public.messages
  for update to authenticated
  using (user_id = auth.uid() and sender = 'admin')
  with check (user_id = auth.uid() and sender = 'admin');

-- Admin marks read / archives any conversation
create policy "messages: admin updates" on public.messages
  for update to authenticated
  using (public.is_chat_admin())
  with check (public.is_chat_admin());

-- Only the "read" and "archived" columns can ever be changed from the apps
revoke update on public.messages from anon, authenticated;
grant update (read, archived) on public.messages to authenticated;

-- Nobody signed out can touch messages; nobody can delete from the apps
revoke all on public.messages from anon;
revoke delete on public.messages from authenticated;


-- ---------- 4. subscriptions (push notifications) ----------------------
alter table public.subscriptions enable row level security;

create policy "subscriptions: admin only" on public.subscriptions
  for all to authenticated
  using (public.is_chat_admin() and admin_id = auth.uid())
  with check (public.is_chat_admin() and admin_id = auth.uid());

revoke all on public.subscriptions from anon;


-- =====================================================================
-- TEST AFTER RUNNING
--   1. Open https://www.jonhrorobles.com in a private/incognito window,
--      open the chat and send a message.
--   2. On your phone you should get the notification and see the message.
--   3. Reply from the phone; the reply should appear on the website.
--   4. Open the conversation on the phone; it should show as read.
-- If anything fails, run this to switch the rules off again while you
-- check what's wrong:
--   alter table public.messages disable row level security;
--   alter table public.subscriptions disable row level security;
-- =====================================================================
