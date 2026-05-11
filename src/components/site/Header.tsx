import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/txc-logo.png";

const NAV = [
  { label: "Foundation", href: "/#foundation" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Specs", href: "/#specs" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="TEXITcoin logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <div className="leading-tight">
            <div className="font-display text-xl font-bold tracking-wide">
              TEXIT<span className="text-primary">coin</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Honest money · Mined in Texas
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-red-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
          >
            Get TXC
            <span aria-hidden>→</span>
          </a>
          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
