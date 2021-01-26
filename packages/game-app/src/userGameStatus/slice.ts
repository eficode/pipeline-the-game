import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import firebase from 'firebase/app';
import { Status } from '@pipeline/models';

export interface State {
  status: Status | null;
}

const initialState = {
  status: null,
} as State;

const slice = createSlice({
  name: 'userGameStatus',
  initialState: initialState,
  reducers: {
    updateOnlineStatusSuccess(state, action: PayloadAction<{ state: Status['state']; gameId?: string }>) {
      if (action.payload.state === 'offline') {
        return {
          ...state,
          status: {
            state: 'offline',
            updatedAt: firebase.firestore.Timestamp.now(),
            gameIds: null,
          },
        };
      } else {
        return {
          ...state,
          status: {
            state: action.payload.state!,
            updatedAt: firebase.firestore.Timestamp.now(),
            gameIds:
              state.status?.gameIds == null
                ? { [action.payload.gameId!]: true }
                : { ...state.status?.gameIds, [action.payload.gameId!]: true },
          },
        };
      }
    },
  },
});

const getSlice = createSelector(
  (state: { [name]: State }) => state,
  state => state[name],
);

const getStatus = createSelector(getSlice, state => state.status);

export const reducer = slice.reducer;
export const name = slice.name;

export const actions = {
  ...slice.actions,
  updateOnlineStatus: createAction<'online' | 'offline'>(`${name}/updateOnlineStatus`),
  startListenToOnlineStatus: createAction(`${name}/startListenToOnlineStatus`),
  stopListenToOnlineStatus: createAction(`${name}/stopListenToOnlineStatus`),
};

export const selectors = {
  getStatus,
};
