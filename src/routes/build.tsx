import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Pickaxe,
  Repeat,
  Rocket,
  Server,
  Terminal,
  Wallet,
  Zap,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const MEMPOOL_API = "https://mempool.texitcoin.org/api";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build on TEXITcoin — Developer Hub & Network Resources" },
      {
        name: "description",
        content:
          "Tools, APIs, explorers, wallets, and live network stats for builders on the TEXITcoin Layer 1 network. Fast, cheap, Texas-mined.",
      },
      { property: "og:title", content: "Build on TEXITcoin — Developer Hub" },
      {
        property: "og:description",
        content:
          "One repo for everything you need to build on TEXITcoin: APIs, explorers, mining pool, wallets, swap, wrapped TXC, and live network stats.",
      },
    ],
  }),
  component: BuildPage,
});

// ---------- Live network stats ----------

type Block = {
  id: string;
  height: number;
  timestamp: number;
  tx_count: number;
  size: number;
  difficulty: number;
};

type NetworkStats = {
  height: number | null;
  hashrate: number | null;
  difficulty: number | null;
  fastestFee: number | null;
  blocks: Block[];
  pools: { name: string; blockCount: number; slug: string }[];
  totalPoolBlocks: number;
  difficultyProgress: number | null;
  remainingBlocks: number | null;
  blockTimeAvg: number | null;
  healthy: boolean;
};

const EMPTY: NetworkStats = {
  height: null,
  hashrate: null,
  difficulty: null,
  fastestFee: null,
  blocks: [],
  pools: [],
  totalPoolBlocks: 0,
  difficultyProgress: null,
  remainingBlocks: null,
  blockTimeAvg: null,
  healthy: false,
};

function fmtHash(hps: number | null): string {
  if (!hps) return "—";
  const u = [
    [1e18, "EH/s"],
    [1e15, "PH/s"],
    [1e12, "TH/s"],
    [1e9, "GH/s"],
    [1e6, "MH/s"],
    [1e3, "KH/s"],
  ] as const;
  for (const [v, s] of u) if (hps >= v) return `${(hps / v).toFixed(2)} ${s}`;
  return `${hps.toFixed(0)} H/s`;
}

function fmtNum(n: number | null): string {
  return n == null ? "—" : n.toLocaleString("en-US");
}

function fmtDiff(d: number | null): string {
  if (!d) return "—";
  if (d >= 1e9) return `${(d / 1e9).toFixed(2)} B`;
  if (d >= 1e6) return `${(d / 1e6).toFixed(2)} M`;
  if (d >= 1e3) return `${(d / 1e3).toFixed(2)} K`;
  return d.toFixed(0);
}

