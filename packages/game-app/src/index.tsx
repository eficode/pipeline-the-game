import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

import CONFIG from '../config'

firebase.initializeApp({
  apiKey: CONFIG.REACT_APP_FIREBASE_CONFIG_API_KEY,
  authDomain: CONFIG.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  databaseURL: CONFIG.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
  projectId: CONFIG.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: CONFIG.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: CONFIG.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: CONFIG.REACT_APP_FIREBASE_CONFIG_APP_ID,
});

firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
