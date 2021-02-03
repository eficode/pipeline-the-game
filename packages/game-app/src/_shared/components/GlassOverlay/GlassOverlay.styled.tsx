import styled, { css, keyframes } from 'styled-components';

const openingAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const closingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Overlay = styled.div<{ isClosing: boolean; isOpening: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgb(170, 180, 175, 0.95);

  @supports (backdrop-filter: blur(15px)) {
    background-color: rgb(170, 180, 175, 0.4);
    backdrop-filter: blur(15px);
  }

  ${props =>
    props.isClosing &&
    css`
      animation: ${closingAnimation} linear 0.3s;
      animation-fill-mode: forwards;
    `}

  ${props =>
    props.isOpening &&
    css`
      animation: ${openingAnimation} linear 0.3s;
    `}
`;

Overlay.displayName = 'Overlay';

export const OverlayContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
OverlayContentWrapper.displayName = 'OverlayContentWrapper';
