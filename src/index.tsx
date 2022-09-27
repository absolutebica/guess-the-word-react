import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // Diabling strictMode to prevent double effects in useEffect
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);