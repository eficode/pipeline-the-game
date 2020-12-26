import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
}

export interface State {
  isInitialized: boolean;
  loggedUser: User | null;
}

const initialState = {
  isInitialized: false,
  loggedUser: null,
} as State;

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<User | null>) {
      state.isInitialized = true;
      state.loggedUser = action.payload;
    },
    initialize(state, action: PayloadAction<undefined>) {
      state.isInitialized = false;
      state.loggedUser = null;
    },
  },
});

const getCurrentUser = createSelector(
  (state: { [name]: State }) => state[name],
  (authState) => authState.loggedUser
);

const isInitialized = createSelector(
  (state: { [name]: State }) => state[name],
  (authState) => authState.isInitialized
);

export const reducer = slice.reducer;
export const actions = slice.actions;
export const name = slice.name;
export const selectors = {
  getCurrentUser,
  isInitialized,
};
