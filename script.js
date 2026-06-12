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
  const open = document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
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
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalOverlay').scrollTop = 0;
}

function renderModal() {
  const el = allPosts[currentPost];
  document.getElementById('modalPart').textContent = el.dataset.part;
  document.getElementById('modalTitle').textContent = el.dataset.title;
  document.getElementById('modalMeta').innerHTML =
    `<span>${el.dataset.date}</span><span>${el.dataset.read}</span>`;
  document.getElementById('modalBody').innerHTML = el.innerHTML;
  document.getElementById('navCount').textContent = `${currentPost + 1} of ${allPosts.length}`;
  document.getElementById('prevBtn').disabled = currentPost === 0;
  document.getElementById('nextBtn').disabled = currentPost === allPosts.length - 1;
  document.getElementById('modalOverlay').scrollTop = 0;
}

function navigatePost(dir) {
  currentPost = Math.max(0, Math.min(allPosts.length - 1, currentPost + dir));
  renderModal();
}

function closePost() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closePost();
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('modalOverlay')) return;
  if (e.key === 'Escape') closePost();
  if (e.key === 'ArrowRight') navigatePost(1);
  if (e.key === 'ArrowLeft') navigatePost(-1);
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(html.getAttribute('data-theme') || 'dark');
  initPosts();
});
