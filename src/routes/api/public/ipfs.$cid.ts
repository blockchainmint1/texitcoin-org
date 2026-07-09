import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/ipfs/$cid")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const cid = params.cid;
        if (!cid || !/^[a-zA-Z0-9]+$/.test(cid) || cid.length > 100) {
          return new Response("Invalid CID", { status: 400 });
        }
        const gateway = process.env.IPFS_GATEWAY;
        if (!gateway) {
          return new Response("IPFS gateway not configured", { status: 500 });
        }
        const base = gateway.replace(/\/$/, "");
        const withScheme = /^https?:\/\//.test(base) ? base : `https://${base}`;
        return new Response(null, {
          status: 302,
          headers: {
            Location: `${withScheme}/ipfs/${cid}`,
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
