import { createFileRoute } from '@tanstack/react-router'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=60',
  'Content-Type': 'application/json',
}

export const Route = createFileRoute('/api/public/legal-fees')({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async () => {
        // Beans has replaced MineTXC's stale proof ledger, but does not yet
        // provide a public legal-cost aggregate. Do not mislabel the owner's
        // confirmed lower bound as a live ledger total.
        return Response.json({
          ok: true,
          total_usd: null,
          confirmed_minimum_usd: 5_000_000,
          confirmed_as_of: '2026-10-24',
          source_url: 'https://beans.honest.money/',
          status: 'confirmed_minimum_only',
        }, { headers: CORS })
      },
    },
  },
})
