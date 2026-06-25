import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { google } from 'googleapis'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { LeadConfirmation } from '@/emails/LeadConfirmation'
import { AdminLeadNotification } from '@/emails/AdminLeadNotification'
import {
  LEAD_SHEET_HEADERS,
  leadPayloadToRow,
  type LeadPayload,
} from '@/lib/leadSheet'
import { sendTelegram } from '@/lib/telegram'

export const runtime = 'nodejs'

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 ? `1${digits}` : digits
}

async function fireMetaCAPI(
  payload: LeadPayload,
  eventId: string | undefined,
  req: Request,
) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const token = process.env.META_CAPI_TOKEN
  if (!pixelId || !token) return

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || undefined
  const ua = req.headers.get('user-agent') || undefined

  const body = JSON.stringify({
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      ...(eventId ? { event_id: eventId } : {}),
      action_source: 'website',
      event_source_url: 'https://notimemover.com',
      user_data: {
        em: [sha256(payload.email.toLowerCase().trim())],
        ph: [sha256(normalizePhone(payload.phone))],
        ...(ip ? { client_ip_address: ip } : {}),
        ...(ua ? { client_user_agent: ua } : {}),
      },
      custom_data: {
        ...(payload.finalPrice != null ? { value: payload.finalPrice, currency: 'USD' } : {}),
      },
    }],
  })

  await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body },
  ).catch(err => console.error('[api/lead] Meta CAPI failed:', err))
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function validateLead(body: unknown): LeadPayload | null {
  if (!body || typeof body !== 'object') return null
  const o = body as Record<string, unknown>
  const pickup = o.pickup
  const dropoff = o.dropoff
  if (!pickup || typeof pickup !== 'object' || !dropoff || typeof dropoff !== 'object')
    return null
  const pu = pickup as Record<string, unknown>
  const du = dropoff as Record<string, unknown>
  if (
    !isNonEmptyString(pu.street) ||
    !isNonEmptyString(pu.city) ||
    !isNonEmptyString(pu.state) ||
    !isNonEmptyString(pu.zip) ||
    !isNonEmptyString(du.street) ||
    !isNonEmptyString(du.city) ||
    !isNonEmptyString(du.state) ||
    !isNonEmptyString(du.zip)
  )
    return null
  if (
    !isNonEmptyString(o.name) ||
    !isNonEmptyString(o.email) ||
    !isNonEmptyString(o.phone) ||
    !isNonEmptyString(o.pickupFormatted) ||
    !isNonEmptyString(o.dropoffFormatted)
  )
    return null
  const miles = typeof o.miles === 'number' ? o.miles : Number(o.miles)
  const budget = typeof o.budget === 'number' ? o.budget : Number(o.budget)
  if (!Number.isFinite(miles) || !Number.isFinite(budget)) return null

  const finalPrice =
    o.finalPrice == null || o.finalPrice === ''
      ? null
      : typeof o.finalPrice === 'number'
        ? o.finalPrice
        : Number(o.finalPrice)

  return {
    pickup: {
      street: String(pu.street).trim(),
      city: String(pu.city).trim(),
      state: String(pu.state).trim().slice(0, 2).toUpperCase(),
      zip: String(pu.zip).trim(),
    },
    pickupFormatted: String(o.pickupFormatted).trim(),
    dropoff: {
      street: String(du.street).trim(),
      city: String(du.city).trim(),
      state: String(du.state).trim().slice(0, 2).toUpperCase(),
      zip: String(du.zip).trim(),
    },
    dropoffFormatted: String(o.dropoffFormatted).trim(),
    miles,
    size: String(o.size ?? ''),
    sizeLabel: String(o.sizeLabel ?? ''),
    budget,
    selectedTier: String(o.selectedTier ?? ''),
    finalPrice: finalPrice != null && Number.isFinite(finalPrice) ? finalPrice : null,
    name: String(o.name).trim(),
    email: String(o.email).trim(),
    phone: String(o.phone).trim(),
    moveDate:
      typeof o.moveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(o.moveDate)
        ? o.moveDate
        : undefined,
    submittedAt:
      typeof o.submittedAt === 'string' && o.submittedAt
        ? o.submittedAt
        : new Date().toISOString(),
  }
}

