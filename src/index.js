import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './utils/AuthProvider';
import App from './app';
import './styles/globals.scss';
import './index.css';

const title = process.env.REACT_APP_WEBSITE_NAME || 'Renesans';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthProvider>
      <App />
   </AuthProvider>
);

document.title = title;