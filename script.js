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

// Sync icons on load
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(html.getAttribute('data-theme') || 'dark');
});

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

// ── MODAL (series page only) ──
const posts = [
  {
    part: "Series 001 · Part One",
    title: "I Can Repair the World, But They Won't Give Me the Source Code",
    date: "April 2026", read: "3 min read",
    body: `
      <p>Many of the world's problems are not unsolvable: they're inaccessible. The solutions exist. The ideas exist. The people who can fix things exist. What is missing is the access to the source code: the hidden rules, closed systems, and guarded decisions that shape education, economics, governance, and technology.</p>
      <p>We can see the bugs clearly. Inequality loops endlessly. Institutions crash and reboot without real change. Innovation is welcomed in theory but blocked in practice. Those who ask to see how the system really works are labeled disruptive, even when the system is failing.</p>
      <p>The world runs on proprietary logic. A few write the rules; everyone else just uses the app and accepts the terms and conditions attached to it.</p>
      <hr/>
      <p>But history shows something important: when access is denied, new systems are built. Open ideas replace closed ones. Parallel solutions expose better ways of doing things. The old code doesn't get fixed — it gets replaced.</p>
      <p>So maybe the goal isn't to be given the source code anymore.</p>
      <p>Maybe it's to write better code: open, fair, and human — and let the world see that it works.</p>
    `
  },
  {
    part: "Series 001 · Part Two",
    title: "So I Wrote My Own",
    date: "April 2026", read: "4 min read",
    body: `
      <p>There is a particular kind of frustration that comes not from failure, but from clarity.</p>
      <p>You see the problem exactly. You understand what is broken. You can sketch the fix on a napkin. But between that napkin and the actual system sits a wall with no door — only a sign: <em>Access Restricted. Authorised Personnel Only.</em></p>
      <p>Most people walk away from that wall. A few decide to build somewhere else entirely.</p>
      <hr/>
      <p>Muhammad Yunus couldn't fix global banking. So he wrote new code — small loans, trust-based repayment, community accountability. Grameen Bank wasn't a patch on the old system. It was a parallel architecture, open to the people the old system had closed out.</p>
      <p>Wikipedia didn't lobby the encyclopaedia industry. It simply said: <em>let anyone improve it, let the world verify it.</em> The proprietary encyclopaedias are mostly gone. Wikipedia serves billions.</p>
      <p>Neither won by attacking the old system. They won by being more useful.</p>
      <hr/>
      <p>The pattern repeats. Linux. Community radio. Cooperative savings circles. Teachers who couldn't change the curriculum and started YouTube channels instead.</p>
      <p>None of them were given the source code. All of them wrote their own.</p>
      <hr/>
      <p>This is not always celebrated. Resistance intensifies the moment your parallel system starts working. But that resistance is itself the argument for why it was necessary.</p>
      <p>Writing better code doesn't require a revolution. It requires a decision — to stop waiting for access and start building with what you have.</p>
      <p>You already see the bugs. You have been seeing them.</p>
      <p>The question is no longer <em>when will someone fix this.</em> The question is: <em>what will you build?</em></p>
    `
  },
  {
    part: "Series 001 · Part Three",
    title: "But Who Gets to Build?",
    date: "April 2026", read: "4 min read",
    body: `
      <p>We love the story of the builder.</p>
      <p>The outsider who saw what others missed. The underdog who built a parallel system and changed everything. We tell it often because it is true — and because it is inspiring. But inspiration has a habit of skipping the fine print.</p>
      <hr/>
      <p>Not everyone who sees the bug gets to fix it.</p>
      <p>Yunus had a PhD from Vanderbilt. Linus Torvalds had a computer. Jimmy Wales had startup capital. Even the most celebrated "outsider" builders had something the system had already given them — education, connectivity, time, safety, or the kind of name that gets a meeting.</p>
      <p>What about the person who sees the problem just as clearly but has none of those things?</p>
      <p>The woman in a rural community who knows exactly why the local health system is failing but cannot leave her responsibilities to build an alternative. The young man with the idea but no device, no data, no investor who looks like him in the room. The teacher who sees a better way to educate children but spends every evening surviving, not building.</p>
      <p>They are not lacking vision. They are lacking runway.</p>
      <hr/>
      <p>This is the part the "just build it" narrative quietly ignores: building requires resources, and resources are not randomly distributed. They follow the same lines as power — the same lines that created the broken systems in the first place.</p>
      <p>So when we say <em>write your own code</em>, we must be honest about who has a keyboard.</p>
      <hr/>
      <p>This does not mean the builders are frauds or the stories are lies. It means the story is incomplete.</p>
      <p>The builders who make it through must lower the wall behind them, not just celebrate that they climbed it. Open systems must be genuinely open. And the question we ask cannot only be <em>what will you build</em> — it must also be <em>who are we leaving out of the building?</em></p>
      <p>The world does not need a few remarkable builders. It needs conditions where building is possible for the many — where the person with the clearest view of the problem is not automatically the last one given the tools to fix it.</p>
      <p>That is not just better code. That is a better compiler.</p>
    `
  },
  {
    part: "Series 001 · Part Four",
    title: "The Honest Changelog",
    date: "April 2026", read: "5 min read",
    body: `
      <p>Every software project has a changelog — a record of what was fixed, what was attempted, and what was quietly abandoned because it was harder than anyone admitted. The world needs one too.</p>
      <hr/>
      <p>Let's be honest about what has actually happened.</p>
      <p>The open-source movement changed software. It also created new gatekeepers, new hierarchies, and new ways to extract value from people who contributed freely. Wikipedia democratised knowledge. It also struggled for years with editor demographics so skewed that entire regions and experiences were systematically underrepresented. Microfinance lifted some. It also buried others in debt cycles that the glossy case studies never followed up on.</p>
      <p>Good code, badly deployed, still breaks things. This is not a reason to stop building. It is a reason to stop pretending that building is enough.</p>
      <hr/>
      <p>Change is slow in ways that are genuinely hard to sit with. Not slow like a download on a bad connection — where you can at least watch the progress bar. Slow like a shift in the water table. Invisible. Nonlinear. Sometimes you only know it happened by looking back from a distance you haven't reached yet.</p>
      <p>Most people who work on broken systems will not see the fix in their lifetime. This is the part no one puts in the pitch deck.</p>
      <hr/>
      <p>And yet. The changelog of human history — honest, unedited — still shows a direction. Imperfect, interrupted, often reversed. But a direction. They did not have hope as a feeling. They had it as a practice.</p>
      <hr/>
      <p>So here is what the reckoning actually looks like: you will probably not change the whole system. Your parallel system may fail, or succeed quietly, or be absorbed and stripped of everything that made it work.</p>
      <p>And you build anyway. Not because success is certain. But because the alternative — accepting that the broken way is permanent — is its own kind of surrender.</p>
      <p>You document what worked. You name what failed honestly. You pass the tools to whoever comes next and tell them the truth about what they are inheriting.</p>
      <p>That is the changelog. That is the work.</p>
      <hr/>
      <p>The world is not a problem to be solved and closed. It is an open file — always being written, always incomplete, always in need of the next person willing to sit down and type.</p>
      <p>You will not finish it. But you can move the cursor forward.</p>
    `
  }
];

let currentPost = 0;

function openPost(index) {
  currentPost = index;
  renderModal();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalOverlay').scrollTop = 0;
}

function renderModal() {
  const p = posts[currentPost];
  document.getElementById('modalPart').textContent = p.part;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalMeta').innerHTML = `<span>${p.date}</span><span>${p.read}</span>`;
  document.getElementById('modalBody').innerHTML = p.body;
  document.getElementById('navCount').textContent = `${currentPost + 1} of ${posts.length}`;
  document.getElementById('prevBtn').disabled = currentPost === 0;
  document.getElementById('nextBtn').disabled = currentPost === posts.length - 1;
  document.getElementById('modalOverlay').scrollTop = 0;
}

function navigatePost(dir) {
  currentPost = Math.max(0, Math.min(posts.length - 1, currentPost + dir));
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
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  if (e.key === 'Escape') closePost();
  if (e.key === 'ArrowRight') navigatePost(1);
  if (e.key === 'ArrowLeft') navigatePost(-1);
});
