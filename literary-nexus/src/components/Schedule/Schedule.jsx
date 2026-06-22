import './Schedule.css';

export default function Schedule() {
  const schedule = [
    { time: '10:00 AM', title: 'Opening Remarks', desc: 'Welcome address by the festival director' },
    { time: '11:00 AM', title: 'Keynote Speech', desc: 'The Future of Storytelling' },
    { time: '12:30 PM', title: 'Lunch Break', desc: 'Catered networking lunch' },
    { time: '02:00 PM', title: 'Panel Discussion', desc: 'Voices Across Borders' },
    { time: '04:00 PM', title: 'Closing Ceremony', desc: 'Awards and final remarks' },
  ];

  return (
    <section className="schedule" id="schedule" aria-label="Event Schedule">
      <div className="schedule-header">
        <span className="section-badge">Event Timeline</span>
        <h2>Schedule</h2>
        <p className="section-desc">Plan your day at the festival</p>
      </div>
      <div className="schedule-track">
        {schedule.map((item, idx) => (
          <div key={idx} className="schedule-item">
            <div className="schedule-dot">
              <div className="schedule-dot-inner" />
            </div>
            {idx < schedule.length - 1 && <div className="schedule-line" />}
            <div className="schedule-content">
              <span className="schedule-time">{item.time}</span>
              <h3 className="schedule-title">{item.title}</h3>
              <p className="schedule-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
