export type SearchEntry = {
  label: string;
  to: string;
  group: string;
  keywords?: string;
  description?: string;
};

export const SEARCH_ENTRIES: SearchEntry[] = [
  // Start here
  { label: "Home", to: "/", group: "Start here", keywords: "texitcoin home", description: "Honest money, mined in Texas — the TEXITcoin home page." },
  { label: "Get TXC", to: "/buy", group: "Start here", keywords: "buy purchase exchange", description: "Where and how to acquire TXC, step by step." },
  { label: "Whitepaper", to: "/whitepaper", group: "Start here", keywords: "paper technical", description: "The TEXITcoin whitepaper and technical foundation." },
  { label: "FAQ", to: "/faq", group: "Start here", keywords: "questions answers help", description: "Straight answers to the questions we hear most." },

  // Foundation
  { label: "Mining (Proof of Work)", to: "/proof-of-work", group: "Foundation", keywords: "pow asic hash mine", description: "Why proof of work is the only honest way to issue money." },
  { label: "Digital Currency", to: "/currency", group: "Foundation", keywords: "money currency", description: "What makes TXC a currency rather than a security or a token." },
  { label: "Community Value", to: "/value", group: "Foundation", description: "The equal exchange of value and the community that creates it." },
  { label: "Leadership", to: "/leadership", group: "Foundation", keywords: "bobby gray team founders", description: "The people leading TEXITcoin and the standards they hold." },
  { label: "Philosophy & Character", to: "/philosophy", group: "Foundation", keywords: "core values integrity mulligan mint bankruptcy", description: "Core values, the Mulligan Mint bankruptcy, and what time proved." },
  { label: "Bobby's Story", to: "/bobby", group: "Foundation", keywords: "bobby gray personal history honest money", description: "Bobby Gray's personal journey through honest money." },
  { label: "Team", to: "/team", group: "Foundation", description: "The builders, miners, and contributors behind TXC." },
  { label: "Tokenomics", to: "/tokenomics", group: "Foundation", keywords: "supply emission halving", description: "Supply, emission schedule, and halving mechanics." },

  // Discover
  { label: "The Mine", to: "/mine", group: "Discover", keywords: "immersion cooling asic", description: "Inside the immersion-cooled Texas mining operation." },
  { label: "The Hit List", to: "/market", group: "Discover", keywords: "top 100 market cap rankings", description: "Live market rankings and TXC's climb toward the Top 100." },
  { label: "TXC in the News", to: "/in-the-news", group: "Discover", keywords: "press media articles", description: "Press coverage, interviews, and media appearances." },
  { label: "Legal Updates", to: "/legal", group: "Discover", keywords: "tssb court hearing soah", description: "The TSSB matter, SOAH hearing, filings, and outcomes." },
  { label: "Troll Index", to: "/trolls", group: "Discover", description: "Answering the critics, receipts included." },
  { label: "Videos & Media", to: "/videos", group: "Discover", description: "Interviews, explainers, and long-form video." },
  { label: "Zoom Call Archive", to: "/zoom", group: "Discover", keywords: "honest money hour live thursday", description: "Every Honest Money Hour call, with summaries and transcripts." },
  { label: "Why Texas", to: "/texas", group: "Discover", keywords: "history alamo lone star", description: "Texas history, independence, and why it anchors this project." },
  { label: "TEXIT Explained", to: "/texit", group: "Discover", keywords: "secession independence politics", description: "A deep dive on Texas independence — legal, economic, practical." },
  { label: "Blog", to: "/blog", group: "Discover", keywords: "articles posts writing", description: "News, philosophy, and updates from the team." },
  { label: "Identity & Press Kit", to: "/press", group: "Discover", keywords: "logo brand assets", description: "Logos, brand assets, founder bio, and media coverage." },
  { label: "Site Stats", to: "/stats", group: "Discover", keywords: "traffic analytics pageviews", description: "Live, public traffic stats for texitcoin.org." },

  // Resources
  { label: "Wallets", to: "/wallets", group: "Resources", keywords: "cold storage web wallet honest money", description: "The Honest.Money ecosystem wallet, web wallet, and cold storage." },
  { label: "Build on TXC", to: "/build", group: "Resources", keywords: "developers api rpc omni layer 2", description: "Developer docs for the TXC blockchain and Omni layer 2." },
  { label: "Roadmap", to: "/roadmap", group: "Resources", description: "What's shipped, what's next, and what's on deck." },
  { label: "wTXC on Ethereum", to: "/wtxc", group: "Resources", keywords: "wrapped erc20", description: "Wrapped TXC on Ethereum and how bridging works." },
  { label: "Merch", to: "/merch", group: "Resources", keywords: "swag gear shirts", description: "TEXITcoin gear for miners and believers." },
  { label: "Disclosures", to: "/disclosures", group: "Resources", description: "Risk disclosures and important notices." },
  { label: "Terms", to: "/terms", group: "Resources", description: "Terms of use for texitcoin.org." },
  { label: "Privacy", to: "/privacy", group: "Resources", description: "How we handle your data." },
];
