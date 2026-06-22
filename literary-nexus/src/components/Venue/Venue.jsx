import './Venue.css';

export default function Venue({ event }) {
  return (
    <section className="venue" id="venue" aria-label="Venue Section">
      <div className="venue-header">
        <span className="section-badge">Location</span>
        <h2>The Venue</h2>
        <p className="section-desc">Where literary magic happens</p>
      </div>
      <div className="venue-card">
        <div className="venue-map">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="200" fill="var(--bg-card)" rx="12" />
            <path d="M0 160 Q100 140 200 160 Q300 180 400 160 L400 200 L0 200 Z" fill="var(--primary)" fillOpacity="0.1" />
            <circle cx="200" cy="100" r="8" fill="var(--primary)" />
            <circle cx="200" cy="100" r="14" fill="var(--primary)" fillOpacity="0.2" />
            <path d="M200 92 L200 108 M192 100 L208 100" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <rect x="160" y="60" width="80" height="50" rx="4" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1" />
            <text x="200" y="88" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Inter">Literary Hall</text>
            <path d="M20 180 L380 180" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
            <text x="30" y="192" fill="var(--text-muted)" fontSize="9" fontFamily="Inter">42 Bookworm Blvd</text>
          </svg>
        </div>
        <div className="venue-info">
          <div className="venue-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h3>{event?.venueName || 'The Grand Literary Hall'}</h3>
          <p className="venue-address">{event?.venueAddress || '42 Bookworm Boulevard'}</p>
          <p className="venue-city">{event?.venueCity || 'Manhattan, New York'}</p>
        </div>
      </div>
    </section>
  );
}
