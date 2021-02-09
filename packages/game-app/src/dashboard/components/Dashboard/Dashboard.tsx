import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { RoutingPath, useNavigateTo } from '@pipeline/routing';
import { Box, Button, Link, TextLogo, Typography } from '@pipeline/components';
import JoinGameButton from '../JoinGameButton';
import { DashboardContainer, DashboardHeader } from './Dashboard.styled';

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
          <Box>
            <Link onClick={executeLogout} id="logout-button">
              {t('auth.logout')}
            </Link>
            <Button label={t('dashboard.contactUs')} onClick={() => ({})} />
          </Box>
        </DashboardHeader>
        <Box maxWidth="40vw">
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
        </Box>
      </Box>
    </DashboardContainer>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
