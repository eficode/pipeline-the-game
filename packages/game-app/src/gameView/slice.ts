import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CardEntity } from '@pipeline/common';
import { GameUIState } from './types/gameUIState';

export interface AdditionalCardData {
  /**
   * if it is beeing moving
   */
  held: boolean;
  /**
   * absolute position inside the board
   */
  position: {
    x: number;
    y: number;
  };
  /**
   * time estimation placed inside the card
   */
  estimation?: string;
  /**
   * Card z-index to put it in front of all the others when drag finish
   */
  zIndex: number;
}

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
   * cards infomration
   */
  cardsState: {
    [cardId: string]: AdditionalCardData;
  };
  /**
   * max z-index, the z-index of the last placed cards inside the board
   */
  maxZIndex: number;
}

export interface State {
  cards: EntityState<CardEntity>;
  selectedGameId: string | null;
  gameState: GameState | null;
  scenario: {
    title: string;
    content: string;
  };
}

const adapter = createEntityAdapter<CardEntity>({
  sortComparer: (a, b) => a.number - b.number,
});

const initialState = {
  cards: adapter.getInitialState(),
  selectedGameId: null,
  gameState: null,
} as State;

const slice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    saveCards(state, action: PayloadAction<CardEntity[]>) {
      state.cards = adapter.addMany(state.cards, action.payload);
    },
    setSelectedGameId(state, action: PayloadAction<string>) {
      state.selectedGameId = action.payload;
    },
    setEstimation(state, action: PayloadAction<{ cardId: string; estimation: string }>) {
      const gameState = state.gameState!;
      gameState.cardsState[action.payload.cardId] = {
        ...(gameState.cardsState[action.payload.cardId] || {}),
        estimation: action.payload.estimation,
      };
    },
    setInitialGameState(
      state,
      action: PayloadAction<{
        state: GameState;
        gameId: string;
        scenario: {
          title: string;
          content: string;
        };
      }>,
    ) {
      state.gameState = action.payload.state;
      state.selectedGameId = action.payload.gameId;
      state.scenario = action.payload.scenario;
    },
    updateCardPosition(
      state,
      {
        payload: { position, target, cardId },
      }: PayloadAction<{ cardId: string; position?: { x: number; y: number }; target: 'panel' | 'board' }>,
    ) {
      const gameState = state.gameState!;
      if (target === 'panel' && !gameState.deckCards.includes(cardId)) {
        gameState.deckCards.push(cardId);
        delete gameState.cardsState[cardId];
        const index = gameState.boardCards.indexOf(cardId);
        if (index > -1) {
          gameState.boardCards.splice(index, 1);
        }
      } else if (target === 'board') {
        if (gameState.deckCards.includes(cardId)) {
          const index = gameState.deckCards.indexOf(cardId);
          if (index > -1) {
            gameState.deckCards.splice(index, 1);
          }
          gameState.boardCards.push(cardId);
        }
        gameState.cardsState[cardId] = {
          ...(gameState.cardsState[cardId] || {}),
          position: position!,
          held: false,
          zIndex: gameState.maxZIndex++,
        };
      }
    },
  },
});

const cardsEntitiesSelectors = adapter.getSelectors();

const getSlice = createSelector(
  (state: { [name]: State }) => state,
  state => state[name],
);

const getAllCards = createSelector(getSlice, state => cardsEntitiesSelectors.selectAll(state.cards));
const getAllCardsEntities = createSelector(getSlice, state => cardsEntitiesSelectors.selectEntities(state.cards));

const getSelectedGameId = createSelector(getSlice, state => state.selectedGameId);
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
const getScenario = createSelector(getSlice, slice => slice.scenario);

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
  createSelector(getGameState, gameState => gameState?.cardsState?.[cardId] ?? ({} as AdditionalCardData));

const getCardById = (cardId: string) =>
  createSelector(getSlice, state => cardsEntitiesSelectors.selectById(state.cards, cardId));

export const reducer = slice.reducer;
export const name = slice.name;

export const actions = {
  ...slice.actions,
  loadCards: createAction(`${name}/loadCards`),
  loadGame: createAction<string>(`${name}/loadGame`),
};

export const selectors = {
  getAllCards,
  getSelectedGameId,
  getDeckCardsIds,
  getPlacedCards,
  getCardStateForUI,
  getCardPosition,
  getCardById,
  getScenario,
  getCardAdditionalInfo,
};
