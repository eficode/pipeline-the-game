import React, { useState, useRef } from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { RoutingPath, useNavigateOutsideTo, useNavigateTo } from '@pipeline/routing';
import { Box, Button, Input, Link, TextLogo, Typography, Burger, Menu } from '@pipeline/components';
import { ReactComponent as KeyboardIcon } from '@assets/icons/keyboard.svg';
import {
  AnimatedEmptyCard,
  CardsIllustrationBackGround,
  DashboardContainer,
  DashboardHeader,
  DashboardLeftSide,
  DashboardSmallScreenWrapper,
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
import { useWindowDimensions } from '../../../_shared/components/utils';
import useJoinGame from '../../hooks/useJoinGame';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();
  const { width } = useWindowDimensions();
  const isWindowTooSmall = width < 1100;
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const goToCreateGame = useNavigateTo(RoutingPath.CreateGame);
  const goToHowToPlay = useNavigateOutsideTo(ExternalUrl.PIPELINE_HOW_TO_PLAY, true);
  const goToGameInfo = useNavigateOutsideTo(ExternalUrl.PIPELINE, true);
  const goToContactForm = useNavigateOutsideTo(ExternalUrl.CONTACT_US, true);
  const { showInput, toggleInput, text, onChange, join } = useJoinGame();

  if (isWindowTooSmall) {
    return (
      <DashboardContainer>
        <Box flex={1} justifyContent="center" display="flex" flexDirection="column" position="relative">
          <DashboardHeader>
            <Box width="100vw" justifyContent="center" display="flex">
              <TextLogo />
            </Box>
            <div ref={node as any}>
              <Burger open={open} setOpen={setOpen} />
              <Menu open={open}>
                <Box m="0 auto">
                  <TextLogo />
                </Box>
                <Box width="200px" m="0 auto">
                  <Button
                    variant="secondary"
                    rightIcon={<RightIcon />}
                    label={t('dashboard.howToPlay')}
                    onClick={goToHowToPlay}
                    id="how-to-play-button"
                  />
                </Box>
                <Box width="200px" m="0 auto">
                  <Button
                    variant="secondary"
                    rightIcon={<RightIcon />}
                    label={t('auth.logout')}
                    onClick={executeLogout}
                    id="logout-button"
                  />
                </Box>
                <Box width="200px" m="0 auto">
                  <Button label={t('dashboard.contactUs')} onClick={goToContactForm} />
                </Box>
              </Menu>
            </div>
          </DashboardHeader>
          <Box flex={1} display="flex" flexDirection="row">
            <DashboardSmallScreenWrapper>
              <Typography variant="title" fontFamily="Merriweather">
                {t('dashboard.title')}
              </Typography>
              <Typography mt={3} variant="dialogHead" fontWeight="normal">
                {t('dashboard.message')}
              </Typography>
              <br />
              <Link as="a" onClick={goToGameInfo}>
                <Typography variant="dialogHead" fontWeight="normal">
                  {t('dashboard.link')}
                </Typography>
              </Link>
              <Button id="go-to-create-game-button" onClick={goToCreateGame} label={t('dashboard.newGameLabel')} />
              {!showInput ? <Button onClick={toggleInput} label={t('dashboard.joinGame')} /> : null}
              {showInput ? (
                <Input
                  id="join-link-field"
                  iconLeft={<KeyboardIcon />}
                  variant="default"
                  value={text}
                  onChange={onChange}
                />
              ) : null}
              {showInput && text ? (
                <Link variant="activeAccent" onClick={join}>
                  {t('dashboard.joinButton')}
                </Link>
              ) : null}
            </DashboardSmallScreenWrapper>
          </Box>
        </Box>
      </DashboardContainer>
    );
  }

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
              <Button label={t('dashboard.contactUs')} onClick={goToContactForm} />
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
            <br />
            <Link as="a" onClick={goToGameInfo}>
              <Typography variant="dialogHead" fontWeight="normal">
                {t('dashboard.link')}
              </Typography>
            </Link>
            <Box mt={4} display="flex" flexDirection="row">
              <Button id="go-to-create-game-button" onClick={goToCreateGame} label={t('dashboard.newGameLabel')} />
              <Box marginLeft={5} display="flex" flexDirection="row">
                {!showInput ? <Button onClick={toggleInput} label={t('dashboard.joinGame')} /> : null}
                {showInput ? (
                  <Input
                    id="join-link-field"
                    iconLeft={<KeyboardIcon />}
                    variant="default"
                    value={text}
                    onChange={onChange}
                  />
                ) : null}
                {showInput && text ? (
                  <Link variant="activeAccent" onClick={join}>
                    {t('dashboard.joinButton')}
                  </Link>
                ) : null}
              </Box>
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
