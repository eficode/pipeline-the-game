import { call, put, select, takeEvery, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { actions } from '../slice';
import { actions as loadGameActions, selectors as gameSelectors } from '../../gameView/slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import {
  callUpdateOnlineStatus,
  startListenToOnlineStatus,
  stopListenToOnlineStatus,
  initializeRTDB as callInitializeRTDB,
} from '../apis/callUpdateOnlineStatus';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';

const statusChannel = channel();

function* executeUpdateOnlineStatus(action: ReturnType<typeof actions.updateOnlineStatus>) {
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const gameId: string = yield select(gameSelectors.getSelectedGameId);
  yield call(callUpdateOnlineStatus, user.id, gameId, action.payload);
  yield put(actions.updateOnlineStatusSuccess({ gameId, state: action.payload }));
}

export function* updateOnlineStatusSaga() {
  yield takeEvery(
    actions.updateOnlineStatus,
    addRequestStatusManagement(executeUpdateOnlineStatus, 'loadBalancer.status'),
  );
}

function* executeStartListenToOnlineStatus(action: ReturnType<typeof actions.startListenToOnlineStatus>) {
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const gameId: string = yield select(gameSelectors.getSelectedGameId);

  yield call(
    startListenToOnlineStatus,
    user.id,
    gameId,
    () => {
      statusChannel.put(actions.updateOnlineStatusSuccess({ state: 'online', gameId }));
    },
    () => {
      statusChannel.put(actions.updateOnlineStatusSuccess({ state: 'offline' }));
    },
  );
}

export function* startListenToOnlineStatusSaga() {
  yield takeEvery(actions.startListenToOnlineStatus, executeStartListenToOnlineStatus);
}

function* executeStopListenToOnlineStatus(action: ReturnType<typeof actions.stopListenToOnlineStatus>) {
  const gameId: string = yield select(gameSelectors.getSelectedGameId);
  yield call(stopListenToOnlineStatus, gameId);
}

export function* stopListenToOnlineStatusSaga() {
  yield takeEvery(actions.stopListenToOnlineStatus, executeStopListenToOnlineStatus);
}

export function* watchStatusChannel() {
  while (true) {
    const action = yield take(statusChannel);
    yield put(action);
  }
}

function* executeInitializeRTDB(action: ReturnType<typeof loadGameActions.saveGame>) {
  yield call(callInitializeRTDB, action.payload.rtdbInstance!, action.payload.id);
  yield put(actions.startListenToOnlineStatus());
}

export function* initializeRTDB() {
  yield takeEvery(loadGameActions.saveGame, executeInitializeRTDB);
}
