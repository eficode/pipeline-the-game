import Box from '../Box';
import styled, { css, keyframes } from 'styled-components';
import Input from '../Input';
import LightCheckIcon from '@assets/icons/light-estimate-checkmark.svg';

const estimationWrapperDefinition = keyframes`
  0% {
    top: -50px;
    left: 0;
    height: 40px;
  }
  50% {
    left: 0;
    right: 0;
    height: 40px;
    width: 40px;
    border-radius: 50%
  }
  75% {
    left: 0;
    top: -40px;
    height: 40px;
    width: 40px;
    border-radius: 50%
  }
  100% {
    left: -4px;
    top: 8px;
    height: 32px;
    width: 80px;
    border-radius: 10px 20px 20px 10px;
  }
`;

export const EstimationWrapper = styled(Box)<{ state: 'opening' | 'open' | 'closed' | 'closing'; moving: boolean }>`
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  z-index: 1;

  ${props =>
    props.state === 'opening' &&
    css`
      animation: ${estimationWrapperDefinition} linear 1s;
      animation-fill-mode: forwards;
      animation-direction: reverse;
    `}

  ${props =>
    props.state === 'closing' &&
    css`
      animation: ${estimationWrapperDefinition} linear 1s;
      animation-fill-mode: forwards;
    `}

  ${props =>
    props.state === 'closed' &&
    css`
      left: -4px;
      top: 12px;
      height: 32px;
      width: 80px;
      border-radius: 10px 20px 20px 10px;
    `}

  ${props =>
    props.moving &&
    css`
      opacity: 0.5;
    `}
`;

EstimationWrapper.displayName = 'EstimationWrapper';

export const EstimationInput = styled(Input)<{ state: 'opening' | 'open' | 'closed' | 'closing' }>`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 3px #d7d2cb80;
  border-radius: 20px;
  opacity: 1;
  padding-left: 16px;
  font-family: Montserrat;

  ${props =>
    props.state === 'closed' &&
    css`
      border-radius: 10px 20px 20px 10px;
    `}

  :focus {
    border: none;
  }

  ::placeholder {
    color: #d7d2cb;
    opacity: 1; /* Firefox */
  }
`;

EstimationInput.displayName = 'EstimationInput';

export const EstimationInputWrapper = styled.div``;

EstimationInputWrapper.displayName = 'EstimationInputWrapper';

const confirmButtonAnimation = keyframes`
  0% {

  }
  5% {
    right: 0;
    top: 0;
    bottom: 0;
    height: 40px;
    width: 40px;
  }
  50% {
    right: 0;
    top: 0;
    bottom: 0;
    height: 40px;
    width: 40px;
    border-radius: 50%
  }
  50% {
    right: 0;
    top: 0;
    bottom: 0;
    height: 40px;
    width: 100%;
    border-radius: 15px 0 0 15px;
  }
  75% {
    right: 0;
    top: 0;
    bottom: 0;
    height: 40px;
    width: 100%;
    border-radius: 20px;
  }
  100% {
    right: 0;
    top: 0;
    bottom: 0;
    height: 32px;
    width: 100%;
    border-radius: 10px 20px 20px 10px;
    color: white;
    padding-left: 16px;
  }
`;

export const ConfirmButton = styled.button<{ state: 'opening' | 'open' | 'closed' | 'closing' }>`
  border: none;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  z-index: 1;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
  background-color: #096762;
  background-image: url(${LightCheckIcon});
  background-repeat: no-repeat;
  background-size: 70% 70%;
  background-position-x: 5px;
  background-position-y: 4px;
  font-family: Montserrat;
  font-size: 12px;

  ${props =>
    props.state === 'open' &&
    css`
      :hover {
        width: 40px;
        height: 40px;
        right: 0;
        top: 0;
        background-color: #2c3644;
      }
    `}

  :active,
  :focus {
    outline: none;
  }

  ${EstimationInputWrapper}:focus-within + & {
    background-color: #2c3644;
  }

  ${props =>
    props.state === 'opening' &&
    css`
      animation: ${confirmButtonAnimation} linear 1s;
      animation-fill-mode: forwards;
      animation-direction: reverse;
      background-color: #2c3644;
      background-image: unset;
    `}

  ${props => props.state === 'open' && css``}

  ${props =>
    props.state === 'closing' &&
    css`
      animation: ${confirmButtonAnimation} linear 1s;
      animation-fill-mode: forwards;
      background-color: #2c3644;
      background-image: unset;
    `}
  
  ${props =>
    props.state === 'closed' &&
    css`
      right: 0;
      top: 0;
      bottom: 0;
      height: 32px;
      width: 100%;
      border-radius: 10px 20px 20px 10px;
      color: white;
      padding-left: 16px;
      text-align: left;
      background-color: #2c3644;
      background-image: unset;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      white-space: nowrap;
    `}
`;

ConfirmButton.displayName = 'ConfirmButton';

const inputWrapAnimation = keyframes`
  0% {
    border-radius: 20px;
    height: 40px;
  }
  75% {
    border-radius: 20px;
    height: 40px;
  }
  100% {
    border-radius: 10px 20px 20px 10px;
    height: 32px;
  }
`;

export const EstimationInputContainer = styled.div<{ state: 'opening' | 'open' | 'closed' | 'closing' }>`
  position: relative;
  overflow: hidden;

  ${props =>
    props.state === 'opening' &&
    css`
      animation: ${inputWrapAnimation} linear 1s;
      animation-fill-mode: forwards;
      animation-direction: reverse;
    `}

  ${props =>
    props.state === 'closing' &&
    css`
      animation: ${inputWrapAnimation} linear 1s;
      animation-fill-mode: forwards;
    `}

  ${props =>
    props.state === 'closed' &&
    css`
      border-radius: 10px 20px 20px 10px;
      height: 32px;
    `}
`;

EstimationInputContainer.displayName = 'EstimationInputContainer';
