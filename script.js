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
          <p>We can see the bugs clearly. Inequality loops endlessly. Institutions crash and reboot without real change. Innovation is welcomed in theory but blocked in practice. Those who ask to see how the system really works are labeled disruptive, even when the system is failing.</p>
          <p>The world runs on proprietary logic. A few write the rules; everyone else just uses the app and accepts the terms and conditions attached to it.</p>
          <hr/>
          <p>But history shows something important: when access is denied, new systems are built. Open ideas replace closed ones. Parallel solutions expose better ways of doing things. The old code doesn't get fixed — it gets replaced.</p>
          <p>So maybe the goal isn't to be given the source code anymore.</p>
          <p>Maybe it's to write better code: open, fair, and human — and let the world see that it works.</p>
        `
      },
      {
        part: "Series 001 · Edition A · Part Two",
        title: "So I Wrote My Own",
        subtitle: "Part Two", date: "April 2026", read: "4 min read", tag: "Builders",
        excerpt: "What does 'writing better code' actually look like? From Grameen Bank to Wikipedia — the pattern of people who stopped waiting for access and built parallel systems instead.",
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
        part: "Series 001 · Edition A · Part Three",
        title: "But Who Gets to Build?",
        subtitle: "Part Three", date: "April 2026", read: "4 min read", tag: "Access",
        excerpt: "The 'just build it' narrative quietly ignores something: building requires resources, and resources follow the same lines as power. So who actually has a keyboard?",
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
          <p>The builders who make it through must lower the wall behind them, not just celebrate that they climbed it. Open systems must be genuinely open. And the question we ask cannot only be <em>what will you build</em> — it must also be <em>who are we leaving out of the building?</em></p>
          <p>The world does not need a few remarkable builders. It needs conditions where building is possible for the many.</p>
          <p>That is not just better code. That is a better compiler.</p>
        `
      },
      {
        part: "Series 001 · Edition A · Part Four",
        title: "The Honest Changelog",
        subtitle: "Part Four", date: "April 2026", read: "5 min read", tag: "Reckoning",
        excerpt: "Good code, badly deployed, still breaks things. An unedited look at what change actually costs — and why you build anyway, not because success is certain, but because surrender is worse.",
        body: `
          <p>Every software project has a changelog — a record of what was fixed, what was attempted, and what was quietly abandoned because it was harder than anyone admitted. The world needs one too.</p>
          <hr/>
          <p>The open-source movement changed software. It also created new gatekeepers, new hierarchies, and new ways to extract value from people who contributed freely. Wikipedia democratised knowledge. It also struggled for years with editor demographics so skewed that entire regions and experiences were systematically underrepresented. Microfinance lifted some. It also buried others in debt cycles that the glossy case studies never followed up on.</p>
          <p>Good code, badly deployed, still breaks things. This is not a reason to stop building. It is a reason to stop pretending that building is enough.</p>
          <hr/>
          <p>Change is slow in ways that are genuinely hard to sit with. Not slow like a download on a bad connection — where you can at least watch the progress bar. Slow like a shift in the water table. Invisible. Nonlinear.</p>
          <p>Most people who work on broken systems will not see the fix in their lifetime. This is the part no one puts in the pitch deck.</p>
          <hr/>
          <p>And yet. The changelog of human history — honest, unedited — still shows a direction. They did not have hope as a feeling. They had it as a practice.</p>
          <hr/>
          <p>You will probably not change the whole system. Your parallel system may fail, or succeed quietly, or be absorbed and stripped of everything that made it work.</p>
          <p>And you build anyway. Not because success is certain. But because the alternative — accepting that the broken way is permanent — is its own kind of surrender.</p>
          <p>You document what worked. You name what failed honestly. You pass the tools to whoever comes next.</p>
          <p>That is the changelog. That is the work.</p>
          <hr/>
          <p>The world is not a problem to be solved and closed. It is an open file — always being written, always incomplete, always in need of the next person willing to sit down and type.</p>
          <p>You will not finish it. But you can move the cursor forward.</p>
        `
      }
    ]
  },
  B: {
    desc: "Written in plain language — for anyone who has ever felt the rules were written without them in the room.",
    posts: [
      {
        part: "Series 001 · Edition B · Part One",
        title: "They Built the Rules Before You Were Born",
        subtitle: "Part One", date: "April 2026", read: "3 min read", tag: "Systems",
        excerpt: "The problems are not mysterious. The solutions exist. What is missing is not the answer — it is who gets to decide.",
        body: `
          <p>There is a particular kind of frustration that has no good name.</p>
          <p>It is not the frustration of failing. It is the frustration of understanding — clearly, completely — why something is broken, and being told that the broken way is simply how things are.</p>
          <p>You see it in hospitals where the people who need the most care can afford the least of it. In schools that sort children by circumstance more than ability. In economies that reward those who already have, and charge interest to those who don't. In governments that consult the powerful and inform everyone else.</p>
          <p>The problems are not mysterious. They are not waiting for the right genius to crack them. The solutions, in most cases, already exist somewhere — in a community that figured it out, a country that tried it, a researcher who documented it decades ago.</p>
          <p>What is missing is not the answer. What is missing is who gets to decide.</p>
          <hr/>
          <p>A small number of people, in every generation, have shaped the rules that everyone else lives by. Not always through malice. Sometimes through habit. Sometimes through the simple fact that they were the ones in the room when the decisions were made — and everyone else was not.</p>
          <p>Those rules calcify. They become institutions. Institutions become culture. Culture becomes common sense. And common sense becomes the thing you are not supposed to question.</p>
          <p>But the world does not work for everyone equally. And the people it works least well for can see that most clearly.</p>
          <p>The frustration is not ignorance. It is vision without permission.</p>
          <hr/>
          <p>History, though, keeps showing us something important. Every era has people who refused to accept that the inherited rules were the only possible rules. Who looked at the way things were and asked, plainly: <em>why?</em></p>
          <p>And when the answer came back — <em>because that is how it has always been done</em> — they did not accept it as a reason. They built something else instead.</p>
          <p>That is what this series is about. Not the rules. The people who refused them — and what it actually took, and costs, and means, to build something different in a world that did not ask for your input.</p>
        `
      },
      {
        part: "Series 001 · Edition B · Part Two",
        title: "So Some People Stopped Asking for Permission",
        subtitle: "Part Two", date: "April 2026", read: "4 min read", tag: "Builders",
        excerpt: "Some doors open. Many do not. And a quieter group of people, watching the same wall, make a different decision entirely.",
        body: `
          <p>Most people, when they hit a wall, look for a door.</p>
          <p>They petition. They apply. They write the letter, attend the meeting, follow the process. They believe — reasonably — that if the problem is real enough and the case is strong enough, someone with authority will eventually open the door.</p>
          <p>Some doors open. Many do not.</p>
          <p>And a quieter group of people, watching the same wall, make a different decision. They stop looking for the door. They build somewhere else entirely.</p>
          <hr/>
          <p>In the 1970s, Muhammad Yunus was an economics professor in Bangladesh watching people around him sink deeper into poverty despite working constantly. The formal banking system had a clear answer for them: no. No credit history, no collateral, no account. The rules of lending had been written for people who already had something, and these people had nothing.</p>
          <p>He did not spend his career lobbying banks to change their criteria. He started lending small amounts of money directly — first from his own pocket, then through a structure that became Grameen Bank. The loans were tiny. The borrowers were mostly women. Repayment was built on trust and community accountability rather than paperwork and collateral.</p>
          <p>It worked. Not because the old system was defeated. Because a parallel one was built that the old system had never imagined necessary.</p>
          <hr/>
          <p>Across the world, in communities that formal systems had never properly served, people were making similar decisions.</p>
          <p>Families who could not get bank accounts built rotating savings circles — contributing together, taking turns, funding each other's needs. Communities without adequate hospitals trained local health workers. Farmers without access to markets formed cooperatives that gave them collective bargaining power no individual could have alone.</p>
          <p>None of these people were waiting for permission. None of them appeared in the news.</p>
          <p>They just looked at what was missing and built it — with what they had, for the people around them.</p>
          <hr/>
          <p>This is what stopping asking for permission actually looks like. Not defiance for its own sake. Just a clear-eyed decision: <em>the door is not opening. So we will build a room of our own.</em></p>
          <p>The old systems did not collapse. But alongside them, quietly and stubbornly, other ways of doing things took root — and kept growing. Not because someone gave them space to. Because they refused to need it.</p>
        `
      },
      {
        part: "Series 001 · Edition B · Part Three",
        title: "But Not Everyone Gets That Choice",
        subtitle: "Part Three", date: "April 2026", read: "4 min read", tag: "Access",
        excerpt: "Will is necessary. It is not sufficient. The most important ingredient for change is not equally available to everyone — and the stories we tell skip that part.",
        body: `
          <p>We love the story of the person who refused.</p>
          <p>Who looked at the wall and built a door. Who took what little they had and made something from it. Who did not wait for permission and did not need it.</p>
          <p>We love this story because it is true, and because it is hopeful, and because it suggests that the most important ingredient for change is will — and will, we like to believe, is equally available to everyone.</p>
          <p>It is not.</p>
          <hr/>
          <p>Will is necessary. It is not sufficient.</p>
          <p>Building something requires more than the desire to build. It requires time that is not already consumed by survival. It requires some form of resource, even if small. It requires a safety net thin enough to risk, a community willing to support the attempt, a body not already exhausted.</p>
          <p>It requires, in most cases, that someone somewhere along the line gave you something — an education, a connection, a period of stability, a door that opened even slightly.</p>
          <p>The people whose stories get told almost always had at least one of these. Not wealth, necessarily. But something. A relative who kept them afloat while they tried. A teacher who noticed them. A city that gave them enough margin to think beyond the next meal.</p>
          <p>The people who had nothing — no margin, no safety, no slack — often saw the problems just as clearly. Often had better ideas than anyone. And built nothing, not because they lacked vision, but because vision alone cannot feed a family or pay a landlord.</p>
          <hr/>
          <p>This is the part of the story that gets skipped. Not because it is unimportant, but because it is uncomfortable. It asks us to hold two things at once: the genuine power of individual will, and the genuine constraints that make that will unequally possible.</p>
          <p>It asks us to celebrate the builders without pretending that the ones who did not build simply did not want to badly enough.</p>
          <hr/>
          <p>The people who do manage to build something different carry a responsibility that does not end with their own success. They have to ask who is still on the other side of the wall. They have to ask what it would take to make building possible for more than the few who had just enough margin to try.</p>
          <p>The question is not only <em>why don't more people change things.</em> It is: <em>what are we doing with what we were given, to make the next attempt possible for someone who was given less?</em></p>
        `
      },
      {
        part: "Series 001 · Edition B · Part Four",
        title: "The Honest Truth About Changing Things",
        subtitle: "Part Four", date: "April 2026", read: "5 min read", tag: "Reckoning",
        excerpt: "Let's tell the truth about change. Not the version that ends with a quote and a lesson. The version that actually happened.",
        body: `
          <p>Let's tell the truth about change. Not the version that ends with a quote and a lesson. The version that actually happened.</p>
          <hr/>
          <p>Many of the parallel systems that were built with courage and conviction were eventually absorbed, diluted, or dismantled by the very structures they had set out to offer an alternative to.</p>
          <p>Cooperative movements became corporations. Community banks became acquisitions. Grassroots organisations became bureaucracies with donor dependencies and mission drift. The radical idea became the respectable institution, and the respectable institution began making the same compromises the original founders had built their whole project to avoid.</p>
          <p>Changing things is genuinely hard. Not motivationally hard — most people who try are not lacking in commitment. Structurally hard. The existing systems are old, resourced, legally protected, and socially normalised. They have been here longer than any of us and will outlast most of what we attempt.</p>
          <hr/>
          <p>And yet.</p>
          <p>History — the long, honest version — still shows movement. Not a straight line. Not a guaranteed arc. But movement. Things that were once impossible became normal. Arrangements that once seemed permanent unravelled.</p>
          <p>The people who did that work mostly did not live to see the full result. They kept going anyway — not because they were certain, but because stopping felt worse than continuing.</p>
          <p>That is the most honest thing that can be said about hope: it is not a feeling. It is a practice. It is the decision, made again every day, to act as if your effort will matter even when you cannot prove that it will.</p>
          <hr/>
          <p>You will not change the whole system. Accept that early and it will free you from a kind of paralysis that destroys more potential than failure ever does. You do not need to fix everything. You need to fix your part of it, as well as you can, and document what you learned so that whoever comes next does not have to start from nothing.</p>
          <p>You build what you can build. You are honest about what did not work. You pass on what you know.</p>
          <p>That is the work. Not glamorous. Not guaranteed. But real.</p>
          <hr/>
          <p>The rules were built before you were born. That has always been true. It was true for every person who ever changed anything.</p>
          <p>They built anyway. <em>So can you.</em></p>
        `
      }
    ]
  }
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
