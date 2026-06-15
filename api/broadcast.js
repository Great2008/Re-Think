const nodemailer = require('nodemailer');

const SUPABASE_URL = 'https://dseceshtucrfoxrkqaba.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWNlc2h0dWNyZm94cmtxYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU2MTMsImV4cCI6MjA5MDA5MTYxM30.-NdLR5iCHizl0XpzoYPK0C6abCeKxPjNJ2Na-NyUgzI';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── AUTH ──
  const { password, subject, body, preview } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorised.' });
  }

  if (!subject || !body) {
    return res.status(400).json({ error: 'Subject and body are required.' });
  }

  // ── FETCH SUBSCRIBERS ──
  const dbRes = await fetch(
    `${SUPABASE_URL}/rest/v1/rethink_subscribers?active=eq.true&select=email`,
    {
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`
      }
    }
  );

  if (!dbRes.ok) {
    return res.status(500).json({ error: 'Could not fetch subscribers.' });
  }

  const subscribers = await dbRes.json();

  if (!subscribers.length) {
    return res.status(200).json({ sent: 0, message: 'No active subscribers.' });
  }

  // ── PREVIEW MODE — just return count ──
  if (preview) {
    return res.status(200).json({
      preview: true,
      count: subscribers.length,
      subject,
      message: `Ready to send to ${subscribers.length} subscriber${subscribers.length !== 1 ? 's' : ''}.`
    });
  }

  // ── BUILD EMAIL HTML ──
  function buildEmail(email) {
    const unsubscribeUrl = `https://rethink-beta.vercel.app/api/unsubscribe?email=${encodeURIComponent(email)}`;
    // Convert markdown-lite body to HTML paragraphs
    const htmlBody = body
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => `<p style="margin:0 0 20px;font-size:16px;line-height:1.85;color:#a0998e;">${p.trim().replace(/\n/g, '<br/>')}</p>`)
      .join('');

    return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:48px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid #2a2a2a;padding:48px;">

        <!-- Logo -->
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #2a2a2a;">
          <span style="font-family:'Courier New',monospace;font-size:13px;color:#C9A84C;letter-spacing:2px;">// Re:Think_</span>
        </td></tr>

        <!-- Subject as heading -->
        <tr><td style="padding:36px 0 8px;">
          <h1 style="margin:0 0 28px;font-size:28px;font-weight:700;color:#F0EBE0;line-height:1.3;">${subject}</h1>
          ${htmlBody}
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding-bottom:36px;">
          <table cellpadding="0" cellspacing="0">
            <tr><td style="border:1px solid #C9A84C;">
              <a href="https://rethink-beta.vercel.app"
                style="display:inline-block;padding:12px 28px;font-family:'Courier New',monospace;
                font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;text-decoration:none;">
                Read Re:Think →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;border-top:1px solid #2a2a2a;">
          <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:11px;color:#444;letter-spacing:1px;">
            © 2026 Re:Think · Question the defaults.
          </p>
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#333;">
            <a href="${unsubscribeUrl}" style="color:#555;text-decoration:underline;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  // ── SEND ──
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let sent = 0;
  let failed = 0;
  const errors = [];

  for (const { email } of subscribers) {
    try {
      await transporter.sendMail({
        from: `"Greatname from Re:Think" <${process.env.GMAIL_USER}>`,
        to: email,
        subject,
        html: buildEmail(email),
      });
      sent++;
      // Small delay to avoid Gmail rate limits (500/day, ~1 per 170ms safe)
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      failed++;
      errors.push({ email, error: err.message });
      console.error(`Failed to send to ${email}:`, err.message);
    }
  }

  return res.status(200).json({
    sent,
    failed,
    total: subscribers.length,
    errors: errors.length ? errors : undefined
  });
};
