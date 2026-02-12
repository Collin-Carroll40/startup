import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

// We will create these components in the next step
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Leads } from './leads/leads';
import { Import } from './import/import';
import { Cadence } from './cadence/cadence';

export default function App() {
  return (
    <BrowserRouter>
      <div className='body'>
        <header className="container-fluid">
        <div className="navbar-brand">Pipeline Pro 🏗️</div>
        <nav className="navbar navbar-dark">
            <menu className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="leads">Leads</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="import">Import</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="cadence">Cadence</NavLink>
            </li>
            </menu>
        </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/import' element={<Import />} />
          <Route path='/cadence' element={<Cadence />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

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