import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
}

export interface State {
  isInitialized: boolean;
  loggedUser: AuthUser | null;
}

const initialState = {
  isInitialized: false,
  loggedUser: null,
} as State;

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<AuthUser | null>) {
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
  authState => authState.loggedUser,
);

const isInitialized = createSelector(
  (state: { [name]: State }) => state[name],
  authState => authState.isInitialized,
);

export const reducer = slice.reducer;
export const name = slice.name;

export const actions = {
  ...slice.actions,
  resendEmailVerification: createAction(`${name}/resendEmailVerification`),
  verifyEmail: createAction<{ code: string }>(`${name}/verifyEmail`),
  login: createAction<{ email: string; password: string }>(`${name}/login`),
  logout: createAction(`${name}/logout`),
};
export const selectors = {
  getCurrentUser,
  isInitialized,
};
