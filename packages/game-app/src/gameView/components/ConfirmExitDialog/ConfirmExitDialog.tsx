import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { Box, Button, Dialog } from '@pipeline/components';

type Props = {
  isOpen: boolean;
  close: () => void;
  exitGame: () => void;
};

const ConfirmExitDialog: React.FC<Props> = ({ isOpen, close, exitGame }) => {
  const t = useTranslate();

  return (
    <Dialog open={isOpen} title={t('game.confirmExit.title')}>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button label={t('general.exit')} onClick={exitGame} />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="clear" color="buttonGrey" label={t('general.cancel')} onClick={close} />
      </Box>
    </Dialog>
  );
};

ConfirmExitDialog.displayName = 'ConfirmExitDialog';

export default ConfirmExitDialog;
