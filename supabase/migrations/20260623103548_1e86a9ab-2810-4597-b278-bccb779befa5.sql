CREATE TABLE public.blog_posts (
  slug text PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  author text NOT NULL,
  tag text NOT NULL,
  read_minutes integer NOT NULL DEFAULT 3,
  excerpt text NOT NULL,
  body_markdown text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are public"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE INDEX blog_posts_date_idx ON public.blog_posts (date DESC);
CREATE INDEX blog_posts_published_date_idx ON public.blog_posts (published, date DESC);

CREATE TRIGGER blog_posts_set_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();