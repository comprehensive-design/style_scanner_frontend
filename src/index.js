import React from 'react';
import { createRoot } from 'react-dom/client'; // 수정된 부분
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
