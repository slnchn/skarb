import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

window.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(<App />);
});
