import { Link } from 'react-router-dom';

const SERIES = [
  {
    id: 'series-001',
    number: '001',
    parts: 4,
    title: "I Can Repair the World, But They Won't Give Me the Source Code",
    desc: "The world's problems are not unsolvable — they are inaccessible. A four-part series on broken systems, the people who build around them, who gets left out, and the honest cost of change.",
  },
  {
    id: 'series-002',
    number: '002',
    parts: 4,
    title: 'Default Settings',
    desc: 'The beliefs you inherited and never chose. A four-part series on the settings nobody asked you about — and what it costs to change them.',
  },
  {
    id: 'series-003',
    number: '003',
    parts: 4,
    title: 'The Unpaid Contributor',
    desc: "Care work, community work, and all the labour that keeps systems running but never gets committed to the repo. A four-part series on the invisible infrastructure of African societies — who builds it, who benefits, and what it costs to keep pretending it is free.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-tag">Est. 2026 &nbsp;·&nbsp; Raw Thinking</div>
        <h1>The world hands you a script.<br /><em>Re:Think reads between the lines.</em></h1>
        <p className="hero-desc">
          A blog for people who question the defaults — in systems, in thinking, in the way things have always been done.
        </p>
      </section>

      <div className="divider">
        <div className="divider-line" />
        <span className="divider-label">All Series</span>
        <div className="divider-line" />
      </div>

      <div className="series-grid">
        {SERIES.map(s => (
          <Link key={s.id} className="series-card" to={`/series/${s.id}`}>
            <div className="card-eyebrow">Series {s.number} &nbsp;·&nbsp; {s.parts} Parts</div>
            <div className="card-title">{s.title}</div>
            <p className="card-desc">{s.desc}</p>
            <div className="card-footer">
              <div className="card-parts">
                {Array.from({ length: s.parts }).map((_, i) => (
                  <div key={i} className="card-part-dot filled" />
                ))}
              </div>
              <span className="card-cta">Read series</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
