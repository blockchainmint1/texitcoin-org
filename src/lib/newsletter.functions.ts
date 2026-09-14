import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { sendTemplateEmail } from './email-templates/send-email'

const emailSchema = z.object({
  email: z.string().trim().min(5).max(254).email(),
  source: z.string().max(64).optional(),
})

export type SubscribeResult =
  | { ok: true; alreadySubscribed: boolean; emailSent: boolean }
  | { ok: false; error: string }

/**
 * Public subscribe endpoint. Inserts into newsletter_subscribers (idempotent),
 * and — for genuinely new addresses — sends a branded welcome email through
 * Lovable's managed email delivery. Suppression (bounces, complaints,
 * unsubscribes) is enforced server-side by Lovable.
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

    // Only send welcome to brand-new subscribers
    if (alreadySubscribed) {
      return { ok: true, alreadySubscribed: true, emailSent: false }
    }

    // 2. Send the welcome email
    try {
      const result = await sendTemplateEmail('newsletter-welcome', email, {
        templateData: { recipientEmail: email },
        idempotencyKey: `newsletter-welcome-${email}`,
      })

      if (!result.sent) {
        const { error: logError } = await supabaseAdmin
          .from('email_send_log')
          .insert({
            template_name: 'newsletter-welcome',
            recipient_email: email,
            status: 'suppressed',
            error_message: 'Recipient is suppressed',
          })
        if (logError) console.error('email_send_log insert failed', logError)
        return { ok: true, alreadySubscribed: false, emailSent: false }
      }

      const { error: logError } = await supabaseAdmin
        .from('email_send_log')
        .insert({
          template_name: 'newsletter-welcome',
          recipient_email: email,
          status: 'sent',
        })
      if (logError) console.error('email_send_log insert failed', logError)

      return { ok: true, alreadySubscribed: false, emailSent: true }
    } catch (error) {
      console.error('newsletter welcome send failed', error)
      const { error: logError } = await supabaseAdmin
        .from('email_send_log')
        .insert({
          template_name: 'newsletter-welcome',
          recipient_email: email,
          status: 'failed',
          error_message:
            error instanceof Error ? error.message : 'Failed to send welcome email',
        })
      if (logError) console.error('email_send_log insert failed', logError)
      // Subscription succeeded; welcome email did not.
      return { ok: true, alreadySubscribed: false, emailSent: false }
    }
  })
