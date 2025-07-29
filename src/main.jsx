import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom'; // ✅ Use HashRouter instead
import './style.css';
import "./i18n"; // Load translations

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* ✅ Use HashRouter for GitHub Pages compatibility */}
      <App />
    </HashRouter>
  </React.StrictMode>
);
