import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SB_URL = 'https://dseceshtucrfoxrkqaba.supabase.co';
const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWNlc2h0dWNyZm94cmtxYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU2MTMsImV4cCI6MjA5MDA5MTYxM30.-NdLR5iCHizl0XpzoYPK0C6abCeKxPjNJ2Na-NyUgzI';

const sbHeaders = {
  apikey: SB_ANON,
  Authorization: `Bearer ${SB_ANON}`,
  'Content-Type': 'application/json',
};

async function sb(path, opts = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { ...sbHeaders, ...opts.headers },
    ...opts,
  });
  if (!res.ok && res.status !== 409) {
    const t = await res.text();
    throw new Error(t);
  }
  if (res.status === 204 || res.headers.get('content-length') === '0') return null;
  try { return await res.json(); } catch { return null; }
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── LOCK SCREEN ────────────────────────────────────────
function LockScreen({ onUnlock }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function tryUnlock() {
    if (!pw.trim()) { setErr('Enter your password.'); return; }
    setLoading(true); setErr('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) { onUnlock(pw); }
      else { setErr('Wrong password.'); setPw(''); }
    } catch {
      setErr('Auth API not reachable.');
    }
    setLoading(false);
  }

  return (
    <div id="lockScreen" style={{ display: 'flex' }}>
      <div className="lock-logo">// Re:Think Admin</div>
      <h1 className="lock-title">Sign in</h1>
      <div className="lock-form">
        <input
          className="lock-input"
          type="password"
          placeholder="Admin password"
          autoComplete="current-password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && tryUnlock()}
        />
        <button className="lock-btn" onClick={tryUnlock} disabled={loading}>
          {loading ? 'Checking...' : 'Enter'}
        </button>
        {err && <div className="lock-error">{err}</div>}
      </div>
    </div>
  );
}

