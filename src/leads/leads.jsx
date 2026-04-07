import React, { useState, useEffect } from 'react';
import notifier from '../activityNotifier';

export function Leads() {
  const [leads, setLeads] = useState([]);
  const userName = localStorage.getItem('userName') || 'Someone';

  // Load from API
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch(() => console.error('Failed to load leads'));
  }, []);

  // Claim via API
  const claimLead = async (indexToRemove) => {
    const lead = leads[indexToRemove];
    const response = await fetch('/api/leads/claim', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ index: indexToRemove }),
    });
    const updated = await response.json();
    setLeads(updated);

    // Broadcast to all connected users via WebSocket
    notifier.broadcastEvent(userName, `claimed "${lead.desc}"`);
  };

  return (
    <div className="main-container">
      <main>
        <h2>Available Leads</h2>
        <table className="data-table table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.date}</td>
                  <td>{lead.desc}</td>
                  <td>
                    <button className="btn btn-success btn-sm btn-claim" onClick={() => claimLead(index)}>
                      Claim
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No more leads available right now!</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}