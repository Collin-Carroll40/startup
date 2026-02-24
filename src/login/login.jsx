import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Login() {
  // Track input
  const [userName, setUserNameInput] = useState('');

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
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='mb-3'>
            <label className='form-label' htmlFor='username'>User:</label>
            {/* Bind state */}
            <input 
              className='form-control w-50 mx-auto' 
              type='text' 
              id='username' 
              placeholder='your@email.com'
              value={userName}
              onChange={(e) => setUserNameInput(e.target.value)}
              required 
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='password'>Password:</label>
            <input className='form-control w-50 mx-auto' type='password' id='password' placeholder='Password' required />
          </div>
          
          {/* still working here */}
          <Link to='/dashboard' className='btn btn-primary'>Login</Link>
        </form>
      </section>
    </main>
  );
}