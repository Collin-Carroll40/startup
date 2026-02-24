import React, { useState } from 'react';

export function Leads() {
  // Mock data state
  const [leads, setLeads] = useState([
    { date: '01/07/2026', desc: 'Roofing Lead - Orem' },
    { date: '01/09/2026', desc: 'Plumbing Lead - Provo' },
    { date: '01/21/2026', desc: 'HVAC Lead - Lehi' }
  ]);

  // Handle claim button
  const claimLead = (indexToRemove) => {
    // Remove claimed lead
    setLeads(leads.filter((_, index) => index !== indexToRemove));
    alert('Lead claimed successfully!');
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
            {/* Render rows dynamically */}
            {leads.length > 0 ? (
              leads.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.date}</td>
                  <td>{lead.desc}</td>
                  <td>
                    {/* Trigger claim action */}
                    <button className="btn btn-success btn-sm btn-claim" onClick={() => claimLead(index)}>
                      Claim
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty state message */
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