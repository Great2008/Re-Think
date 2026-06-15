const SUPABASE_URL = 'https://dseceshtucrfoxrkqaba.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWNlc2h0dWNyZm94cmtxYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU2MTMsImV4cCI6MjA5MDA5MTYxM30.-NdLR5iCHizl0XpzoYPK0C6abCeKxPjNJ2Na-NyUgzI';

module.exports = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send('Missing email.');
  }

  const dbRes = await fetch(
    `${SUPABASE_URL}/rest/v1/rethink_subscribers?email=eq.${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ active: false })
    }
  );

  if (!dbRes.ok) {
    return res.status(500).send('Could not unsubscribe. Please try again.');
  }

  // Redirect to a simple confirmation page
  res.setHeader('Location', 'https://re-think-beta.vercel.app/unsubscribed.html');
  return res.status(302).end();
};
