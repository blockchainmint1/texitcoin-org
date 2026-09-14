import { createEmailWebhookHandler } from '@lovable.dev/email-js'
import { createFileRoute } from '@tanstack/react-router'

type SuppressionReason = 'bounce' | 'complaint' | 'unsubscribe'

const LOG_STATUS: Record<SuppressionReason, 'bounced' | 'complained' | 'suppressed'> = {
  bounce: 'bounced',
  complaint: 'complained',
  unsubscribe: 'suppressed',
}

const LOG_MESSAGE: Record<SuppressionReason, string> = {
  bounce: 'Permanent bounce — email address is invalid or rejected',
  complaint: 'Spam complaint — recipient marked email as spam',
  unsubscribe: 'Recipient unsubscribed',
}

async function record(
  recipient: string,
  reason: SuppressionReason,
  eventId: string,
) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
  const email = recipient.toLowerCase()

  // Notification-only bookkeeping — Lovable enforces suppression at send time.
  const { error: suppressError } = await supabaseAdmin
    .from('suppressed_emails')
    .upsert({ email, reason, metadata: null }, { onConflict: 'email' })

  if (suppressError) {
    console.error('Failed to upsert suppressed email', {
      code: suppressError.code,
      message: suppressError.message,
      event_id: eventId,
    })
    throw new Error('Failed to write suppression')
  }

  const { error: logError } = await supabaseAdmin.from('email_send_log').insert({
    message_id: null,
    template_name: 'system',
    recipient_email: email,
    status: LOG_STATUS[reason],
    error_message: LOG_MESSAGE[reason],
    metadata: null,
  })

  if (logError) {
    console.warn('Failed to insert email_send_log', {
      code: logError.code,
      message: logError.message,
      event_id: eventId,
    })
  }
}

export const Route = createFileRoute("/lovable/email/events")({
  server: {
    handlers: {
      POST: ({ request }) => {
        const apiKey = process.env['LOVABLE_API_KEY']
        if (!apiKey) {
          console.error('Missing required environment variables')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }
        const handler = createEmailWebhookHandler({
          apiKey,
          on: {
            'email.bounced': async (event) => {
              await record(event.data.recipient, 'bounce', event.event_id)
            },
            'email.complaint': async (event) => {
              await record(event.data.recipient, 'complaint', event.event_id)
            },
            'email.unsubscribed': async (event) => {
              await record(event.data.recipient, 'unsubscribe', event.event_id)
            },
          },
        })
        return handler(request)
      },
    },
  },
})
