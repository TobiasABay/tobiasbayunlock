import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

const rootElement = document.getElementById('root'); // Get the root element
const root = createRoot(rootElement); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
