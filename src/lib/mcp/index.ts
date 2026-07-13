import { defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import getSiteInfo from "./tools/get-site-info";
import listHitList from "./tools/list-hit-list";
import getHitListCoin from "./tools/get-hit-list-coin";

export default defineMcp({
  name: "texitcoin-mcp",
  title: "TEXITcoin",
  version: "0.1.0",
  instructions:
    "Public tools for texitcoin.org. Use `get_site_info` for core facts about TEXITcoin (TXC) and the site's page directory. Use `list_blog_posts` and `get_blog_post` for published blog posts. Use `list_hit_list` and `get_hit_list_coin` for TEXITcoin's Hit List evaluations of CoinMarketCap Top 100 coins. Deep blockchain / Omni Layer 2 docs live at texitcoin.org/build.",
  tools: [getSiteInfo, listBlogPosts, getBlogPost, listHitList, getHitListCoin],
});

