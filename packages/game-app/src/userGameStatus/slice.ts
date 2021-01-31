import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore/lite';
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
    updateOnlineStatusSuccess(state, action: PayloadAction<'online' | 'offline'>) {
      if (action.payload === 'offline') {
        return {
          ...state,
          status: {
            state: 'offline',
            updatedAt: Timestamp.now(),
          },
        };
      } else {
        return {
          ...state,
          status: {
            state: action.payload!,
            updatedAt: Timestamp.now(),
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