function fmtAgo(seconds: number): string {
  if (seconds < 60) return `${Math.max(0, Math.floor(seconds))}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

function useNetworkStats() {
  const [stats, setStats] = useState<NetworkStats>(EMPTY);
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [blocksRes, hashRes, feesRes, diffRes, poolsRes] = await Promise.all([
          fetch(`${MEMPOOL_API}/blocks`),
          fetch(`${MEMPOOL_API}/v1/mining/hashrate/3d`),
          fetch(`${MEMPOOL_API}/v1/fees/recommended`),
          fetch(`${MEMPOOL_API}/v1/difficulty-adjustment`),
          fetch(`${MEMPOOL_API}/v1/mining/pools/1w`),
        ]);
        const blocks: Block[] = blocksRes.ok ? await blocksRes.json() : [];
        const hashData = hashRes.ok ? await hashRes.json() : null;
        const fees = feesRes.ok ? await feesRes.json() : null;
        const diff = diffRes.ok ? await diffRes.json() : null;
        const pools = poolsRes.ok ? await poolsRes.json() : null;

        const tip = blocks[0];
        const latestHash =
          hashData?.hashrates?.length
            ? hashData.hashrates[hashData.hashrates.length - 1].avgHashrate
            : hashData?.currentHashrate ?? null;

        if (cancelled) return;
        setStats({
          height: tip?.height ?? null,
          hashrate: latestHash,
          difficulty: tip?.difficulty ?? null,
          fastestFee: fees?.fastestFee ?? null,
          blocks: blocks.slice(0, 6),
          pools: pools?.pools ?? [],
          totalPoolBlocks: pools?.blockCount ?? 0,
          difficultyProgress: diff?.progressPercent ?? null,
          remainingBlocks: diff?.remainingBlocks ?? null,
          blockTimeAvg: diff?.adjustedTimeAvg ? diff.adjustedTimeAvg / 1000 : null,
          healthy: true,
        });
      } catch {
        if (!cancelled) setStats((s) => ({ ...s, healthy: false }));
      }
    }
    load();
    const id = setInterval(load, 30_000);
    const tick = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
      clearInterval(tick);
    };
  }, []);

  return { stats, now };
}

// ---------- Static content ----------

const RESOURCES = [
  {
    icon: Globe,
    name: "Block Explorer",
    url: "https://explorer.texitcoin.org/",
    desc: "Browse blocks, transactions, addresses, and chain history.",
    tag: "Explorer",
  },
  {
    icon: Layers,
    name: "Mempool",
    url: "https://mempool.texitcoin.org/",
    desc: "Live mempool view, fee estimates, and mining stats. Powers our public REST API.",
    tag: "Network",
  },
  {
    icon: Pickaxe,
    name: "Mining Pool",
    url: "https://pool.texitcoin.org/",
    desc: "Point your Scrypt miner here. Stratum URL, worker stats, and payouts.",
    tag: "Mining",
  },
  {
    icon: Wallet,
    name: "Web Wallet",
    url: "https://wallet.texitcoin.org/",
    desc: "Send, receive, and manage TXC in the browser. Non-custodial.",
    tag: "Wallets",
  },
  {
    icon: Repeat,
    name: "TXC Swap",
    url: "https://swap.texitcoin.org/",
    desc: "On/off-ramp between TXC, LTC, and other supported assets.",
    tag: "DEX",
  },
  {
    icon: GitBranch,
    name: "Layer 2 & Tokens",
    url: "https://tokens.texitcoin.org/",
    desc: "Issue tokens, browse the L2, and explore programmable assets on TXC.",
    tag: "L2",
  },
];

const WHY = [
  {
    icon: Zap,
    title: "Bitcoin is jammed up",
    body: "Congested mempools, slow confirmations, and fees that price out everyday use. Building on Bitcoin today means building for institutions.",
  },
  {
    icon: Gauge,
    title: "TXC is new, fast, and cheap",
    body: "3-minute blocks, sub-cent fees, and headroom for real throughput. Users actually transact — they don't just HODL.",
  },
  {
    icon: Pickaxe,
    title: "Mined in Texas, by individuals",
    body: "Texas power. Texas land, workers, infrastructure. Mining rewards owned by individuals — not banks. Utility benefits the people building it.",
  },
];

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/blocks",
    desc: "Latest 10 confirmed blocks (height, timestamp, tx count, size, difficulty).",
  },
  {
    method: "GET",
    path: "/api/block/:hash",
    desc: "Full block details by block hash.",
  },
  {
    method: "GET",
    path: "/api/block-height/:height",
    desc: "Look up a block hash by its height.",
  },
  {
    method: "GET",
    path: "/api/tx/:txid",
    desc: "Transaction details, inputs/outputs, and confirmation status.",
  },
  {
    method: "GET",
    path: "/api/address/:address",
    desc: "Address summary: balance, tx count, and chain stats.",
  },
  {
    method: "GET",
    path: "/api/address/:address/txs",
    desc: "Transaction history for any address (paginated).",
  },
  {
    method: "GET",
    path: "/api/mempool",
    desc: "Live mempool size, fee histogram, and pending tx count.",
  },
  {
    method: "GET",
    path: "/api/v1/fees/recommended",
    desc: "Fee recommendations: fastest, half-hour, hour, economy.",
  },
  {
    method: "GET",
    path: "/api/v1/mining/hashrate/3d",
    desc: "Network hashrate samples — perfect for charts and dashboards.",
  },
  {
    method: "GET",
    path: "/api/v1/mining/pools/1w",
    desc: "Mining pool distribution and block counts.",
  },
  {
    method: "GET",
    path: "/api/v1/difficulty-adjustment",
    desc: "Progress toward the next difficulty retarget.",
  },
  {
    method: "POST",
    path: "/api/tx",
    desc: "Broadcast a signed raw transaction to the network.",
  },
];

const QUICK_START = `# Get the latest block
curl https://mempool.texitcoin.org/api/blocks | jq '.[0]'

# Network hashrate
curl https://mempool.texitcoin.org/api/v1/mining/hashrate/3d

# Recommended fees (sat/vB)
curl https://mempool.texitcoin.org/api/v1/fees/recommended

# Address balance
curl https://mempool.texitcoin.org/api/address/<txc_address>

# Broadcast a signed tx
curl -X POST -d '<rawtx_hex>' \\
  https://mempool.texitcoin.org/api/tx`;

// ---------- Ecosystem API docs ----------

type DocSection = {
  heading: string;
  body?: React.ReactNode;
  code?: string;
  lang?: string;
};

const OMNI_SECTIONS: DocSection[] = [
  {
    heading: "1 · Network parameters",
    body: (
      <ul className="space-y-1.5">
        <li><span className="text-muted-foreground">P2PKH version byte:</span> <code className="font-mono">0x42</code> (addresses start with <code className="font-mono">T</code>)</li>
        <li><span className="text-muted-foreground">Message-sign prefix:</span> <code className="font-mono">"Texitcoin Signed Message:\n"</code></li>
        <li><span className="text-muted-foreground">Mempool / Esplora API:</span> <code className="font-mono">https://mempool.texitcoin.org/api</code></li>
        <li><span className="text-muted-foreground">Dust threshold (effective):</span> <code className="font-mono">10,000 sats</code> — not Bitcoin's 546</li>
        <li><span className="text-muted-foreground">Suggested fee rate:</span> <code className="font-mono">5 sat/vB</code></li>
        <li><span className="text-muted-foreground">Omni magic bytes:</span> <code className="font-mono">"omni"</code> (4 ASCII bytes, no extra framing)</li>
      </ul>
    ),
  },
  {
    heading: "2 · Quickstart",
    body: (
      <p>
        You need three things: a funded TXC address with the <strong>issuer's private key</strong>;
        access to a TXC full node with the Omni module enabled (JSON-RPC, HTTP Basic auth);
        and the <strong>property ID</strong> of your token. Then the loop is{" "}
        <em>build payload → assemble tx → sign → broadcast</em>. The node only helps with step 1
        — you assemble, sign, and broadcast yourself. The wallet RPCs assume the issuer key
        lives in the node's wallet, which is not how most app integrations work.
      </p>
    ),
  },
  {
    heading: "3 · RPC reference",
    body: (
      <ul className="space-y-1">
        <li><code className="font-mono">omni_getproperty &lt;id&gt;</code> — token metadata + issuer address</li>
        <li><code className="font-mono">omni_getbalance &lt;addr&gt; &lt;id&gt;</code> — balance of one address</li>
        <li><code className="font-mono">omni_createpayload_grant &lt;id&gt; &lt;amount&gt; &lt;grantdata&gt;</code> — payload for a managed-token mint</li>
        <li><code className="font-mono">omni_createpayload_simplesend &lt;id&gt; &lt;amount&gt;</code> — payload for a transfer</li>
        <li><code className="font-mono">omni_decodetransaction &lt;rawhex&gt;</code> — sanity-check a tx before broadcast</li>
        <li><code className="font-mono">omni_gettransaction &lt;txid&gt;</code> — read back a parsed Omni tx after confirmation</li>
      </ul>
    ),
    code: `curl -u user:pass -H 'content-type: text/plain' \\
  -d '{"jsonrpc":"1.0","id":"x","method":"omni_getproperty","params":[21]}' \\
  https://your-txc-node.example/`,
  },
  {
    heading: "4 · Minting (Grant)",
    body: (
      <p>
        For <strong>managed</strong> tokens, the issuer mints new units via a Grant. Ask the
        node for the Omni payload, pull UTXOs from Esplora, and build a tx with{" "}
        <strong>three outputs in this exact order</strong>:{" "}
        <code className="font-mono">OP_RETURN(payload)</code>, dust to the receiver, change back
        to the issuer. Sign every input with the issuer key and POST the raw hex to{" "}
        <code className="font-mono">/api/tx</code>.
      </p>
    ),
    code: `// 1. Build payload
const payloadHex = await rpc("omni_createpayload_grant", [
  21,             // property id
  "100.00000000", // amount as decimal string (8 dp for divisible)
  "",             // grantdata — REQUIRED, even when empty
]);

// 2. Assemble the OP_RETURN — just "omni" + payload, NOTHING else
import * as bitcoin from "bitcoinjs-lib";
const opReturnData = Buffer.concat([
  Buffer.from("omni", "ascii"),
  Buffer.from(payloadHex, "hex"),
]);
const opReturn = bitcoin.payments.embed({ data: [opReturnData] }).output!;

const psbt = new bitcoin.Psbt({ network: TXC });
// ... addInput() for each issuer UTXO with nonWitnessUtxo ...
psbt.addOutput({ script: opReturn, value: 0n });
psbt.addOutput({ address: receiver, value: 10_000n }); // dust = 10k sats on TXC
psbt.addOutput({ address: issuer,   value: changeSats });
psbt.signAllInputs(signer);
psbt.finalizeAllInputs();

// 3. Broadcast
const rawHex = psbt.extractTransaction().toHex();
const txid = await fetch("https://mempool.texitcoin.org/api/tx", {
  method: "POST", headers: { "content-type": "text/plain" }, body: rawHex,
}).then(r => r.text());`,
  },
  {
    heading: "5 · Sending tokens",
    body: (
      <p>
        Wallet-to-wallet transfer is the same shape as a mint — swap the payload method to{" "}
        <code className="font-mono">omni_createpayload_simplesend</code>, sign with the{" "}
        <em>sender's</em> key, and send the dust output to the recipient.
      </p>
    ),
    code: `const payloadHex = await rpc("omni_createpayload_simplesend", [
  21,
  "5.00000000",
]);
// ...same OP_RETURN + dust + change construction as Grant.`,
  },
  {
    heading: "6 · Reading balances",
    body: (
      <p>
        Balances only update <strong>after the funding tx confirms</strong>. Until then{" "}
        <code className="font-mono">omni_getbalance</code> returns <code className="font-mono">0</code>.
        For optimistic UI, mirror the expected balance in your own DB and reconcile periodically.
      </p>
    ),
    code: `type Bal = { balance: string; reserved: string; frozen: string };
const bal: Bal = await rpc("omni_getbalance", [address, 21]);
// bal.balance is a decimal string like "100.00000000"`,
  },
  {
    heading: "7 · OP_RETURN format (Class C)",
    body: (
      <p>
        Class C transactions encode the entire operation in <code className="font-mono">OP_RETURN</code>.
        The payload returned by <code className="font-mono">omni_createpayload_*</code> already
        contains the version + type bytes — only prepend the 4-byte <code className="font-mono">"omni"</code>{" "}
        magic. Nothing else.
      </p>
    ),
    code: `+------+----------------------------------------------+
| omni |  <payload from omni_createpayload_*>          |
+------+----------------------------------------------+
  4 B          variable (already includes version+type)`,
  },
  {
    heading: "8 · Gotchas (the stuff that cost us a day)",
    body: (
      <div className="space-y-4">
        <div>
          <div className="font-semibold text-foreground">Don't prepend extra zero bytes to the payload.</div>
          <p>A common pattern in older Omni examples is <code className="font-mono">"omni" + 0x00 0x00 + payload</code>. On TXC that causes the node to interpret your Grant as a Simple Send for a random property ID — version + type bytes get shifted. <code className="font-mono">omni_decodetransaction</code> shows the wrong type, the receiver balance never moves, and there's no broadcast error. Concatenate just <code className="font-mono">"omni" + payload</code>.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground">The <code className="font-mono">grantdata</code> argument is not optional.</div>
          <p>Upstream Omni docs say it's optional. On TXC the 2-arg form returns the help text instead of a payload. It's a free-form attribution memo embedded inside the Omni payload itself and shows up in <code className="font-mono">omni_gettransaction</code>. Cap it at ~60 bytes — the entire OP_RETURN must fit under the node's 80-byte datacarrier limit.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground">Chain your own change for back-to-back mints.</div>
          <p>If you mint twice in quick succession, the second mint's only spendable coin is the unconfirmed change from the first. Symptom: <code className="font-mono">"issuer has no UTXOs"</code> while a block explorer shows the address is funded. Fix: <em>don't</em> filter unconfirmed UTXOs from <code className="font-mono">/address/:addr/utxo</code>; sort confirmed-first and fall through to your own change. Caveat: spending unconfirmed change builds a tx chain that fails together if the parent gets evicted. For high throughput, batch grants or pre-fund several issuer UTXOs.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground">Dust threshold is 10,000 sats.</div>
          <p>Bitcoin default is 546. TXC mempool policy rejects anything under 10,000 as dust. Use 10,000 for the recipient's reference output and budget for it in your fee math.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground">Amount formatting.</div>
          <p>Divisible tokens: decimal string, up to 8 dp (<code className="font-mono">"100"</code> and <code className="font-mono">"100.00000000"</code> both work). Indivisible: integer string. Don't pass numbers — JSON-RPC will round large values.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground">Wallet RPCs aren't useful for app integrations.</div>
          <p><code className="font-mono">omni_send</code> and friends require the signing key to be in the node's wallet. For a hosted app where keys live in your backend or in the user's wallet, use <code className="font-mono">omni_createpayload_*</code> and assemble the tx yourself.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground">Confirmations.</div>
          <p>Broadcasted Omni txs hit the mempool immediately, but Omni only parses them after confirmation. <code className="font-mono">omni_gettransaction</code> returns nothing for 0-conf — poll until the block lands or watch the address via Esplora.</p>
        </div>
      </div>
    ),
  },
];

const STREAM_SECTIONS: DocSection[] = [
  {
    heading: "1 · The CID is the truth",
    body: (
      <p>
        Every video is identified by its IPFS CID — a cryptographic hash of the file's bytes.
        Same bytes → same CID. The database row, the gateway URL, the chain timestamp, and any
        third-party IPFS pinner anywhere in the world all reference the same content via the
        same string. If the gateway goes dark, anyone can re-pin the CID elsewhere and the link
        still resolves.
      </p>
    ),
    code: `# A CID looks like:
bafybeigsqgnxogzyi7fdyogldjvia3juqkxnjv...

# Anyone can fetch it from any IPFS gateway:
curl -L https://ipfs.io/ipfs/{cid}            -o video.mp4
curl -L https://gateway.pinata.cloud/ipfs/{cid} -o video.mp4
curl -L https://streamtxc.com/api/stream/{cid}  -o video.mp4`,
  },
  {
    heading: "2 · On-chain proof & OP_RETURN",
    body: (
      <p>
        Every lifecycle event is broadcast as a tiny TXC transaction whose{" "}
        <code className="font-mono">OP_RETURN</code> output carries an ≤80-byte tag. Each event
        is sent <em>to</em> a per-video deposit address, so a single mempool address page is the
        entire public history of that video. Comments work the same way: the comment body is
        pinned to IPFS, then its CID is stamped against the video's wallet.
      </p>
    ),
    code: `event tags broadcast in OP_RETURN

  C  claim       — first time a video lands on the network
  P  payment     — hosting payment received
  R  renewal     — hosting prepaid for another period
  T  takedown    — uploader took it down
  D  DMCA        — moderator pulled it
  M  metadata    — title/description/uploader update
  X  comment     — IPFS CID of a new comment body`,
  },
  {
    heading: "3 · Login by signing",
    body: (
      <p>
        No usernames or passwords. To prove you control a wallet, sign a one-time challenge
        message with TXC Core's <em>Sign Message</em> tool (or any wallet that produces a
        base64 ECDSA signature for a legacy <code className="font-mono">T…</code> address). The
        server verifies it against the TXC node — no transaction, no spend, no gas. The wallet
        never moves.
      </p>
    ),
    code: `# 1. Request a challenge
curl -X POST https://streamtxc.com/_serverFn/requestWalletLogin \\
  -H "content-type: application/json" \\
  -d '{"data":{"wallet":"T9..."}}'
# → { "message": "streamTXC — Sign in...", "challengeToken": "eyJhbGc..." }

# 2. Sign \`message\` in TXC Core (File → Sign Message), then:
curl -X POST https://streamtxc.com/_serverFn/completeWalletLogin \\
  -H "content-type: application/json" \\
  -d '{"data":{
        "challengeToken": "eyJhbGc...",
        "signature":      "H4r...=="
      }}'
# → session token (5 min challenge TTL)`,
  },
  {
    heading: "4 · Stream a video — GET /api/stream/{cid}",
    body: (
      <p>
        302-redirects to a dedicated Pinata gateway for the given CID. Supports HTTP Range
        requests, so it works as a drop-in <code className="font-mono">&lt;video src&gt;</code>{" "}
        for any browser, native app, or video player. Each call also increments the on-site
        view counter (debounced per IP).
      </p>
    ),
    code: `curl -L https://streamtxc.com/api/stream/{cid} -o video.mp4

<!-- HTML use -->
<video src="https://streamtxc.com/api/stream/{cid}" controls />`,
  },
  {
    heading: "5 · Embed the player — GET /embed/{cid}",
    body: (
      <p>
        A bare-bones streamTXC player you can drop into any page. Optional query params:{" "}
        <code className="font-mono">autoplay=1</code>, <code className="font-mono">muted=1</code>,
        <code className="font-mono">t=30</code> (start seconds).
      </p>
    ),
    code: `<iframe
  src="https://streamtxc.com/embed/{cid}?autoplay=1&muted=1"
  width="640" height="360"
  frameborder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>`,
  },
  {
    heading: "6 · Verify a TXC signed message — POST /api/public/txc-verify-message",
    body: (
      <p>
        Cryptographically verifies a message signed by any TXC wallet. Useful for
        wallet-gated content, comments, or proofs of ownership against any TXC address — not
        just streamTXC ones.
      </p>
    ),
    code: `curl -X POST https://streamtxc.com/api/public/txc-verify-message \\
  -H "content-type: application/json" \\
  -d '{
    "address":   "T9...",
    "signature": "H4r...==",
    "message":   "I own this wallet"
  }'
# → { "valid": true }`,
  },
  {
    heading: "7 · TXC node health — GET /api/public/txc-health",
    body: (
      <p>
        Live status of the TXC node powering on-chain timestamps: tip block height, chain info,
        hot-wallet balance, and the public top-up address. Handy for monitoring or status
        dashboards.
      </p>
    ),
    code: `curl https://streamtxc.com/api/public/txc-health | jq`,
  },
  {
    heading: "8 · Audit on mempool",
    body: (
      <p>
        Every video, comment, and boost has its own TXC wallet. The full lifecycle is published
        as on-chain transactions to that address. Audit any of it directly:
      </p>
    ),
    code: `https://mempool.texitcoin.org/address/{video_wallet}`,
  },
];

