import React from 'react';
import { useTranslate } from '@pipeline/i18n';

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const t = useTranslate();

  return (
    <div className="dashboard">
      <h1>{t('dashboard.title')}</h1>
      <h2>{t('dashboard.subtitle')}</h2>
      <p>{t('dashboard.message')}</p>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
