import styled from 'styled-components';

export const BottomWidgetsRowContainer = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  & > *:not(:first-child) {
    margin-left: 24px;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    left: 0;
    bottom: 0;
    position: sticky;
    flex-direction: column;
  }
`;

export const PoweredByContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

export const TextLogoWrapper = styled.div`
  margin-left: 8px;
  width: 50px;
`;
