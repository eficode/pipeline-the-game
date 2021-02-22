import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { RoutingPath, useNavigateOutsideTo, useNavigateTo } from '@pipeline/routing';
import { Box, Button, TextLogo, Typography } from '@pipeline/components';
import JoinGameButton from '../JoinGameButton';
import {
  AnimatedEmptyCard,
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
import { ReactComponent as RightIcon } from '@assets/icons/arrow.svg';
import Tilt from 'react-parallax-tilt';
import { ExternalUrl } from '@pipeline/models';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();

  const goToCreateGame = useNavigateTo(RoutingPath.CreateGame);
  const goToHowToPlay = useNavigateOutsideTo(ExternalUrl.PIPELINE_HOW_TO_PLAY, true);

  return (
    <DashboardContainer>
      <Box flex={1} ml="10vw" justifyContent="center" display="flex" flexDirection="column" position="relative">
        <DashboardHeader>
          <TextLogo />
          <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="row" justifyContent="flex-end" mr={4}>
              <Button
                variant="secondary"
                rightIcon={<RightIcon />}
                label={t('dashboard.howToPlay')}
                onClick={goToHowToPlay}
                id="how-to-play-button"
              />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" mr={4}>
              <Button
                variant="secondary"
                rightIcon={<RightIcon />}
                label={t('auth.logout')}
                onClick={executeLogout}
                id="logout-button"
              />
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
        </Box>
      </Box>
    </DashboardContainer>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
