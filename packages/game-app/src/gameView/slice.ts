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

export interface GameState {
  boardCards: string[];
  deckCards: string[];
  cardsState: {
    [cardId: string]: {
      held: boolean;
      position: {
        x: number;
        y: number;
      };
    };
  };
}

export interface State {
  cards: EntityState<CardEntity>;
  selectedGameId: string | null;
  gameState: GameState | null;
}

const adapter = createEntityAdapter<CardEntity>();

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
    setInitialGameState(state, action: PayloadAction<{ state: GameState; gameId: string }>) {
      state.gameState = action.payload.state;
      state.selectedGameId = action.payload.gameId;
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
          position: position!,
          held: false,
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

const getSelectedGameId = createSelector(getSlice, state => state.selectedGameId);
const getGameState = createSelector(getSlice, state => state.gameState);
const getDeckCardsIds = createSelector(getGameState, getGameState => getGameState?.deckCards);
const getPlacedCards = createSelector(getGameState, getGameState => getGameState?.boardCards);

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
};
