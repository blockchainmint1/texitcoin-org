import type { Entry } from "./legal-timeline";
import { ENTRIES as TSSB_ENTRIES } from "./legal-timeline";

export type CaseStatus = "active" | "awaiting-decision" | "closed";

export type LegalCase = {
  slug: string;
  /** Where the action was brought */
  jurisdiction: string;
  jurisdictionCode: string;
  agency: string;
  agencyShort: string;
  docket: string;
  title: string;
  shortTitle: string;
  opened: string;
  status: CaseStatus;
  statusLabel: string;
  /** Who is actually named in the action */
  respondents: string[];
  summary: string;
  href: string;
  entries: Entry[];
};

export const AZ_ENTRIES: Entry[] = [
  {
    date: "27 Aug 2026",
    title: "Arizona Corporation Commission Serves a Temporary C&D on IDMC",
    tone: "regulator",
    tag: "INCOMING",
    body:
      "The Securities Division of the Arizona Corporation Commission issued a Temporary Order to Cease and Desist and Notice of Opportunity for Hearing (Docket No. S-21421A-26-0387) naming Iskander Digital Mining Cooperative — a Wyoming DUNA — along with Arizona promoter Patriot Trading Metals Group, LLC and Joseph Jaquint. The Division alleges IDMC's \"Seat on the Rocket Ship\" memberships are unregistered securities offered by unregistered dealers under A.R.S. §§ 44-1841 and 44-1842. The order is effective immediately; respondents have 20 days to request a hearing and 30 days to answer. Note what this case is and is not: TEXITcoin, MineTXC, and Blockchain Mint are not respondents, and the order does not claim TXC itself is a security. We're publishing the full document the same way we published everything in Texas — unredacted, on IPFS, day one.",
    link: {
      label: "Read the Arizona order (11 pages)",
      href: "/api/public/ipfs/bafybeibh7lerry3ts5ba4425nk4uknmhyar4pvlsclt5ec2kk62bxwgvsa",
    },
  },
];

export const CASES: LegalCase[] = [
  {
    slug: "texas",
    jurisdiction: "Texas",
    jurisdictionCode: "TX",
    agency: "Texas State Securities Board / SOAH",
    agencyShort: "TSSB",
    docket: "SOAH Docket 312-26-14427",
    title: "TSSB v. TEXITcoin",
    shortTitle: "TSSB v. TEXITcoin",
    opened: "11 Feb 2026",
    status: "awaiting-decision",
    statusLabel: "Hearing concluded · awaiting proposal for decision",
    respondents: ["TEXITcoin", "MineTXC", "Blockchain Mint", "Robert J. Gray"],
    summary:
      "Emergency Cease & Desist over mineTXC Mining Packages. Four-day contested hearing held at SOAH 17–20 Aug 2026. Briefs and the judge's proposal for decision are due by year-end.",
    href: "/legal",
    entries: TSSB_ENTRIES,
  },
  {
    slug: "arizona",
    jurisdiction: "Arizona",
    jurisdictionCode: "AZ",
    agency: "Arizona Corporation Commission, Securities Division",
    agencyShort: "AZCC",
    docket: "Docket S-21421A-26-0387",
    title: "In the matter of Iskander Digital Mining Cooperative",
    shortTitle: "AZCC v. IDMC",
    opened: "27 Aug 2026",
    status: "active",
    statusLabel: "Temporary order in effect · hearing window open",
    respondents: [
      "Iskander Digital Mining Cooperative",
      "Patriot Trading Metals Group, LLC",
      "Joseph Jaquint",
    ],
    summary:
      "Temporary C&D alleging IDMC membership \"Seats\" are unregistered securities sold by unregistered dealers in or from Arizona. TEXITcoin, MineTXC, and Blockchain Mint are not respondents.",
    href: "/legal/arizona",
    entries: AZ_ENTRIES,
  },
];

export function getCase(slug: string): LegalCase | undefined {
  return CASES.find((c) => c.slug === slug);
}
