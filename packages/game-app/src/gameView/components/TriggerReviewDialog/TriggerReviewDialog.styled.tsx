import styled, { css } from 'styled-components';
import { Dialog } from '@pipeline/components';

export const TriggerDialogContainer = styled(Dialog.DialogContainer)<{ showReviewPosition: boolean }>`
  transition: all 0.5s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 650px;

  ${props =>
    props.showReviewPosition &&
    css`
      position: absolute;
      top: unset;
      left: 200px;
      bottom: 55px;
      transform: unset;
    `}
`;

TriggerDialogContainer.displayName = 'TriggerDialogContainer';
