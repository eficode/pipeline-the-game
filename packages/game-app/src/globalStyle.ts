import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /**
Temporary css waiting for the ui components
 */
  /* reset*/
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 14px;
    color: #101820;
  }

  select:focus,
  input:focus,
  button:focus {
    outline: none;
  }
  
  .transform-0 {
    transform-origin: 0px 0px !important;
  }

  .board-wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

`;
