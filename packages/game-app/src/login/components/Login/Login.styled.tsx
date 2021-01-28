import { animations } from '@pipeline/components';
import styled from 'styled-components';

export const LoginForm = styled.div<{ error?: boolean }>`
  ${props => props.error && animations.shake()}
`;

LoginForm.displayName = 'LoginForm';
