
CREATE TABLE public.hit_list_coins (
  slug TEXT PRIMARY KEY,
  cmc_id INTEGER,
  cmc_rank INTEGER,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  website TEXT,
  x_handle TEXT,
  x_followers INTEGER,
  x_following INTEGER,
  x_account_created DATE,
  x_last_post_at TIMESTAMPTZ,
  x_posts_30d INTEGER,
  x_avg_likes NUMERIC,
  x_avg_replies NUMERIC,
  x_avg_reposts NUMERIC,
  x_default_avatar_pct NUMERIC,
  snapshot_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verdict TEXT NOT NULL DEFAULT 'unrated' CHECK (verdict IN ('leftover','earned','coasting','unrated')),
  verdict_note TEXT,
  argument_markdown TEXT,
  gaps_json JSONB,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.hit_list_coins TO anon;
GRANT SELECT ON public.hit_list_coins TO authenticated;
GRANT ALL ON public.hit_list_coins TO service_role;

ALTER TABLE public.hit_list_coins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published hit list coins"
  ON public.hit_list_coins FOR SELECT
  USING (published = true);

CREATE TRIGGER update_hit_list_coins_updated_at
  BEFORE UPDATE ON public.hit_list_coins
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.hit_list_coins (
  slug, cmc_id, cmc_rank, symbol, name, website,
  x_handle, x_followers, x_following, x_last_post_at, x_posts_30d,
  x_avg_likes, x_avg_replies, x_avg_reposts, x_default_avatar_pct,
  verdict, verdict_note, argument_markdown, gaps_json, published
) VALUES (
  'kaspa', 20396, 62, 'KAS', 'Kaspa', 'https://kaspa.org',
  'KaspaCurrency', 239000, 120, '2024-09-15T00:00:00Z', 2,
  45, 8, 12, 18,
  'coasting',
  'Real tech, real community — but the official account has gone dark while the market cap coasts on 2023 momentum.',
  E'## Why Kaspa is #62 on CMC\n\nKaspa (KAS) landed in the CMC Top 100 on the strength of a legitimately novel piece of tech: the **GHOSTDAG** protocol, a blockDAG consensus model that lets the network confirm many blocks in parallel instead of throwing them away as orphans. That gives it very fast block times (currently ~10 blocks per second post-Crescendo hardfork) while still being proof-of-work and permissionless. The founders trace back to the original Bitcoin/DAGlabs research crowd — this isn''t a vaporware L1.\n\nCommunity-wise, Kaspa had one of the loudest grassroots followings of 2023. No premine, no ICO, "fair launch" branding, and an army of miners who bought in when KAS was fractions of a cent. That pushed market cap north of $3B at peak.\n\n## Does it still belong there?\n\nHonest answer: **it''s coasting.**\n\n- **Market cap ~$786M** at rank #62 is real money, but it''s down ~75% from ATH and holding largely on inertia and mining community loyalty.\n- **The official @KaspaCurrency account hasn''t posted in over a year.** For a project that lives and dies on retail attention, that is not a good look. Ecosystem accounts (Kaspa devs, KRC-20 projects) are active, but the flagship handle is silent.\n- **Engagement is thin** relative to follower count — a heuristic we score below. 239k followers, but organic replies and reposts on the last posts before the silence were in the low hundreds. That''s a follower-to-engagement ratio that suggests a meaningful chunk of the audience is either bots, inactive, or bought in an earlier era and moved on.\n- **What''s working:** the tech shipped. Crescendo hardfork landed. KRC-20 tokens exist. Rusty-Kaspa (the Rust rewrite) is real. If any of the "leftover" Top 100 coins deserves to stay on merit alone, Kaspa has the strongest case.\n\n## What TXC has to beat\n\nIf we want Kaspa''s slot, we don''t need to beat their tech — we need to beat their **presence**. Kaspa is a case study in what happens when the flagship voice goes quiet: the price coasts, the followers stay, but the story stops. TXC''s advantage is that we''re not going quiet. Ever.',
  '[
    {"metric":"X followers","kaspa":"239,000","txc":"track live","note":"Their followers are static; ours are growing."},
    {"metric":"Days since last flagship post","kaspa":"400+","txc":"< 7","note":"They stopped talking. We didn''t."},
    {"metric":"Market cap","kaspa":"~$786M","txc":"track live","note":"Their cap is inertia; ours will be earned."},
    {"metric":"Community-led ecosystem","kaspa":"Strong (KRC-20, miners)","txc":"honest.money ecosystem","note":"Different bets — theirs is DAG throughput, ours is sound money."}
  ]'::jsonb,
  true
);
