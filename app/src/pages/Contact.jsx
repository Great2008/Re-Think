import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <>
      <section className="series-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>Contact</span>
        </div>
        <div className="series-hero-label">Get in Touch</div>
        <h1>Say Something</h1>
        <p className="series-hero-desc">
          Responses, disagreements, questions, collaborations. All welcome.
        </p>
      </section>

      <div className="divider">
        <div className="divider-line" />
        <span className="divider-label">Channels</span>
        <div className="divider-line" />
      </div>

      <div className="contact-body">
        <p className="contact-intro">
          Re:Think is written by one person. Messages go directly to that person. No team, no assistant, no auto-reply. Expect a response — just not immediately.
        </p>

        <div className="contact-cards">
          <a className="contact-card" href="mailto:aakorokaragreatname@gmail.com">
            <div className="contact-card-icon">✉</div>
            <div className="contact-card-label">// Email</div>
            <div className="contact-card-value">aakorokaragreatname@gmail.com</div>
            <div className="contact-card-note">Best for long-form thoughts, collaborations, or anything that needs more than 280 characters.</div>
          </a>

          <a className="contact-card" href="https://x.com/AakorOkara45911" target="_blank" rel="noopener noreferrer">
            <div className="contact-card-icon">𝕏</div>
            <div className="contact-card-label">// X (Twitter)</div>
            <div className="contact-card-value">@AakorOkara45911</div>
            <div className="contact-card-note">For quick reactions, debates, or sharing something you found in the essays.</div>
          </a>

          <a className="contact-card" href="https://www.linkedin.com/in/greatname-aakor-okara-b13669416" target="_blank" rel="noopener noreferrer">
            <div className="contact-card-icon">in</div>
            <div className="contact-card-label">// LinkedIn</div>
            <div className="contact-card-value">Greatname Aakor-okara</div>
            <div className="contact-card-note">For professional inquiries, speaking, or if you want to connect in a more formal context.</div>
          </a>
        </div>

        <div className="contact-note">
          <div className="about-label">// A note on responses</div>
          <p>If you disagree with something written here, say so specifically. Vague disapproval is easy to send and impossible to engage with. The work is meant to provoke thought — if it provoked yours, that is worth a real conversation.</p>
        </div>
      </div>
    </>
  );
}
