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

// ── POST DATA ──
const editions = {
  A: {
    desc: "Written with tech metaphors — for readers who speak in systems, code, and architecture.",
    posts: [
      {
        part: "Series 001 · Edition A · Part One",
        title: "I Can Repair the World, But They Won't Give Me the Source Code",
        subtitle: "Part One", date: "April 2026", read: "3 min read", tag: "Systems",
        excerpt: "The solutions exist. The ideas exist. The people who can fix things exist. What is missing is access — the hidden rules, closed systems, and guarded decisions that run the world.",
        body: `
          <p>Many of the world's problems are not unsolvable: they're inaccessible. The solutions exist. The ideas exist. The people who can fix things exist. What is missing is the access to the source code: the hidden rules, closed systems, and guarded decisions that shape education, economics, governance, and technology.</p>
          <p>We can see the bugs clearly. We know where the codes breaks. Inequality loops endlessly. Institutions crash and reboot without real change. Deployments break, new commits made and pushed without checking the build logs. Innovation is welcomed in theory but blocked in practice. Those who ask to see how the system really works, who submit their debug logs, who wish to check the runtime and console logs are labeled disruptive, even when the system is failing.</p>
          <p>The world runs on proprietary logic. A select few write the rules, deploy the codes; everyone else just uses the app and accepts the terms and conditions attached to it.</p>
          <hr/>
          <p>But history shows something important: when access is denied, new systems are built, new apps are deployed. Open ideas replace closed ones. Parallel solutions expose better ways of doing things. The old code doesn't get fixed - because we never see the source code - it gets replaced.</p>
          <p>So maybe the goal isn't to be given the source code anymore. Maybe we should stop asking for it.</p>
          <p>Maybe the goal should now be to write better code that'll be open, fair, and human — and let the world see that it works.</p>
        `
      },
      {
        part: "Series 001 · Part Two",
        title: "So I Wrote My Own",
        subtitle: "Part Two", date: "April 2026", read: "4 min read", tag: "Builders",
        excerpt: "What does 'writing better code' actually look like? From Grameen Bank to Wikipedia — the pattern of people who stopped waiting for access and built parallel systems instead.",
        body: `
          <p>There is a particular kind of frustration that comes not from failure, but from clarity.</p>
          <p>You see the problem exactly. You understand what is broken. You can sketch the fix on a napkin. You can debug the errors. But between that napkin, your PC, your keyboard and the actual system, the source code, the repository, sits a firewall without a password only a pop-up that says <em>Access Restricted. Authorised Devices Only.</em></p>
          <p>Most people walk away from that wall. A few decide to build elsewhere, to create a fresh repo. </p>
          <hr/>
          <p>Muhammad Yunus couldn't fix global banking. So he wrote new code: small loans, trust-based repayment, community accountability. Grameen Bank wasn't a patch on the old app. It was an entirely different app, a parallel architecture, open to the people the old system had closed out, who couldn't accept the T&Cs of the old app.</p>
          <p>Wikipedia didn't lobby the encyclopaedia industry. It simply said: <em>let anyone improve it, let the world verify it.</em> The proprietary encyclopaedias are mostly gone. Wikipedia serves billions.</p>
          <p>Neither won by attacking the old system or asking for the source code. They won simply by being more useful, by utilising the time which would've been wasted asking for the source code to build a better app.</p>
          <hr/>
          <p>The pattern repeats. We can see them everywhere. Linux. Community radio. Cooperative savings circles. Fintech solutions. Edtech solutions. Teachers who couldn't change the curriculum and started YouTube channels instead.</p>
          <p>None of them were given the source code. None of them got past that firewall. All of them wrote their own.</p>
          <hr/>
          <p>This is not always celebrated. Resistance intensifies the moment your parallel system starts working. Those in control of the source code, those with access to the firewall resist the working system. But that resistance is itself the argument for why it was necessary.</p>
          <p>Writing better code doesn't require a revolution. It requires a decision, a commitment — to stop waiting for access and start building with what you have.</p>
          <p>You already see the bugs. You have been seeing them. You can debug the errors. You have been debugging them</p>
          <p>The question is no longer <em>when will someone fix this?; when will I have access to the codes?</em> The question is: <em>what will you build?</em></p>
        `
      },
      {
        part: "Series 001 · Part Three",
        title: "But Who Gets to Build?",
        subtitle: "Part Three", date: "April 2026", read: "4 min read", tag: "Access",
        excerpt: "The 'just build it' narrative quietly ignores something: building requires resources, and resources follow the same lines as power. So who actually has a keyboard?",
        body: `
          <p>We love the story of the builder.</p>
          <p>The outsider who saw what others missed. The developer that built a better app. The underdog who built a parallel system and changed everything. The teacher who started a YouTube Channel. The techie who developed a fintech and/or edtech solution. We tell it often because it is true; because the system worked; and because it is inspiring. But inspiration has a habit of skipping the fine print.</p>
          <hr/>
          <p>Not everyone who sees the bug gets to fix it.</p>
          <p>Let's be honest! Yunus had a PhD from Vanderbilt. Linus Torvalds had a computer, a keyboard and a mouse. Jimmy Wales had startup capital. Even the most celebrated "outsider" builders had something the system had already given them — education, connectivity, time, safety, tools or the kind of name that gets a hearing and a meeting.</p>
          <p>What about the person who sees the problem just as clearly but has none of those things?</p>
          <p>The woman in a rural community who knows exactly why the local health system is failing but cannot leave her responsibilities to build an alternative. The young man with the idea but no device, no data, no investor who thinks like him in the room. The teacher who sees a better way to educate children but spends every evening surviving, not building.</p>
          <p>They are not lacking vision. They are not lacking ideas. They are lacking runway. They are lacking wings. They are lacking capital</p>
          <hr/>
          <p>This is the part the "just build it" narrative quietly ignores: solutions requires building, building requires resources, resources requires access and access is limited. They follow the same lines as power — the same lines that created the broken systems in the first place.</p>
          <p>So when we say <em>write your own code</em>, we must be honest about who has a keyboard.</p>
          <hr/>
          <p>The builders who make it through must lower the wall behind them, not just celebrate that they climbed it. Open systems must be genuinely open. And the question we ask cannot only be <em>what will you build</em> — it must also be <em>who are we leaving out of the building?</em></p>
          <p>The world does not need a few remarkable builders. It needs conditions where building is possible for the many.</p>
          <p>That is not just better code. That is a better compiler.</p>
        `
      },
      {
        part: "Series 001 · Part Four",
        title: "The Honest Changelog",
        subtitle: "Part Four", date: "April 2026", read: "5 min read", tag: "Reckoning",
        excerpt: "Good code, badly deployed, still breaks things. An unedited look at what change actually costs — and why you build anyway, not because success is certain, but because surrender is worse.",
        body: `
          <p>Every software project has a changelog — a record of what was fixed, what was attempted, and what was quietly abandoned because it was harder than anyone admitted. The world needs one too.</p>
          <hr/>
          <p>The open-source movement changed software. It also created new gatekeepers, new hierarchies, new firewalls, new Ts&Cs and new ways to extract value from people who contributed freely. Wikipedia democratised knowledge. It also struggled for years with editor demographics so skewed that entire regions and experiences were systematically underrepresented. Microfinance lifted some. It also buried others in debt cycles that the glossy case studies never followed up on.</p>
          <p>Good code, badly deployed, still breaks things. This is not a reason to stop building. It is a reason to stop pretending that building is enough.</p>
          <hr/>
          <p>Change is slow in ways that are genuinely hard to sit with. Not slow like a download on a poor connection — where you can at least watch the progress bar. Slow like a shift in the water table. Invisible. Nonlinear.</p>
          <p>Most people who work on broken systems will not see the fix in their lifetime. This is the part no one puts in the pitch deck.</p>
          <hr/>
          <p>And yet. The changelog of human history — honest, unedited — still shows a direction. They did not have hope as a feeling. They had it as a practice.</p>
          <hr/>
          <p>You will probably not change the whole system. Your parallel system may fail, or succeed quietly, or be absorbed and stripped of everything that made it work. But you have done something</p>
          <p>And you will build anyway. Not because success is certain. Not because failure is imminent. But because the alternative — accepting that the broken way is permanent — is its own kind of surrender.</p>
          <p> You should write a README file. You should document what worked. You should name what failed honestly. And pass the tools to whoever comes next.</p>
          <p>That is the changelog. That is the work.</p>
          <hr/>
          <p>The world is not a problem that can be solved and closed. It is an open file — always being written, always incomplete, always in need of the next person willing to sit down and type.</p>
          <p>You will not finish it. Because it cannot be finished. But you can move the cursor forward.</p>
        `
      }
    ]
  },
};