function DocBlock({
  badge,
  title,
  intro,
  sections,
}: {
  badge: string;
  title: string;
  intro: React.ReactNode;
  sections: DocSection[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-10">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
        {badge}
      </div>
      <h3 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">{title}</h3>
      <div className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{intro}</div>

      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <div key={s.heading}>
            <h4 className="font-display text-xl font-bold text-foreground">{s.heading}</h4>
            {s.body && (
              <div className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-foreground [&_code]:text-[0.85em]">
                {s.body}
              </div>
            )}
            {s.code && (
              <pre className="mt-4 overflow-x-auto whitespace-pre rounded-lg border border-border bg-[#0b0b0b] p-4 text-xs leading-relaxed text-foreground/90">
{s.code}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Page ----------

function BuildPage() {
  const { stats, now } = useNetworkStats();
  const tipAge = stats.blocks[0] ? now - stats.blocks[0].timestamp : null;
  const minerCount = stats.pools.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Builder Hub
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-7xl text-balance">
              Build on a network that <span className="text-primary">works for you</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Bitcoin is jammed up. Expensive. Slow to confirm. TEXITcoin is new, accessible,
              cheap — and increased utility benefits individuals, not banks. Everything you
              need to build on TXC lives here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#api"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                <Code2 className="h-4 w-4" /> Explore the API
              </a>
              <a
                href="#resources"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-surface"
              >
                <Rocket className="h-4 w-4" /> Network resources
              </a>
            </div>
          </div>
        </section>

        {/* Why build here */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Why TXC
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                Why build on Bitcoin when you can <span className="text-primary">build to benefit yourself</span>?
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {WHY.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-xl border border-border bg-card p-7"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-red-gradient shadow-glow">
                    <w.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live network */}
        <section className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Live network
                </div>
                <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
                  The chain, <span className="text-primary">right now</span>.
                </h2>
              </div>
              <div className={`flex items-center gap-2 text-xs ${stats.healthy ? "text-accent" : "text-muted-foreground"}`}>
                <span className={`h-2 w-2 rounded-full ${stats.healthy ? "bg-accent animate-pulse" : "bg-muted-foreground"}`} />
                {stats.healthy ? "Healthy · refreshing every 30s" : "Connecting…"}
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { l: "Block height", v: fmtNum(stats.height) },
                { l: "Network hashrate", v: fmtHash(stats.hashrate) },
                { l: "Difficulty", v: fmtDiff(stats.difficulty) },
                { l: "Fastest fee", v: stats.fastestFee ? `${stats.fastestFee} sat/vB` : "—" },
                { l: "Active miners (1w)", v: fmtNum(minerCount || null) },
                { l: "Blocks mined (1w)", v: fmtNum(stats.totalPoolBlocks || null) },
                { l: "Avg block time", v: stats.blockTimeAvg ? `${(stats.blockTimeAvg / 60).toFixed(2)} min` : "—" },
                { l: "Last block", v: tipAge != null ? fmtAgo(tipAge) : "—" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{s.l}</div>
                  <div className="mt-2 font-display text-2xl font-bold">{s.v}</div>
                </div>
              ))}
            </div>

            {/* Difficulty progress */}
            {stats.difficultyProgress != null && (
              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <span>Next difficulty retarget</span>
                  <span>
                    {stats.remainingBlocks ?? "—"} blocks remaining
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full bg-red-gradient transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, stats.difficultyProgress)).toFixed(2)}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {stats.difficultyProgress.toFixed(2)}% complete
                </div>
              </div>
            )}

            {/* Recent blocks */}
            <div className="mt-10">
              <h3 className="font-display text-2xl font-bold">Last confirmed blocks</h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                <div className="grid grid-cols-12 gap-2 border-b border-border bg-surface/50 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <div className="col-span-3">Height</div>
                  <div className="col-span-3">Age</div>
                  <div className="col-span-2">Txs</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-2 text-right">Hash</div>
                </div>
                {stats.blocks.length === 0 && (
                  <div className="px-5 py-6 text-sm text-muted-foreground">Loading blocks…</div>
                )}
                {stats.blocks.map((b) => (
                  <a
                    key={b.id}
                    href={`https://explorer.texitcoin.org/block/${b.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-12 gap-2 border-b border-border/60 px-5 py-3 text-sm last:border-0 hover:bg-surface/40 transition-colors"
                  >
                    <div className="col-span-3 font-mono font-semibold text-primary">#{fmtNum(b.height)}</div>
                    <div className="col-span-3 text-muted-foreground">{fmtAgo(now - b.timestamp)}</div>
                    <div className="col-span-2">{fmtNum(b.tx_count)}</div>
                    <div className="col-span-2">{(b.size / 1024).toFixed(2)} KB</div>
                    <div className="col-span-2 truncate text-right font-mono text-xs text-muted-foreground">
                      {b.id.slice(0, 10)}…
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Network resources
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                Every tool, in <span className="text-primary">one place</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explorers, wallets, the mining pool, swap, the L2, wrapped TXC, hardware, and
                apps already running on the network.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RESOURCES.map((r, i) => (
                <motion.a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-glow"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-red-gradient shadow-glow">
                      <r.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{r.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Open <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Developer API */}
        <section id="api" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Developer API
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                Three layers, <span className="text-primary">one network</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                The base chain via mempool/Esplora, tokens via Omni Layer (the same stack
                CryptoPOP runs on), and content addressing via streamTXC. All public, all free,
                no API key.
              </p>
            </div>

            <Tabs defaultValue="network" className="mt-10">
              <TabsList className="bg-card border border-border h-auto p-1 flex-wrap">
                <TabsTrigger value="network" className="gap-2"><Database className="h-3.5 w-3.5" /> Network REST</TabsTrigger>
                <TabsTrigger value="omni" className="gap-2"><Layers className="h-3.5 w-3.5" /> Omni Layer (Tokens)</TabsTrigger>
                <TabsTrigger value="stream" className="gap-2"><Server className="h-3.5 w-3.5" /> streamTXC (IPFS + Proof)</TabsTrigger>
              </TabsList>

              {/* Network REST */}
              <TabsContent value="network" className="mt-6">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Public REST endpoints for blocks, transactions, addresses, mempool, fees,
                      mining stats, and broadcast. Mirrors the open-source mempool.space spec —
                      most existing Bitcoin/Litecoin tooling works against it with a base-URL swap.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 font-mono text-xs">
                      <Database className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">Base URL:</span>
                      <span className="font-semibold">https://mempool.texitcoin.org</span>
                    </div>
                    <div className="mt-6 rounded-xl border border-border bg-[#0b0b0b] p-5 shadow-card">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        <Terminal className="h-3.5 w-3.5" /> Quick start · curl
                      </div>
                      <pre className="mt-3 overflow-x-auto whitespace-pre text-xs leading-relaxed text-foreground/90">
{QUICK_START}
                      </pre>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="border-b border-border px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Endpoints
                    </div>
                    <ul>
                      {API_ENDPOINTS.map((e) => (
                        <li
                          key={e.path}
                          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-border/60 px-5 py-4 last:border-0"
                        >
                          <span
                            className={`mt-0.5 inline-flex h-fit items-center justify-center rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                              e.method === "POST"
                                ? "bg-primary/15 text-primary"
                                : "bg-accent/15 text-accent"
                            }`}
                          >
                            {e.method}
                          </span>
                          <code className="font-mono text-sm font-semibold break-all">{e.path}</code>
                          <span />
                          <span className="text-xs text-muted-foreground">{e.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Omni Layer */}
              <TabsContent value="omni" className="mt-6">
                <DocBlock
                  badge="Tokens · Omni Layer"
                  title="Issue, mint, and move tokens on TXC"
                  intro={
                    <>
                      Omni Layer runs on top of TXC the same way it runs on Bitcoin — token
                      operations are encoded into <code className="font-mono text-foreground">OP_RETURN</code> outputs
                      of regular TXC transactions. This is the exact stack <a className="text-primary hover:underline" href="https://cryptopop.sg" target="_blank" rel="noreferrer">CryptoPOP</a> ships on. A few defaults from
                      upstream Omni do <em>not</em> apply here — read the gotchas before going live.
                    </>
                  }
                  sections={OMNI_SECTIONS}
                />
              </TabsContent>

              {/* streamTXC */}
              <TabsContent value="stream" className="mt-6">
                <DocBlock
                  badge="Proof + Content · streamTXC"
                  title="Wallet-signed login, IPFS streaming, and on-chain proof"
                  intro={
                    <>
                      <a className="text-primary hover:underline" href="https://streamtxc.com" target="_blank" rel="noreferrer">streamTXC</a> uses TXC for permanent on-chain
                      proof and IPFS for content addressing. The CID is the canonical link to a
                      video — every lifecycle event (claim, payment, renewal, takedown) is
                      stamped to a per-video TXC wallet via <code className="font-mono text-foreground">OP_RETURN</code>.
                      The endpoints below are public and reusable for any TXC wallet — not just
                      streamTXC content.
                    </>
                  }
                  sections={STREAM_SECTIONS}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Ship something on a network <span className="text-primary">built for builders</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Got a tool, integration, or app running on TXC? We'll list it here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:hello@texitcoin.org?subject=Builder%20on%20TEXITcoin"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Submit your project <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://pool.texitcoin.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-surface"
              >
                Start mining <Pickaxe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
