import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUserName, setAuthState }) {
  // Track input
  const [userNameInput, setUserNameInput] = useState('');
  
  // Setup nav
  const navigate = useNavigate();

  // Handle form submit
  const loginUser = (e) => {
    e.preventDefault();
    
    // Mock database
    localStorage.setItem('userName', userNameInput);
    
    // Update app state
    setUserName(userNameInput);
    setAuthState('Authenticated');
    
    // Go dashboard
    navigate('/dashboard');
  };

  return (
    <main className='container-fluid bg-secondary text-center text-white p-5'>
      <section>
        <h2 className='mb-4'>Login to Pipeline Pro</h2>
        
        {/* GitHub link */}
        <div className='mb-4'>
          <a href="https://github.com/Collin-Carroll40/startup" target="_blank" rel="noreferrer" className="text-info">
            View Pipeline Pro on GitHub
          </a>
        </div>
        
        {/* Trigger submit */}
        <form onSubmit={loginUser}>
          <div className='mb-3'>
            <label className='form-label' htmlFor='username'>User:</label>
            {/* Bind state */}
            <input 
              className='form-control w-50 mx-auto' 
              type='text' 
              id='username' 
              placeholder='your@email.com'
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              required 
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='password'>Password:</label>
            <input className='form-control w-50 mx-auto' type='password' id='password' placeholder='Password' required />
          </div>
          
          {/* finished submit button */}
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </section>
    </main>
  );
}