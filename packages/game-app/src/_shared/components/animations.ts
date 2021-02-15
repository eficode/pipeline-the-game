import { css, keyframes } from 'styled-components';

const shakeDefinition = keyframes`
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(15px);
  }
  50% {
    transform: translate(0px);
  }
  75% {
    transform: translate(15px);
  }
  100% {
    transform: translate(0);
  }
`;

export const shake = () =>
  css`
    animation: ${shakeDefinition} linear 0.3s 2;
  `;

export const bounceDefinition = (amount: number) => keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-${amount}px);
  }
`;
