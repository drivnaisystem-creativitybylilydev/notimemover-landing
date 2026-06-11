import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 })
  }

  const { name, email, message } = body as Record<string, unknown>

  if (!isString(name) || !isString(email) || !isString(message)) {
    return NextResponse.json({ error: 'name, email, and message are required' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'NoTimeMover Website <onboarding@resend.dev>',
      to: 'contact@notimemover.com',
      replyTo: email.trim(),
      subject: `New inquiry from ${name.trim()}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; color: #111;">
          <h2 style="margin: 0 0 16px; font-size: 18px;">New website inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 80px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name.trim()}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email.trim()}" style="color: #c07040;">${email.trim()}</a></td></tr>
          </table>
          <div style="margin: 20px 0; padding: 16px; background: #f7f5f2; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message.trim()}</div>
          <p style="margin: 0; font-size: 12px; color: #999;">Sent via notimemover.com contact form. Reply to this email to respond directly.</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
