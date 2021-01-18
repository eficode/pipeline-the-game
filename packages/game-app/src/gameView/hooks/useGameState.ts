import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../slice';
import { useEffect } from 'react';

export default function useGameState(currentGame: string) {
  const placedCardsIds = useSelector(selectors.getPlacedCards);
  const deckCardsIds = useSelector(selectors.getDeckCardsIds);
  const selectedGameId = useSelector(selectors.getSelectedGameId);

  const dispatch = useDispatch();

  useEffect(() => {
    if ((!placedCardsIds && !deckCardsIds) || selectedGameId !== currentGame) {
      dispatch(actions.loadGame(currentGame));
    }
  }, [placedCardsIds, deckCardsIds, dispatch, currentGame, selectedGameId]);

  return {
    placedCardsIds: placedCardsIds || [],
    deckCardsIds: deckCardsIds || [],
  };
}
