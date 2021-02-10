import styled from 'styled-components';
import { Dialog } from '@pipeline/components';

export const DialogEmailHeader = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.cardsTypes['pipeline-step']};
`;

DialogEmailHeader.displayName = 'DialogEmailHeader';

export const DialogEmailContainer = styled(Dialog.DialogContainer)`
  padding: 0;
  overflow: hidden;
  max-width: 35%;
`;

DialogEmailContainer.displayName = 'DialogEmailHeader';

export const DialogEmailContent = styled.div`
  padding: 40px;
`;

DialogEmailContent.displayName = 'DialogEmailContent';
