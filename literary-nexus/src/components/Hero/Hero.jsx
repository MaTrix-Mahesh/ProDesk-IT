import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero({ event }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(event.eventDate) - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [event]);

  return (
    <section className="hero" aria-label="Hero Section">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="floating-shape shape-1">&#10022;</div>
        <div className="floating-shape shape-2">&#10022;</div>
        <div className="floating-shape shape-3">&#10022;</div>
      </div>
      <div className="overlay" />
      <div className="hero-content">
        <span className="hero-badge">Literary Festival 2026</span>
        <h1>{event.eventName}</h1>
        <p className="hero-subtitle">Where words weave worlds</p>
        <div className="countdown">
          <div className="countdown-item"><span className="countdown-num">{String(time.d).padStart(2, '0')}</span><span className="countdown-label">Days</span></div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item"><span className="countdown-num">{String(time.h).padStart(2, '0')}</span><span className="countdown-label">Hours</span></div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item"><span className="countdown-num">{String(time.m).padStart(2, '0')}</span><span className="countdown-label">Mins</span></div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item"><span className="countdown-num">{String(time.s).padStart(2, '0')}</span><span className="countdown-label">Secs</span></div>
        </div>
        <a href="#rsvp" className="cta">Reserve Your Seat</a>
      </div>
    </section>
  );
}
