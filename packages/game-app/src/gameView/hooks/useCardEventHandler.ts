import { useCallback } from 'react';
import { GameEvent, GameEventType } from '../types/gameEvents';
import { useDispatch } from 'react-redux';
import { actions } from '../slice';

/**
 * Hook that intercepts board events and dispatches actions accordingly
 */
export default function useCardEventHandler() {
  const dispatch = useDispatch();

  const onCardEvent = useCallback(
    (event: GameEvent) => {
      if (event.type === GameEventType.CardMovingEnd) {
        const { cardId, target, position } = event;
        if (target === null) {
          dispatch(actions.unlockCard({ cardId }));
        } else {
          dispatch(actions.updateCardPosition({ cardId, position, target }));
        }
      }
      if (event.type === GameEventType.CardMovingStart) {
        const { cardId, parent } = event;
        dispatch(actions.lockCard({ cardId, parent }));
      }
    },
    [dispatch],
  );

  return {
    onCardEvent,
  };
}
