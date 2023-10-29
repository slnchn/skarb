import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

window.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(<App />);
});
