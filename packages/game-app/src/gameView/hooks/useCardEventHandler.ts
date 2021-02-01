import { useCallback } from 'react';
import { GameEvent, GameEventType } from '../types/gameEvents';
import { useDispatch } from 'react-redux';
import { actions } from '../slice';

export default function useCardEventHandler() {
  const dispatch = useDispatch();

  const onCardEvent = useCallback(
    (event: GameEvent) => {
      if (event.type === GameEventType.CardMovingEnd) {
        const { cardId, target, position } = event;
        dispatch(actions.updateCardPosition({ cardId, position, target }));
      }
      if (event.type === GameEventType.CardMovingStart) {
        const { cardId } = event;
        dispatch(actions.lockCard(cardId));
      }
    },
    [dispatch],
  );

  return {
    onCardEvent,
  };
}
