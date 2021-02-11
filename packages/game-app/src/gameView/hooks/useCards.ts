import { createRequestHook } from '@pipeline/requests-status';
import { actions, selectors } from '../slice';
import { useSelector } from 'react-redux';
import { CardType } from '@pipeline/common';
import { useEffect, useMemo } from 'react';

const useLoadCards = createRequestHook('game.loadCards', actions.loadCards);

export default function useCards(cardType?: CardType) {
  const cards = useSelector(selectors.getAllCards);

  const { call, ...requestData } = useLoadCards();

  const filteredCards = useMemo(() => {
    if (!cardType) {
      return cards;
    } else {
      return cards.filter(c => c.type === cardType);
    }
  }, [cards, cardType]);

  useEffect(() => {
    if (cards.length === 0) {
      call();
    }
  }, [cards, call]);

  return {
    ...requestData,
    cards: filteredCards,
  };
}
