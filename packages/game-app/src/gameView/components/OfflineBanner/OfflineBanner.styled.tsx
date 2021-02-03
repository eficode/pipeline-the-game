import styled, { css, keyframes } from 'styled-components';

const openingAnimation = keyframes`
  0% {
    top: -200px;
  }
  100% {
    top: 16px;
  }
`;

const closingAnimation = keyframes`
  0% {
    top: 16px;
  }
  100% {
    top: -200px;
  }
`;

export const Banner = styled.div<{ isClosing: boolean; isOpening: boolean }>`
  position: fixed;
  left: 565px;
  top: 16px;
  padding: 16px;
  white-space: pre-line;
  box-shadow: 0px 0px 6px #10182029;

  background: #d7d2cb;
  border-radius: 10px;
  ${props =>
    props.isClosing &&
    css`
      animation: ${closingAnimation} linear 0.5s;
      animation-fill-mode: forwards;
    `}

  ${props =>
    props.isOpening &&
    css`
      animation: ${openingAnimation} linear 0.5s;
    `}
`;
