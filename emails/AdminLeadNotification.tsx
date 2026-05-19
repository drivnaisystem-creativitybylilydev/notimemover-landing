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

interface AdminLeadNotificationProps {
  name: string
  email: string
  phone: string
  pickupFormatted: string
  dropoffFormatted: string
  sizeLabel: string
  selectedTier: string
  finalPrice: number | null
  miles: number
  submittedAt: string
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

export function AdminLeadNotification({
  name = '',
  email = '',
  phone = '',
  pickupFormatted = '',
  dropoffFormatted = '',
  sizeLabel = '',
  selectedTier = '',
  finalPrice = null,
  miles = 0,
  submittedAt = '',
}: AdminLeadNotificationProps) {
  const submitted = submittedAt
    ? new Date(submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' ET'
    : ''

  const rows: { label: string; value: string }[] = [
    { label: 'Name',      value: name },
    { label: 'Email',     value: email },
    { label: 'Phone',     value: phone },
    { label: 'Pickup',    value: pickupFormatted },
    { label: 'Dropoff',   value: dropoffFormatted },
    { label: 'Distance',  value: miles > 0 ? `${miles} mi` : '—' },
    { label: 'Size',      value: sizeLabel || '—' },
    { label: 'Package',   value: selectedTier ? tierLabel(selectedTier) : '—' },
    { label: 'Price',     value: finalPrice != null ? fmtPrice(finalPrice) : '—' },
    ...(submitted ? [{ label: 'Submitted', value: submitted }] : []),
  ]

  return (
    <Html>
      <Head />
      <Preview>New move request — {name} · {selectedTier || 'no tier'}</Preview>
      <Body style={{ backgroundColor: '#0A0807', fontFamily: f, margin: '0', padding: '32px 0' }}>
        <Container style={{ maxWidth: '520px', margin: '0 auto', backgroundColor: c.ink, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${c.borderSubtle}` }}>

          {/* Header */}
          <Section style={{ backgroundColor: c.surface, padding: '24px 32px', borderBottom: `1px solid ${c.borderSubtle}` }}>
            <Text style={{ color: c.white, fontSize: '16px', fontWeight: '700', letterSpacing: '-0.2px', margin: '0', fontFamily: f }}>
              NoTime<span style={{ color: c.coffeeLight }}>Mover</span>
            </Text>
            <Text style={{ color: c.white45, fontSize: '10px', margin: '3px 0 0', letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: f }}>
              New Lead
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '28px 32px 32px' }}>

            <Text style={{ color: c.white, fontSize: '22px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.3px', fontFamily: f }}>
              {name}
            </Text>
            <Text style={{ color: c.white45, fontSize: '13px', margin: '0 0 24px', fontFamily: f }}>
              {sizeLabel} · {selectedTier ? tierLabel(selectedTier) : '—'}{finalPrice != null ? ` · ${fmtPrice(finalPrice)}` : ''}
            </Text>

            {/* Lead details card */}
            <div style={{ backgroundColor: c.card, borderRadius: '12px', padding: '20px 22px', border: `1px solid ${c.border}`, marginBottom: '20px' }}>
              <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  {rows.map((row, i) => (
                    <React.Fragment key={row.label}>
                      {i > 0 && (
                        <tr>
                          <td colSpan={2} style={{ paddingBottom: '8px' }}>
                            <div style={{ height: '1px', background: c.borderSubtle }} />
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ color: c.white45, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', paddingBottom: '8px', paddingTop: i > 0 ? '0' : '0', width: '32%', fontFamily: f }}>
                          {row.label}
                        </td>
                        <td style={{ color: row.label === 'Price' ? c.white : c.white70, fontSize: row.label === 'Price' ? '16px' : '13px', fontWeight: row.label === 'Price' ? '700' : '500', paddingBottom: '8px', textAlign: 'right', fontFamily: f }}>
                          {row.label === 'Email'
                            ? <Link href={`mailto:${row.value}`} style={{ color: c.coffeeLight, textDecoration: 'none', fontWeight: '600' }}>{row.value}</Link>
                            : row.label === 'Phone'
                            ? <Link href={`tel:${row.value}`} style={{ color: c.coffeeLight, textDecoration: 'none', fontWeight: '600' }}>{row.value}</Link>
                            : row.value}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <Hr style={{ borderColor: c.borderSubtle, margin: '0 0 20px' }} />

            {/* Reply CTA */}
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td align="center">
                    <Link
                      href={`mailto:${email}?subject=Your%20NoTimeMover%20Request`}
                      style={{ display: 'inline-block', backgroundColor: c.white, color: c.ink, borderRadius: '999px', padding: '12px 28px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', letterSpacing: '-0.1px', fontFamily: f }}
                    >
                      Reply to {name.split(' ')[0]} →
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: c.surface, padding: '16px 32px', borderTop: `1px solid ${c.borderSubtle}`, textAlign: 'center' }}>
            <Text style={{ color: c.white20, fontSize: '10px', margin: '0', fontFamily: f, letterSpacing: '0.3px' }}>
              NoTimeMover · contact@notimemover.com
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export default AdminLeadNotification
