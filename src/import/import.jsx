import React, { useState } from 'react';

export function Import() {
  // Mock history state
  const [history, setHistory] = useState([
    'Jan_Batch.csv (Success)',
    'Dec_Batch.xlsx (Failed)'
  ]);

  // Track file selection
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle mock upload
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    
    // Add file to history
    setHistory([...history, `${selectedFile.name} (Success)`]);
    
    // Reset selection
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
            {/* Render history dynamically */}
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
            {/* Grab file on change */}
            <input 
              type="file" 
              id="fileUpload" 
              accept=".csv, .xlsx" 
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          <p><small>Accepted formats: CSV, XLSX</small></p>
          
          {/* Trigger upload */}
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </section>
      </main>
    </div>
  );
}