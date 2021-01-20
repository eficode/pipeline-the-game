import Box from '../Box';
import { Input } from '../TextInput/TextInput.styled';
import styled from 'styled-components';
/*
const estimationWrapperDefinition = keyframes`
  0% {
    top: -50px;
    left: 0;
    right: 0;
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
    left: 0;
    top: -40px;
    height: 32px;
    width: 80px;
    border-radius: 10px 20px 20px 10px;
  }
`;

  animation: ${estimationWrapperDefinition} linear 1s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
*/

export const EstimationWrapper = styled(Box)`
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
`;

EstimationWrapper.displayName = 'EstimationWrapper';
/*
const estimationDefinition = keyframes`
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
    height: 40px;
    width: 100%;
    border-radius: 20px;
  }
    animation: ${estimationDefinition} linear 3s;
  animation-fill-mode: forwards;
`;
*/
export const ConfirmButton = styled.button`
  border: none;
  background: #96d5d2;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  z-index: 1;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
  }

  :active,
  :focus {
    outline: none;
  }
`;

ConfirmButton.displayName = 'ConfirmButton';

export const EstimationInput = styled(Input)`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 3px #d7d2cb80;
  border-radius: 20px;
  opacity: 1;
  padding-left: 16px;
  font-family: Montserrat;

  :focus {
    border: none;
  }

  ::placeholder {
    color: #d7d2cb;
    opacity: 1; /* Firefox */
  }

  :focus + ${ConfirmButton} {
    background: #096762;
  }
`;

EstimationInput.displayName = 'EstimationInput';

export const EstimationInputContainer = styled.div`
  border-radius: 20px;
  position: relative;
  overflow: hidden;
`;

EstimationInputContainer.displayName = 'EstimationInputContainer';
