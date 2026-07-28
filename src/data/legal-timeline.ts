export type Entry = {
  date: string;
  title: string;
  body: string;
  link?: { label: string; href: string; dead?: boolean; deadNote?: string };
  secondaryLink?: { label: string; href: string };

  tone?: "win" | "filing" | "context" | "regulator";
  tag?: string;
};

export const ENTRIES: Entry[] = [
  {
    date: "27 Jul 2026",
    title: "Motion for Summary Disposition Denied — We're Going to Hearing",
    tone: "regulator",
    tag: "DENIED",
    body: "ALJ Katerina DeAngelo denied our Motion for Summary Disposition. Expected, and not a ruling on the merits: the order says the securities question and the fraud allegations \"depend upon disputed facts and competing inferences\" that aren't appropriate to resolve on paper. In other words, the judge won't end the case before hearing testimony — exactly the argument the TSSB made in their response. Our legal and procedural challenges (immediate-or-irreparable harm, the Commissioner's authority to order refunds, fair notice, and whether all named respondents are proper parties) were preserved but not granted at this stage. Nothing was decided against us on the law. August is the main event, and we're ready for it.",
    link: {
      label: "Read the order (2 pages)",
      href: "/api/public/ipfs/QmbL684f9UgaCvBssqZHSpZdQE5RCrYiRuU6LJkBd66t7F",
    },
  },
  {
    date: "23 Jul 2026",
    title: "The Empire Strikes Back — TSSB Responds to Our Motion",
    tone: "regulator",
    tag: "THEIR TURN",
    body: "The TSSB filed its 45-page response opposing our Motion for Summary Disposition. Notably, they do not argue we're wrong on the law — they argue the ALJ can't decide this on paper. Their entire theory is that the case turns on disputed facts requiring live testimony from purchasers in August. They lean on Texas's Life Partners test rather than federal Howey caselaw, dismiss Audet v. Fraser as non-binding Connecticut law, and turn our own SEC guidance against us by citing footnotes 105 and 106 — the passages carving out purchasers who passively rely on a pool operator. They also name two investor declarations (Hesse and Webb) and quote our welcome letter's \"sit back and enjoy the ride\" line. We wrote a full breakdown of what they argued, what they conceded, and what it means for August.",
    link: {
      label: "Read the TSSB's response (45 pages)",
      href: "/api/public/ipfs/QmewcJDBJ7MqMrr2jkpXMYPxUA8ymXS4okC9pEdggrDcxU",
    },
    secondaryLink: {
      label: "Full breakdown on the blog →",
      href: "/blog/tssb-response-the-empire-strikes-back",
    },
  },


  {
    date: "8 Jul 2026",

    title: "Motion for Summary Disposition Filed — Quinn Emanuel Swings Back",
    tone: "win",
    tag: "BIG SWING",
    body: "Our team filed a Motion for Summary Disposition asking the ALJ to end the case now, on the law, before the August hearing. Backed by a sworn declaration from Bobby Gray and a 26-page expert report from Andrew Sotak, CPA (Ankura Consulting) — six numbered opinions covering: TXC is a digital commodity, Mining Package purchasers joined a mining pool, MineTXC performed mining pool operator functions, customers could take physical possession of rigs (200+ did), Respondents operated exactly as advertised (verified on-chain), and under U.S. GAAP the packages are ASC 606 revenue contracts — not securities. This is a big filing. We wrote a full breakdown on the blog explaining what was filed, what each opinion means, and why it matters for August.",
    link: {
      label: "Read the full breakdown on the blog →",
      href: "/blog/msd-filed-quinn-emanuel-swings-back",
    },
  },
  {
    date: "19 Jun 2026",
    title: "TSSB Witness List Received and Redacted",
    tone: "filing",
    tag: "THE LIST",
    body: "It's been quiet for a while — no news is often good news while we patiently wait for our August hearing. We just received the TSSB's witness list. Before sharing it publicly, we redacted the names to protect identities and avoid any possibility of witness tampering from our passionate community. We don't recognize any of the names listed — no rangers, no project team managers. Interesting.",
    link: {
      label: "View the redacted witness list",
      href: "/api/public/ipfs/bafkreigddcjuqgkhsmdtco7kzrnv6hnhavotgqjues6ijha3m2xxlavrmu",
      dead: true,
      deadNote: "TSSB said no 👶",
    },
  },

  {
    date: "6 Apr 2026",
    title: "Formal Answer Filed — Full Denial of All Allegations",
    tone: "filing",
    tag: "GLOVES OFF",
    body: "We filed our official Answer to the TSSB's Notice of Hearing in SOAH Docket No. 312-26-14427, categorically denying every allegation in the Emergency Cease and Desist Order. Mining Packages aren't investment contracts under Howey. The TSSB does not even claim TEXITcoin itself is a security. Fraud allegations are legally and factually deficient — no specific false statements, no duty to disclose shown, zero allegation of misappropriated funds, no investor losses. This Answer lays the foundation for our Motion for Summary Adjudication and our defense at the August hearing.",
    link: {
      label: "Read the full response",
      href: "/api/public/ipfs/QmWxa1ZRbifq17rosoHj7GYjUpUv3Td7bGnAaG2hB1UH48",
    },
  },
  {
    date: "25 Mar 2026",
    title: "Hybrid Hearing Ordered — Partial Win on In-Person Request",
    tone: "win",
    tag: "PARTIAL W",
    body: "Administrative Law Judge Katerina DeAngelo granted our motion in part: the four-day merits hearing (Aug 17–20, 2026) will be conducted live at SOAH in Austin, with full in-person attendance for our legal team, witnesses, and community. Remote Zoom attendance still available. Same order also granted pro hac vice for Avi Perry, Alex Rossmiller, and Kurt Wolfe.",
    link: {
      label: "Read the order",
      href: "/api/public/ipfs/QmYhSYoEzPvzowwrcXXFjhWhrLy93D5myaq3GvgMiekgDT",
    },
  },
  {
    date: "18 Mar 2026",
    title: "Notice of Hearing",
    tone: "regulator",
    tag: "MARK YOUR CALENDAR",
    body: "Official Notice of Hearing received from the Texas State Securities Board (SOAH Docket No. 312-26-14427). Formally schedules our contested-case hearing on the merits for August 17–20, 2026 starting 9:00 AM CT — to affirm, modify, or set aside the February 11 Emergency Cease and Desist Order.",
    link: {
      label: "Read the Notice",
      href: "/api/public/ipfs/QmY5guEqUqgAMJkjuyCyC4GPHoNAghKsdrtRvFdonZkVn1",
    },
  },
  {
    date: "17 Mar 2026",
    title: "New SEC Crypto Guidance — Big Tailwind for Our Defense",
    tone: "win",
    tag: "TAILWIND",
    body: "SEC Interpretive Release No. 33-11412 is a landmark step toward regulatory clarity. It explicitly states that protocol mining on public proof-of-work networks — including pool operations and reward distribution — does not involve the offer and sale of securities under Howey. The TSSB's core premise (shoehorning Mining Packages into unregistered securities based on alleged passive returns) is now at odds with federal standards. Our team is integrating this directly into our hearing prep.",
    link: {
      label: "Read the SEC release",
      href: "/api/public/ipfs/QmdKWzWfsft598GddznvVwRy8fZttiVHrokQuDUANBd4Tj",
    },
  },
  {
    date: "16 Mar 2026",
    title: "Hearing Date Secured — Aug 17–20, 2026",
    tone: "filing",
    tag: "GAME ON",
    body: "SOAH issued an Order Scheduling Hearing on the Merits in Docket No. 312-26-14427, setting the contested case hearing for August 17–20, 2026, starting 9:00 AM CT. Though Zoom was offered, we elected to attend in person. This multi-day proceeding gives us the full forum to present evidence, expert testimony, and legal arguments.",
    link: {
      label: "Read the scheduling order",
      href: "/api/public/ipfs/QmTLdYZAutr4nQswynGiwKr8qtenn36KSzfQXmFmVUsCpN",
    },
  },
  {
    date: "11 Mar 2026",
    title: "Our Basic Legal Framework",
    tone: "context",
    tag: "RECEIPTS",
    body: "Now that we've consulted counsel and a blockchain/PoW mining specialist, here's the high-level framework: under Howey, our model fails at least two prongs — (1) no promise or guarantee of profits (returns are market-driven and variable based on network performance), and (2) any value in TEXITcoin comes from community usage and real-world adoption, not passive reliance on promoters' efforts. This isn't fraud or passive investment — it's active participation in a decentralized, mineable ecosystem.",
  },
  {
    date: "11 Mar 2026",
    title: "First Expert Selected",
    tone: "filing",
    tag: "BRAIN HIRED",
    body: "We secured our first expert witness — a highly reputable specialist with deep expertise in blockchain, proof-of-work mining operations, mining pools, and the technical and economic realities of cryptocurrency ecosystems. Their job: make these often-confusing concepts clear and evidence-based for the ALJ.",
  },
  {
    date: "25 Feb 2026",
    title: "Keep Moving Forward — No Pivoting",
    tone: "context",
    tag: "STILL TEXAN",
    body: "Honest Money doesn't pivot. We refuse to abandon the U.S.-rooted mission or transform into just another overseas cloud mining project chasing hype. Price doesn't come from hype, influencers, or passive promises — value emerges from usage. Downtown Digital Dollars, fair & festival cashless payments, Layer 2 applications, and active merchant participation are priority #1.",
  },
  {
    date: "24 Feb 2026",
    title: "TSSB Evidence File Secured — and It's Thin",
    tone: "win",
    tag: "THIN FILE",
    body: "With the evidence file in hand and under review by Quinn Emanuel: no allegations of actual investor losses, no demonstration of imminent or ongoing irreparable injury, no claims of misuse or misappropriation, no Ponzi assertions, no specific proof of fraud, no identified injured parties or complainants. The order relies on structural interpretations — not concrete evidence of wrongdoing.",
  },
  {
    date: "21 Feb 2026",
    title: "10-Day Hearing Option Declined; Timeline Strategic",
    tone: "filing",
    tag: "PLAY THE LONG GAME",
    body: "After consulting Avi Perry, we waived the accelerated 10-day hearing option. Avi's call was clear: rushing it would likely lose. Building a winning case requires time for strategy, research, evidence collection, expert witnesses, and comprehensive prep. We're prioritizing a well-prepared, evidence-driven hearing — not a premature setback.",
  },
  {
    date: "20 Feb 2026",
    title: "TSSB Order Challenged; Hearing Requested",
    tone: "filing",
    tag: "PUNCHED BACK",
    body: "Quinn Emanuel formally submitted a hearing request to Deputy Securities Commissioner Cristi Ramón Ochoa. The filing asserts the Mining Packages don't qualify as securities under the Texas Securities Act, that the order's fraud allegations lack specific false statements, and that the order alleges 'immediate and irreparable public harm' without identifying any actual investor losses or injured parties.",
    link: {
      label: "Read the hearing request",
      href: "/api/public/ipfs/QmaXHTFwDKvw1jJmTEmJR9VTo3otD3QifCnpXm9X8fRjff",
    },
  },
  {
    date: "16 Feb 2026",
    title: "Quinn Emanuel Retained as Lead Counsel",
    tone: "win",
    tag: "TIGERS HIRED",
    body: "We brought in Quinn Emanuel Urquhart & Sullivan LLP for their unmatched track record in high-stakes securities litigation and crypto enforcement. Leading the team: Partner Avi Perry, co-Chair of QE's Securities Litigation Group and former federal prosecutor who headed the DOJ's Market Integrity and Major Frauds Unit. Recent wins include dismissals of TSSB orders against digital asset projects (Apertum Foundation) by arguing tokens were not securities, plus landmark wins against the CFTC.",
  },
  {
    date: "13 Feb 2026",
    title: "The Search for Counsel Begins",
    tone: "context",
    tag: "TIGER HUNT",
    body: "We evaluated firms with deep experience in crypto and securities regulatory defense — particularly those who've successfully challenged similar enforcement actions involving Howey Test interpretations and state-level crypto orders (including against the TSSB itself). We wanted tigers, not settlers.",
  },
  {
    date: "12 Feb 2026",
    title: "mineTXC Mining Sales Halted Globally",
    tone: "filing",
    tag: "PAUSE BUTTON",
    body: "Immediately following the TSSB's order, TEXITcoin, MineTXC, and Blockchain Mint halted all new Mining Package sales and recruitment — not only in Texas, but everywhere. The order specifically prohibits offering or selling unregistered securities in or from Texas, but we took a cautious, broad approach until clarity is achieved.",
  },
  {
    date: "11 Feb 2026",
    title: "Texas State Securities Board Issues Cease & Desist",
    tone: "regulator",
    tag: "INCOMING",
    body: "The TSSB issued Emergency Cease and Desist Order No. ENF-26-CDO-1893 against TEXITcoin, MineTXC, Blockchain Mint, and founder Robert J. (Bobby) Gray, alleging the Mining Packages constitute unregistered securities sold through a multi-level marketing structure. For 98 weeks prior, mineTXC operated as a community currency project in Texas without any prior regulatory incidents. We are fully complying while pursuing a robust legal strategy.",
    link: {
      label: "Read the Cease & Desist Order",
      href: "/api/public/ipfs/bafybeihd7ialliyuru5gabyctpdjsfas7a6yvhka37ifxxmiw5tku4p4lq",
    },
  },
];

export function entryKey(e: Entry): string {
  return `${e.date} :: ${e.title}`;
}
