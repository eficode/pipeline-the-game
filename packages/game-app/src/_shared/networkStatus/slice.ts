import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  online: boolean;
  isInitialized: boolean;
}

const initialState: State = {
  online: false,
  isInitialized: false,
};

const slice = createSlice({
  name: 'networkStatus',
  initialState: initialState,
  reducers: {
    setStatus(state, action: PayloadAction<boolean>) {
      state.online = action.payload;
      state.isInitialized = true;
    },
  },
});

export const getIsOnline = createSelector(
  (state: { [name]: State }) => state[name],
  i18nState => i18nState.online,
);

export const getIsInitialized = createSelector(
  (state: { [name]: State }) => state[name],
  i18nState => i18nState.isInitialized,
);

export const reducer = slice.reducer;
export const name = slice.name;
export const actions = {
  ...slice.actions,
  listenToNetwork: createAction(`${name}/listenToNetwork`),
};
export const selectors = {
  getIsOnline,
  getIsInitialized,
};
