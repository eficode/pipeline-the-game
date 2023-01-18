import styled from 'styled-components';
import { Box } from '@pipeline/components';

export const TopRowContainer = styled(Box)`
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: sticky;
    left: 0;
    top: 0;
  }

  & > * {
    margin-right: 24px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-right: 0;
    }
  }
`;

export const LogoContainer = styled(Box)`
  width: 54px;
`;

LogoContainer.displayName = 'LogoContainer';

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

ButtonsBar.displayName = 'ButtonsBar';

export const GameName = styled(Box)`
  margin: 8px 0px;
  padding: 0px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #1a1818;
`;

GameName.displayName = 'GameName';
