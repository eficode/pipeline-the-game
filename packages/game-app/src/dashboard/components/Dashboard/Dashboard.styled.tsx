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
  background-color: #fff;
  :not(:hover) {
    animation: ${animations.bounceDefinition(25)} 2s ease-in-out infinite alternate;
    animation-delay: ${props => props.delay || 0}s;
  }
`;

export const ReviewContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
  z-index: 1;
  transform: scale(0.5) perspective(1500px) rotate3d(-1, 1, 0, -25deg);
  transform-origin: top right;
  box-shadow: 0 210px 80px -60px #a0a0a0;
`;

export const GameRuleContainer = styled.div`
  position: absolute;
  top: 23%;
  right: 23%;
  z-index: 1;
  box-shadow: 0 210px 80px -60px #a0a0a0;
  transform: scale(0.7) perspective(1500px) rotate3d(1, 2, -1, 15deg);
`;

export const ScenarioContainer = styled.div`
  position: absolute;
  bottom: 20%;
  right: -120px;
  z-index: 1;
  box-shadow: 0 210px 80px -60px #a0a0a0;
  transform: scale(0.6) perspective(1500px) rotate3d(0, -1, -1, 5deg);
`;

export const Pipeline1Container = styled.div`
  position: absolute;
  left: 0;
  top: 20px;
  z-index: -2;
  box-shadow: 0 210px 80px -60px #a0a0a0;
  transform: scale(0.7);
`;

export const Pipeline2Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 20px;
  z-index: 2;
  box-shadow: 0 210px 80px -60px #a0a0a0;
  transform: scale(0.7) perspective(1500px) rotate3d(0, -1, -1, 5deg);
`;
