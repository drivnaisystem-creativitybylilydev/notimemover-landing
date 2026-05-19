import {
  Body,
  Container,
  Head,
  Html,
  Hr,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface LeadConfirmationProps {
  customerName: string
  pickupFormatted: string
  dropoffFormatted: string
  sizeLabel: string
  selectedTier: string
  finalPrice: number | null
  miles: number
}

const c = {
  header:    '#3A1F0A',
  coffee:    '#6B3A1F',
  accent:    '#8B5230',
  paper:     '#F5EFE8',
  cream:     '#EAE0D5',
  body:      '#F0E9DF',
  muted:     '#7A6055',
  dark:      '#2A1205',
  white:     '#FFFFFF',
}

const tierLabel = (key: string) => {
  if (key === 'save')      return 'Save — labor only'
  if (key === 'yourPrice') return 'Your Price'
  if (key === 'premium')   return 'Premium — full service'
  return key
}

const fmtPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export function LeadConfirmation({
  customerName = 'there',
  pickupFormatted = '',
  dropoffFormatted = '',
  sizeLabel = '',
  selectedTier = '',
  finalPrice = null,
  miles = 0,
}: LeadConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your move request is in — we&apos;ll be in touch shortly.</Preview>
      <Body style={{ backgroundColor: c.body, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', margin: '0', padding: '40px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: c.white, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(58,31,10,0.12)' }}>

          {/* Header */}
          <Section style={{ backgroundColor: c.header, padding: '32px 40px', textAlign: 'center' }}>
            <Text style={{ color: c.white, fontSize: '20px', fontWeight: '700', letterSpacing: '-0.3px', margin: '0' }}>
              NoTime<span style={{ color: c.accent }}>Mover</span>
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '4px 0 0', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Move Anywhere. You Set The Price.
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '40px 40px 32px' }}>

            {/* Badge */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#D4EDDA', color: '#155724', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Request Received
              </span>
            </div>

            <Text style={{ color: c.dark, fontSize: '22px', fontWeight: '700', margin: '0 0 8px' }}>
              Got it, {customerName}.
            </Text>
            <Text style={{ color: '#4A3A34', fontSize: '15px', lineHeight: '1.7', margin: '0 0 20px' }}>
              Your move request has been submitted. We&apos;ll review the details and reach out within 30 minutes to confirm availability and lock in your price.
            </Text>

            {/* Summary card */}
            <div style={{ backgroundColor: c.paper, borderRadius: '10px', padding: '20px 24px', margin: '0 0 20px', border: `1px solid ${c.cream}` }}>
              <Text style={{ color: c.coffee, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 14px' }}>
                Move Summary
              </Text>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ color: c.muted, fontSize: '13px', fontWeight: '500', paddingBottom: '8px', width: '40%' }}>Pickup</td>
                    <td style={{ color: c.dark, fontSize: '13px', fontWeight: '600', paddingBottom: '8px', textAlign: 'right' }}>{pickupFormatted}</td>
                  </tr>
                  <tr>
                    <td style={{ color: c.muted, fontSize: '13px', fontWeight: '500', paddingBottom: '8px' }}>Dropoff</td>
                    <td style={{ color: c.dark, fontSize: '13px', fontWeight: '600', paddingBottom: '8px', textAlign: 'right' }}>{dropoffFormatted}</td>
                  </tr>
                  {miles > 0 && (
                    <tr>
                      <td style={{ color: c.muted, fontSize: '13px', fontWeight: '500', paddingBottom: '8px' }}>Est. distance</td>
                      <td style={{ color: c.dark, fontSize: '13px', fontWeight: '600', paddingBottom: '8px', textAlign: 'right' }}>{miles} mi</td>
                    </tr>
                  )}
                  {sizeLabel && (
                    <tr>
                      <td style={{ color: c.muted, fontSize: '13px', fontWeight: '500', paddingBottom: '8px' }}>Move size</td>
                      <td style={{ color: c.dark, fontSize: '13px', fontWeight: '600', paddingBottom: '8px', textAlign: 'right' }}>{sizeLabel}</td>
                    </tr>
                  )}
                  {selectedTier && (
                    <tr>
                      <td style={{ color: c.muted, fontSize: '13px', fontWeight: '500', paddingBottom: '8px' }}>Package</td>
                      <td style={{ color: c.dark, fontSize: '13px', fontWeight: '600', paddingBottom: '8px', textAlign: 'right' }}>{tierLabel(selectedTier)}</td>
                    </tr>
                  )}
                  {finalPrice != null && (
                    <>
                      <tr>
                        <td colSpan={2}>
                          <Hr style={{ borderColor: c.cream, margin: '8px 0' }} />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: c.coffee, fontSize: '14px', fontWeight: '700' }}>Your price</td>
                        <td style={{ color: c.coffee, fontSize: '20px', fontWeight: '700', textAlign: 'right' }}>{fmtPrice(finalPrice)}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* What happens next */}
            <div style={{ backgroundColor: '#FFF8F0', borderRadius: '10px', padding: '18px 24px', margin: '0 0 20px', borderLeft: `4px solid ${c.accent}` }}>
              <Text style={{ color: c.coffee, fontSize: '13px', fontWeight: '700', margin: '0 0 10px' }}>
                What happens next
              </Text>
              <Text style={{ color: '#4A3A34', fontSize: '13px', margin: '0 0 6px', lineHeight: '1.6' }}>
                1. We&apos;ll call or text you within 30 minutes to confirm availability
              </Text>
              <Text style={{ color: '#4A3A34', fontSize: '13px', margin: '0 0 6px', lineHeight: '1.6' }}>
                2. We agree on a final price and move date
              </Text>
              <Text style={{ color: '#4A3A34', fontSize: '13px', margin: '0', lineHeight: '1.6' }}>
                3. Our team shows up and handles the rest
              </Text>
            </div>

            <Hr style={{ borderColor: c.cream, margin: '24px 0' }} />

            <Text style={{ color: c.muted, fontSize: '13px', lineHeight: '1.7', margin: '0' }}>
              Questions? Reply to this email or reach us at{' '}
              <Link href="mailto:hello@notimemover.com" style={{ color: c.accent, textDecoration: 'none', fontWeight: '600' }}>
                hello@notimemover.com
              </Link>
              . We&apos;re responsive — usually within the hour.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: c.paper, padding: '24px 40px', textAlign: 'center', borderTop: `1px solid ${c.cream}` }}>
            <Text style={{ color: c.muted, fontSize: '12px', margin: '0 0 4px', lineHeight: '1.6' }}>
              <Link href="https://notimemover.com" style={{ color: c.accent, textDecoration: 'none', fontWeight: '600' }}>
                notimemover.com
              </Link>
              {' · '}Licensed &amp; Insured · Massachusetts
            </Text>
            <Text style={{ color: '#9E8E88', fontSize: '11px', margin: '8px 0 0' }}>
              © {new Date().getFullYear()} NoTimeMover. All rights reserved.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export default LeadConfirmation
