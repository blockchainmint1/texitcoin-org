import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SITE_FACTS as FACTS } from "@/lib/site-facts";

const PAGES = [
  { path: "/", title: "Home" },
  { path: "/buy", title: "Buy TXC" },
  { path: "/mine", title: "Mine TXC" },
  { path: "/build", title: "Build on TEXITcoin (blockchain + Omni L2 docs)" },
  { path: "/whitepaper", title: "Whitepaper" },
  { path: "/tokenomics", title: "Tokenomics" },
  { path: "/roadmap", title: "Roadmap" },
  { path: "/wallets", title: "Wallets" },
  { path: "/faq", title: "FAQ" },
  { path: "/blog", title: "Blog" },
  { path: "/market", title: "Market and currency case studies" },
  { path: "/screenplay", title: "Screenplay" },
  { path: "/zoom", title: "Honest Money Hour archive" },
  { path: "/live", title: "Honest Money Hour live" },
  { path: "/stats", title: "Public site statistics" },
  { path: "/texas", title: "Texas" },
  { path: "/texit", title: "TEXIT" },
  { path: "/clarity", title: "Crypto clarity" },
  { path: "/sec-and-crypto", title: "SEC and crypto" },
  { path: "/philosophy", title: "Honest money philosophy" },
  { path: "/bobby", title: "Bobby Gray" },
  { path: "/legal", title: "Legal filings and timeline" },
  { path: "/legal/arizona", title: "Arizona legal proceedings" },
  { path: "/disclosures", title: "Risk disclosures" },
  { path: "/terms", title: "Terms" },
  { path: "/privacy", title: "Privacy" },
];

export default defineTool({
  name: "get_site_info",
  title: "Get TEXITcoin site info",
  description:
    "Return core facts about TEXITcoin (TXC): ticker, network, supply cap, ecosystem, key links, and a directory of pages on texitcoin.org.",
  inputSchema: {
    include_pages: z.boolean().optional().describe("Include the page directory (default true)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ include_pages }) => {
    const payload = {
      ...FACTS,
      ...(include_pages === false ? {} : { pages: PAGES }),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: payload,
    };
  },
});
