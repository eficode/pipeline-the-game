import styled from 'styled-components';
import { Box } from '@pipeline/components';

export const TopRowContainer = styled(Box)`
  position: absolute;
  left: 40px;
  top: 40px;
  z-index: 1;
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 24px;
  }
`;

export const LogoContainer = styled(Box)`
  width: 54px;
`;

export const ButtonsBar = styled(Box)`
  background: white;
  box-shadow: 0px 0px 6px #d7d2cb80;
  border-radius: 4px;
  padding: 0 12px;
  display: flex;
  flex-direction: row;
  height: 40px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
