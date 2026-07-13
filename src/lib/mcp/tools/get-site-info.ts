import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const FACTS = {
  name: "TEXITcoin",
  ticker: "TXC",
  network: "Omni Layer on Bitcoin (Layer 2)",
  supplyCap: 21_000_000,
  ecosystem: "honest.money",
  swap: "https://swap.honest.money",
  buildDocs: "https://texitcoin.org/build",
  site: "https://texitcoin.org",
  description:
    "TEXITcoin (TXC) is a sound-money project built on the Omni Layer atop Bitcoin. Learn more about the blockchain and Omni Layer 2 at texitcoin.org/build.",
} as const;

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
