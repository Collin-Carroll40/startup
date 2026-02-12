import React from 'react';

export function Leads() {
  return (
    <div className="main-container">
      <main>
        <h2>Available Leads</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/07/2026</td>
              <td>Roofing Lead - Orem</td>
              <td><button className="btn-claim">Claim</button></td>
            </tr>
            <tr>
              <td>01/09/2026</td>
              <td>Plumbing Lead - Provo</td>
              <td><button className="btn-claim">Claim</button></td>
            </tr>
            <tr>
              <td>01/21/2026</td>
              <td>HVAC Lead - Lehi</td>
              <td><button className="btn-claim">Claim</button></td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}