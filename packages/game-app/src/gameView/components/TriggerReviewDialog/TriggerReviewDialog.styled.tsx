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
      left: 278px;
      bottom: 70px;
      transform: unset;
      :after {
         {
          content: '';
          position: absolute;
          bottom: -14px;
          left: 350px;
          border-style: solid;
          border-width: 14px 14px 0;
          border-color: rgba(255, 255, 255, 0.6) transparent;
          display: block;
          width: 0;
          z-index: 1;
        }
      }
    `}
`;

TriggerDialogContainer.displayName = 'TriggerDialogContainer';
