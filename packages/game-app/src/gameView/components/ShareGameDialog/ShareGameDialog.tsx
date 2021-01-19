import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { Box, IconButton, Input, Typography, Dialog, Button } from '@pipeline/components';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { ReactComponent as CopyIcon } from '@assets/icons/review.svg';

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

  const gameId = useSelector(selectors.getSelectedGameId);

  const url = `${window.location.origin}/game/${gameId}`;

  return (
    <Dialog open={isOpen} title={t('game.share.title')}>
      <Typography mt={4} variant="content">
        {t('game.share.subtitle')}
      </Typography>
      <Box display="flex" flexDirection="row" mt={4}>
        <Input readOnly variant="clear" color="activeAccentLight" value={url} />
        <IconButton variant="clear" onClick={() => copy(url)}>
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
