import React from 'react';
import { Box, Button, Dialog } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { RoutingPath, useNavigateTo } from '@pipeline/routing';

type Props = {
  isOpen: boolean;
};

const ErrorOverlay: React.FC<Props> = ({ isOpen }) => {
  const t = useTranslate();

  const gotToDashboard = useNavigateTo(RoutingPath.Dashboard);

  return (
    <Dialog open={isOpen} title={t('game.notFound')}>
      <Box mt={4} textAlign="center">
        <Button label={t('general.exit')} onClick={gotToDashboard} />
      </Box>
    </Dialog>
  );
};

ErrorOverlay.displayName = 'ErrorOverlay';

export default ErrorOverlay;
