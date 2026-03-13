import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Leads } from './leads/leads';
import { Import } from './import/import';
import { Cadence } from './cadence/cadence';

export default function App() {
  // Check storage
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  
  // Set auth state
  const [authState, setAuthState] = useState(userName ? 'Authenticated' : 'Unauthenticated');

  return (
    <BrowserRouter>
      <div className='body'>
        
        <header>
          <h1>Pipeline Pro 🏗️</h1>
        </header>

        <div className="main-container">
          
          {/* Sidebar */}
          <nav>
            <menu className='navbar-nav'>
              {/* Unauthenticated view */}
              {authState === 'Unauthenticated' && (
                <li className='nav-item'><NavLink className='nav-link' to=''>Login</NavLink></li>
              )}
              
              {/* Authenticated view */}
              {authState === 'Authenticated' && (
                <>
                  <li className='nav-item'><NavLink className='nav-link' to='dashboard'>Dashboard</NavLink></li>
                  <li className='nav-item'><NavLink className='nav-link' to='leads'>Leads</NavLink></li>
                  <li className='nav-item'><NavLink className='nav-link' to='import'>Import</NavLink></li>
                  <li className='nav-item'><NavLink className='nav-link' to='cadence'>Cadence</NavLink></li>
                  <li className='nav-item'>
                    {/* Logout button */}
                    <a className='nav-link' href='/' onClick={(e) => {
                      e.preventDefault();
                      fetch('/api/auth/logout', { method: 'DELETE' })
                        .catch(() => {})
                        .finally(() => {
                          localStorage.removeItem('userName');
                          setAuthState('Unauthenticated');
                          setUserName('');
                          window.location.href = '/';
                        });
                    }}>Logout</a>
                  </li>
                </>
              )}
            </menu>
          </nav>

          <Routes>
            {/* Pass state to login */}
            <Route path='/' element={<Login setUserName={setUserName} setAuthState={setAuthState} />} exact />
            
            {/* Pass username to dashboard */}
            <Route path='/dashboard' element={<Dashboard userName={userName} />} />
            
            <Route path='/leads' element={<Leads />} />
            <Route path='/import' element={<Import />} />
            <Route path='/cadence' element={<Cadence />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          
        </div>

        {/* Footer */}
        <footer>
          <p>Created by Collin Carroll</p>
          <a href="https://github.com/Collin-Carroll40/startup">GitHub</a>
        </footer>
        
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}