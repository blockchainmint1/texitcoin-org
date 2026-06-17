UPDATE public.zoom_calls
SET thumbnail_url = replace(thumbnail_url, 'https://ipfs.io/ipfs/', 'https://ipfs.honest.money/ipfs/')
WHERE thumbnail_url LIKE 'https://ipfs.io/ipfs/%';