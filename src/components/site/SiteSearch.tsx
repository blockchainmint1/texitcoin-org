import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SEARCH_ENTRIES as ENTRIES } from "@/data/search-index";

export function SiteSearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
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

  const goToResults = () => {
    setOpen(false);
    navigate({ to: "/search", search: { q: query } });
  };


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
        <CommandInput
          placeholder="Search pages and articles… (⌘K)"
          value={query}
          onValueChange={setQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && query.trim()) {
              e.preventDefault();
              goToResults();
            }
          }}
        />
        <CommandList>
          <CommandEmpty>
            <button type="button" onClick={goToResults} className="text-sm font-semibold text-primary">
              Search all content for “{query}”
            </button>
          </CommandEmpty>
          {query.trim() && (
            <CommandGroup heading="Full search">
              <CommandItem value={`__all__ ${query}`} onSelect={goToResults}>
                <ArrowRight className="mr-2 h-4 w-4" />
                See all results for “{query}”
              </CommandItem>
            </CommandGroup>
          )}
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
