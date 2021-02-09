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
    setToken(state, action: PayloadAction<string | undefined>) {
      if (state.loggedUser) {
        return {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            token: action.payload,
          },
        };
      } else {
        return {
          ...state,
        };
      }
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
  resetPassword: createAction<{ code: string; password: string }>(`${name}/resetPassword`),
  sendResetPasswordEmail: createAction<string>(`${name}/sendResetPasswordEmail`),
  verifyActionCode: createAction<string>(`${name}/verifyActionCode`),
  logout: createAction(`${name}/logout`),
  getToken: createAction(`${name}/getToken`),
};
export const selectors = {
  getCurrentUser,
  isInitialized,
};
