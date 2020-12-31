import { RequestsKeys } from './requestsKeys';
import { RequestStatus } from './types';
import { AnyAction, createSlice } from '@reduxjs/toolkit';

export type State = {
  [key in keyof RequestsKeys]?: RequestStatus;
};

export const actions = {
  resetStatus: (key: keyof RequestsKeys) => ({ type: `requestsStatus/resetStatus/${key}`, payload: key }),
  startRequest: (key: keyof RequestsKeys) => ({ type: `requestsStatus/startRequest/${key}`, payload: key }),
  requestError: (data: { key: keyof RequestsKeys; error: { message: string; code: string } }) => ({
    type: `requestsStatus/requestError/${data.key}`,
    payload: data,
  }),
  requestSuccess: (key: keyof RequestsKeys) => ({ type: `requestsStatus/requestSuccess/${key}`, payload: key }),
};

function isResetStatusAction(action: AnyAction): action is ReturnType<typeof actions.resetStatus> {
  return (action.type as string).startsWith('requestsStatus/resetStatus/');
}

function isStartRequestAction(action: AnyAction): action is ReturnType<typeof actions.startRequest> {
  return (action.type as string).startsWith('requestsStatus/startRequest/');
}

function isRequestErrorAction(action: AnyAction): action is ReturnType<typeof actions.requestError> {
  return (action.type as string).startsWith('requestsStatus/requestError/');
}

function isRequestSuccessAction(action: AnyAction): action is ReturnType<typeof actions.requestSuccess> {
  return (action.type as string).startsWith('requestsStatus/requestSuccess/');
}

const requestManagementSlice = createSlice({
  name: 'requestsStatus',
  initialState: {} as State,
  extraReducers: builder => {
    builder
      .addMatcher(isResetStatusAction, (state, action) => {
        state[action.payload] = {
          loading: false,
          success: false,
          error: undefined,
        };
      })
      .addMatcher(isStartRequestAction, (state, action) => {
        state[action.payload] = {
          loading: true,
          success: false,
          error: undefined,
        };
      })
      .addMatcher(isRequestErrorAction, (state, action) => {
        state[action.payload.key] = {
          loading: false,
          success: false,
          error: action.payload.error,
        };
      })
      .addMatcher(isRequestSuccessAction, (state, action) => {
        state[action.payload] = {
          loading: false,
          success: true,
          error: undefined,
        };
      });
  },
  reducers: {},
});

export default requestManagementSlice.reducer;

export const name = requestManagementSlice.name;
