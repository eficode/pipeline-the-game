import { createSelector } from 'reselect';
import { State as RequestsState, name } from './slice';
import { RequestsKeys } from './requestsKeys';

type State = {} & { [name]: RequestsState };

const getRequestsStatusState = (state: State) => state[name];

export const selectRequestStatus = (key: keyof RequestsKeys) =>
  createSelector(
    getRequestsStatusState,
    requests => requests[key] || { loading: false, error: undefined, success: false },
  );
