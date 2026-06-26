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
        try {
          const upstream = await fetch(
            'https://minetxc.com/api/public/stats/legal-fees',
            { headers: { accept: 'application/json' } },
          )
          const body = await upstream.text()
          return new Response(body, { status: upstream.status, headers: CORS })
        } catch (e) {
          return new Response(
            JSON.stringify({ ok: false, error: (e as Error).message }),
            { status: 502, headers: CORS },
          )
        }
      },
    },
  },
})
