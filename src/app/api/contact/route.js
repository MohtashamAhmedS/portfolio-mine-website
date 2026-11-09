import { Resend } from 'resend'

// With this sender, Resend only delivers to the email you signed up with.
const FROM = 'Portfolio Contact <onboarding@resend.dev>'

// Best-effort rate limit: 5 messages per IP per 10 minutes
const hits = new Map()
function tooMany(ip) {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(request) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const company = String(body.company || '').trim()
    const message = String(body.message || '').trim()

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 },
      )
    }
    if (!isEmail(email)) {
      return Response.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }
    if (
      name.length > 100 ||
      email.length > 150 ||
      company.length > 150 ||
      message.length > 5000
    ) {
      return Response.json(
        { error: 'One of the fields is too long.' },
        { status: 400 },
      )
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (tooMany(ip)) {
      return Response.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    if (!apiKey || !to) {
      console.error('[contact] Missing env:', { hasKey: !!apiKey, hasTo: !!to })
      return Response.json(
        { error: 'Server is not configured.' },
        { status: 500 },
      )
    }

    console.log('[contact] Sending to', to)

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company/Website:</strong> ${escapeHtml(company || '-')}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>`,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return Response.json(
        { error: 'Could not send your message. Please try again.' },
        { status: 502 },
      )
    }

    console.log('[contact] Sent OK, id:', data?.id)
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] Route error:', err)
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
