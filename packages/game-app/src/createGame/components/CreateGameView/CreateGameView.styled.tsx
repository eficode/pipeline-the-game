import styled, { css } from 'styled-components';
import { Icon } from '@pipeline/components';

export const CreateGameContainer = styled.div`
  background-color: rgb(170, 180, 175, 0.95);
  width: 100vw;
  height: 100vh;
  overflow-y: auto;

  @supports (backdrop-filter: blur(15px)) {
    background-color: rgb(170, 180, 175, 0.4);
    backdrop-filter: blur(15px);
  }
`;

CreateGameContainer.displayName = 'CreateGameContainer';

export const CreateGameContent = styled.div`
  width: 85%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 6px #d7d2cb80;
  border-radius: 10px;
  padding: 20px 0px;
`;

CreateGameContent.displayName = 'CreateGameContent';

export const OwnScenarioButton = styled.div`
  cursor: pointer;
`;
OwnScenarioButton.displayName = 'OwnScenarioButton';

export const OwnScenarioIcon = styled(Icon)<{ open: boolean }>`
  transition: all 0.5s linear;

  ${props =>
    props.open &&
    css`
      transform: rotate(90deg);
    `}
`;
OwnScenarioIcon.displayName = 'OwnScenarioIcon';

export const CustomScenarioForm = styled.div<{ open: boolean }>`
  transition: all 0.5s ease-out;
  box-sizing: border-box;
  overflow: hidden;
  ${({ open }) =>
    open
      ? css`
          max-height: 300px;
          transition: max-height 0.5s ease-in;
        `
      : css`
          max-height: 0 !important;
        `}
`;

CustomScenarioForm.displayName = 'CustomScenarioForm';
