update public.blog_posts
set body_markdown = 'Watch the full talk: https://streamtxc.com/v/bafybeibmtyedznepek3bekvf4ctzjqarf74j5cyswtd7tjpblmugnb4ffa

' || body_markdown
where slug = 'wdms-2025-bitmain-world-digital-mining-summit'
  and body_markdown not like '%bafybeibmtyedznepek3bekvf4ctzjqarf74j5cyswtd7tjpblmugnb4ffa%';