import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import Authors from './components/Authors/Authors';
import Schedule from './components/Schedule/Schedule';
import RSVPForm from './components/RSVPForm/RSVPForm';
import Venue from './components/Venue/Venue';
import Footer from './components/Footer/Footer';
import { fetchEventData, fetchAuthors } from './services/api';
import './styles/variables.css';
import './styles/global.css';

function App() {
  const [data, setData] = useState({ event: null, authors: [], error: null });

  useEffect(() => {
    Promise.all([fetchEventData(), fetchAuthors()])
      .then(([event, authors]) => {
        setData({ event, authors: authors.slice(0, 6), error: null });
      })
      .catch((err) => {
        setData({ event: null, authors: [], error: err.message });
      });
  }, []);

  if (data.error) {
    return (
      <div className="loading">
        <p style={{ color: '#ef4444' }}>Failed to load event: {data.error}</p>
      </div>
    );
  }

  if (!data.event) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading The Literary Nexus...</p>
      </div>
    );
  }

  return (
    <main>
      <Hero event={data.event} />
      <Authors authors={data.authors} />
      <Schedule />
      <RSVPForm />
      <Venue event={data.event} />
      <Footer />
    </main>
  );
}

export default App;
