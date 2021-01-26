import IconButton from '../IconButton';
import styled, { css } from 'styled-components';

export const ButtonsWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  ${IconButton} {
    transition: transform 0.5s;
    position: absolute;
    top: 0;
    transform: translate(0, 0);
  }

  ${props =>
    props.isOpen &&
    css`
      ${IconButton}:nth-child(3) {
        transform: translate(0, -48px);
      }

      ${IconButton}:nth-child(2) {
        transform: translate(0, -96px);
      }

      ${IconButton}:nth-child(1) {
        transform: translate(0, -144px);
      }
    `}
`;

ButtonsWrapper.displayName = 'ButtonsWrapper';

export const MainButtonIcon = styled(IconButton)`
  position: absolute;

  z-index: 1;
`;

MainButtonIcon.displayName = 'MainButtonIcon';

export const FabDialContent = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

FabDialContent.displayName = 'FabDialContent';
