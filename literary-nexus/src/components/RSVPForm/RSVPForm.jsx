import { useState } from 'react';
import './RSVPForm.css';

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="rsvp-section">
        <div className="rsvp-success">
          <div className="success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2>You're All Set!</h2>
          <p>We look forward to seeing you at The Literary Nexus.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-header">
        <span className="section-badge">Join Us</span>
        <h2>Reserve Your Seat</h2>
        <p className="section-desc">Secure your place at the literary event of the year</p>
      </div>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" id="name" required aria-label="Name" />
          <label htmlFor="name">Full Name</label>
        </div>
        <div className="input-group">
          <input type="email" id="email" required aria-label="Email" />
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="input-group">
          <input type="text" id="affiliation" required aria-label="Affiliation" />
          <label htmlFor="affiliation">Affiliation</label>
        </div>
        <button type="submit" className="submit-btn">Confirm RSVP</button>
      </form>
    </section>
  );
}
