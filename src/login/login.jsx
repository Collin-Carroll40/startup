import React from 'react';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center text-white p-5'>
      <section>
        <h2 className='mb-4'>Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='mb-3'>
            <label className='form-label' htmlFor='username'>User:</label>
            <input className='form-control w-50 mx-auto' type='text' id='username' placeholder='Username' />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='password'>Password:</label>
            <input className='form-control w-50 mx-auto' type='password' id='password' placeholder='Password' />
          </div>
          {/* made it a button */}
          <Link to='/dashboard' className='btn btn-primary'>Login</Link>
        </form>
      </section>
    </main>
  );
}