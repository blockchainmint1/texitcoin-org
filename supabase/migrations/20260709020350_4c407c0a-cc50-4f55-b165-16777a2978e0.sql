UPDATE public.blog_posts 
SET body_markdown = REPLACE(body_markdown, '''''', '''')
WHERE slug = 'msd-filed-quinn-emanuel-swings-back';