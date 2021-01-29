import React, { useCallback } from 'react';
import { useTranslate } from '@pipeline/i18n';
import { Box, IconButton, Typography, Dialog, Button, Input } from '@pipeline/components';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { ReactComponent as CopyIcon } from '@assets/icons/review.svg';
import { GameEntity } from '@pipeline/models';

type Props = {
  isOpen: boolean;
  close: () => void;
};

function copy(text: string) {
  const input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}

const ShareGameDialog: React.FC<Props> = ({ isOpen, close }) => {
  const t = useTranslate();

  const game: GameEntity | null = useSelector(selectors.getGame);

  const url = `${window.location.origin}/game/${game?.id}`;

  const copyUrl = useCallback(() => {
    copy(url);
  }, [url]);

  return (
    <Dialog open={isOpen} title={t('game.share.title')}>
      <Typography mt={4} variant="content">
        {t('game.share.subtitle')}
      </Typography>
      <Box display="flex" flexDirection="row" mt={4}>
        <Input flex={1} readOnly variant="clear" color="activeAccentLight" value={url} />
        <IconButton variant="clear" onClick={copyUrl}>
          <CopyIcon />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button label={t('general.done')} onClick={close} />
      </Box>
    </Dialog>
  );
};

ShareGameDialog.displayName = 'ShareGameDialog';

export default ShareGameDialog;
