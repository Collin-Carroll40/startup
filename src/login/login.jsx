import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUserName, setAuthState }) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Call login or register endpoint
  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', emailInput);
      setUserName(emailInput);
      setAuthState('Authenticated');
      navigate('/dashboard');
    } else {
      const body = await response.json();
      setError(`Error: ${body.msg}`);
    }
  }

  return (
    <main className='container-fluid bg-secondary text-center text-white p-5'>
      <section>
        <h2 className='mb-4'>Login to Pipeline Pro</h2>
        <div className='mb-4'>
          <a href="https://github.com/Collin-Carroll40/startup" target="_blank" rel="noreferrer" className="text-info">
            View Pipeline Pro on GitHub
          </a>
        </div>
        {error && <div className='alert alert-danger w-50 mx-auto'>{error}</div>}
        <div className='mb-3'>
          <label className='form-label' htmlFor='username'>Email:</label>
          <input
            className='form-control w-50 mx-auto'
            type='text'
            id='username'
            placeholder='your@email.com'
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='password'>Password:</label>
          <input
            className='form-control w-50 mx-auto'
            type='password'
            id='password'
            placeholder='Password'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
        </div>
        <button className='btn btn-primary me-2' onClick={() => loginOrCreate('/api/auth/login')}>Login</button>
        <button className='btn btn-outline-light' onClick={() => loginOrCreate('/api/auth/create')}>Register</button>
      </section>
    </main>
  );
}