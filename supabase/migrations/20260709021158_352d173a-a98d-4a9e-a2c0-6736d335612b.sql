UPDATE public.blog_posts
SET body_markdown = regexp_replace(
  body_markdown,
  'https?://[a-zA-Z0-9._-]+/ipfs/',
  '/api/public/ipfs/',
  'g'
)
WHERE body_markdown ~ 'https?://[a-zA-Z0-9._-]+/ipfs/';