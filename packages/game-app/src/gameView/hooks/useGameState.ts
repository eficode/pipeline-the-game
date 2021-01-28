import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../slice';
import { useEffect } from 'react';
import { GameEntity } from '@pipeline/models';

export default function useGameState(currentGame: string) {
  const placedCardsIds = useSelector(selectors.getPlacedCards);
  const deckCardsIds = useSelector(selectors.getDeckCardsIds);
  const game: GameEntity | null = useSelector(selectors.getGame);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (!placedCardsIds && !deckCardsIds && !game) ||
      (game && game.rtdbInstance == null) ||
      (game && game.id !== currentGame)
    ) {
      dispatch(actions.loadGame(currentGame));
    }
  }, [placedCardsIds, deckCardsIds, dispatch, currentGame, game]);

  return {
    placedCardsIds: placedCardsIds || [],
    deckCardsIds: deckCardsIds || [],
  };
}
