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
          <p>[Pie Chart Placeholder]</p>
          <p>[Bar Graph Placeholder]</p>
          <div style={{ background: 'blue', width: '100px', height: '20px' }}></div><br />
          <div style={{ background: 'blue', width: '150px', height: '20px' }}></div><br />
          <div style={{ background: 'blue', width: '80px', height: '20px' }}></div>
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