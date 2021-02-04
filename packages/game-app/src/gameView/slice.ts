import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CardEntity, CardState, DEFAULT_Z_INDEX } from '@pipeline/common';
import { GameUIState } from './types/gameUIState';
import { GameEntity } from '@pipeline/models';
import { selectors as authSelectors } from '@pipeline/auth';
import { createNetworkRequiringAction } from '@pipeline/networkStatus';
import { Draft } from 'immer';

export interface GameState {
  /**
   * list of card ids inside the board
   */
  boardCards: string[];
  /**
   * list of card ids inside the panel
   */
  deckCards: string[];
  /**
   * cards information
   */
  cardsState: {
    [cardId: string]: CardState;
  };
  /**
   * next z-index, the z-index of the next placed cards inside the board
   */
  nextZIndex: number;

  /**
   * flag to indicate if review is triggered
   */
  review: boolean;
}

export interface State {
  game: GameEntity | null;
  cards: EntityState<CardEntity>;
  gameState: GameState | null;
  searchText: string | null;
}

const adapter = createEntityAdapter<CardEntity>({
  sortComparer: (a, b) => a.number - b.number,
});

export const name = 'game' as const;

const extraActions = {
  loadCards: createAction(`${name}/loadCards`),
  loadGame: createAction<string>(`${name}/loadGame`),
  updateRTDBInstanceGame: createAction<string>(`${name}/updateRTDBInstanceGame`),
  lockCard: createNetworkRequiringAction<{ cardId: string; parent: 'panel' | 'board' }>(`${name}/lockCard`),
  updateCardPosition: createNetworkRequiringAction<{
    cardId: string;
    target: 'panel' | 'board';
    position?: { x: number; y: number };
  }>(`${name}/updateCardPosition`),
  setEstimation: createNetworkRequiringAction<{ cardId: string; estimation: string }>(`${name}/setEstimation`),
  startListenToGameState: createAction<string>(`${name}/startListenToGameState`),
};

const initialState = {
  game: null,
  cards: adapter.getInitialState(),
  gameState: null,
  searchText: null,
} as State;

function modifyCardState(cardState: CardState, gameState: Draft<GameState>, cardId: string) {
  if (cardState.parent === 'panel' && !gameState.deckCards.includes(cardId)) {
    gameState.deckCards.push(cardId);
    const index = gameState.boardCards.indexOf(cardId);
    if (index > -1) {
      gameState.boardCards.splice(index, 1);
    }
  } else if (cardState.parent === 'board') {
    if (gameState.deckCards.includes(cardId)) {
      const index = gameState.deckCards.indexOf(cardId);
      if (index > -1) {
        gameState.deckCards.splice(index, 1);
      }
      gameState.boardCards.push(cardId);
    }
  }
  gameState.cardsState[cardId] = {
    ...cardState,
  };
  const maxZIndex = gameState.boardCards.reduce((acc, val) => {
    acc =
      acc === undefined || (gameState.cardsState[val]?.zIndex || DEFAULT_Z_INDEX) > acc
        ? gameState.cardsState[val]?.zIndex || DEFAULT_Z_INDEX
        : acc;
    return acc;
  }, DEFAULT_Z_INDEX);
  gameState.nextZIndex = maxZIndex + 1;
}

const slice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    saveCards(state, action: PayloadAction<CardEntity[]>) {
      state.cards = adapter.addMany(state.cards, action.payload);
    },
    setInitialGameState(
      state,
      action: PayloadAction<{
        state: GameState;
        gameId: string;
      }>,
    ) {
      state.gameState = action.payload.state;
    },
    saveGame(state, action: PayloadAction<GameEntity>) {
      state.game = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setReview(state, action: PayloadAction<boolean>) {
      state.gameState!.review = action.payload;
    },
    setCardState(state, action: PayloadAction<{ cardState: CardState; cardId: string }>) {
      const gameState = state.gameState!;
      const cardId = action.payload.cardId;
      const cardState = action.payload.cardState;
      return modifyCardState(cardState, gameState, cardId);
    },
    stopListenOnGame(state, action: PayloadAction) {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(extraActions.updateCardPosition, (state, { payload: { target, position, cardId } }) => {
      const gameState = state.gameState!;
      modifyCardState(
        {
          lockedBy: null,
          parent: target,
          position: position,
          estimation: '',
          zIndex: gameState.nextZIndex,
        },
        gameState,
        cardId,
      );
    });
    builder.addCase(extraActions.setEstimation, (state, action) => {
      const gameState = state.gameState!;
      gameState.cardsState[action.payload.cardId] = {
        ...(gameState.cardsState[action.payload.cardId] || {}),
        estimation: action.payload.estimation,
      };
    });
  },
});

