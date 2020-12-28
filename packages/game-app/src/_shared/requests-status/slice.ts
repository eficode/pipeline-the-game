import { RequestsKeys } from './requestsKeys';
import { RequestStatus } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  [key in keyof RequestsKeys]?: RequestStatus;
};

const requestManagementSlice = createSlice({
  name: 'requestsStatus',
  initialState: {} as State,
  reducers: {
    resetStatus(state, action: PayloadAction<keyof RequestsKeys>) {
      state[action.payload] = {
        loading: false,
        success: false,
        error: undefined,
      };
    },
    startRequest(state, action: PayloadAction<keyof RequestsKeys>) {
      state[action.payload] = {
        loading: true,
        success: false,
        error: undefined,
      };
    },
    requestError(state, action: PayloadAction<{ key: keyof RequestsKeys; error: { message: string; code: string } }>) {
      state[action.payload.key] = {
        loading: false,
        success: false,
        error: action.payload.error,
      };
    },
    requestSuccess(state, action: PayloadAction<keyof RequestsKeys>) {
      state[action.payload] = {
        loading: false,
        success: true,
        error: undefined,
      };
    },
  },
});

export default requestManagementSlice.reducer;

export const actions = requestManagementSlice.actions;

export const name = requestManagementSlice.name;
