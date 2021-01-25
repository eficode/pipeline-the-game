import React, { useCallback, useState } from 'react';
import { Box, Button, Input } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { ReactComponent as KeyboardIcon } from '@assets/icons/keyboard.svg';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';

type Props = {};

const JoinGameButton: React.FC<Props> = () => {
  const t = useTranslate();

  const [showInput, setShowInput] = useState(false);

  const toggleInput = useCallback(() => {
    setShowInput(s => !s);
  }, []);

  const [text, setText] = useState('');

  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  }, []);

  const history = useHistory();

  const join = useCallback(() => {
    if (text.startsWith(`${window.origin}/game/`)) {
      const gameId = text.replace(`${window.origin}/game/`, '');
      history.push(`${RoutingPath.Game}/${gameId}`);
    }
  }, [text, history]);

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
