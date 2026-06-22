
UPDATE public.zoom_calls SET thumbnail_url = v.url FROM (VALUES
('2026-06-18-marathon-day-5-mission-money-and-future-plan','https://streamtxc.com/api/stream/bafkreiad3xdqq3ibtexiiafk6zngfjl4aeooheke636wsamhwqwq3omgdi'),
('2026-06-17-building-real-utility-streamtxc-cryptopop-txc-path-forward','https://streamtxc.com/api/stream/bafkreiem5b4d3yqryyrdd2ldy4srm4idbx4hqbomovhxzlqdflkyuzs5qi'),
('2026-06-16-idmc-west-coast-tour','https://streamtxc.com/api/stream/bafkreigffst5lhq5cs7ptldftbct4qlrjluendotclzvh7cdtcxkheblmq'),
('2026-06-15-tech-updates','https://streamtxc.com/api/stream/bafkreiehmkqib6vv4wubhy6zqzdk57fnp6gzbauinxqs2saspagoyu7cya'),
('2026-06-14-sec-update','https://streamtxc.com/api/stream/bafkreibrd4dscqizy6hpblzcagygsol7rkkgftvnvolknbelp7nrlng3vy'),
('2026-06-04-honest-money-update','https://streamtxc.com/api/stream/bafkreidgw3vhcx6tbqeimwjwxv4hpv2pqxj24eptl6tbaxxh3solldc6fa'),
('2026-05-28-scaling-honest-money','https://streamtxc.com/api/stream/bafkreica6h76bmatkaujyvvfgfdoxt2chnhabez6upvrwojfploqinpufa'),
('2026-05-21-honest-money-ecosystem','https://streamtxc.com/api/stream/bafkreifzzpzhkb4vvvu7w762jhu466kbkuyq4jholnn7bwhuks5l7qpxqe'),
('2026-05-14-ai-powered-builds','https://streamtxc.com/api/stream/bafkreiegvymm2trzlhwpt6wqbacyzeffy6u5b4mlxhwwr6i72khub2vu2e'),
('2026-05-07-blockchain-sec-trustless-money','https://streamtxc.com/api/stream/bafkreigebhg2omhyrlar6nhnv66y6l67w6vdsfc6lmvrvzl4n44jmlngfq'),
('2026-04-30-honest-money-crypto-community','https://streamtxc.com/api/stream/bafkreiaaj32ehdyrwaroyrycuaaq2yvzli5o2rowhdtaf7qhl55lsl72ue'),
('2026-04-16-honest-money-hour-kickoff','https://streamtxc.com/api/stream/bafkreihyjfthqoofgcemxk5opspcfgmn5csw7xnba7twvt3i7zlltmd2ty'),
('2026-04-07-iskander-pivot-and-leadership-transition','https://streamtxc.com/api/stream/bafkreiaeu6o5rkubqnri3e6rkf3b2ldc2jeilomxsdiusi5vcequijx5de'),
('2026-03-31-merge-mining-crypto-u-season-3','https://streamtxc.com/api/stream/bafkreidwckxou6juaqmkz5kykjmzzpyohetg4jxmnivsupndlottomfbyq'),
('2026-02-13-weekly-call-texitcoin-graduation-tsb-order','https://streamtxc.com/api/stream/bafkreihztyglk5xosvd3br6l332db27rjym76iy2yqcziliv5gn4pz43iq'),
('2026-01-29-berlin-briefing-texitcoin-phase-3-iskander','https://streamtxc.com/api/stream/bafkreicqg3le5tmaypdjn6vcgkivnokurcddnvgrkqvkusad2ubhczdgtu'),
('2026-01-22-texitcoin-community-powered-texas-mining-project','https://streamtxc.com/api/stream/bafkreiawiughhnrwbeytbohuobbzb5lvu364lddbiuj2aok3amfj6onkbu'),
('2026-01-15-rug-pull-checklist-and-ranger-roundup','https://streamtxc.com/api/stream/bafkreiafev6rdiv32hh7ka2dto63w77yh5fn724pxvcpsqzow3jfsg6zqa'),
('2026-01-08-holidays-over-lets-grow','https://streamtxc.com/api/stream/bafkreicdffnntzsrojh3aft7oeqsc6k66e3b44hvdst4dn3merrnhdjvs4'),
('2026-01-01-texitcoin-3-minute-intro','https://streamtxc.com/api/stream/bafkreibwsgfmejzxqqlolbatvw22fs5aomakml2yuiooyhyspall2fjkkq')
) AS v(slug, url)
WHERE public.zoom_calls.slug = v.slug;
