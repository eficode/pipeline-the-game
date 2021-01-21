import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import firebase from 'firebase/app';
import { Status } from '@pipeline/common';
import Timestamp = firebase.firestore.Timestamp;
import Database = firebase.database.Database;

export interface State {
  status: Status | null;
  rtdb: Database;
}

const initialState = {
  status: null,
} as State;

const slice = createSlice({
  name: 'loadBalancer',
  initialState: initialState,
  reducers: {
    updateOnlineStatusSuccess(state, action: PayloadAction<'online' | 'offline'>) {
      return {
        ...state,
        status: {
          state: action.payload,
          updatedAt: Timestamp.now(),
        },
      };
    },
    updateRTDB(state, action: PayloadAction<Database>) {
      return {
        ...state,
        rtdb: action.payload,
      };
    },
  },
});

const getSlice = createSelector(
  (state: { [name]: State }) => state,
  state => state[name],
);

const getRTDB = createSelector(getSlice, state => state.rtdb);

export const reducer = slice.reducer;
export const name = slice.name;

export const actions = {
  ...slice.actions,
  updateOnlineStatus: createAction<'online' | 'offline'>(`${name}/startListenToOnlineStatus`),
  startListenToOnlineStatus: createAction(`${name}/startListenToOnlineStatus`),
  stopListenToOnlineStatus: createAction(`${name}/stopListenToOnlineStatus`),
  startPollingOnlineStatus: createAction(`${name}/startPollingToOnlineStatus`),
  stopPollingOnlineStatus: createAction(`${name}/stopPollingToOnlineStatus`),
};

export const selectors = {
  getRTDBInstanceName,
  getRTDBInstanceURL,
  getRTDB,
};
