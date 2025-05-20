import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {  Box } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Order';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export const currency = '$';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

    useEffect(() => {
      localStorage.removeItem('token');
    }, []);

  if (!token) return <Login setToken={setToken} />;

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh',overflow: 'hidden' }}>
      <ToastContainer />
      <Navbar isCollapsed={isCollapsed} setToken={setToken} />

      <Box sx={{ display: 'flex', flexGrow: 1,overflow: 'hidden', }}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, overflow: 'hidden'  }}
        >
          <Routes>
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default App;
