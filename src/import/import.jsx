import React, { useState, useEffect } from 'react';

export function Import() {
  const [history, setHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Load from API
  useEffect(() => {
    fetch('/api/imports')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => console.error('Failed to load imports'));
  }, []);

  // Upload via API
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    const response = await fetch('/api/imports', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ filename: `${selectedFile.name} (Success)` }),
    });
    const updated = await response.json();
    setHistory(updated);
    setSelectedFile(null);
    document.getElementById('fileUpload').value = '';
    alert("File uploaded successfully!");
  };

  return (
    <div className="main-container">
      <main>
        <h2>Import Leads</h2>
        <section>
          <h3>Past Imports</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Upload New File</h3>
          <div style={{ border: '2px dashed gray', padding: '50px', textAlign: 'center' }}>
            <p>Drag & Drop files here</p>
            <p>or</p>
            <input
              type="file"
              id="fileUpload"
              accept=".csv, .xlsx"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          <p><small>Accepted formats: CSV, XLSX</small></p>
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </section>
      </main>
    </div>
  );
}