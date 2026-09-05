import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export interface DraftReviewData {
  title: string
  previewUrl: string
  excerpt: string
  authorName: string
}

export function DraftReviewEmail({ title, previewUrl, excerpt, authorName }: DraftReviewData) {
  return (
    <Html>
      <Head />
      <Preview>Draft ready for review: {title}</Preview>
      <Body style={{ backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '600px', padding: '32px 24px' }}>
          <Section>
            <Heading style={{ color: '#ffffff', fontSize: '24px', marginBottom: '16px' }}>
              Draft ready for your review
            </Heading>
            <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>
              A new unpublished blog draft is waiting for you on texitcoin.org. It won't appear on the public blog or trigger any notifications until you approve it.
            </Text>

            <Section style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <Text style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#94a3b8', marginBottom: '8px' }}>
                Draft article
              </Text>
              <Heading as="h2" style={{ color: '#ffffff', fontSize: '22px', marginBottom: '12px' }}>
                {title}
              </Heading>
              <Text style={{ fontSize: '14px', lineHeight: '1.5', color: '#cbd5e1', marginBottom: '16px' }}>
                {excerpt}
              </Text>
              <Text style={{ fontSize: '13px', color: '#94a3b8' }}>
                By {authorName} · Unpublished
              </Text>
            </Section>

            <Button
              href={previewUrl}
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Read the draft
            </Button>

            <Text style={{ fontSize: '13px', color: '#94a3b8', marginTop: '24px' }}>
              Reply in chat with edits, approval, or a hard pass. The link above shows an unpublished preview and will not be indexed by search engines.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: DraftReviewEmail,
  subject: ({ title }: DraftReviewData) => `Draft ready for review: ${title}`,
  displayName: 'Draft review request',
}
