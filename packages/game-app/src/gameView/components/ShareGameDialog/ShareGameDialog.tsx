import React, { useCallback, useState } from 'react';
import { useTranslate } from '@pipeline/i18n';
import { Box, Button, Dialog, IconButton, Input, Typography, getFromTheme } from '@pipeline/components';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { ReactComponent as CopyIcon } from '@assets/icons/copy-link.svg';
import { GameEntity } from '@pipeline/models';
import styled, { css, keyframes } from 'styled-components';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const closingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const PopoverContent = styled.div<{ isClosing: boolean }>`
  background-color: ${getFromTheme('colors.activeAccentLight')};
  padding: 3px 20px;
  max-width: 140px;
  border-radius: 6px;
  -webkit-box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  z-index: 100002;

  ${props =>
    props.isClosing &&
    css`
      animation: ${closingAnimation} linear 0.3s;
      animation-fill-mode: forwards;
    `}
`;

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

  const [internalState, setInternalState] = useState<'open' | 'closed' | 'closing'>('closed');
  const game: GameEntity | null = useSelector(selectors.getGame);

  const url = `${window.location.origin}/game/${game?.id}`;

  const openPopover = useCallback(() => {
    setInternalState('open');
  }, []);

  const closePopover = useCallback(() => {
    setInternalState('closed');
  }, []);

  const startClosePopover = useCallback(() => {
    setInternalState('closing');
  }, []);

  const copyUrl = useCallback(() => {
    copy(url);
    openPopover();
    setTimeout(() => {
      startClosePopover();
    }, 1200);
    setTimeout(() => {
      closePopover();
    }, 1500);
  }, [openPopover, closePopover, url, startClosePopover]);

  return (
    <Dialog open={isOpen} title={t('game.share.title')}>
      <Typography mt={4} variant="content">
        {t('game.share.subtitle')}
      </Typography>
      <Box display="flex" flexDirection="row" mt={4}>
        <Box width="85%">
          <Input flex={1} readOnly variant="clear" color="activeAccentLight" value={url} />
        </Box>
        <Box display="flex" width="15%" justifyContent="center">
          <IconButton variant="clear" onClick={copyUrl}>
            <CopyIcon />
          </IconButton>
        </Box>
      </Box>
      <Box mt={1} height={25} display="flex" justifyContent="flex-end">
        {internalState !== 'closed' && (
          <PopoverContent isClosing={internalState === 'closing'}>
            <Typography color="#fff" variant="label">
              {t('game.share.copied')}
            </Typography>
          </PopoverContent>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button label={t('general.done')} onClick={close} />
      </Box>
    </Dialog>
  );
};

ShareGameDialog.displayName = 'ShareGameDialog';

export default ShareGameDialog;
