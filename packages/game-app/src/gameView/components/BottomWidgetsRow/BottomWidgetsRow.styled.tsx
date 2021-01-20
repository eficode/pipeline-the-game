import styled from 'styled-components';

export const BottomWidgetsRowContainer = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  & > *:not(:first-child) {
    margin-left: 50px;
  }
`;

export const PoweredByContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextLogoWrapper = styled.div`
  margin-left: 8px;
  width: 50px;
`;
