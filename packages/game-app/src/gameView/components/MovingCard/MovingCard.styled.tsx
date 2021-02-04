import styled, { css, keyframes } from 'styled-components';
import { PANEL_CARD_SCALE } from '../../../dimensions';

const dragAnimation = keyframes`
  0% {

  }
  100% {
    transform: rotate(6deg);
    box-shadow: 0px 80px 20px #10182026;
  }
`;

const dragAnimationBig = keyframes`
  0% {

  }
  100% {
    transform: rotate(6deg) scale(${PANEL_CARD_SCALE});
    box-shadow: 0px 80px 20px #10182026;
  }
`;

export const MovingCardWrapper = styled.div<{ dragging?: boolean; bigger: boolean }>`
  ${props =>
    props.bigger &&
    css`
      transform: scale(${PANEL_CARD_SCALE});
      transform-origin: 0 0;
    `} ${props =>
    props.dragging
      ? css`
          animation: ${props.bigger ? dragAnimationBig : dragAnimation} linear 0.1s;
          animation-delay: 0.1s;
          animation-fill-mode: forwards;
        `
      : css`
          box-shadow: 0px 0px 6px #10182029;
        `}
`;

MovingCardWrapper.displayName = 'MovingCardWrapper';
