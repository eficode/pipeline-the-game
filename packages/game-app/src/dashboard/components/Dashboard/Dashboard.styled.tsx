import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

DashboardContainer.displayName = 'DashboardContainer';

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 0 10vw 0 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

DashboardHeader.displayName = 'DashboardHeader';
