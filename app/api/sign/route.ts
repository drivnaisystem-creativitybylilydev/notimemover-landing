import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const FINN_EMAIL = 'drivn.ai.system@gmail.com'
const AGREEMENT_DATE = 'June 8, 2026'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const o = body as Record<string, unknown>
  const jermaineName = typeof o.jermaineName === 'string' ? o.jermaineName.trim() : ''
  const jermaineEmail = typeof o.jermaineEmail === 'string' ? o.jermaineEmail.trim() : ''
  const signedAt = typeof o.signedAt === 'string' ? o.signedAt : new Date().toISOString()

  if (!jermaineName || jermaineName.length < 2) {
    return NextResponse.json({ ok: false, error: 'Full name required to sign.' }, { status: 400 })
  }
  if (!jermaineEmail || !/\S+@\S+\.\S+/.test(jermaineEmail)) {
    return NextResponse.json({ ok: false, error: 'Valid email required.' }, { status: 400 })
  }

  const signedAtFormatted = new Date(signedAt).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short',
  }) + ' ET'

  const summaryHtml = `
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
      <tr style="background:#1a0e06;"><td style="color:#8B5230;font-weight:700;padding:10px 14px;border:1px solid #2a1405;">Term</td><td style="color:#8B5230;font-weight:700;padding:10px 14px;border:1px solid #2a1405;">Detail</td></tr>
      <tr><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Equity granted</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">35% to Finn Schueler (Drivn.AI)</td></tr>
      <tr style="background:#0d0806;"><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Retainer</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">$49/month (existing, continues independently)</td></tr>
      <tr><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Timeline</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">15–20 days from execution</td></tr>
      <tr style="background:#0d0806;"><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Ad spend</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">Funded from organic revenue; strategy TBD</td></tr>
      <tr><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Milestones (35→45%)</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">To be agreed and documented separately</td></tr>
      <tr style="background:#0d0806;"><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Signed by Jermaine</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">${jermaineName} — ${signedAtFormatted}</td></tr>
      <tr><td style="padding:10px 14px;border:1px solid #1a0e06;color:#888;">Signed by Finn</td><td style="padding:10px 14px;border:1px solid #1a0e06;color:#fff;">Finn Schueler — ${AGREEMENT_DATE}</td></tr>
    </table>
  `

  if (!process.env.RESEND_API_KEY) {
    console.error('[api/sign] Missing RESEND_API_KEY')
    return NextResponse.json({ ok: false, error: 'Email service not configured.' }, { status: 503 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await Promise.all([
      // Finn's notification
      resend.emails.send({
        from: 'NoTimeMover <hello@notimemover.com>',
        to: FINN_EMAIL,
        subject: `✅ Jermaine signed the partnership agreement — ${signedAtFormatted}`,
        html: `
          <div style="background:#050505;padding:40px;font-family:sans-serif;color:#fff;max-width:600px;margin:0 auto;border-radius:12px;">
            <h1 style="font-size:22px;font-weight:700;margin:0 0 6px;color:#fff;">NoTime<span style="color:#8B5230;">Mover</span> × Drivn.AI</h1>
            <p style="color:#8B5230;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 32px;">Agreement Executed</p>
            <p style="color:#aaa;font-size:15px;line-height:1.7;margin:0 0 24px;">
              <strong style="color:#fff;">${jermaineName}</strong> has signed the NoTimeMover × Drivn.AI Partnership Agreement.<br/>
              Signed at: <strong style="color:#fff;">${signedAtFormatted}</strong><br/>
              Jermaine's email: <a href="mailto:${jermaineEmail}" style="color:#8B5230;">${jermaineEmail}</a>
            </p>
            <h2 style="font-size:13px;color:#8B5230;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px;">Agreement Summary</h2>
            ${summaryHtml}
            <p style="color:#555;font-size:12px;margin:32px 0 0;">This email confirms execution of the agreement. Keep for your records.</p>
          </div>
        `,
      }),
      // Jermaine's copy
      resend.emails.send({
        from: 'NoTimeMover <hello@notimemover.com>',
        to: jermaineEmail,
        subject: 'Your signed copy — NoTimeMover × Drivn.AI Partnership Agreement',
        html: `
          <div style="background:#050505;padding:40px;font-family:sans-serif;color:#fff;max-width:600px;margin:0 auto;border-radius:12px;">
            <h1 style="font-size:22px;font-weight:700;margin:0 0 6px;color:#fff;">NoTime<span style="color:#8B5230;">Mover</span> × Drivn.AI</h1>
            <p style="color:#8B5230;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 32px;">Signed Copy — Keep for Your Records</p>
            <p style="color:#aaa;font-size:15px;line-height:1.7;margin:0 0 8px;">Hi ${jermaineName.split(' ')[0]},</p>
            <p style="color:#aaa;font-size:15px;line-height:1.7;margin:0 0 24px;">
              You've signed the NoTimeMover × Drivn.AI partnership agreement. Here's a summary of what was agreed.
            </p>
            <h2 style="font-size:13px;color:#8B5230;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px;">Agreement Summary</h2>
            ${summaryHtml}
            <div style="margin-top:32px;padding:20px;background:#0d0806;border-radius:8px;border-left:3px solid #6B3A1F;">
              <p style="color:#aaa;font-size:13px;margin:0 0 8px;"><strong style="color:#fff;">Next steps from Finn:</strong></p>
              <ul style="color:#888;font-size:13px;line-height:1.8;margin:0;padding-left:20px;">
                <li>Pricing slider and "Fully Insured" fix already live on the site</li>
                <li>Finn will reach out for the items he needs from you to start (GBP access, photos, phone number)</li>
                <li>Build begins within 24 hours of you providing required access</li>
                <li>Milestone document for the 35→45% escalation to follow separately</li>
              </ul>
            </div>
            <p style="color:#555;font-size:12px;margin:32px 0 0;">Questions? Reply to this email or text Finn directly.</p>
          </div>
        `,
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/sign] Resend error:', err)
    return NextResponse.json({ ok: false, error: 'Could not send confirmation emails. Please screenshot this page as your record.' }, { status: 502 })
  }
}
