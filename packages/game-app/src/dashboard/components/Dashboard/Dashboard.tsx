import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();

  const history = useHistory();

  return (
    <div className="dashboard">
      <div className="sign-out-button">
        <button type="button" className="link" onClick={executeLogout}>
          {t('auth.logout')}
        </button>
      </div>
      <h1>{t('dashboard.title')}</h1>
      <h2>{t('dashboard.subtitle')}</h2>
      <p>{t('dashboard.message')}</p>
      <button type="button" className="link test-game" onClick={() => history.push(RoutingPath.Game)}>
        Game board test
      </button>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
