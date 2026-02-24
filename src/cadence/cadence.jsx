import React, { useState } from 'react';

export function Cadence() {
  // Track steps
  const [steps, setSteps] = useState([
    { id: 1, method: 'Email', content: '' },
    { id: 2, method: 'SMS', content: '' }
  ]);

  // Add new step
  const addStep = () => {
    const nextId = steps.length + 1;
    setSteps([...steps, { id: nextId, method: 'LinkedIn', content: '' }]);
  };

  // Update text
  const updateContent = (id, text) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, content: text } : step
    ));
  };

  // Mock save
  const saveCadence = () => {
    alert('Cadence saved successfully!');
  };

  return (
    <div className="main-container">
      <main>
        <h2>My Outreach Cadence</h2>
        <p>Build your automated follow-up sequence here.</p>
        
        {/* Render steps dynamically */}
        {steps.map((step, index) => (
          <section key={step.id} className="mb-4">
            <h3>Step {index + 1}: {step.method}</h3>
            <label>Message:</label>
            <br />
            <textarea 
              className="form-control mb-2"
              placeholder={`Enter ${step.method} message...`}
              value={step.content}
              onChange={(e) => updateContent(step.id, e.target.value)}
            />
          </section>
        ))}
        
        {/* Actions */}
        <button className="btn btn-secondary me-2" onClick={addStep}>+ Add Step</button>
        <button className="btn btn-primary" onClick={saveCadence}>Save Cadence</button>
      </main>
    </div>
  );
}