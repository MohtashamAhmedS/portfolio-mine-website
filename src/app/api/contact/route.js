export async function POST(request) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }

    // TODO: send the email here (Resend, Nodemailer, etc.)
    console.log('New contact message:', { name, email, company, message })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
}