// ── EDITION SWITCHER ──
let activeEdition = 'A';
let currentPost = 0;

function switchEdition(ed) {
  activeEdition = ed;

  // Update tab styles
  document.querySelectorAll('.edition-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.edition === ed);
  });

  // Update description
  document.getElementById('editionDesc').textContent = editions[ed].desc;

  // Re-render posts list
  renderPostsList();
}

function renderPostsList() {
  const container = document.getElementById('posts');
  const posts = editions[activeEdition].posts;
  container.innerHTML = posts.map((p, i) => `
    <a class="post-item" onclick="openPost(${i}); return false;" href="#">
      <div class="post-number">0${i + 1}</div>
      <div class="post-meta-col">
        <span class="post-subtitle">${p.subtitle}</span>
        <div class="post-title">${p.title}</div>
        <p class="post-excerpt">${p.excerpt}</p>
        <div class="post-footer">
          <span class="post-date">${p.date}</span>
          <span class="post-read">${p.read}</span>
          <span class="post-tag">${p.tag}</span>
        </div>
      </div>
    </a>
  `).join('');
}

// ── MODAL ──
function openPost(index) {
  currentPost = index;
  renderModal();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalOverlay').scrollTop = 0;
}

function renderModal() {
  const posts = editions[activeEdition].posts;
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
  const len = editions[activeEdition].posts.length;
  currentPost = Math.max(0, Math.min(len - 1, currentPost + dir));
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

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(html.getAttribute('data-theme') || 'dark');
  if (document.getElementById('posts')) {
    renderPostsList();
  }
});
