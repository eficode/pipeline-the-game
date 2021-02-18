import React from 'react';
import { GlassOverlay } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { Title } from './LoadingOverlay.styled';

type Props = {
  isOpen: boolean;
};

const LoadingOverlay: React.FC<Props> = ({ isOpen }) => {
  const t = useTranslate();

  return (
    <GlassOverlay open={isOpen} id="loading-game-overlay">
      <Title variant="dialogHead">{t('game.initializing')}</Title>
    </GlassOverlay>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';

export default LoadingOverlay;
