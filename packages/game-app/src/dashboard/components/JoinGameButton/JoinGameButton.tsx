import React from 'react';
import { Box, Button, Input } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { ReactComponent as KeyboardIcon } from '@assets/icons/keyboard.svg';
import useJoinGame from '../../hooks/useJoinGame';

type Props = {};

const JoinGameButton: React.FC<Props> = () => {
  const t = useTranslate();
  const { showInput, toggleInput, text, onChange, join } = useJoinGame();

  return (
    <Box marginLeft={5} display="flex" flexDirection="row">
      {!showInput ? <Button onClick={toggleInput} label={t('dashboard.joinGame')} /> : null}
      {showInput ? (
        <Input id="join-link-field" iconLeft={<KeyboardIcon />} variant="default" value={text} onChange={onChange} />
      ) : null}
      {showInput && text ? (
        <Button variant="clear" onClick={join} color="activeAccent" label={t('dashboard.joinButton')} />
      ) : null}
    </Box>
  );
};
JoinGameButton.displayName = 'JoinGameButton';

export default JoinGameButton;
