CREATE TABLE IF NOT EXISTS public.zoom_transcript_staging (
  slug text PRIMARY KEY,
  transcript text NOT NULL,
  summary text NOT NULL
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.zoom_transcript_staging TO sandbox_exec;
GRANT ALL ON public.zoom_transcript_staging TO service_role;
ALTER TABLE public.zoom_transcript_staging ENABLE ROW LEVEL SECURITY;
-- No policies: only service_role + sandbox_exec (via grant) can touch it.