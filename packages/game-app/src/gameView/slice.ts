import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CardEntity } from '@pipeline/common';

export interface State {
  cards: EntityState<CardEntity>;
}

const adapter = createEntityAdapter<CardEntity>();

const initialState = {
  cards: adapter.getInitialState(),
} as State;

const slice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    saveCards(state, action: PayloadAction<CardEntity[]>) {
      state.cards = adapter.addMany(state.cards, action.payload);
    },
  },
});

const cardsEntitiesSelectors = adapter.getSelectors();

const getSlice = createSelector(
  (state: { [name]: State }) => state,
  state => state[name],
);

const getAllCards = createSelector(getSlice, slice => cardsEntitiesSelectors.selectAll(slice.cards));

export const reducer = slice.reducer;
export const name = slice.name;

export const actions = {
  ...slice.actions,
  loadCards: createAction(`${name}/loadCards`),
};

export const selectors = {
  getAllCards,
};
