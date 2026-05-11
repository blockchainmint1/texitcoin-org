export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  tag: string;
  readMinutes: number;
  excerpt: string;
  body: string[]; // paragraphs
};

// Summaries are paraphrased from the original TEXITcoin blog for the replica.
export const posts: BlogPost[] = [
  {
    slug: "welcome-to-texitcoin-season-3",
    title: "Welcome to TEXITcoin: Season 3",
    date: "2026-03-26",
    tag: "Community",
    readMinutes: 5,
    excerpt:
      "Two years in, TEXITcoin enters a new chapter — a Layer 1 currency built on Texas values, focused on honest money and real-world adoption.",
    body: [
      "TEXITcoin started as a simple idea: build a Layer 1 digital currency anchored in Texas values, focused on honest money, real utility, and real adoption. Two years later, that idea has become a working network, a passionate community, and an expanding ecosystem.",
      "Season 3 marks the shift from proving the concept to scaling it. The mine is running. The marketplace is alive. The next phase is about putting TXC into the hands of more everyday people who want a currency they can actually use.",
      "Thank you to every miner, builder, and believer who carried us here. The best part of this story is still being written.",
    ],
  },
  {
    slug: "my-fourth-contribution-to-the-crypto-industry",
    title: "My Fourth Contribution to the Crypto Industry",
    date: "2026-02-15",
    tag: "Founder",
    readMinutes: 5,
    excerpt:
      "After more than a decade in the crypto trenches — physical coins, storage, hardware — TEXITcoin is the first digital asset I've built from the ground up.",
    body: [
      "My path through crypto started long before TEXITcoin: physical collectible coins that made the idea of digital money tangible, secure storage products that protected what people earned, and hardware that helped real users participate in the network.",
      "Each project taught the same lesson — what people actually need is a currency they can trust, hold, and use without permission. TEXITcoin is the natural conclusion of that lesson: my first Layer 1, built from scratch, with everything I've learned baked in.",
      "It isn't a first rodeo. It is, finally, the rodeo I've spent fifteen years training for.",
    ],
  },
  {
    slug: "another-letter-from-the-founder",
    title: "Another Letter from the Founder",
    date: "2026-02-13",
    tag: "Founder",
    readMinutes: 5,
    excerpt:
      "A short note of thanks to every miner riding the TEXITcoin rocketship — and a reminder of why we strapped in.",
    body: [
      "Welcome aboard, and thank you for standing with me through this journey. Building a Layer 1 from the ground up is not a solo sport — it takes miners, holders, merchants, and skeptics all pushing in the same direction.",
      "We're early. We're loud. We're unapologetically Texan. And we're just getting warmed up.",
    ],
  },
  {
    slug: "what-is-money-and-why-does-it-need-to-be-honest",
    title: "What is Money, and Why Does It Need to Be Honest?",
    date: "2026-01-15",
    tag: "Philosophy",
    readMinutes: 8,
    excerpt:
      "Money is the quiet foundation under every free, prosperous society. When it's dishonest, everything built on top eventually cracks.",
    body: [
      "Money is older than language and older than law. It's the tool that lets strangers cooperate across time and distance. Honest money is simply a currency that keeps its promise: the value you earned yesterday is still here today.",
      "The modern fiat system breaks that promise on purpose. Endless printing transfers wealth from savers to insiders, prices climb while wages stall, and the people doing the work see their effort quietly diluted year after year.",
      "TEXITcoin exists to offer a different answer. A fixed supply. No pre-mine. Proof of work. A currency that respects the time you put into earning it.",
    ],
  },
  {
    slug: "txc-a-mission-that-matters",
    title: "TXC: A Mission That Matters",
    date: "2026-01-05",
    tag: "Mission",
    readMinutes: 5,
    excerpt:
      "TEXITcoin isn't another speculative ticker — it's a purposeful experiment in putting monetary power back into the hands of real people.",
    body: [
      "There are thousands of cryptocurrencies. Most exist to enrich their founders. TXC exists for a different reason: to test whether a community, properly aligned, can build and steward an honest currency without help from VCs or central banks.",
      "Every design choice flows from that mission. Texas-based mining. A fixed supply. Open participation. A marketplace built around real merchants, not yield farms.",
      "If it works, the answer to 'who controls your money?' becomes simple: you do.",
    ],
  },
  {
    slug: "why-youre-broke-and-what-you-can-do-about-it-today",
    title: "Why You're Broke and What You Can Do About It Today",
    date: "2025-12-15",
    tag: "Education",
    readMinutes: 6,
    excerpt:
      "Most people aren't broke because they're lazy — they're broke because the rules of the money itself are working against them.",
    body: [
      "If you feel like you're running faster every year just to stay in place, you're not imagining it. Inflation, taxation, and dollar debasement quietly extract value from every paycheck. The math is rigged before you even get to spend.",
      "The first step out is awareness — understanding how the system actually works. The second is moving some portion of your effort into assets that can't be silently diluted. Sound money. Real ownership. Skills that compound.",
      "TXC won't fix your finances on its own. But understanding it is part of understanding the game — and once you see the game, you can start playing it on your own terms.",
    ],
  },
  {
    slug: "texitcoin-from-glamour-to-grind",
    title: "TEXITcoin: From Glamour to Grind",
    date: "2025-11-05",
    tag: "Background",
    readMinutes: 6,
    excerpt:
      "TXC didn't begin with billboards or viral hype. It started with the quiet hum of a few rigs in McKinney, Texas.",
    body: [
      "Every revolution starts with a spark, but it survives on sweat. TEXITcoin's first months weren't a marketing campaign — they were long nights in a small mining room, tuning hardware and shipping firmware.",
      "The glamour comes later. The grind comes first. That's the part most projects skip, and it's why most projects fail.",
      "We chose the grind on purpose. By the time you hear about TXC at scale, the foundation is already poured.",
    ],
  },
  {
    slug: "your-path-to-txc-millionaire",
    title: "Your Path to TXC Millionaire",
    date: "2025-10-09",
    tag: "Strategy",
    readMinutes: 7,
    excerpt:
      "Crypto millionaires aren't made by luck — they're made by timing, courage, and conviction in a project that's still early.",
    body: [
      "If you'd picked up ten Bitcoin at almost any point in its first decade, today you'd be a millionaire. The same window exists, briefly, in every honest project that goes the distance.",
      "TXC is early. The supply is small relative to the addressable audience, the mine is real, and the network is growing. None of that guarantees anything — but conviction during the boring phase is what produces the headlines later.",
      "Show up. Mine. Hold. Spread the word. The math takes care of the rest.",
    ],
  },
  {
    slug: "texitcoin-the-on-ramp-to-defi-and-crypto-literacy",
    title: "TEXITcoin: The On-Ramp to DeFi & Crypto Literacy",
    date: "2025-09-28",
    tag: "Education",
    readMinutes: 5,
    excerpt:
      "Most people hear 'DeFi' and think complex contracts and gas fees. TXC is the beginner-friendly gateway that teaches the real principles first.",
    body: [
      "Decentralized finance is intimidating from the outside — confusing jargon, scary fees, and the very real risk of losing your shirt to a bad contract. Most people give up before they ever learn what's actually under the hood.",
      "TXC is designed as an on-ramp. A mineable, usable, low-cost Layer 1 where you can practice the core skills — custody, transactions, mining, mempools — without putting your savings on the line.",
      "Learn here. Then take what you've learned everywhere else.",
    ],
  },
  {
    slug: "the-bitcoin-maximalists-guide-to-texitcoin",
    title: "The Bitcoin Maximalist's Guide to TEXITcoin",
    date: "2025-09-22",
    tag: "Comparison",
    readMinutes: 6,
    excerpt:
      "TXC isn't here to replace Bitcoin. It's here to run beside it — and solve the everyday-usability problem Bitcoin, by design, can't.",
    body: [
      "Bitcoin maximalists are right about a lot. BTC is digital gold: the hardest money ever created, the most secure proof-of-work network, the first-mover with unmatched conviction. Nothing else touches it as a store of value.",
      "But maximalism doesn't require exclusivity. Bitcoin is built to be slow and final — exactly what you want for settlement, exactly wrong for buying coffee. TXC is built for the other side of that coin: fast blocks, low fees, mineable, usable.",
      "Hold BTC for the long arc. Spend TXC for the daily one. They aren't competitors — they're complements.",
    ],
  },
  {
    slug: "phase-2-the-path-to-800-by-2027",
    title: "Phase 2 & The Path to $800 by 2027",
    date: "2025-09-22",
    tag: "Roadmap",
    readMinutes: 9,
    excerpt:
      "The next phase is about scale: more miners, more merchants, more on-ramps, and a credible path to a much larger valuation.",
    body: [
      "Every currency has to answer one question: who do we trust with our money? For centuries the answer has been 'banks.' Crypto changed the answer for the first time in living memory — but most crypto then handed the trust right back to a new set of middlemen.",
      "Phase 2 of TEXITcoin is about closing that loop. More independent miners. More merchants accepting TXC directly. More fiat on-ramps that don't require begging permission from gatekeepers.",
      "The valuation target is ambitious on purpose. We picked a number that requires the network to actually work — not just the price to pump.",
    ],
  },
  {
    slug: "the-path-to-80-by-february-2026",
    title: "The Path to $80 by February 2026",
    date: "2025-09-15",
    tag: "Roadmap",
    readMinutes: 7,
    excerpt:
      "The original $16 target was about credibility. The new target is about what the network is actually worth once it's built.",
    body: [
      "When we first set $16 as a milestone, the goal was credibility: raise enough capital, build the mine, deliver the product, and let the price catch up to the work. That part is on track.",
      "But $16 was always a floor, not a ceiling. Businesses are valued as a multiple of revenue and traction, not just the capital raised. By that yardstick, the network is worth meaningfully more than the first target implied.",
      "$80 is the next honest read of where the math points. Hit the milestones, and the price follows.",
    ],
  },
  {
    slug: "the-audacity-of-texitcoin",
    title: "The Audacity of TEXITcoin",
    date: "2025-07-31",
    tag: "Mission",
    readMinutes: 5,
    excerpt:
      "A digital rebellion — unapologetically Texan, fiercely decentralized, and built for people who refuse to ask permission.",
    body: [
      "In a world of fiat decay, corporate-captured crypto, and central bank digital cages, TEXITcoin is a deliberate act of audacity. Not a startup chasing trends. Not a meme coin riding hype. A currency built by people who would rather be wrong on principle than right on permission.",
      "It's mined with Texas energy, powered by Texas hands, and owned by anyone who refuses to bow to gatekeepers. The audacity isn't a marketing line — it's the operating system.",
    ],
  },
  {
    slug: "green-flags-red-flags-risks-and-rewards",
    title: "Green Flags, Red Flags, Risks & Rewards",
    date: "2025-05-19",
    tag: "Diligence",
    readMinutes: 8,
    excerpt:
      "How to tell whether TEXITcoin is the real deal — and how to think about risk in a space full of noise.",
    body: [
      "Crypto is littered with scams, hype cycles, and 'ground-floor' opportunities that lead nowhere. That doesn't mean every opportunity is a scam — it means due diligence is mandatory.",
      "Green flags for TXC: a public founder, real hardware, no pre-mine, a fixed schedule, and an open block explorer anyone can audit. Red flags to watch for, in any project: anonymous teams, vague tokenomics, promises of guaranteed returns, and pressure to recruit.",
      "Risk is real. But informed risk, taken with conviction, is how every meaningful position in this industry has ever been built.",
    ],
  },
  {
    slug: "a-letter-from-the-founder",
    title: "A Letter from the Founder",
    date: "2025-01-10",
    tag: "Founder",
    readMinutes: 5,
    excerpt:
      "Welcome, miner — and thanks for joining the rocketship. A short note on why I'm uniquely qualified by what I haven't done.",
    body: [
      "Welcome, miner, and thank you for joining the TEXITcoin rocketship. You may be surprised to learn I've never run a crypto project or a network-marketing company before now.",
      "That's not a bug. It's the feature. The mistakes I haven't made are exactly what lets me lead this one cleanly. No bad habits to unlearn. No old loyalties to protect. Just a clean attempt at honest money, done right.",
    ],
  },
  {
    slug: "why-were-here-the-heart-of-texitcoin",
    title: "Why We're Here: The Heart of TEXITcoin",
    date: "2024-12-15",
    tag: "Mission",
    readMinutes: 6,
    excerpt:
      "Freedom, fun, community, and profit — the four pillars of why this project exists in the first place.",
    body: [
      "At the heart of TEXITcoin is a simple mission: reclaim the integrity of money and build a decentralized financial system that actually works for the people using it.",
      "Freedom is the goal. Community is the engine. Profit is the natural consequence of doing the work well. And if you can't have fun while you're earning your freedom, you're doing it wrong.",
      "We are unapologetically all four at once.",
    ],
  },
  {
    slug: "texit-our-mission-to-save-america",
    title: "TEXIT: Our Mission to Save America",
    date: "2024-10-15",
    tag: "Philosophy",
    readMinutes: 7,
    excerpt:
      "Defending freedom in uncertain times — and why honest money is the quiet backbone of a free society.",
    body: [
      "History is unkind to empires whose currencies become reserve assets. Roughly 150 to 250 years is the standard arc, and the United States is well into the back half of that range. We don't have to accept the ending.",
      "Texans have always preferred preparation over panic. Honest money is one of the most powerful forms of preparation there is — a way to opt out of the slow decay without opting out of the country.",
      "TEXITcoin is part of that preparation. Not a flag. Not a slogan. A working alternative.",
    ],
  },
  {
    slug: "whats-in-it-for-you",
    title: "What's In It For You?",
    date: "2024-08-15",
    tag: "Community",
    readMinutes: 5,
    excerpt:
      "When TXC earns its place among the top cryptocurrencies, the real prize isn't the price — it's having helped build it.",
    body: [
      "There is a lot to be excited about as TXC scales. Hitting the top 100 cryptocurrencies would mean real, tangible upside for early miners and holders. That part is obvious.",
      "The less obvious part — and the better part — is the satisfaction of knowing you helped build an alternative currency made for real people, by real people. Money you can hand to your kids and explain without flinching.",
      "That's the part you can't buy back later.",
    ],
  },
  {
    slug: "were-counting-on-you-join-the-texitcoin-movement",
    title: "We're Counting on You: Join the TEXITcoin Movement",
    date: "2024-07-15",
    tag: "Community",
    readMinutes: 5,
    excerpt:
      "No cryptocurrency succeeds in isolation. TEXITcoin is built by a community that believes in something bigger than themselves.",
    body: [
      "TEXITcoin is not my project. It's ours. The foundation is laid — a fixed-supply blockchain, Texas-based mining, fast and inexpensive transactions — but a network is only as strong as the people running it.",
      "If you mine, you're the network. If you spend TXC, you're the marketplace. If you tell one person, you're the marketing department. Every role matters.",
      "We're counting on you. Show up.",
    ],
  },
  {
    slug: "an-achievable-goal-building-texitcoin-together",
    title: "An Achievable Goal: Building TEXITcoin Together",
    date: "2024-06-15",
    tag: "Mission",
    readMinutes: 5,
    excerpt:
      "Launching a new digital currency isn't an impossible dream — it's a recipe, with a small list of ingredients, mixed correctly.",
    body: [
      "Most crypto launches fail because they try to skip a step. The recipe is short: a trustworthy mine, an energized community, and a real marketplace where the coin actually moves. Mix those properly, and the rest follows.",
      "TEXITcoin has each of those ingredients in hand. The work isn't to invent something new — the work is to keep mixing, day after day, until the network feeds itself.",
    ],
  },
  {
    slug: "a-currency-is-a-promise",
    title: "A Currency is a Promise",
    date: "2024-05-15",
    tag: "Philosophy",
    readMinutes: 6,
    excerpt:
      "Every currency is a promise between people, communities, and generations. Fiat broke its promise. TXC is built to keep one.",
    body: [
      "Currency is a social contract: 'I'll accept this in payment because I trust someone else will accept it from me at roughly the same value later.' When that trust holds, civilization compounds. When it doesn't, things unravel quietly.",
      "Fiat money's promise has been broken for a long time — endless printing, slow devaluation, insiders ahead of savers. TEXITcoin is a deliberate attempt to write a better contract: fixed supply, transparent mining, no insiders.",
      "The promise is the point.",
    ],
  },
  {
    slug: "welcome-to-texitcoin-the-next-chapter",
    title: "Welcome to TEXITcoin: The Next Chapter in Honest Money",
    date: "2024-04-15",
    tag: "Mission",
    readMinutes: 6,
    excerpt:
      "Money should serve people, not control them. TEXITcoin is a bold step forward — built for anyone who's ever questioned the system.",
    body: [
      "Money is the foundation of civilization. It lets us trade, save effort, and reward productivity across time. Yet most people accept the inherited system without ever asking what money really is or where it comes from.",
      "The questions are worth asking. Why do prices keep rising while savings keep shrinking? Why does the value of your work get diluted by people you've never met?",
      "TEXITcoin is one honest answer. Whether you're new to digital assets or have been around since the beginning, this chapter is for you.",
    ],
  },
  {
    slug: "our-core-values",
    title: "Our Core Values: The Bedrock of TEXITcoin",
    date: "2024-03-15",
    tag: "Mission",
    readMinutes: 5,
    excerpt:
      "In an industry plagued by broken promises, uncommon results require uncommon integrity. Character isn't a slogan — it's the foundation.",
    body: [
      "Crypto attracts the best and worst of human behavior. Scams, hype, and broken promises are the price of an open frontier — and the only durable counter is integrity, applied consistently, over a long enough timeline to be believed.",
      "Our values are not poetry. Character. Transparency. Honesty. Better today than yesterday. You can't make a good deal with a bad person — so we work to be the kind of people you'd want to deal with.",
    ],
  },
  {
    slug: "a-man-with-a-vision-meet-bobby-gray",
    title: "A Man with a Vision: Meet Bobby Gray, the Heart Behind TEXITcoin",
    date: "2024-02-15",
    tag: "Founder",
    readMinutes: 6,
    excerpt:
      "After more than a decade studying money, Bobby Gray mined the very first TEXITcoin block on January 26, 2024 — right here in McKinney, Texas.",
    body: [
      "Bobby Gray didn't stumble into crypto. Sixteen years of designing, manufacturing, and shipping crypto-adjacent products — physical coins, secure storage, mining hardware — laid the groundwork for a single moment: block one, January 26, 2024, McKinney, Texas.",
      "His path has always been about challenging the status quo. Questioning centralized control. Building tools that let regular people take back their financial destiny.",
      "TEXITcoin is the next logical step in that story — and the most ambitious one yet.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
