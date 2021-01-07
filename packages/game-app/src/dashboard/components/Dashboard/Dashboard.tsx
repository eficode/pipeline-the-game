import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout } from '@pipeline/auth';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();
  const { call: executeLogout } = useLogout();

  return (
    <div className="dashboard">
      <div className="sign-out-button">
        <button className="link" onClick={executeLogout}>
          {t('auth.logout')}
        </button>
      </div>
      <h1>{t('dashboard.title')}</h1>
      <h2>{t('dashboard.subtitle')}</h2>
      <p>{t('dashboard.message')}</p>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
