import React, { useState, useEffect } from 'react';

export function Dashboard({ userName }) {
  // Feed state
  const [events, setEvents] = useState([
    'User A closed "Smith Co" ($5k)',
    'User B closed "Jones Inc" ($3k)'
  ]);

  // News state
  const [news, setNews] = useState('Fetching live construction news...');

  //websocket feed
  useEffect(() => {
    const interval = setInterval(() => {
      const fakeEvents = [
        'Agent Sarah booked a demo',
        'Agent Mike sent a contract',
        'Agent Alex closed a $10k deal!',
        'New inbound lead claimed'
      ];
      const random = fakeEvents[Math.floor(Math.random() * fakeEvents.length)];
      
      // Add new event, keep only 4
      setEvents(prev => [random, ...prev].slice(0, 4));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setNews('Breaking: New infrastructure bill passed, expected to boost Q3 sales.');
    }, 2000);
    
    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container">
      <main>
        {/* Personal greeting */}
        <h2>Welcome, {userName || 'Agent'}!</h2>
        
        <section>
          <h3>Sales Metrics</h3>
          <p>[Pie Chart Placeholder]</p>
          <img src="/dash_import.jpeg" alt="Sales Pie Chart" style={{ width: '200px' }} />
          
          <p>[Bar Graph Placeholder]</p>
          <div style={{ background: 'blue', width: '100px', height: '20px' }}></div><br />
          <div style={{ background: 'blue', width: '150px', height: '20px' }}></div><br />
          <div style={{ background: 'blue', width: '80px', height: '20px' }}></div>
        </section>

        <hr />

        <section>
          <h3>Sales Leaders (Live Feed)</h3>
          <ul>
            {/* Render events */}
            {events.map((event, index) => (
              <li key={index}>🔔 {event}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Industry News Ticker (API)</h3>
          <div style={{ background: '#f0f0f0', padding: '10px', border: '1px solid #ccc' }}>
            {/* Render news */}
            <p><i>{news}</i></p>
            <p>(This data will come from the NewsAPI.org service)</p>
          </div>
        </section>
      </main>
    </div>
  );
}