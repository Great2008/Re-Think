// ── THEME ──
const html = document.documentElement;

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('rt-theme', t);
  const dark = t === 'dark';
  document.querySelectorAll('.theme-icon').forEach(el => el.textContent = dark ? '☀' : '☾');
  document.querySelectorAll('.theme-label').forEach(el => el.textContent = dark ? 'Light' : 'Dark');
}

function toggleTheme() {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// ── MOBILE MENU ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  if (!menu) return;
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-label', 'Open navigation menu');
  burger.setAttribute('aria-expanded', false);
  document.body.style.overflow = '';
}

// ── MODAL ──
let currentPost = 0;
let allPosts = [];

function initPosts() {
  allPosts = Array.from(document.querySelectorAll('.post-data'));
}

function openPost(index) {
  currentPost = index;
  renderModal();
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
  document.getElementById('modalCloseBtn').focus();
}

function renderModal() {
  const el = allPosts[currentPost];
  const title = el.dataset.title;
  const part = el.dataset.part;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`"${title}" — Re:Think`);

  document.getElementById('modalPart').textContent = part;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMeta').innerHTML =
    `<span>${el.dataset.date}</span><span>${el.dataset.read}</span>`;
  document.getElementById('modalBody').innerHTML = el.innerHTML;
  document.getElementById('navCount').textContent = `${currentPost + 1} of ${allPosts.length}`;
  document.getElementById('prevBtn').disabled = currentPost === 0;
  document.getElementById('nextBtn').disabled = currentPost === allPosts.length - 1;

  // Share buttons
  document.getElementById('shareWhatsApp').href =
    `https://wa.me/?text=${text}%20${url}`;
  document.getElementById('shareX').href =
    `https://x.com/intent/tweet?text=${text}&url=${url}`;
  document.getElementById('shareLinkedIn').href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  document.getElementById('modalOverlay').scrollTop = 0;
}

function navigatePost(dir) {
  currentPost = Math.max(0, Math.min(allPosts.length - 1, currentPost + dir));
  renderModal();
}

function closePost() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closePost();
}

document.addEventListener('keydown', e => {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closePost();
  if (e.key === 'ArrowRight') navigatePost(1);
  if (e.key === 'ArrowLeft') navigatePost(-1);
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(html.getAttribute('data-theme') || 'dark');
  initPosts();
});
