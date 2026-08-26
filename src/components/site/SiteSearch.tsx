import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Entry = { label: string; to: string; group: string; keywords?: string };

const ENTRIES: Entry[] = [
  // Start here
  { label: "Home", to: "/", group: "Start here", keywords: "texitcoin home" },
  { label: "Get TXC", to: "/buy", group: "Start here", keywords: "buy purchase exchange" },
  { label: "Whitepaper", to: "/whitepaper", group: "Start here", keywords: "paper technical" },
  { label: "FAQ", to: "/faq", group: "Start here", keywords: "questions answers help" },

  // Foundation
  { label: "Mining (Proof of Work)", to: "/proof-of-work", group: "Foundation", keywords: "pow asic hash mine" },
  { label: "Digital Currency", to: "/currency", group: "Foundation", keywords: "money currency" },
  { label: "Community Value", to: "/value", group: "Foundation" },
  { label: "Leadership", to: "/leadership", group: "Foundation", keywords: "bobby gray team founders" },
  { label: "Philosophy & Character", to: "/philosophy", group: "Foundation", keywords: "core values integrity mulligan mint bankruptcy" },
  { label: "Bobby's Story", to: "/bobby", group: "Foundation", keywords: "bobby gray personal history honest money" },
  { label: "Team", to: "/team", group: "Foundation" },
  { label: "Tokenomics", to: "/tokenomics", group: "Foundation", keywords: "supply emission halving" },

  // Discover
  { label: "The Mine", to: "/mine", group: "Discover", keywords: "immersion cooling asic" },
  { label: "The Hit List", to: "/market", group: "Discover", keywords: "top 100 market cap rankings" },
  { label: "TXC in the News", to: "/in-the-news", group: "Discover", keywords: "press media articles" },
  { label: "Legal Updates", to: "/legal", group: "Discover", keywords: "tssb court hearing soah" },
  { label: "Troll Index", to: "/trolls", group: "Discover" },
  { label: "Videos & Media", to: "/videos", group: "Discover" },
  { label: "Zoom Call Archive", to: "/zoom", group: "Discover", keywords: "honest money hour live thursday" },
  { label: "Why Texas", to: "/texas", group: "Discover", keywords: "history alamo lone star" },
  { label: "TEXIT Explained", to: "/texit", group: "Discover", keywords: "secession independence politics" },
  { label: "Blog", to: "/blog", group: "Discover", keywords: "articles posts writing" },
  { label: "Identity & Press Kit", to: "/press", group: "Discover", keywords: "logo brand assets" },
  { label: "Site Stats", to: "/stats", group: "Discover", keywords: "traffic analytics pageviews" },

  // Resources
  { label: "Wallets", to: "/wallets", group: "Resources", keywords: "cold storage web wallet honest money" },
  { label: "Build on TXC", to: "/build", group: "Resources", keywords: "developers api rpc omni layer 2" },
  { label: "Roadmap", to: "/roadmap", group: "Resources" },
  { label: "wTXC on Ethereum", to: "/wtxc", group: "Resources", keywords: "wrapped erc20" },
  { label: "Merch", to: "/merch", group: "Resources", keywords: "swag gear shirts" },
  { label: "Disclosures", to: "/disclosures", group: "Resources" },
  { label: "Terms", to: "/terms", group: "Resources" },
  { label: "Privacy", to: "/privacy", group: "Resources" },
];

export function SiteSearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const groups = Array.from(new Set(ENTRIES.map((e) => e.group)));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className={`grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground ${className}`}
      >
        <Search className="h-4 w-4" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages… (⌘K)" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((g) => (
            <CommandGroup key={g} heading={g}>
              {ENTRIES.filter((e) => e.group === g).map((e) => (
                <CommandItem
                  key={e.to}
                  value={`${e.label} ${e.keywords ?? ""}`}
                  onSelect={() => {
                    setOpen(false);
                    navigate({ to: e.to });
                  }}
                >
                  {e.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
