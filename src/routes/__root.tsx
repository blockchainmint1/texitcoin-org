import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";

const QUIPS = [
  "This trail's gone colder than a well-digger's belt buckle.",
  "Whatever you were huntin' done lit out for the territories.",
  "Ain't nothin' out here but tumbleweeds and bad decisions.",
  "Y'all took a wrong turn at Albuquerque, partner.",
  "This page got deported back to the Union.",
  "Reckon this URL seceded without tellin' nobody.",
];

function NotFoundComponent() {
  const [quip, setQuip] = useState(QUIPS[0]);
  useEffect(() => {
    setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Sky gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.28 0.08 30) 0%, oklch(0.42 0.18 45) 35%, oklch(0.55 0.22 55) 60%, oklch(0.32 0.05 30) 100%)",
        }}
        aria-hidden
      />
      {/* Sun */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] -z-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.92 0.18 80) 0%, oklch(0.78 0.22 60) 55%, transparent 75%)",
          filter: "blur(2px)",
        }}
        aria-hidden
      />
      {/* Ground silhouette */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 w-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,120 L80,90 L160,110 L240,75 L340,100 L440,60 L560,95 L680,70 L820,105 L940,80 L1060,100 L1200,85 L1200,200 L0,200 Z"
          fill="oklch(0.18 0.04 30)"
        />
        <path
          d="M0,160 L120,140 L260,155 L400,135 L560,158 L720,140 L880,160 L1040,145 L1200,158 L1200,200 L0,200 Z"
          fill="oklch(0.1 0.02 30)"
        />
      </svg>

      {/* Tumbleweed */}
      <div
        className="pointer-events-none absolute bottom-16 left-0 z-[2] text-5xl"
        style={{
          animation: "tumble-across 14s linear infinite",
        }}
        aria-hidden
      >
        🌾
      </div>

      <style>{`
        @keyframes tumble-across {
          0% { transform: translateX(-10vw) rotate(0deg); }
          100% { transform: translateX(110vw) rotate(1440deg); }
        }
        @keyframes star-flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
      `}</style>

      <div className="relative z-10 max-w-xl text-center">
        <div className="mb-2 text-6xl" style={{ animation: "star-flicker 2.4s ease-in-out infinite" }}>
          ⭐
        </div>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontSize: "clamp(5rem, 18vw, 10rem)",
            lineHeight: 0.9,
            color: "oklch(0.96 0.02 80)",
            textShadow: "0 6px 0 oklch(0.25 0.1 30), 0 12px 30px oklch(0.15 0 0 / 0.6)",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </h1>
        <h2
          className="mt-4 text-2xl font-bold uppercase tracking-[0.2em]"
          style={{ color: "oklch(0.96 0.02 80)" }}
        >
          Lost in the Lone Star State
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-base italic"
          style={{ color: "oklch(0.92 0.04 80 / 0.9)" }}
        >
          "{quip}"
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider transition-transform hover:scale-105"
            style={{
              background: "oklch(0.96 0.02 80)",
              color: "oklch(0.2 0.08 30)",
              boxShadow: "0 4px 0 oklch(0.25 0.1 30)",
            }}
          >
            🤠 Mosey on home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "KmLg2IaIjrk1Ay00WgoVhLHWoOm82BhOlVzCebRO6EU" },
      { title: "TEXITcoin: Layer 1 Currency Mined in Texas" },
      { name: "description", content: "TEXITcoin (TXC) is a Layer 1 cryptocurrency mined in Texas — sound money for a sovereign Lone Star State. Live on Bitmart since 2024." },
      { name: "author", content: "TEXITcoin" },
      { property: "og:title", content: "TEXITcoin: Layer 1 Currency Mined in Texas" },
      { property: "og:description", content: "TEXITcoin (TXC) is a Layer 1 cryptocurrency mined in Texas — sound money for a sovereign Lone Star State. Live on Bitmart since 2024." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@texitcoin" },
      { name: "twitter:title", content: "TEXITcoin: Layer 1 Currency Mined in Texas" },
      { name: "twitter:description", content: "TEXITcoin (TXC) is a Layer 1 cryptocurrency mined in Texas — sound money for a sovereign Lone Star State. Live on Bitmart since 2024." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b81936dd-a3ee-4374-8817-2b0360b2b59d/id-preview-eb6d076e--34565094-3905-4629-b19a-ad31bb8bb153.lovable.app-1778496316656.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b81936dd-a3ee-4374-8817-2b0360b2b59d/id-preview-eb6d076e--34565094-3905-4629-b19a-ad31bb8bb153.lovable.app-1778496316656.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
