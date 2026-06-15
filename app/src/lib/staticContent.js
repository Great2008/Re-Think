// Static content extracted from the original HTML files.
// Used as fallback when Supabase data is unavailable or for series-001
// (which existed before Supabase CMS was set up).

export const STATIC_SERIES = {
  'series-001': {
    id: 'series-001',
    number: '001',
    title: "I Can Repair the World, But They Won't Give Me the Source Code",
    description:
      "The world's problems are not unsolvable — they are inaccessible. A four-part series on broken systems, the people who build around them, who gets left out, and the honest cost of change.",
    edition: 'Edition A',
  },
  'series-002': {
    id: 'series-002',
    number: '002',
    title: 'Default Settings',
    description:
      'The beliefs you inherited and never chose. A four-part series on the settings nobody asked you about — and what it costs to change them.',
    edition: null,
  },
  'series-003': {
    id: 'series-003',
    number: '003',
    title: 'The Unpaid Contributor',
    description:
      "Care work, community work, and all the labour that keeps systems running but never gets committed to the repo. A four-part series on the invisible infrastructure of African societies — who builds it, who benefits, and what it costs to keep pretending it is free.",
    edition: null,
  },
};

export const STATIC_POSTS = {
  'series-001': [
    {
      id: 's001-p1',
      part_number: 1,
      subtitle: 'Part One',
      title: "I Can Repair the World, But They Won't Give Me the Source Code",
      excerpt:
        'The solutions exist. The ideas exist. The people who can fix things exist. What is missing is access — the hidden rules, closed systems, and guarded decisions that run the world.',
      tag: 'Systems',
      date: 'April 2026',
      read_time: '3 min read',
      content: `Many of the world's problems are not unsolvable: they're inaccessible. The solutions exist. The ideas exist. The people who can fix things exist. What is missing is the access to the source code: the hidden rules, closed systems, and guarded decisions that shape education, economics, governance, and technology.

We can see the bugs clearly. We know where the code breaks. Inequality loops endlessly. Institutions crash and reboot without real change. Deployments break, new commits made and pushed without checking the build logs. Innovation is welcomed in theory but blocked in practice. Those who ask to see how the system really works, who submit their debug logs, who wish to check the runtime and console logs are labeled disruptive, even when the system is failing.

The world runs on proprietary logic. A select few write the rules, deploy the codes; everyone else just uses the app and accepts the terms and conditions attached to it.

---

But history shows something important: when access is denied, new systems are built, new apps are deployed. Open ideas replace closed ones. Parallel solutions expose better ways of doing things. The old code doesn't get fixed — because we never see the source code — it gets replaced.

So maybe the goal isn't to be given the source code anymore. Maybe we should stop asking for it.

Maybe the goal should now be to write better code that'll be open, fair, and human — and let the world see that it works.`,
    },
    {
      id: 's001-p2',
      part_number: 2,
      subtitle: 'Part Two',
      title: 'So I Wrote My Own',
      excerpt:
        'What does "writing better code" actually look like? From Grameen Bank to Wikipedia — the pattern of people who stopped waiting for access and built parallel systems instead.',
      tag: 'Systems',
      date: 'April 2026',
      read_time: '4 min read',
      content: `There is a particular kind of frustration that comes not from failure, but from clarity.

You see the problem exactly. You understand what is broken. You can sketch the fix on a napkin. You can debug the errors. But between that napkin, your PC, your keyboard and the actual system, the source code, the repository, sits a firewall without a password — only a pop-up that says *Access Restricted. Authorised Devices Only.*

Most people walk away from that wall. A few decide to build elsewhere, to create a fresh repo.

---

Muhammad Yunus couldn't fix global banking. So he wrote new code: small loans, trust-based repayment, community accountability. Grameen Bank wasn't a patch on the old app. It was an entirely different app, a parallel architecture, open to the people the old system had closed out, who couldn't accept the T&Cs of the old app.

Wikipedia didn't lobby the encyclopaedia industry. It simply said: *let anyone improve it, let the world verify it.* The proprietary encyclopaedias are mostly gone. Wikipedia serves billions.

Neither won by attacking the old system or asking for the source code. They won simply by being more useful, by utilising the time which would've been wasted asking for the source code to build a better app.

---

The pattern repeats. We can see them everywhere. Linux. Community radio. Cooperative savings circles. Fintech solutions. Edtech solutions. Teachers who couldn't change the curriculum and started YouTube channels instead.

None of them were given the source code. None of them got past that firewall. All of them wrote their own.

---

This is not always celebrated. Resistance intensifies the moment your parallel system starts working. Those in control of the source code, those with access to the firewall resist the working system. But that resistance is itself the argument for why it was necessary.

Writing better code doesn't require a revolution. It requires a decision, a commitment — to stop waiting for access and start building with what you have.

You already see the bugs. You have been seeing them. You can debug the errors. You have been debugging them.

The question is no longer *when will someone fix this?; when will I have access to the codes?* The question is: *what will you build?*`,
    },
    {
      id: 's001-p3',
      part_number: 3,
      subtitle: 'Part Three',
      title: 'But Who Gets to Build?',
      excerpt:
        'Not everyone who sees the bug gets to fix it. The "just build it" narrative quietly skips the fine print.',
      tag: 'Systems',
      date: 'April 2026',
      read_time: '4 min read',
      content: `We love the story of the builder.

The outsider who saw what others missed. The developer that built a better app. The underdog who built a parallel system and changed everything. The teacher who started a YouTube Channel. The techie who developed a fintech and/or edtech solution. We tell it often because it is true; because the system worked; and because it is inspiring. But inspiration has a habit of skipping the fine print.

---

Not everyone who sees the bug gets to fix it.

Let's be honest! Yunus had a PhD from Vanderbilt. Linus Torvalds had a computer, a keyboard and a mouse. Jimmy Wales had startup capital. Even the most celebrated "outsider" builders had something the system had already given them — education, connectivity, time, safety, tools or the kind of name that gets a hearing and a meeting.

What about the person who sees the problem just as clearly but has none of those things?

The woman in a rural community who knows exactly why the local health system is failing but cannot leave her responsibilities to build an alternative. The young man with the idea but no device, no data, no investor who thinks like him in the room. The teacher who sees a better way to educate children but spends every evening surviving, not building.

They are not lacking vision. They are not lacking ideas. They are lacking runway. They are lacking wings. They are lacking capital.

---

This is the part the "just build it" narrative quietly ignores: solutions require building, building requires resources, resources require access and access is limited. They follow the same lines as power — the same lines that created the broken systems in the first place.

So when we say *write your own code*, we must be honest about who has a keyboard.

---

The builders who make it through must lower the wall behind them, not just celebrate that they climbed it. Open systems must be genuinely open. And the question we ask cannot only be *what will you build* — it must also be *who are we leaving out of the building?*

The world does not need a few remarkable builders. It needs conditions where building is possible for the many.

That is not just better code. That is a better compiler.`,
    },
    {
      id: 's001-p4',
      part_number: 4,
      subtitle: 'Part Four',
      title: 'The Honest Changelog',
      excerpt:
        'Every software project has a changelog. The world needs one too — honest, unedited, including what was quietly abandoned.',
      tag: 'Systems',
      date: 'April 2026',
      read_time: '5 min read',
      content: `Every software project has a changelog — a record of what was fixed, what was attempted, and what was quietly abandoned because it was harder than anyone admitted. The world needs one too.

---

The open-source movement changed software. It also created new gatekeepers, new hierarchies, new firewalls, new T&Cs and new ways to extract value from people who contributed freely. Wikipedia democratised knowledge. It also struggled for years with editor demographics so skewed that entire regions and experiences were systematically underrepresented. Microfinance lifted some. It also buried others in debt cycles that the glossy case studies never followed up on.

Good code, badly deployed, still breaks things. This is not a reason to stop building. It is a reason to stop pretending that building is enough.

---

Change is slow in ways that are genuinely hard to sit with. Not slow like a download on a poor connection — where you can at least watch the progress bar. Slow like a shift in the water table. Invisible. Nonlinear.

Most people who work on broken systems will not see the fix in their lifetime. This is the part no one puts in the pitch deck.

---

And yet. The changelog of human history — honest, unedited — still shows a direction. They did not have hope as a feeling. They had it as a practice.

---

You will probably not change the whole system. Your parallel system may fail, or succeed quietly, or be absorbed and stripped of everything that made it work. But you have done something.

And you will build anyway. Not because success is certain. Not because failure is imminent. But because the alternative — accepting that the broken way is permanent — is its own kind of surrender.

You should write a README file. You should document what worked. You should name what failed honestly. And pass the tools to whoever comes next.

That is the changelog. That is the work.

---

The world is not a problem that can be solved and closed. It is an open file — always being written, always incomplete, always in need of the next person willing to sit down and type.

You will not finish it. Because it cannot be finished. But you can move the cursor forward.`,
    },
  ],

  'series-002': [
    {
      id: 's002-p1',
      part_number: 1,
      subtitle: 'Part One',
      title: 'Out of the Box',
      excerpt:
        "Nobody asked you which beliefs to ship with. The configuration was already running when you arrived.",
      tag: 'Identity',
      date: 'June 2026',
      read_time: '4 min read',
      content: `Nobody asked you.

That is the thing nobody tells you about your beliefs, your instincts, the way you react when something feels wrong or right or normal. Nobody sat you down and walked you through the options. Nobody handed you a list and said: *here are the available settings — choose what fits.*

You arrived. And the configuration was already running.

---

Your first defaults were installed before you had language to question them. What a family looks like. What success means. Which God to fear, or whether to fear one at all. What kind of work is respectable. Who is trustworthy. What is yours to want and what is above your station.

You did not choose these settings. You inherited them — from people who also did not choose theirs.

This is not a criticism of anyone who raised you. They were also running inherited configurations, doing the best they could with a setup they never fully examined. But that is exactly the point. The settings travel. Generation to generation, culture to culture, geography to geography — quietly, efficiently, without a prompt.

---

Every operating system ships with defaults. Most users never open the settings menu. Not because they are incapable, but because the defaults *work* — well enough, most of the time, for most things. The system boots. The applications run. There is no obvious reason to go looking.

This is not laziness. It is how systems are designed to function. The defaults are chosen to reduce friction. To make the system usable without requiring every user to become an expert in its configuration before they can do anything at all.

The same logic runs in people.

You do not re-examine what respect means every morning. You do not audit your assumptions about strangers before every interaction. You run the installed settings because life requires you to move fast, and questioning everything, all the time, is its own kind of paralysis. The defaults are load-bearing. They hold up ordinary life.

---

But here is what the manual does not say: the defaults were not designed for you specifically. They were designed for a general case — or more honestly, for whoever the designers had in mind when they built the system. And you may or may not resemble that person. Your circumstances may or may not match the assumptions baked in.

A setting that works perfectly in one environment can fail silently in another. Not with an error message. Not with a crash. Just — quietly producing the wrong output, year after year, while everything appears to be running fine.

Some people spend their whole lives running settings that were never meant for their context. Optimising within a configuration that does not fit. Working harder inside a setup that was written for someone else.`,
    },
    {
      id: 's002-p2',
      part_number: 2,
      subtitle: 'Part Two',
      title: 'Running on Background Processes',
      excerpt:
        "Nobody announces the background processes. They run quietly, shaping outputs you didn't consciously request.",
      tag: 'Identity',
      date: 'June 2026',
      read_time: '5 min read',
      content: `Nobody announces the background processes.

That is the point of them. They run quietly, consuming resources you cannot see, shaping outputs you did not consciously request. You are not aware of them until something slows down, or crashes, or produces a result so wrong that you finally open the task manager and ask: *what is actually running on this machine?*

Most people never open the task manager.

---

Think about the last time you made a decision you were certain was yours.

The career you chose — or the one you ruled out without quite knowing why. The kind of person you find trustworthy on first meeting. The way you read a room and decide who has authority in it. The things you work hard for without asking whether they are worth it. The things you never attempt because some early voice told you they were not for people like you.

You experienced all of these as choices. As instincts. As *you.*

But behind each one, something was already running. A process installed years ago. A value inherited so early it feels biological. A fear that arrived before you had a name for it and has been quietly filtering your options ever since.

---

Background processes are not always malicious. Some of them are protective. A child who learned that strangers could not be trusted may have learned that for good reason. A person who grew up with scarcity running in the background does not waste — and in many contexts, that is not a flaw, it is intelligence. The process was written in response to a real environment. It did exactly what it was supposed to do.

The problem is not that the process exists. The problem is when the environment changes and the process does not update.

You are no longer in that house. You are no longer in that classroom, that neighbourhood, that version of the world that required those particular defences. But the process is still running. Still consuming. Still filtering. Still producing outputs that made sense then and cause damage now.

A security protocol designed for a war zone, running in peacetime, does not feel like safety. It feels like anxiety.

---

There is a particular kind of exhaustion that comes from this.

Not physical exhaustion. Something slower. The tiredness of people who work twice as hard because a background process keeps telling them they are not enough. The heaviness of people who cannot receive good things easily because something running underneath keeps flagging them as temporary, as mistakes, as things that will be taken back. The loneliness of people who keep everyone at a distance because an old process, written for self-preservation, cannot tell the difference between a threat and an invitation.

These are not character flaws. They are outdated processes running on current hardware.`,
    },
    {
      id: 's002-p3',
      part_number: 3,
      subtitle: 'Part Three',
      title: 'Who Wrote the Installer?',
      excerpt:
        "The defaults were not an accident. Someone chose them. The question is: who, and why.",
      tag: 'Identity',
      date: 'June 2026',
      read_time: '5 min read',
      content: `Let us be precise about something.

The defaults were not an accident. They were not a neutral starting point, a blank slate that simply happened to look one particular way. Defaults are designed. Someone chose them. Someone decided what the factory settings would be, what would ship pre-installed, what the user would have to actively work to change.

The question is not only *what are my defaults.* The question is *who put them there, and why.*

---

Every system that installs defaults in people has an interest in what those defaults produce.

The school that taught you to sit still, answer when called upon, and treat the textbook as final — that school was not simply teaching you to read. It was configuring a particular relationship to authority. It was writing a process: *wait for permission. Do not question the source. The institution knows.*

This was useful. Useful for the institution. Useful for the economy that needed workers who could follow instructions without friction. Useful for a political order that preferred subjects to citizens. The default was not chosen because it was best for you. It was chosen because it was functional for the system that needed you in a particular shape.

---

This is not a conspiracy. It does not require anyone sitting in a room deciding to harm you. Systems do not need malice to produce harmful defaults. They only need incentives — and the incentive to produce compliant, predictable, low-maintenance people is very old and very consistent.

Think about what was taught as universal and what was taught as particular.

Whose history arrived with dates and monuments and the implicit weight of *this is how things happened.* Whose history arrived as a footnote, a special unit, a month — bracketed, optional, extra. Whose literature was called Literature and whose was called Regional. Whose way of organising a family was called natural and whose was called a problem to be solved.

The curriculum did not announce itself as a political document. It announced itself as knowledge. But the selection of what counts as knowledge — what gets installed as default, what gets left out of the package entirely — that selection is never neutral. It reflects the priorities of whoever controlled the installer.

---

And it runs. Long after school. Long after the teacher is gone, the textbook discarded, the classroom forgotten. The process that was written then is still running now — shaping what you believe is true, what you assume is possible, who you see as an authority, what version of yourself you think is worth presenting.

You may have updated some of it consciously. Travelled. Read. Encountered people and ideas that rewrote a process or two. But underneath, the original installation is still there. The base layer. The assumptions so deep they feel like facts.

---

This is why the question *who wrote the installer?* is not academic.`,
    },
    {
      id: 's002-p4',
      part_number: 4,
      subtitle: 'Part Four',
      title: 'The Manual Override',
      excerpt:
        "Here is what nobody tells you about changing a default: it is not a moment. It is sustained, unglamorous friction.",
      tag: 'Identity',
      date: 'June 2026',
      read_time: '5 min read',
      content: `Here is what nobody tells you about changing a default.

It is not a moment. It is not an insight, a book, a conversation, a difficult year — not any single thing that flips a switch and leaves you running clean, updated, finally free of the old configurations. That version of change is a product. It is sold in formats: retreats, frameworks, morning routines, twelve steps, forty days.

It is not how it works.

---

Changing a default is friction. Sustained, unglamorous, repetitive friction. It is the process of doing the thing the old setting says not to do, again and again, until the new behaviour has enough weight to become the path of least resistance. Until the override runs faster than the original.

It takes longer than anyone admits. It costs more than anyone budgets. And it does not proceed in a straight line.

This is important: changing a default does not erase it. The original process does not get deleted. It gets subordinated — pushed down the priority list, weakened by disuse, made slower by the new process running alongside it. But it remains. Under stress, under fatigue, in the moments when your resources are depleted and the system is trying to conserve energy — the old default reasserts. The old voice returns. The old pattern re-emerges.

This is not failure. This is how defaults work. A factory reset is always available to the system. The question is whether you notice it happening and choose again.

---

There is also the cost that lives outside you.

Changing your defaults does not happen in a sealed environment. You are embedded in relationships, communities, families, cultures — all of which have their own configurations, and many of which have a stake in yours staying the same.

The person who begins to question what they were taught about their own worth will eventually stop accepting certain treatments as normal. That change will not be welcomed by everyone who benefited from the original setting.

The person who updates their relationship to money — who starts to believe that they are allowed to have things, to want things, to build things — will sometimes find that this belief creates distance from people who were comfortable with the old version.

The person who rewrites the process that said *stay small, stay quiet, do not take up too much space* will take up more space. And some people in their life will experience that as a loss.

This is real. It is a cost. The manual override is not only an internal project — it is a social one. It changes what you can tolerate, what you require, who you can stay close to. Some relationships will not survive you becoming more fully yourself. That grief is legitimate. It does not mean the change was wrong.

---

And yet the alternative is its own kind of cost. A slower one. Less visible.`,
    },
  ],
};

// Series-003 posts are only in Supabase (they were added after the CMS migration).
// The Series page will show an error/loading state if Supabase is unavailable.