// ── DASHBOARD ──────────────────────────────────────────
function Dashboard({ onNewPost }) {
  const [stats, setStats] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      sb('rethink_series?select=id&active=eq.true'),
      sb('rethink_posts?select=id&active=eq.true'),
      sb('rethink_subscribers?select=id'),
      sb('rethink_subscribers?select=id&active=eq.true'),
    ]).then(([s, p, subs, activeSubs]) => {
      setStats({
        series: s?.length ?? '—',
        posts: p?.length ?? '—',
        subs: subs?.length ?? '—',
        activeSubs: activeSubs?.length ?? '—',
      });
    }).catch(console.error);

    sb('rethink_posts?order=published_at.desc&limit=10&select=id,title,subtitle,series_id,part_number,active')
      .then(d => setPosts(d || []))
      .catch(console.error);
  }, []);

  return (
    <div className="admin-panel active">
      <div className="stats-row">
        {[['// Series', stats.series], ['// Posts', stats.posts], ['// Subscribers', stats.subs], ['// Active subs', stats.activeSubs]].map(([label, val]) => (
          <div key={label} className="stat-card">
            <div className="stat-label">{label}</div>
            <div className="stat-value">{val ?? '—'}</div>
          </div>
        ))}
      </div>
      <div className="admin-section-head">
        <span className="admin-section-title">// Recent posts</span>
        <button className="admin-action-btn" onClick={onNewPost}>+ New post</button>
      </div>
      <div className="admin-posts-list">
        {posts.length === 0
          ? <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', padding: '1rem 0' }}>Loading...</div>
          : posts.map(p => (
            <div key={p.id} className="admin-post-row">
              <span className="admin-post-num">{String(p.part_number).padStart(2,'0')}</span>
              <div className="admin-post-info">
                <span className="admin-post-title">{p.title}</span>
                <span className="admin-post-meta">{p.series_id}</span>
              </div>
              <span className={`admin-post-status ${p.active ? 'live' : 'draft'}`}>{p.active ? 'Live' : 'Draft'}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ── EDITOR ─────────────────────────────────────────────
function Editor({ allSeries }) {
  const [form, setForm] = useState({
    series_id: '', part_number: '', subtitle: '', title: '',
    excerpt: '', tag: '', read_time: '', content: '',
  });
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState('');

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }));
  }

  useEffect(() => {
    setPreview(form.content ? marked.parse(form.content) : '');
  }, [form.content]);

  function clear() {
    setForm({ series_id: '', part_number: '', subtitle: '', title: '', excerpt: '', tag: '', read_time: '', content: '' });
    setEditingId(null);
    setStatus('');
  }

  async function publish() {
    const required = ['series_id', 'part_number', 'title', 'content'];
    for (const k of required) {
      if (!form[k]) { setStatus(`${k} is required.`); return; }
    }
    setStatus('Saving...');
    try {
      const payload = {
        ...form,
        part_number: parseInt(form.part_number),
        active: true,
        published_at: new Date().toISOString(),
      };
      if (editingId) {
        await sb(`rethink_posts?id=eq.${editingId}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify(payload),
        });
        setStatus('Updated.');
      } else {
        await sb('rethink_posts', {
          method: 'POST',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify(payload),
        });
        setStatus('Published!');
        clear();
      }
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  async function deletePost() {
    if (!editingId) return;
    if (!confirm('Delete this post?')) return;
    setStatus('Deleting...');
    try {
      await sb(`rethink_posts?id=eq.${editingId}`, { method: 'DELETE' });
      setStatus('Deleted.');
      clear();
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="admin-panel active">
      <div className="admin-section-head">
        <span className="admin-section-title">{editingId ? '// Edit post' : '// New post'}</span>
        {editingId && <button className="admin-action-btn danger" onClick={clear}>Clear</button>}
      </div>
      <div className="editor-layout">
        <div className="editor-left">
          <div className="editor-field">
            <label className="editor-label">Series</label>
            <select className="editor-select" value={form.series_id} onChange={e => update('series_id', e.target.value)}>
              <option value="">Select series...</option>
              {allSeries.map(s => (
                <option key={s.id} value={s.id}>{s.id} — {s.title}</option>
              ))}
            </select>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label className="editor-label">Part number</label>
              <input className="editor-input" type="number" min="1" placeholder="e.g. 1"
                value={form.part_number} onChange={e => update('part_number', e.target.value)} />
            </div>
            <div className="editor-field">
              <label className="editor-label">Subtitle</label>
              <input className="editor-input" type="text" placeholder="e.g. Part One"
                value={form.subtitle} onChange={e => update('subtitle', e.target.value)} />
            </div>
          </div>
          <div className="editor-field">
            <label className="editor-label">Title</label>
            <input className="editor-input" type="text" placeholder="Post title"
              value={form.title} onChange={e => update('title', e.target.value)} />
          </div>
          <div className="editor-field">
            <label className="editor-label">Excerpt</label>
            <input className="editor-input" type="text" placeholder="One or two sentences shown in the list"
              value={form.excerpt} onChange={e => update('excerpt', e.target.value)} />
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label className="editor-label">Tag</label>
              <input className="editor-input" type="text" placeholder="e.g. Systems"
                value={form.tag} onChange={e => update('tag', e.target.value)} />
            </div>
            <div className="editor-field">
              <label className="editor-label">Read time</label>
              <input className="editor-input" type="text" placeholder="e.g. 4 min read"
                value={form.read_time} onChange={e => update('read_time', e.target.value)} />
            </div>
          </div>
          <div className="editor-field">
            <label className="editor-label">Content (Markdown)</label>
            <textarea className="editor-textarea"
              placeholder={"Write your essay in Markdown.\n\nSeparate paragraphs with a blank line.\nUse --- for a section break.\nUse *italics* and **bold**.\nUse > for a blockquote."}
              value={form.content}
              onChange={e => update('content', e.target.value)}
            />
            <span className="editor-hint">--- for section breaks · *italic* · **bold** · &gt; blockquote</span>
          </div>
          <div className="editor-actions">
            <button className="editor-btn" onClick={publish}>
              {editingId ? 'Update post' : 'Publish post'}
            </button>
            {editingId && (
              <button className="editor-btn danger" onClick={deletePost}>Delete post</button>
            )}
            <span className="editor-status">{status}</span>
          </div>
        </div>
        <div className="editor-right">
          <div className="preview-pane">
            <div className="preview-pane-header">
              <span>// Preview</span>
              <span style={{ color: 'var(--text-dim)' }}>{wordCount} words</span>
            </div>
            <div
              className="preview-pane-body modal-body"
              dangerouslySetInnerHTML={{ __html: preview || '<span style="color:var(--text-dim);font-family:var(--mono);font-size:0.75rem;">Start writing to see a preview.</span>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SERIES PANEL ───────────────────────────────────────
function SeriesPanel({ allSeries, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: '', number: '', title: '', description: '' });
  const [status, setStatus] = useState('');

  async function createSeries() {
    const { id, number, title, description } = form;
    if (!id || !number || !title) { setStatus('ID, number, and title required.'); return; }
    setStatus('Creating...');
    try {
      await sb('rethink_series', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ id, number, title, description, active: true }),
      });
      setStatus('Series created!');
      setForm({ id: '', number: '', title: '', description: '' });
      setShowForm(false);
      onRefresh();
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  return (
    <div className="admin-panel active">
      <div className="admin-section-head">
        <span className="admin-section-title">// All series</span>
        <button className="admin-action-btn" onClick={() => setShowForm(f => !f)}>
          {showForm ? 'Cancel' : '+ New series'}
        </button>
      </div>
      <div className="admin-series-list">
        {allSeries.length === 0
          ? <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', padding: '1rem 0' }}>No series yet.</div>
          : allSeries.map(s => (
            <div key={s.id} className="admin-series-row">
              <span className="admin-series-id">{s.id}</span>
              <span className="admin-series-title">{s.title}</span>
              <span className={`admin-post-status ${s.active ? 'live' : 'draft'}`}>{s.active ? 'Active' : 'Hidden'}</span>
            </div>
          ))
        }
      </div>
      {showForm && (
        <div className="new-series-form">
          <div className="admin-section-title" style={{ marginBottom: '1rem' }}>// New series</div>
          <div className="new-series-grid">
            <div className="editor-field">
              <label className="editor-label">Series ID</label>
              <input className="editor-input" type="text" placeholder="e.g. series-004"
                value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} />
            </div>
            <div className="editor-field">
              <label className="editor-label">Number</label>
              <input className="editor-input" type="text" placeholder="e.g. 004"
                value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} />
            </div>
          </div>
          <div className="editor-field" style={{ marginBottom: '0.75rem' }}>
            <label className="editor-label">Title</label>
            <input className="editor-input" type="text" placeholder="Series title"
              value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="editor-field" style={{ marginBottom: '1rem' }}>
            <label className="editor-label">Description</label>
            <input className="editor-input" type="text" placeholder="Short description shown on homepage"
              value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="editor-actions">
            <button className="editor-btn" onClick={createSeries}>Create series</button>
            <span className="editor-status">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SUBSCRIBERS ────────────────────────────────────────
function Subscribers() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb('rethink_subscribers?order=subscribed_at.desc&select=id,email,active,subscribed_at')
      .then(d => { setSubs(d || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function exportCSV() {
    const rows = [['email', 'active', 'subscribed_at'], ...subs.map(s => [s.email, s.active, s.subscribed_at])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'rethink-subscribers.csv';
    a.click();
  }

  return (
    <div className="admin-panel active">
      <div className="admin-section-head">
        <span className="admin-section-title">// Subscribers</span>
        <button className="admin-action-btn" onClick={exportCSV}>Export CSV</button>
      </div>
      <div id="subscribersTable">
        {loading
          ? <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', padding: '1rem 0' }}>Loading...</div>
          : subs.length === 0
            ? <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', padding: '1rem 0' }}>No subscribers yet.</div>
            : (
              <table className="subs-table">
                <thead>
                  <tr><th>Email</th><th>Status</th><th>Subscribed</th></tr>
                </thead>
                <tbody>
                  {subs.map(s => (
                    <tr key={s.id}>
                      <td className="subs-email">{s.email}</td>
                      <td><span className={`admin-post-status ${s.active ? 'live' : 'draft'}`}>{s.active ? 'Active' : 'Unsubbed'}</span></td>
                      <td className="subs-date">{formatDate(s.subscribed_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
        }
      </div>
    </div>
  );
}

// ── NEWSLETTER ─────────────────────────────────────────
function Newsletter({ adminPw }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  async function checkCount() {
    const data = await sb('rethink_subscribers?active=eq.true&select=id');
    setStatus(`${data?.length ?? 0} active subscribers`);
  }

  async function send() {
    if (!subject || !body) { setStatus('Subject and body required.'); return; }
    if (!confirm(`Send to all active subscribers?`)) return;
    setStatus('Sending...');
    try {
      const res = await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPw, subject, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Sent!');
        setResult(JSON.stringify(data, null, 2));
        setSubject('');
        setBody('');
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  return (
    <div className="admin-panel active">
      <div className="admin-section-head">
        <span className="admin-section-title">// Send newsletter</span>
      </div>
      <div style={{ maxWidth: '680px' }}>
        <div className="editor-field" style={{ marginBottom: '1rem' }}>
          <label className="editor-label">Subject line</label>
          <input className="editor-input" type="text" maxLength={150}
            placeholder="e.g. Series 004 is live — The Brain Drain Changelog"
            value={subject} onChange={e => setSubject(e.target.value)} />
        </div>
        <div className="editor-field" style={{ marginBottom: '1rem' }}>
          <label className="editor-label">Body</label>
          <textarea className="editor-textarea" style={{ minHeight: '200px' }}
            placeholder={"Write your email here. Separate paragraphs with a blank line."}
            value={body} onChange={e => setBody(e.target.value)} />
          <span className="editor-hint">Plain text. Paragraphs separated by blank lines.</span>
        </div>
        <div className="editor-actions">
          <button className="editor-btn secondary" onClick={checkCount}>Check subscriber count</button>
          <button className="editor-btn" onClick={send}>Send to all subscribers</button>
          <span className="editor-status">{status}</span>
        </div>
        {result && (
          <div style={{ marginTop: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.8, border: '1px solid var(--border)', padding: '1rem', whiteSpace: 'pre-wrap' }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN ADMIN ─────────────────────────────────────────
const TABS = ['dashboard', 'editor', 'series', 'subscribers', 'newsletter'];
const TAB_LABELS = ['Dashboard', 'Write', 'Series', 'Subscribers', 'Newsletter'];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [adminPw, setAdminPw] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [allSeries, setAllSeries] = useState([]);

  useEffect(() => {
    if (authed) loadSeries();
  }, [authed]);

  async function loadSeries() {
    try {
      const data = await sb('rethink_series?order=number.asc&select=id,number,title,active');
      setAllSeries(data || []);
    } catch (e) {
      console.error(e);
    }
  }

  if (!authed) return <LockScreen onUnlock={(pw) => { setAuthed(true); setAdminPw(pw); }} />;

  return (
    <div className="admin-page" id="adminShell">
      <div className="admin-header">
        <div className="admin-header-left">
          <a href="/" className="admin-logo">// Re:Think</a>
          <div className="admin-tab-row">
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`admin-tab${tab === t ? ' active' : ''}`}
                onClick={() => setTab(t)}
              >{TAB_LABELS[i]}</button>
            ))}
          </div>
        </div>
        <div className="admin-header-right">
          <span className="admin-user">// Greatname</span>
          <button className="admin-logout" onClick={() => { setAuthed(false); setAdminPw(''); }}>Log out</button>
        </div>
      </div>

      {tab === 'dashboard' && <Dashboard onNewPost={() => setTab('editor')} />}
      {tab === 'editor' && <Editor allSeries={allSeries} />}
      {tab === 'series' && <SeriesPanel allSeries={allSeries} onRefresh={loadSeries} />}
      {tab === 'subscribers' && <Subscribers />}
      {tab === 'newsletter' && <Newsletter adminPw={adminPw} />}
    </div>
  );
}