const cardsEntitiesSelectors = adapter.getSelectors();

const getSlice = createSelector(
  (state: { [name]: State }) => state,
  state => state[name],
);

const getAllCards = createSelector(getSlice, state => cardsEntitiesSelectors.selectAll(state.cards));
const getAllCardsEntities = createSelector(getSlice, state => cardsEntitiesSelectors.selectEntities(state.cards));

const getGameState = createSelector(getSlice, state => state.gameState);
// TODO sort on write?
const getDeckCardsIds = createSelector(getGameState, getAllCardsEntities, (getGameState, cardsMap) => {
  const cardsIds = getGameState?.deckCards;
  if (!cardsIds) {
    return cardsIds;
  }
  const copy = [...(getGameState?.deckCards || [])];

  copy.sort((a, b) => cardsMap[a]!.number - cardsMap[b]!.number);
  return copy;
});
const getPlacedCards = createSelector(getGameState, getGameState => getGameState?.boardCards);
const getGame = createSelector(getSlice, slice => slice.game);

const getScenario = createSelector(getGame, slice => ({
  title: slice?.scenarioTitle,
  content: slice?.scenarioContent,
}));
const getGameId = createSelector(getGame, slice => slice?.id);

// TODO try to remove the listener
const getCardStateForUI = createSelector(getGameState, gameState => {
  if (!gameState) {
    return {};
  }

  const uiState = gameState.boardCards.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue]: {
        placedIn: 'board' as const,
        position: gameState.cardsState[currentValue]?.position,
      },
    };
  }, {} as GameUIState);

  return gameState.deckCards.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue]: {
        placedIn: 'panel' as const,
      },
    };
  }, uiState as GameUIState);
});

const getCardPosition = (cardId: string) =>
  createSelector(getGameState, gameState => gameState?.cardsState?.[cardId]?.position);

const getCardAdditionalInfo = (cardId: string) =>
  createSelector(getGameState, authSelectors.getCurrentUser, (gameState, user) => {
    const data = gameState?.cardsState?.[cardId] ?? ({} as CardState);
    return {
      ...data,
      heldBySomeoneElse: !!(data.lockedBy && data.lockedBy !== user?.id),
    };
  });

const getIsUserTheFacilitator = createSelector(
  getGame,
  authSelectors.getCurrentUser,
  (game, user) => game?.facilitator.id === user?.id,
);

const getCardById = (cardId: string) =>
  createSelector(getSlice, state => cardsEntitiesSelectors.selectById(state.cards, cardId));

const getSearchedText = createSelector(getSlice, slice => slice.searchText);

const getFilteredDeckCardsIds = createSelector(
  getSearchedText,
  getDeckCardsIds,
  getAllCardsEntities,
  (searchedText, deckCardsIds, cardsMap) => {
    if (!searchedText) {
      return null;
    }

    const loweCaseSearchedText = searchedText.toLowerCase();

    return deckCardsIds?.filter(id => {
      const cardData = cardsMap[id]!;
      return (
        cardData.content.toLowerCase().includes(loweCaseSearchedText) ||
        cardData.title.toLowerCase().includes(loweCaseSearchedText) ||
        cardData.subtitle?.toLowerCase()?.includes(loweCaseSearchedText) ||
        cardData.tags?.some(t => t.toLowerCase().includes(loweCaseSearchedText))
      );
    });
  },
);

const getReview = createSelector(getGameState, gameState => gameState?.review);

export const reducer = slice.reducer;

export const actions = {
  ...slice.actions,
  ...extraActions,
};

export const selectors = {
  getAllCards,
  getDeckCardsIds,
  getPlacedCards,
  getCardStateForUI,
  getCardPosition,
  getCardById,
  getScenario,
  getCardAdditionalInfo,
  getGame,
  getGameId,
  getFilteredDeckCardsIds,
  getSearchedText,
  getReview,
  getIsUserTheFacilitator,
};
