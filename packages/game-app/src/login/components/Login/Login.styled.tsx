import { animations } from '@pipeline/components';
import styled from 'styled-components';

export const LoginForm = styled.div<{ error?: boolean }>`
  ${props => props.error && animations.shake()}
`;

export const Separator = styled.div`
  width: 80px;
  height: 0;
  border: 1px solid #d7d2cb;
  opacity: 1;
`;

export const PrivacySpan = styled.span`
  font-size: 12px;
`;
export const GoToSpan = styled.span`
  font-size: 16px;
`;

LoginForm.displayName = 'LoginForm';
Separator.displayName = 'Separator';
PrivacySpan.displayName = 'PrivacySpan';
GoToSpan.displayName = 'GoToSpan';
