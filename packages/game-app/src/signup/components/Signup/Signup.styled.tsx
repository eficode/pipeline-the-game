import styled from 'styled-components';
import { Box } from '@pipeline/components';

export const SignupContent = styled(Box)`
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

SignupContent.displayName = 'SignupContent';
