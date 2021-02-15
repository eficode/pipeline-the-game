import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { RoutingPath, useNavigateTo } from '@pipeline/routing';
import { Box, Button, Link, TextLogo, Typography } from '@pipeline/components';
import JoinGameButton from '../JoinGameButton';
import {
  AnimatedEmptyCard,
  CardsIllustration,
  CardsIllustrationBackGround,
  DashboardContainer,
  DashboardHeader,
  DashboardLeftSide,
  GameRuleContainer,
  Pipeline1Container,
  Pipeline2Container,
  ReviewContainer,
  ScenarioContainer,
  Triangle,
} from './Dashboard.styled';
import { CardType } from '@pipeline/common';
import Tilt from 'react-parallax-tilt';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();

  const goToCreateGame = useNavigateTo(RoutingPath.CreateGame);

  return (
    <DashboardContainer>
      <Box flex={1} ml="10vw" justifyContent="center" display="flex" flexDirection="column" position="relative">
        <DashboardHeader>
          <TextLogo />
          <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="row" justifyContent="flex-end" mr={4}>
              <Link onClick={executeLogout} id="logout-button">
                {t('auth.logout')}
              </Link>
            </Box>
            <Box>
              <Button label={t('dashboard.contactUs')} onClick={() => ({})} />
            </Box>
          </Box>
        </DashboardHeader>
        <Box flex={1} display="flex" flexDirection="row">
          <DashboardLeftSide>
            <Typography variant="title" fontFamily="Merriweather">
              {t('dashboard.title')}
            </Typography>
            <Typography mt={3} variant="dialogHead" fontWeight="normal">
              {t('dashboard.message')}
            </Typography>
            <Box mt={4} display="flex" flexDirection="row">
              <Button id="go-to-create-game-button" onClick={goToCreateGame} label={t('dashboard.newGameLabel')} />
              <JoinGameButton />
            </Box>
          </DashboardLeftSide>
          <Triangle />
          <CardsIllustrationBackGround />
          <CardsIllustration flex={1}>
            <Pipeline1Container>
              <Tilt scale={1.1} perspective={1500}>
                <AnimatedEmptyCard type={CardType.PipelineStep} delay={0.1} />
              </Tilt>
            </Pipeline1Container>
            <Pipeline2Container>
              <Tilt scale={1.1} perspective={1500}>
                <AnimatedEmptyCard type={CardType.PipelineStep} delay={0.25} />
              </Tilt>
            </Pipeline2Container>
            <ReviewContainer>
              <Tilt scale={1.1} perspective={1500}>
                <AnimatedEmptyCard type={CardType.Review} delay={0.5} />
              </Tilt>
            </ReviewContainer>
            <GameRuleContainer>
              <Tilt scale={1.1} perspective={1500}>
                <AnimatedEmptyCard type={CardType.GameRule} delay={0.75} />
              </Tilt>
            </GameRuleContainer>
            <ScenarioContainer>
              <Tilt scale={1.1} perspective={1500}>
                <AnimatedEmptyCard type={CardType.Scenario} delay={1} />
              </Tilt>
            </ScenarioContainer>
          </CardsIllustration>
        </Box>
      </Box>
    </DashboardContainer>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
