import React from 'react';
import { createRoot } from 'react-dom/client';
import { TramNetworkProvider } from './context/TramNetworkContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TramNetworkProvider>
      <App />
    </TramNetworkProvider>
  </React.StrictMode>
);

reportWebVitals();