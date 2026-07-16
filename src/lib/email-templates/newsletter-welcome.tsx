import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface NewsletterWelcomeProps {
  recipientEmail?: string
  unsubscribeUrl?: string
}

/**
 * Welcome email sent when someone subscribes via the site footer.
 * Voice: warm, plainspoken, a little Texan. Points to the /zoom page,
 * the next Honest Money Hour, and the X account.
 */
export const NewsletterWelcomeEmail = ({
  unsubscribeUrl = 'https://texitcoin.org/unsubscribe',
}: NewsletterWelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You're on the list — honest money, straight from Texas.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Star bar */}
        <Section style={starBar}>
          <Text style={starText}>★ ★ ★ ★ ★</Text>
        </Section>

        {/* Wordmark */}
        <Section style={wordmarkWrap}>
          <Text style={eyebrow}>TEXITCOIN</Text>
          <Heading as="h1" style={h1}>
            Howdy. You're in.
          </Heading>
          <Text style={lede}>
            Thanks for subscribing. You just signed up for honest money —
            straight talk, no marketing fluff, and the occasional Bobby rant.
          </Text>
        </Section>

        <Hr style={hr} />

        {/* What to expect */}
        <Section>
          <Text style={sectionLabel}>What lands in your inbox</Text>
          <Text style={bodyText}>
            New posts, network milestones, and a heads-up before every live
            call. We keep it short and skip the noise. Unsubscribe anytime —
            no hard feelings.
          </Text>
        </Section>

        <Hr style={hr} />

        {/* Next live call */}
        <Section style={callout}>
          <Text style={calloutEyebrow}>NEXT LIVE CALL</Text>
          <Heading as="h2" style={h2}>
            Honest Money Hour
          </Heading>
          <Text style={calloutMeta}>
            Thursdays · 7:00pm Central · with Bobby Gray
          </Text>
          <Text style={bodyText}>
            Watch live at{' '}
            <Link href="https://texitcoin.org/zoom" style={link}>
              texitcoin.org/zoom
            </Link>
            . Miss it? Every episode gets archived on the same page with an
            AI-written summary and a full transcript.
          </Text>
        </Section>

        <Hr style={hr} />

        {/* Follow */}
        <Section>
          <Text style={sectionLabel}>Follow along between drops</Text>
          <Text style={bodyText}>
            Real-time thoughts, receipts, and market takes live on X:{' '}
            <Link href="https://x.com/texitcoin" style={link}>
              @texitcoin
            </Link>
            .
          </Text>
        </Section>

        <Hr style={hr} />

        {/* Sign-off */}
        <Section>
          <Text style={signoff}>
            Stay honest,
            <br />
            <strong style={signoffName}>Bobby &amp; the TEXITcoin team</strong>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footerWrap}>
          <Text style={footerText}>
            You&apos;re getting this because you subscribed at{' '}
            <Link href="https://texitcoin.org" style={footerLink}>
              texitcoin.org
            </Link>
            . Part of the{' '}
            <Link href="https://honest.money" style={footerLink}>
              honest.money
            </Link>{' '}
            ecosystem.
          </Text>
          <Text style={footerText}>
            <Link href={unsubscribeUrl} style={footerLink}>
              Unsubscribe
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default NewsletterWelcomeEmail

export const template = {
  component: NewsletterWelcomeEmail,
  subject: "You're in — welcome to TEXITcoin",
  displayName: 'Newsletter welcome',
  previewData: {
    recipientEmail: 'friend@example.com',
    unsubscribeUrl: 'https://texitcoin.org/unsubscribe?token=preview',
  },
} satisfies TemplateEntry

// ————— Styles —————
const brandRed = '#c8102e'
const ink = '#0f0f10'
const softInk = '#3a3a3d'
const muted = '#6b6b70'
const cream = '#fbf8f3'
const rule = '#e6e2d8'

const main = {
  backgroundColor: cream,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: '32px 0',
}
const container = {
  backgroundColor: '#ffffff',
  border: `1px solid ${rule}`,
  borderRadius: '14px',
  margin: '0 auto',
  maxWidth: '560px',
  padding: '36px 40px',
}
const starBar = { textAlign: 'center' as const, marginBottom: '18px' }
const starText = {
  color: brandRed,
  fontSize: '14px',
  letterSpacing: '0.5em',
  margin: 0,
}
const wordmarkWrap = { textAlign: 'center' as const }
const eyebrow = {
  color: brandRed,
  fontSize: '11px',
  fontWeight: 700 as const,
  letterSpacing: '0.32em',
  margin: '0 0 12px',
}
const h1 = {
  color: ink,
  fontSize: '32px',
  fontWeight: 800 as const,
  lineHeight: 1.15,
  margin: '0 0 12px',
  letterSpacing: '-0.01em',
}
const lede = {
  color: softInk,
  fontSize: '16px',
  lineHeight: 1.55,
  margin: '0 auto 8px',
  maxWidth: '440px',
}
const hr = { border: 'none', borderTop: `1px solid ${rule}`, margin: '28px 0' }
const sectionLabel = {
  color: brandRed,
  fontSize: '11px',
  fontWeight: 700 as const,
  letterSpacing: '0.24em',
  margin: '0 0 8px',
}
const bodyText = {
  color: softInk,
  fontSize: '15px',
  lineHeight: 1.6,
  margin: 0,
}
const callout = {
  backgroundColor: cream,
  border: `1px solid ${rule}`,
  borderLeft: `4px solid ${brandRed}`,
  borderRadius: '8px',
  padding: '20px 22px',
}
const calloutEyebrow = {
  color: brandRed,
  fontSize: '11px',
  fontWeight: 700 as const,
  letterSpacing: '0.24em',
  margin: '0 0 6px',
}
const h2 = {
  color: ink,
  fontSize: '22px',
  fontWeight: 800 as const,
  lineHeight: 1.2,
  margin: '0 0 4px',
}
const calloutMeta = {
  color: ink,
  fontSize: '13px',
  fontWeight: 600 as const,
  margin: '0 0 10px',
}
const link = {
  color: brandRed,
  fontWeight: 600 as const,
  textDecoration: 'underline',
}
const signoff = {
  color: softInk,
  fontSize: '15px',
  lineHeight: 1.5,
  margin: 0,
}
const signoffName = { color: ink }
const footerWrap = { marginTop: '32px' }
const footerText = {
  color: muted,
  fontSize: '12px',
  lineHeight: 1.5,
  margin: '0 0 6px',
}
const footerLink = { color: muted, textDecoration: 'underline' }
