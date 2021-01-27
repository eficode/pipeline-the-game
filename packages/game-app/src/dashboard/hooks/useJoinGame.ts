import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';

export default function useJoinGame() {
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
  return { showInput, toggleInput, text, onChange, join };
}
