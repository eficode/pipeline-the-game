import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';
import { Box, Button, Link } from '@pipeline/components';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();

  const history = useHistory();

  return (
    <div className="dashboard">
      <div className="sign-out-button">
        <Link onClick={executeLogout}>{t('auth.logout')}</Link>
      </div>
      <h1>{t('dashboard.title')}</h1>
      <h2>{t('dashboard.subtitle')}</h2>
      <p>{t('dashboard.message')}</p>
      <Box mt={4}>
        <Button onClick={() => history.push(RoutingPath.CreateGame)} label={t('dashboard.newGameLabel')} />
      </Box>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
