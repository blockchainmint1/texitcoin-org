CREATE TABLE IF NOT EXISTS public.ecosystem_subscriber_sync (
  user_id uuid PRIMARY KEY,
  email text NOT NULL,
  signed_up_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'active',
  remote_id text
);
GRANT ALL ON public.ecosystem_subscriber_sync TO service_role;
ALTER TABLE public.ecosystem_subscriber_sync ENABLE ROW LEVEL SECURITY;