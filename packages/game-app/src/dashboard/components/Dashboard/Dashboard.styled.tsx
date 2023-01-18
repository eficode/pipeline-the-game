import styled from 'styled-components';
import { Box, EmptyCard, animations } from '@pipeline/components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
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
  z-index: -3;
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

export const DashboardSmallScreenWrapper = styled(Box)`
  max-width: 100vw;
  padding: 0 5vw 10vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  row-gap: 2vh;
`;

DashboardSmallScreenWrapper.displayName = 'DashboardSmallScreenWrapper';

export const Triangle = styled(Box)`
  width: 0;
  height: 0;
  z-index: 1;
  border-top: 90vh solid white;
  border-right: 15vw solid transparent;
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.5));
`;

Triangle.displayName = 'Triangle';

function scaleAtResolution(scale: number) {
  if (window.matchMedia('(min-width: 1600px)').matches) {
    return scale * 1.2;
  } else {
    return scale;
  }
}

export const AnimatedEmptyCard = styled(EmptyCard)<{ delay?: number }>`
  background-color: #fff;

  :not(:hover) {
    animation: ${animations.bounceDefinition(25)} 2s ease-in-out infinite alternate;
    animation-delay: ${props => props.delay || 0}s;
  }
`;

export const EmptyCardContainer = styled.div`
  position: absolute;
  z-index: 1;
  box-shadow: 0 210px 80px -60px #a0a0a0;
  will-change: transform;
  transition: transform 0.5s linear;
`;
EmptyCardContainer.displayName = 'EmptyCardContainer';

export const ReviewContainer = styled(EmptyCardContainer)`
  top: calc(20px + 10vh);
  right: 25px;
  transform-origin: top right;
  transform: scale(${scaleAtResolution(0.5)}) perspective(1500px) rotate3d(-1, 1, 0, -25deg);

  :hover {
    transform: scale(${scaleAtResolution(0.5)});
  }
`;

export const GameRuleContainer = styled(EmptyCardContainer)`
  top: 38vh;
  right: calc(11vw);
  transform: scale(${scaleAtResolution(0.7)}) perspective(1500px) rotate3d(1, 2, -1, 15deg);

  :hover {
    transform: scale(${scaleAtResolution(0.7)});
  }
`;

export const ScenarioContainer = styled(EmptyCardContainer)`
  bottom: 20%;
  right: -120px;
  transform: scale(${scaleAtResolution(0.7)}) perspective(400px) rotate3d(0, 18, 3, 10deg);

  :hover {
    transform: scale(${scaleAtResolution(0.7)});
  }
`;

export const Pipeline1Container = styled(EmptyCardContainer)`
  left: 45vw;
  top: 15vh;
  z-index: 0;
  transform: scale(${scaleAtResolution(0.7)}) rotateZ(-5deg);

  :hover {
    transform: scale(${scaleAtResolution(0.7)});
  }
`;

export const Pipeline2Container = styled(EmptyCardContainer)`
  left: 40vw;
  bottom: 15vh;
  z-index: 2;
  transform: scale(${scaleAtResolution(0.8)}) perspective(1500px) rotate3d(0, -1, -1, 5deg);

  :hover {
    transform: scale(${scaleAtResolution(0.8)});
  }
`;
