import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { render } from '@react-email/render'
import { z } from 'zod'
import { NewsletterWelcomeEmail } from './email-templates/newsletter-welcome'

const SITE_NAME = 'texitcoin-org'
const SENDER_DOMAIN = 'notify.texitcoin.org'
const FROM_DOMAIN = 'texitcoin.org'
const ROOT_URL = 'https://texitcoin.org'

const emailSchema = z.object({
  email: z.string().trim().min(5).max(254).email(),
  source: z.string().max(64).optional(),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export type SubscribeResult =
  | { ok: true; alreadySubscribed: boolean; emailSent: boolean }
  | { ok: false; error: string }

/**
 * Public subscribe endpoint. Inserts into newsletter_subscribers (idempotent),
 * and — if the address isn't suppressed and is genuinely new — enqueues a
 * branded welcome email via the internal email queue.
 */
export const subscribeToNewsletter = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => emailSchema.parse(input))
  .handler(async ({ data }): Promise<SubscribeResult> => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

    const email = data.email.toLowerCase()
    const source = data.source ?? 'footer'

    // 1. Insert subscriber (duplicates OK)
    const { error: insertError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({ email, source })

    const alreadySubscribed = insertError?.code === '23505'
    if (insertError && !alreadySubscribed) {
      console.error('newsletter insert failed', insertError)
      return { ok: false, error: 'Could not save subscription. Try again.' }
    }

    // Don't email people who already opted out
    const { data: suppressed } = await supabaseAdmin
      .from('suppressed_emails')
      .select('id')
      .eq('email', email)
      .maybeSingle()
    if (suppressed) {
      return { ok: true, alreadySubscribed, emailSent: false }
    }

    // Only send welcome to brand-new subscribers
    if (alreadySubscribed) {
      return { ok: true, alreadySubscribed: true, emailSent: false }
    }

    // 2. Get or create an unsubscribe token
    let unsubscribeToken: string
    const { data: existing } = await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .select('token, used_at')
      .eq('email', email)
      .maybeSingle()

    if (existing && !existing.used_at) {
      unsubscribeToken = existing.token
    } else {
      unsubscribeToken = generateToken()
      await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .upsert(
          { token: unsubscribeToken, email },
          { onConflict: 'email', ignoreDuplicates: true },
        )
      const { data: stored } = await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .select('token')
        .eq('email', email)
        .maybeSingle()
      if (stored?.token) unsubscribeToken = stored.token
    }

    const unsubscribeUrl = `${ROOT_URL}/unsubscribe?token=${unsubscribeToken}`

    // 3. Render + enqueue
    const element = React.createElement(NewsletterWelcomeEmail, {
      recipientEmail: email,
      unsubscribeUrl,
    })
    const html = await render(element)
    const text = await render(element, { plainText: true })
    const messageId = crypto.randomUUID()

    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId,
      template_name: 'newsletter-welcome',
      recipient_email: email,
      status: 'pending',
    })

    const { error: enqueueError } = await supabaseAdmin.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: email,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: "You're in — welcome to TEXITcoin",
        html,
        text,
        purpose: 'transactional',
        label: 'newsletter-welcome',
        idempotency_key: messageId,
        unsubscribe_token: unsubscribeToken,
        queued_at: new Date().toISOString(),
      },
    })

    if (enqueueError) {
      console.error('newsletter enqueue failed', enqueueError)
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId,
        template_name: 'newsletter-welcome',
        recipient_email: email,
        status: 'failed',
        error_message: 'Failed to enqueue welcome email',
      })
      // Subscription succeeded; welcome email did not.
      return { ok: true, alreadySubscribed: false, emailSent: false }
    }

    return { ok: true, alreadySubscribed: false, emailSent: true }
  })
