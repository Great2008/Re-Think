// ── RE:THINK COMPONENTS ──
// Single file that injects nav + footer into every page.
// To update nav or footer: edit THIS file only.

const SUPABASE_URL = 'https://dseceshtucrfoxrkqaba.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWNlc2h0dWNyZm94cmtxYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU2MTMsImV4cCI6MjA5MDA5MTYxM30.-NdLR5iCHizl0XpzoYPK0C6abCeKxPjNJ2Na-NyUgzI';

// ── DETECT ACTIVE PAGE ──
function getActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

// ── INJECT NAV ──
function injectNav() {
  const active = getActivePage();
  const nav = `
  <header>
    <a class="logo" href="index.html">
      <img class="logo-dark" src="logo.svg" alt="Re:Think" />
      <img class="logo-light-img" src="logo-light.svg" alt="Re:Think" />
    </a>
    <div class="header-right">
      <ul class="nav-links" role="list">
        <li><a href="index.html" ${active === 'index.html' || active === '' ? 'class="active"' : ''}>Home</a></li>
        <li><a href="series-001.html" ${active === 'series-001.html' ? 'class="active"' : ''}>Series 001</a></li>
        <li><a href="series-002.html" ${active === 'series-002.html' ? 'class="active"' : ''}>Series 002</a></li>
        <li><a href="series-003.html" ${active === 'series-003.html' ? 'class="active"' : ''}>Series 003</a></li>
        <li><a href="about.html" ${active === 'about.html' ? 'class="active"' : ''}>About</a></li>
        <li><a href="contact.html" ${active === 'contact.html' ? 'class="active"' : ''}>Contact</a></li>
      </ul>
      <button class="theme-btn" onclick="toggleTheme()" aria-label="Toggle theme">
        <span class="theme-icon">☀</span><span class="theme-label">Light</span>
      </button>
      <button class="hamburger" id="hamburger" onclick="toggleMenu()"
        aria-label="Open navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
    <a class="mobile-nav-link" href="index.html" onclick="closeMenu()">Home <span>Start here</span></a>
    <a class="mobile-nav-link" href="series-001.html" onclick="closeMenu()">Series 001 <span>4 Parts</span></a>
    <a class="mobile-nav-link" href="series-002.html" onclick="closeMenu()">Series 002 <span>4 Parts</span></a>
    <a class="mobile-nav-link" href="series-003.html" onclick="closeMenu()">Series 003 <span>4 Parts</span></a>
    <a class="mobile-nav-link" href="about.html" onclick="closeMenu()">About <span>The publication</span></a>
    <a class="mobile-nav-link" href="contact.html" onclick="closeMenu()">Contact <span>Get in touch</span></a>
    <div class="mobile-theme-row">
      <span class="mobile-theme-label">Theme</span>
      <button class="theme-btn" onclick="toggleTheme()" aria-label="Toggle theme">
        <span class="theme-icon">☀</span><span class="theme-label">Light</span>
      </button>
    </div>
  </nav>`;

  const mount = document.getElementById('rt-nav');
  if (mount) mount.outerHTML = nav;
}

// ── INJECT FOOTER ──
function injectFooter() {
  const footer = `
  <footer>
    <span class="footer-logo">// Re:Think_</span>
    <span class="footer-copy">© 2026 · Question the defaults.</span>
  </footer>`;

  const mount = document.getElementById('rt-footer');
  if (mount) mount.outerHTML = footer;
}

// ── COMMENTS SYSTEM ──
async function loadComments(seriesId) {
  const container = document.getElementById('comments-list');
  if (!container) return;
  container.innerHTML = '<p class="comments-loading">Loading comments...</p>';

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rethink_comments?series_id=eq.${seriesId}&order=created_at.asc`,
    { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
  );

  const data = await res.json();

  if (!data.length) {
    container.innerHTML = '<p class="comments-empty">No comments yet. Be the first.</p>';
    return;
  }

  container.innerHTML = data.map(c => `
    <div class="comment-item">
      <div class="comment-header">
        <span class="comment-name">${escapeHtml(c.name)}</span>
        <span class="comment-date">${formatDate(c.created_at)}</span>
      </div>
      <div class="comment-body">${escapeHtml(c.body)}</div>
    </div>
  `).join('');
}

async function submitComment(seriesId) {
  const nameEl = document.getElementById('comment-name');
  const bodyEl = document.getElementById('comment-body');
  const btn = document.getElementById('comment-submit');
  const status = document.getElementById('comment-status');

  const name = nameEl.value.trim();
  const body = bodyEl.value.trim();

  if (!name || !body) {
    status.textContent = 'Please fill in both fields.';
    status.className = 'comment-status error';
    return;
  }

  if (body.length < 10) {
    status.textContent = 'Comment is too short.';
    status.className = 'comment-status error';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Posting...';
  status.textContent = '';

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rethink_comments`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ series_id: seriesId, name, body })
  });

  btn.disabled = false;
  btn.textContent = 'Post comment';

  if (res.ok) {
    nameEl.value = '';
    bodyEl.value = '';
    status.textContent = 'Comment posted.';
    status.className = 'comment-status success';
    await loadComments(seriesId);
    setTimeout(() => { status.textContent = ''; }, 3000);
  } else {
    status.textContent = 'Something went wrong. Try again.';
    status.className = 'comment-status error';
  }
}

function injectComments(seriesId) {
  const mount = document.getElementById('rt-comments');
  if (!mount) return;

  mount.innerHTML = `
    <div class="comments-section">
      <div class="divider">
        <div class="divider-line"></div>
        <span class="divider-label">Comments</span>
        <div class="divider-line"></div>
      </div>
      <div class="comments-inner">
        <div id="comments-list"></div>
        <div class="comment-form">
          <div class="about-label">// Leave a comment</div>
          <input id="comment-name" class="comment-input" type="text"
            placeholder="Your name" maxlength="60" autocomplete="name" />
          <textarea id="comment-body" class="comment-textarea"
            placeholder="Say something specific." rows="4" maxlength="1000"></textarea>
          <div class="comment-form-footer">
            <span id="comment-status" class="comment-status"></span>
            <button id="comment-submit" class="comment-btn"
              onclick="submitComment('${seriesId}')">Post comment</button>
          </div>
        </div>
      </div>
    </div>`;

  loadComments(seriesId);
}

// ── HELPERS ──
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

// ── ANALYTICS ──
function injectAnalytics() {
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.setAttribute('data-website-id', 'e10d7e11-0cc0-4170-8c1f-72faf9a78101');
  document.head.appendChild(s);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  injectAnalytics();
  // Re-apply theme after nav injection so icons update
  const t = localStorage.getItem('rt-theme') || 'dark';
  if (typeof applyTheme === 'function') applyTheme(t);
});
