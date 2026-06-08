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

const f = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'

const c = {
  ink:          '#050505',
  surface:      '#0D0807',
  card:         '#111009',
  border:       'rgba(107,58,31,0.5)',
  borderSubtle: 'rgba(255,255,255,0.07)',
  coffee:       '#6B3A1F',
  coffeeLight:  '#8B5230',
  white:        '#FFFFFF',
  white70:      'rgba(255,255,255,0.70)',
  white45:      'rgba(255,255,255,0.45)',
  white20:      'rgba(255,255,255,0.20)',
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
      <Preview>Your move request is in — we'll be in touch shortly.</Preview>
      <Body style={{ backgroundColor: '#0A0807', fontFamily: f, margin: '0', padding: '32px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: c.ink, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${c.borderSubtle}` }}>

          {/* Header */}
          <Section style={{ backgroundColor: c.surface, padding: '28px 40px', borderBottom: `1px solid ${c.borderSubtle}` }}>
            <Text style={{ color: c.white, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.3px', margin: '0', fontFamily: f }}>
              NoTime<span style={{ color: c.coffeeLight }}>Mover</span>
            </Text>
            <Text style={{ color: c.white45, fontSize: '10px', margin: '4px 0 0', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: f }}>
              Move Anywhere. You Set The Price.
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '40px 40px 36px' }}>

            {/* Checkmark — centred */}
            <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '24px' }}>
              <tbody>
                <tr>
                  <td align="center">
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(180deg, #6B3A1F 0%, #4B2E1E 100%)', display: 'inline-block', textAlign: 'center', lineHeight: '52px' }}>
                      <span style={{ color: c.white, fontSize: '22px', lineHeight: '52px', fontFamily: f }}>✓</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <Text style={{ color: c.white, fontSize: '26px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.4px', fontFamily: f, textAlign: 'center' }}>
              Got it, {customerName}.
            </Text>
            <Text style={{ color: c.white70, fontSize: '15px', lineHeight: '1.7', margin: '0 0 28px', fontFamily: f, textAlign: 'center' }}>
              Your move request is in. We&apos;ll review the details and reach out within 30 minutes to confirm availability and lock in your price.
            </Text>

            {/* Summary card */}
            <div style={{ backgroundColor: c.card, borderRadius: '12px', padding: '22px 24px', marginBottom: '20px', border: `1px solid ${c.border}` }}>
              <Text style={{ color: c.coffeeLight, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px', fontFamily: f }}>
                Move Summary
              </Text>
              <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ color: c.white45, fontSize: '12px', fontWeight: '500', paddingBottom: '10px', width: '38%', fontFamily: f }}>Pickup</td>
                    <td style={{ color: c.white70, fontSize: '13px', fontWeight: '500', paddingBottom: '10px', textAlign: 'right', fontFamily: f }}>{pickupFormatted}</td>
                  </tr>
                  <tr>
                    <td style={{ color: c.white45, fontSize: '12px', fontWeight: '500', paddingBottom: '10px', fontFamily: f }}>Dropoff</td>
                    <td style={{ color: c.white70, fontSize: '13px', fontWeight: '500', paddingBottom: '10px', textAlign: 'right', fontFamily: f }}>{dropoffFormatted}</td>
                  </tr>
                  {miles > 0 && (
                    <tr>
                      <td style={{ color: c.white45, fontSize: '12px', fontWeight: '500', paddingBottom: '10px', fontFamily: f }}>Est. distance</td>
                      <td style={{ color: c.white70, fontSize: '13px', fontWeight: '500', paddingBottom: '10px', textAlign: 'right', fontFamily: f }}>{miles} mi</td>
                    </tr>
                  )}
                  {sizeLabel && (
                    <tr>
                      <td style={{ color: c.white45, fontSize: '12px', fontWeight: '500', paddingBottom: '10px', fontFamily: f }}>Move size</td>
                      <td style={{ color: c.white70, fontSize: '13px', fontWeight: '500', paddingBottom: '10px', textAlign: 'right', fontFamily: f }}>{sizeLabel}</td>
                    </tr>
                  )}
                  {selectedTier && (
                    <tr>
                      <td style={{ color: c.white45, fontSize: '12px', fontWeight: '500', paddingBottom: '10px', fontFamily: f }}>Package</td>
                      <td style={{ color: c.white70, fontSize: '13px', fontWeight: '500', paddingBottom: '10px', textAlign: 'right', fontFamily: f }}>{tierLabel(selectedTier)}</td>
                    </tr>
                  )}
                  {finalPrice != null && (
                    <>
                      <tr>
                        <td colSpan={2} style={{ paddingBottom: '10px' }}>
                          <div style={{ height: '1px', background: c.borderSubtle }} />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: c.white45, fontSize: '12px', fontWeight: '500', fontFamily: f }}>Your price</td>
                        <td style={{ color: c.white, fontSize: '22px', fontWeight: '700', textAlign: 'right', letterSpacing: '-0.5px', fontFamily: f }}>{fmtPrice(finalPrice)}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* What happens next */}
            <div style={{ backgroundColor: c.card, borderRadius: '12px', padding: '20px 24px', marginBottom: '28px', borderLeft: `3px solid ${c.coffee}` }}>
              <Text style={{ color: c.white, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px', fontFamily: f }}>
                What happens next
              </Text>
              {[
                "We'll call or text you within 30 minutes to confirm availability",
                'We agree on a final price and move date',
                'Our team shows up and handles the rest',
              ].map((step, i) => (
                <Text key={i} style={{ color: c.white70, fontSize: '13px', margin: '0 0 6px', lineHeight: '1.6', fontFamily: f }}>
                  {i + 1}.&nbsp; {step}
                </Text>
              ))}
            </div>

            <Hr style={{ borderColor: c.borderSubtle, margin: '0 0 24px' }} />

            <Text style={{ color: c.white45, fontSize: '13px', lineHeight: '1.7', margin: '0', fontFamily: f }}>
              Questions? Reply to this email or reach us at{' '}
              <Link href="mailto:hello@notimemover.com" style={{ color: c.coffeeLight, textDecoration: 'none', fontWeight: '600' }}>
                hello@notimemover.com
              </Link>
              . We&apos;re usually back within the hour.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: c.surface, padding: '20px 40px', borderTop: `1px solid ${c.borderSubtle}`, textAlign: 'center' }}>
            <Text style={{ color: c.white20, fontSize: '11px', margin: '0 0 4px', fontFamily: f, letterSpacing: '0.3px' }}>
              <Link href="https://notimemover.com" style={{ color: c.white45, textDecoration: 'none' }}>notimemover.com</Link>
              {' · '}Fully Insured{' · '}Massachusetts
            </Text>
            <Text style={{ color: c.white20, fontSize: '10px', margin: '4px 0 0', fontFamily: f }}>
              © {new Date().getFullYear()} NoTimeMover. All rights reserved.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export default LeadConfirmation
