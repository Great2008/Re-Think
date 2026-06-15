const nodemailer = require('nodemailer');

const SUPABASE_URL = 'https://dseceshtucrfoxrkqaba.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWNlc2h0dWNyZm94cmtxYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU2MTMsImV4cCI6MjA5MDA5MTYxM30.-NdLR5iCHizl0XpzoYPK0C6abCeKxPjNJ2Na-NyUgzI';

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;

  // Validate
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const normalised = email.toLowerCase().trim();

  // ── 1. Save to Supabase ──
  const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/rethink_subscribers`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ email: normalised })
  });

  // 409 = already subscribed (unique constraint)
  if (dbRes.status === 409) {
    return res.status(409).json({ error: 'already_subscribed' });
  }

  if (!dbRes.ok) {
    const err = await dbRes.text();
    console.error('Supabase error:', err);
    return res.status(500).json({ error: 'Could not save subscription.' });
  }

  // ── 2. Send confirmation email via Gmail SMTP ──
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:48px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid #2a2a2a;padding:48px;">

        <!-- Logo -->
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #2a2a2a;">
          <span style="font-family:'Courier New',monospace;font-size:13px;color:#C9A84C;letter-spacing:2px;">// Re:Think_</span>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 0 24px;">
          <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#F0EBE0;line-height:1.3;">
            You're in.
          </h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#a0998e;">
            Thank you for subscribing to Re:Think. You'll hear from Greatname when there's something worth reading — a new series, a new part, or an essay that didn't fit anywhere else.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#a0998e;">
            No filler. No weekly cadence for its own sake. Only when the work is ready.
          </p>
          <p style="margin:0 0 32px;font-size:16px;line-height:1.8;color:#a0998e;">
            In the meantime — there are three series already published. Start wherever the title pulls you.
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:none;border:1px solid #C9A84C;">
              <a href="https://re-think-beta.vercel.app"
                style="display:inline-block;padding:12px 28px;font-family:'Courier New',monospace;
                font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;text-decoration:none;">
                Read Re:Think →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;border-top:1px solid #2a2a2a;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#444;letter-spacing:1px;">
            © 2026 Re:Think · Question the defaults.<br/>
            You subscribed at rethink-beta.vercel.app
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Greatname from Re:Think" <${process.env.GMAIL_USER}>`,
      to: normalised,
      subject: 'You\'re subscribed to Re:Think',
      html,
    });
  } catch (mailErr) {
    console.error('Mail error:', mailErr);
    // Subscriber is saved — don't fail the whole request over email
  }

  return res.status(200).json({ success: true });
};
