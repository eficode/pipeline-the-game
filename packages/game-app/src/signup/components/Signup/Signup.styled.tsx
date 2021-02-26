import styled from 'styled-components';
import { Box } from '@pipeline/components';

export const SignupContent = styled(Box)`
  padding-right: 15px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: 2px;

  ::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 5px;
  }
`;

SignupContent.displayName = 'SignupContent';
