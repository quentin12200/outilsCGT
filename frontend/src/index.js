// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
document.getElementById('root').innerHTML = '<h1>Mon application</h1>';

const rootElement = document.getElementById('root'); // même ID que dans index.html
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
