import React from 'react';

export function Import() {
  return (
    <div className="main-container">
      <main>
        <h2>Import Leads</h2>
        <section>
          <h3>Past Imports</h3>
          <ul>
            <li>Jan_Batch.csv (Success)</li>
            <li>Dec_Batch.xlsx (Failed)</li>
          </ul>
        </section>

        <section>
          <h3>Upload New File</h3>
          <div style={{ border: '2px dashed gray', padding: '50px', textAlign: 'center' }}>
            <p>Drag & Drop files here</p>
            <p>or</p>
            <input type="file" id="fileUpload" accept=".csv, .xlsx" />
          </div>
          <p><small>Accepted formats: CSV, XLSX</small></p>
          <button>Upload</button>
        </section>
      </main>
    </div>
  );
}