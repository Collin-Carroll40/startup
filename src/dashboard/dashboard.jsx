import React, { useState, useEffect } from 'react';

export function Dashboard({ userName }) {
  const [events, setEvents] = useState([
    'User A closed "Smith Co" ($5k)',
    'User B closed "Jones Inc" ($3k)'
  ]);
  const [quote, setQuote] = useState('Loading quote...');
  const [quoteAuthor, setQuoteAuthor] = useState('');

  // Simulated websocket feed
  useEffect(() => {
    const interval = setInterval(() => {
      const fakeEvents = [
        'Agent Sarah booked a demo',
        'Agent Mike sent a contract',
        'Agent Alex closed a $10k deal!',
        'New inbound lead claimed'
      ];
      const random = fakeEvents[Math.floor(Math.random() * fakeEvents.length)];
      setEvents(prev => [random, ...prev].slice(0, 4));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Real third party API
  useEffect(() => {
    fetch('https://quote.cs260.click')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch(() => setQuote('Could not load quote.'));
  }, []);

  return (
    <div className="main-container">
      <main>
        <h2>Welcome, {userName || 'Agent'}!</h2>
        <section>
          <h3>Sales Metrics</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px', flex: '1', minWidth: '150px' }}>
              <h4 style={{ margin: 0, color: '#2e7d32' }}>12</h4>
              <p style={{ margin: 0 }}>Leads Claimed</p>
            </div>
            <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', flex: '1', minWidth: '150px' }}>
              <h4 style={{ margin: 0, color: '#1565c0' }}>$47k</h4>
              <p style={{ margin: 0 }}>Pipeline Value</p>
            </div>
            <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px', flex: '1', minWidth: '150px' }}>
              <h4 style={{ margin: 0, color: '#e65100' }}>89%</h4>
              <p style={{ margin: 0 }}>Response Rate</p>
            </div>
          </div>
        </section>
        <hr />
        <section>
          <h3>Sales Leaders (Live Feed)</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index}>🔔 {event}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Daily Inspiration (3rd Party API)</h3>
          <div style={{ background: '#f0f0f0', padding: '10px', border: '1px solid #ccc' }}>
            <p><i>"{quote}"</i></p>
            {quoteAuthor && <p>— {quoteAuthor}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}