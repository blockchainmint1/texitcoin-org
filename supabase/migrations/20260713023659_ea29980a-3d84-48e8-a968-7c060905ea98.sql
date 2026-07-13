INSERT INTO public.hit_list_coins
  (slug, name, symbol, cmc_id, cmc_rank, x_handle, website, verdict, verdict_note, published, snapshot_at)
VALUES
  ('dogecoin', 'Dogecoin', 'DOGE', 74, 8, 'dogecoin',
   'https://dogecoin.com',
   'coasting',
   'A joke coin from 2013 sitting in the top 10 because one billionaire keeps tweeting about it. No roadmap, no fixed supply cap, and a security budget propped up by merge-mining with Litecoin.',
   true, now())
ON CONFLICT (slug) DO UPDATE
  SET cmc_rank = EXCLUDED.cmc_rank,
      verdict = EXCLUDED.verdict,
      verdict_note = EXCLUDED.verdict_note,
      published = true;