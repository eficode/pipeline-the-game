import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../slice';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function useDeckState() {
  const deckCardsIds = useSelector(selectors.getDeckCardsIds);
  const filteredDeckCardsIds = useSelector(selectors.getFilteredDeckCardsIds);

  const [searchedText, setSearchedText] = useState('');
  const [debouncedSearchText] = useDebounce(searchedText, 350);

  const dispatch = useDispatch();

  const saveSearchedText = useCallback(
    (text: string) => {
      dispatch(actions.setSearchText(text));
    },
    [dispatch],
  );

  useEffect(() => {
    saveSearchedText(debouncedSearchText);
  }, [debouncedSearchText, saveSearchedText]);

  return {
    deckCardsIds: filteredDeckCardsIds || deckCardsIds || [],
    setSearchedText,
    searchedText: searchedText || '',
  };
}
