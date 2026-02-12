import React from 'react';

export function Cadence() {
  return (
    <div className="main-container">
      <main>
        <h2>My Outreach Cadence</h2>
        <p>Build your automated follow-up sequence here.</p>
        
        <section>
          <h3>Step 1: Initial Contact</h3>
          <label>Send Email:</label>
          <br />
          <textarea placeholder="Hi [Name], I noticed you need help with..."></textarea>
        </section>
        
        <section>
          <h3>Step 2: Follow Up (3 Days Later)</h3>
          <label>Send SMS:</label>
          <br />
          <input type="text" placeholder="Just checking in..." />
        </section>
        
        <br />
        <button>Save Cadence</button>
      </main>
    </div>
  );
}