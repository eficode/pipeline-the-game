import React, { useCallback, useEffect, useState } from 'react';
import { useIsOnline } from '@pipeline/networkStatus';
import { Box, Button, Dialog, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {};

const OfflineOverlay: React.FC<Props> = () => {
  const isOnline = useIsOnline();

  const [isOpen, setIsOpen] = useState<boolean>(!isOnline);

  const t = useTranslate();

  useEffect(() => {
    if (!isOnline && !isOpen) {
      setIsOpen(true);
    }
  }, [isOnline, isOpen]);

  const refresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Dialog open={isOpen} title={t('game.offlineOverlay.title')}>
      <Typography textAlign="center" mt={3}>
        {t('game.offlineOverlay.subtitle')}
      </Typography>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button testId="refresh" label={t('general.refresh')} onClick={refresh} />
      </Box>
    </Dialog>
  );
};

OfflineOverlay.displayName = 'OfflineBanner';

export default React.memo(OfflineOverlay);
