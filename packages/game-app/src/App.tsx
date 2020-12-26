import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslate } from '@pipeline/i18n';

function App() {

  const t = useTranslate();


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {t("home.title")}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
