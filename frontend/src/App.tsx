import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import './App.css'
import EventDetails from './pages/EventPage';
import AdminLogin from './pages/AdminLogin';


interface CustomJwtPayload extends JwtPayload {
  role: string;
  email: string;
  memberId: string;
  fullname: any;
  department: string;
  gender: string;
  year: string;
}


const UnauthorizedPage: React.FC = () => {
  return <h1>403 - Unauthorized</h1>;
};



const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<'admin' | 'user' | 'unauthorized'>('unauthorized');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as CustomJwtPayload;
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          if (decodedToken.role === 'admin') {
            setAuthStatus('admin');
          } else if (decodedToken.role === 'user') {
            setAuthStatus('user');
          }
        } else {
          handleUnauthorized();
        }
      } catch (error) {
        handleUnauthorized();
      }
    } else {
      handleUnauthorized();
    }
  }, []);

  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    setAuthStatus('unauthorized');
  };

  return (
    <div className='App'>
      <Router>
        <Routes>
          {authStatus === 'admin' ? (
            <>
              <Route path="/admin_dashboard" element={<Dashboard />} /> 
              <Route path="/events/:_id" element={<EventDetails />} />
              <Route path="/*" element={<Navigate to="/admin_dashboard" />} /> 
            </>
          ) : authStatus === 'user' ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/events/:_id" element={<EventDetails />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/*" element={<UnauthorizedPage />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
