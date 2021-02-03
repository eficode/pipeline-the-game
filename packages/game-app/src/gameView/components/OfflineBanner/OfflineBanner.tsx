import React, { useEffect, useState } from 'react';
import { Banner } from './OfflineBanner.styled';
import { useIsOnline } from '@pipeline/networkStatus';
import { Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {};

const OfflineBanner: React.FC<Props> = () => {
  const isOnline = useIsOnline();

  const [internalState, setInternalState] = useState<'opening' | 'open' | 'closed' | 'closing'>(
    !isOnline ? 'open' : 'closed',
  );

  const t = useTranslate();

  useEffect(() => {
    if (isOnline && internalState === 'open') {
      setInternalState('closing');
      setTimeout(() => {
        setInternalState('closed');
      }, 500);
    } else if (!isOnline && internalState !== 'open') {
      setInternalState('opening');
      setTimeout(() => {
        setInternalState('open');
      }, 500);
    }
  }, [internalState, isOnline]);

  return internalState !== 'closed' ? (
    <Banner isOpening={internalState === 'opening'} isClosing={internalState === 'closing'}>
      <Typography variant="contentHead">{t('game.offline')}</Typography>
    </Banner>
  ) : null;
};

OfflineBanner.displayName = 'OfflineBanner';

export default React.memo(OfflineBanner);
