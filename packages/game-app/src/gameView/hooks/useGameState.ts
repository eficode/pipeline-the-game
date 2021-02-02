import { useSelector } from 'react-redux';
import { selectors } from '../slice';
import { useEffect } from 'react';
import { GameEntity } from '@pipeline/models';
import useLoadGame from './useLoadGame';

export default function useGameState(currentGame: string) {
  const placedCardsIds = useSelector(selectors.getPlacedCards);
  const deckCardsIds = useSelector(selectors.getDeckCardsIds);
  const game: GameEntity | null = useSelector(selectors.getGame);
  const { call: loadGame, loading } = useLoadGame();

  useEffect(() => {
    if (
      (!placedCardsIds && !deckCardsIds && !game) ||
      (game && game.rtdbInstance == null) ||
      (game && game.id !== currentGame)
    ) {
      loadGame(currentGame);
    }
  }, [placedCardsIds, deckCardsIds, loadGame, currentGame, game]);

  return {
    loading,
    placedCardsIds: placedCardsIds || [],
    deckCardsIds: deckCardsIds || [],
  };
}
