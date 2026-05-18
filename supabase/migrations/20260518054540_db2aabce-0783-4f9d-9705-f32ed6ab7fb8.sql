-- Explicitly deny SELECT to anon and authenticated roles on newsletter_subscribers.
-- Service role bypasses RLS, so server-side admin code can still read.
CREATE POLICY "Block public read of newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO anon, authenticated
USING (false);