import { call, put, select, takeEvery, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { actions } from '../slice';
import { actions as loadGameActions, selectors as gameSelectors } from '../../gameView/slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import {
  callUpdateOnlineStatus,
  startListenToOnlineStatus,
  stopListenToOnlineStatus,
} from '../apis/callUpdateOnlineStatus';
import firebase from 'firebase';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';
import CONFIG from '@pipeline/app-config';

const statusChannel = channel();

function* executeUpdateOnlineStatus(action: ReturnType<typeof actions.updateOnlineStatus>) {
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const gameId: string = yield select(gameSelectors.getSelectedGameId);
  const rtdb: firebase.database.Database = firebase.app(gameId).database();
  yield call(callUpdateOnlineStatus, rtdb, user.id, gameId, action.payload);
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
  const rtdb: firebase.database.Database = firebase.app(gameId).database();

  yield call(
    startListenToOnlineStatus,
    rtdb,
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
  const rtdb: firebase.database.Database = firebase.app(gameId).database();
  yield call(stopListenToOnlineStatus, rtdb);
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
  const app = firebase.initializeApp(
    {
      databaseURL: `https://${action.payload.rtdbInstance!}.firebasedatabase.app`,
    },
    action.payload.id,
  );
  CONFIG.REACT_APP_FIREBASE_USE_EMULATORS === 'true' && app.database().useEmulator('localhost', 9000);

  yield put(actions.startListenToOnlineStatus());
}

export function* initializeRTDB() {
  yield takeEvery(loadGameActions.saveGame, executeInitializeRTDB);
}
