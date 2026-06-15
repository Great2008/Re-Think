import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ msg: 'Please enter a valid email.', type: 'error' });
      return;
    }
    setLoading(true);
    setStatus({ msg: '', type: '' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setStatus({ msg: "You're already subscribed.", type: 'info' });
      } else if (res.ok) {
        setEmail('');
        setStatus({ msg: "You're in. Check your inbox.", type: 'success' });
      } else {
        setStatus({ msg: data.error || 'Something went wrong. Try again.', type: 'error' });
      }
    } catch {
      setStatus({ msg: 'Network error. Try again.', type: 'error' });
    }
    setLoading(false);
  }

  return (
    <>
      <div className="newsletter-bar">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <span className="newsletter-label">// Stay in the loop</span>
            <p>New series and essays, when the work is ready. No filler.</p>
          </div>
          <div className="newsletter-form-wrap">
            <input
              className="nl-input"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
            />
            <button className="nl-btn" onClick={handleSubscribe} disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {status.msg && (
            <p className={`nl-status ${status.type}`}>{status.msg}</p>
          )}
        </div>
      </div>
      <footer>
        <span className="footer-logo">// Re:Think_</span>
        <span className="footer-copy">© 2026 · Question the defaults.</span>
      </footer>
    </>
  );
}
