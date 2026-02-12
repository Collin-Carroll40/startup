import React from 'react';

export function Dashboard() {
  return (
    <div className="main-container">
      <main>
        <h2>Team Dashboard</h2>
        
        <section>
          <h3>Sales Metrics</h3>
          <p>[Pie Chart Placeholder]</p>
          {/* Note: images in 'public' are referenced with a leading slash */}
          <img src="/dash_import.jpeg" alt="Sales Pie Chart" style={{ width: '200px' }} />
          
          <p>[Bar Graph Placeholder]</p>
          {/* React inline styles must be objects using camelCase */}
          <div style={{ background: 'blue', width: '100px', height: '20px' }}></div><br />
          <div style={{ background: 'blue', width: '150px', height: '20px' }}></div><br />
          <div style={{ background: 'blue', width: '80px', height: '20px' }}></div>
        </section>

        <hr />

        <section>
          <h3>Sales Leaders (Live Feed)</h3>
          <ul>
            <li>User A closed "Smith Co" ($5k)</li>
            <li>User B closed "Jones Inc" ($3k)</li>
          </ul>
        </section>

        <section>
          <h3>Industry News Ticker (API)</h3>
          <div style={{ background: '#f0f0f0', padding: '10px', border: '1px solid #ccc' }}>
            <p><i>Fetching live construction news...</i></p>
            <p>(This data will come from the NewsAPI.org service)</p>
          </div>
        </section>
      </main>
    </div>
  );
}