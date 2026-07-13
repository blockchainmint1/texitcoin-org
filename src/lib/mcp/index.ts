import { defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import getSiteInfo from "./tools/get-site-info";

export default defineMcp({
  name: "texitcoin-mcp",
  title: "TEXITcoin",
  version: "0.1.0",
  instructions:
    "Public tools for texitcoin.org. Use `get_site_info` for core facts about TEXITcoin (TXC) and the site's page directory. Use `list_blog_posts` to browse published posts and `get_blog_post` to read a full post by slug. Deep blockchain / Omni Layer 2 docs live at texitcoin.org/build.",
  tools: [getSiteInfo, listBlogPosts, getBlogPost],
});
