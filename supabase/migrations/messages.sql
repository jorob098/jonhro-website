-- Create messages table
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  username text not null,          -- who sent the message (website or Telegram username)
  content text not null,           -- message body
  source text check (source in ('website', 'telegram')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable realtime
alter publication supabase_realtime add table public.messages;

-- Indexes for performance
create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_source_idx on public.messages (source);
