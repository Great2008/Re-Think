import { Link } from 'react-router-dom';
import { useSeries } from '../lib/SeriesContext.jsx';

export default function Home() {
  const series = useSeries();

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
        {series.length === 0 ? (
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', padding: '1rem' }}>
            Loading...
          </p>
        ) : series.map(s => (
          <SeriesCard key={s.id} series={s} />
        ))}
      </div>
    </>
  );
}

function SeriesCard({ series: s }) {
  const totalParts = 4;

  return (
    <Link className="series-card" to={`/series/${s.id}`}>
      <div className="card-eyebrow">Series {s.number} &nbsp;·&nbsp; {totalParts} Parts</div>
      <div className="card-title">{s.title}</div>
      <p className="card-desc">{s.description}</p>
      <div className="card-footer">
        <div className="card-parts">
          {Array.from({ length: totalParts }).map((_, i) => (
            <div key={i} className="card-part-dot filled" />
          ))}
        </div>
        <span className="card-cta">Read series</span>
      </div>
    </Link>
  );
}
