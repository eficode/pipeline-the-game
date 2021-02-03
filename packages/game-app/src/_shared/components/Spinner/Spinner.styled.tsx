import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`;

export const StyledSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;

  & > div.thumb {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    border: 4px solid #fff;
    border-radius: 50%;
    animation: ${spinnerAnimation} 1.2s linear infinite;
    border-color: #fff transparent transparent transparent;
  }

  & > div.placeholder {
    box-sizing: border-box;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border: 4px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
`;

StyledSpinner.displayName = 'StyledSpinner';
