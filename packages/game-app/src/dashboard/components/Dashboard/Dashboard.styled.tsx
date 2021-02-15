import styled from 'styled-components';
import { Box, EmptyCard, animations } from '@pipeline/components';

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
`;

DashboardHeader.displayName = 'DashboardHeader';

export const CardsIllustration = styled(Box)`
  position: absolute;
  right: 0;
  top: 10vh;
  bottom: 0;
  width: 50vw;
  z-index: 100;
  overflow: hidden;
`;

CardsIllustration.displayName = 'CardsIllustration';

export const CardsIllustrationBackGround = styled(Box)`
  position: absolute;
  right: 0;
  top: 10vh;
  bottom: 0;
  width: 50vw;
  z-index: -1;
  background: #eeeeee;
`;

CardsIllustrationBackGround.displayName = 'CardsIllustrationBackGround';

export const DashboardLeftSide = styled(Box)`
  max-width: 40vw;
  padding-bottom: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
`;

DashboardLeftSide.displayName = 'DashboardLeftSide';

export const Triangle = styled(Box)`
  width: 0;
  height: 0;
  border-top: 90vh solid white;
  border-right: 15vw solid transparent;
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.5));
`;

Triangle.displayName = 'Triangle';

export const AnimatedEmptyCard = styled(EmptyCard)<{ delay?: number }>`
  :not(:hover) {
    animation: ${animations.bounceDefinition(25)} 0.75s infinite alternate;
    animation-delay: ${props => props.delay || 0}s;
  }
`;
