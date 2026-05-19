import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const OOS_HEADERS = [
  'submitted_at',
  'name',
  'email',
  'phone',
  'from_state',
  'from_city',
  'notes',
]

export async function GET() {
  return NextResponse.json({
    headers: OOS_HEADERS,
    hint: 'Create a tab named "Out-of-State Leads" in your Sheet and paste these as row 1.',
  })
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const fromState = typeof body.fromState === 'string' ? body.fromState.trim() : ''
  const fromCity = typeof body.fromCity === 'string' ? body.fromCity.trim() : ''
  const notes = typeof body.notes === 'string' ? body.notes.trim() : ''

  if (!name || !email || !phone || !fromState) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const tab = process.env.GOOGLE_SHEETS_OOS_TAB_NAME || 'Out-of-State Leads'

  if (spreadsheetId && clientEmail && privateKey) {
    privateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n')
    if (!privateKey.includes('\n')) {
      const m = privateKey.match(/-----BEGIN ([^-]+)-----([A-Za-z0-9+/=]+)-----END ([^-]+)-----/)
      if (m) {
        const bodyStr = (m[2].match(/.{1,64}/g) ?? []).join('\n')
        privateKey = `-----BEGIN ${m[1]}-----\n${bodyStr}\n-----END ${m[3]}-----\n`
      }
    }
    try {
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
      const sheets = google.sheets({ version: 'v4', auth })
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `'${tab.replace(/'/g, "''")}'!A:G`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[new Date().toISOString(), name, email, phone, fromState, fromCity, notes]],
        },
      })
    } catch (err) {
      console.error('[api/outofstate-lead] Sheets append failed:', err)
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'NoTimeMover <hello@notimemover.com>',
        to: 'contact@notimemover.com',
        subject: `Out-of-state move request — ${fromState}`,
        html: `
          <p><strong>New out-of-state move request</strong></p>
          <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
            <tr><td style="color:#666">Name</td><td>${name}</td></tr>
            <tr><td style="color:#666">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="color:#666">Phone</td><td>${phone}</td></tr>
            <tr><td style="color:#666">Moving from</td><td>${fromCity ? `${fromCity}, ` : ''}${fromState}</td></tr>
            ${notes ? `<tr><td style="color:#666;vertical-align:top">Notes</td><td>${notes}</td></tr>` : ''}
            <tr><td style="color:#666">Submitted</td><td>${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</td></tr>
          </table>
        `,
      })
    } catch (err) {
      console.error('[api/outofstate-lead] Resend failed:', err)
    }
  }

  return NextResponse.json({ ok: true })
}
