
UPDATE public.hit_list_coins SET
  x_handle='Dashpay',
  x_followers=444393,
  x_following=957,
  x_last_post_at='2026-07-12T16:10:08Z',
  x_posts_30d=55,
  x_avg_likes=68,
  x_avg_replies=4,
  x_avg_reposts=13,
  snapshot_at=now()
WHERE slug='dash';

UPDATE public.hit_list_coins SET
  x_followers=1254850,
  x_following=1036,
  snapshot_at=now()
WHERE slug='litecoin';

UPDATE public.hit_list_coins SET
  x_followers=4385152,
  x_following=41,
  snapshot_at=now()
WHERE slug='dogecoin';

UPDATE public.hit_list_coins SET
  x_handle='KaspaCurrency',
  x_followers=2122,
  x_following=0,
  verdict_note=COALESCE(verdict_note,'') || ' Their official @KaspaCurrency handle now bills itself as an "Unaffiliated commentary account" with 2.1K followers — the community itself has splintered off the brand.',
  snapshot_at=now()
WHERE slug='kaspa';
