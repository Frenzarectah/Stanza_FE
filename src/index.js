import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'

import Homepage from './components/Homepage/Homepage'
import Bookings from './components/Bookings/Bookings'
import Customer from './components/Customers/Customers'

import reportWebVitals from './reportWebVitals';
import { Box } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
        <Box sx={{margin: '25px'}}>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/Bookings" element={<Bookings/>}/>
            <Route path="/Customers" element={<Customer/>}/>
          </Routes>
        </Box>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
