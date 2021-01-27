import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { RoutingPath, useNavigateTo } from '@pipeline/routing';
import { Box, Button, Link } from '@pipeline/components';
import JoinGameButton from '../JoinGameButton';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();

  const goToCreateGame = useNavigateTo(RoutingPath.CreateGame);

  return (
    <div className="dashboard">
      <div className="sign-out-button">
        <Link onClick={executeLogout} id="logout-button">
          {t('auth.logout')}
        </Link>
      </div>
      <h1>{t('dashboard.title')}</h1>
      <h2>{t('dashboard.subtitle')}</h2>
      <p>{t('dashboard.message')}</p>
      <Box mt={4} display="flex" flexDirection="row">
        <Button onClick={goToCreateGame} label={t('dashboard.newGameLabel')} />
        <JoinGameButton />
      </Box>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
