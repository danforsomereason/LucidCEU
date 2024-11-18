import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  


  // const token = localStorage.getItem("token");
  // if (token) {
  //     window.location.pathname="/dashboard";
  // }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);