/** GET documents column headers for spreadsheet setup (no secrets). */
export async function GET() {
  return NextResponse.json({
    headers: [...LEAD_SHEET_HEADERS],
    hint: 'Paste these as row 1 in your Sheet (exact order). Share the Sheet with your service account email as Editor.',
  })
}

export async function POST(req: Request) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const eventId = typeof (json as Record<string, unknown>)?.eventId === 'string'
    ? (json as Record<string, unknown>).eventId as string
    : undefined

  const payload = validateLead(json)
  if (!payload) {
    return NextResponse.json({ ok: false, error: 'Invalid lead payload' }, { status: 400 })
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const tab = process.env.GOOGLE_SHEETS_TAB_NAME || 'Leads'
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.error('[api/lead] Missing GOOGLE_SHEETS_SPREADSHEET_ID / GOOGLE_SERVICE_ACCOUNT_* env vars')
    return NextResponse.json(
      { ok: false, error: 'Lead capture is not configured on the server.' },
      { status: 503 },
    )
  }

  // Normalize key: strip accidental surrounding quotes, convert literal \n to newlines,
  // then reformat PEM body to ensure 64-char line breaks (handles copy-paste corruption)
  privateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n')
  if (!privateKey.includes('\n')) {
    const m = privateKey.match(/-----BEGIN ([^-]+)-----([A-Za-z0-9+/=]+)-----END ([^-]+)-----/)
    if (m) {
      const body = (m[2].match(/.{1,64}/g) ?? []).join('\n')
      privateKey = `-----BEGIN ${m[1]}-----\n${body}\n-----END ${m[3]}-----\n`
    }
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheets = google.sheets({ version: 'v4', auth })
    const row = leadPayloadToRow(payload)

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${tab.replace(/'/g, "''")}'!A:T`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    })

    // Fire Meta CAPI non-blocking — don't let it delay the response
    fireMetaCAPI(payload, eventId, req).catch(() => {})

    // Telegram notification — non-blocking
    const dateLine = payload.moveDate ? `\n📅 Move date: ${payload.moveDate}` : ''
    const quoteLine = payload.finalPrice != null
      ? `\n💰 Budget $${payload.budget.toLocaleString()} → Quote <b>$${payload.finalPrice.toLocaleString()}</b>`
      : `\n💰 Budget $${payload.budget.toLocaleString()}`
    sendTelegram(
      `🔔 <b>New Move Request — notimemover.com</b>\n\n` +
      `👤 ${payload.name} · ${payload.phone}\n` +
      `📦 ${payload.sizeLabel || payload.size}\n` +
      `📍 ${payload.pickupFormatted} → ${payload.dropoffFormatted} (~${Math.round(payload.miles)} mi)` +
      quoteLine +
      dateLine
    ).catch(() => {})

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const html = await render(LeadConfirmation({
          customerName: payload.name.split(' ')[0],
          pickupFormatted: payload.pickupFormatted,
          dropoffFormatted: payload.dropoffFormatted,
          sizeLabel: payload.sizeLabel,
          selectedTier: payload.selectedTier,
          finalPrice: payload.finalPrice,
          miles: payload.miles,
        }))

        await Promise.all([
          resend.emails.send({
            from: 'NoTimeMover <hello@notimemover.com>',
            to: payload.email,
            subject: 'Your move request is in — NoTimeMover',
            html,
          }),
          resend.emails.send({
            from: 'NoTimeMover <hello@notimemover.com>',
            to: 'contact@notimemover.com',
            subject: `New move request — ${payload.name} (${payload.selectedTier || 'no tier'})`,
            html: await render(AdminLeadNotification({
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              pickupFormatted: payload.pickupFormatted,
              dropoffFormatted: payload.dropoffFormatted,
              sizeLabel: payload.sizeLabel,
              selectedTier: payload.selectedTier,
              finalPrice: payload.finalPrice,
              miles: payload.miles,
              submittedAt: payload.submittedAt,
              moveDate: payload.moveDate,
            })),
          }),
        ])
      } catch (emailErr) {
        console.error('[api/lead] Resend failed (non-fatal):', emailErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/lead] Sheets append failed:', err)
    return NextResponse.json({ ok: false, error: 'Could not save lead' }, { status: 502 })
  }
}
