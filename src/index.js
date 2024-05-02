// import React from 'react';
// import {createRoot} from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from "./reportWebVitals";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
