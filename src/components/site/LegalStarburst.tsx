import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export function LegalStarburst() {
  return (
    <Link
      to="/legal"
      aria-label="Legal Updates — click here"
      className="fixed bottom-6 right-6 z-40 hidden md:block group"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 140 140" className="h-32 w-32 drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <defs>
            <linearGradient id="starburstFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <polygon
            points="70,4 80,28 104,12 102,40 130,38 114,60 138,74 110,82 124,108 96,102 96,130 76,112 64,136 56,112 36,128 36,100 8,104 24,80 0,66 28,58 14,32 42,38 40,10 64,28"
            fill="url(#starburstFill)"
          />
        </svg>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative grid h-32 w-32 place-items-center text-center"
      >
        <div className="px-3">
          <Scale className="mx-auto h-5 w-5 text-primary-foreground" />
          <div className="mt-1 font-display text-[11px] font-bold uppercase leading-tight tracking-wider text-primary-foreground">
            TSSB Legal
            <br />
            Updates
          </div>
          <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground/90">
            Click here →
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
