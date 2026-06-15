import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section className="series-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>About</span>
        </div>
        <div className="series-hero-label">The Publication</div>
        <h1>What Re:Think Is</h1>
        <p className="series-hero-desc">And what it is trying to do.</p>
      </section>

      <div className="divider">
        <div className="divider-line" />
        <span className="divider-label">Mission</span>
        <div className="divider-line" />
      </div>

      <div className="about-body">

        <div className="about-section">
          <p>Every system ships with defaults.</p>
          <p>The way things are structured. The assumptions baked into institutions. The ideas that get treated as obvious, as natural, as simply the way things work — until you look closely enough to see that someone chose them, and that someone had interests, and that those interests were not always yours.</p>
          <p>Re:Think is a publication for people who look closely.</p>
        </div>

        <div className="about-section">
          <div className="about-label">// What we write about</div>
          <p>Systems — how they are built, who they serve, and what they hide. Power — how it accumulates, how it justifies itself, and where it is most vulnerable. Labour — especially the kind that goes unrecognised, unpaid, and uncounted. History — not as a fixed record but as a living argument about what happened and what it means.</p>
          <p>We write from an African vantage point, not as a limitation but as a corrective. Too much of the world's thinking is done from one or two positions and then exported as universal. We are interested in what the view looks like from elsewhere.</p>
        </div>

        <div className="about-section">
          <div className="about-label">// How we write</div>
          <p>In series. Each series is four connected essays that build an argument across parts — not listicles, not takes, not content. Essays. The kind that take a position seriously, follow it where it leads, and do not simplify the uncomfortable parts.</p>
          <p>We use the language of code and systems not as decoration but because it is honest. The world runs on logic. That logic can be read, questioned, and rewritten. That is what Re:Think is trying to do.</p>
        </div>

        <div className="about-section">
          <div className="about-label">// Who is writing this</div>
          <p>Re:Think is written by <strong>Aakor-okara Greatname</strong>, also known as Gemini_man — a writer, developer, and systems thinker based in Nigeria. The publication is independent. It has no sponsors, no advertisers, and no agenda beyond the work.</p>
        </div>

        <div className="about-section">
          <div className="about-label">// What Re:Think is not</div>
          <p>A thought-leadership platform. A personal brand. A content strategy. A newsletter optimised for engagement. A place where difficult ideas get softened into palatable formats for maximum sharing.</p>
          <p>If that is what you are looking for, there is no shortage of it elsewhere.</p>
          <p>If you want to read something that takes the world seriously — that treats the reader as someone capable of sitting with complexity — you are in the right place.</p>
        </div>

        <div className="about-cta-row">
          <Link to="/" className="about-cta-btn">Read the series</Link>
          <Link to="/contact" className="about-cta-btn secondary">Get in touch</Link>
        </div>

      </div>
    </>
  );
}
