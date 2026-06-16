
CREATE TABLE public.zoom_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  call_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','live','recorded')),
  video_cid text,
  duration_seconds integer,
  summary text,
  transcript text,
  thumbnail_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.zoom_calls TO anon, authenticated;
GRANT ALL ON public.zoom_calls TO service_role;

ALTER TABLE public.zoom_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view zoom calls"
  ON public.zoom_calls FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_zoom_calls_updated_at
  BEFORE UPDATE ON public.zoom_calls
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_zoom_calls_call_date ON public.zoom_calls(call_date DESC);
CREATE INDEX idx_zoom_calls_status ON public.zoom_calls(status);
