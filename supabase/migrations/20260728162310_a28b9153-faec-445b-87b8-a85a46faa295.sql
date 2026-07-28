CREATE TABLE public.legal_update_notifications (
  entry_key text PRIMARY KEY,
  notified_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.legal_update_notifications TO service_role;
ALTER TABLE public.legal_update_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages legal notifications"
ON public.legal_update_notifications FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');