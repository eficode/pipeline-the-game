import { call, put, select, takeEvery, delay, take, race } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { actions, selectors as loadBalancerSelectors } from '../slice';
import { actions as loadGameActions, selectors as gameSelectors } from '../../gameView/slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import {
  callUpdateOnlineStatus,
  startListenToOnlineStatus,
  stopListenToOnlineStatus,
} from '../apis/callUpdateOnlineStatus';
import firebase from 'firebase';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';
import Database = firebase.database.Database;

const statusChannel = channel();

function* executeUpdateOnlineStatus(action: ReturnType<typeof actions.updateOnlineStatus>) {
  const rtdb: Database = yield select(loadBalancerSelectors.getRTDB);
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const gameId: string = yield select(gameSelectors.getSelectedGameId);
  yield call(callUpdateOnlineStatus, rtdb, user.id, gameId, action.payload);
  yield put(actions.updateOnlineStatusSuccess(action.payload));
}

export function* updateOnlineStatusSaga() {
  yield takeEvery(
    actions.updateOnlineStatus,
    addRequestStatusManagement(executeUpdateOnlineStatus, 'loadBalancer.status'),
  );
}

function* executeStartListenToOnlineStatus(action: ReturnType<typeof actions.startListenToOnlineStatus>) {
  const rtdb: Database = yield select(loadBalancerSelectors.getRTDB);
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const gameId: string = yield select(gameSelectors.getSelectedGameId);
  yield call(
    startListenToOnlineStatus,
    rtdb,
    user.id,
    gameId,
    () => {
      statusChannel.put(actions.updateOnlineStatusSuccess('online'));
    },
    () => {
      statusChannel.put(actions.updateOnlineStatusSuccess('offline'));
    },
  );
}

export function* startListenToOnlineStatusSaga() {
  yield takeEvery(actions.startListenToOnlineStatus, executeStartListenToOnlineStatus);
}

function* executeStopListenToOnlineStatus(action: ReturnType<typeof actions.stopListenToOnlineStatus>) {
  const rtdb: Database = yield select(loadBalancerSelectors.getRTDB);
  yield call(stopListenToOnlineStatus, rtdb);
}

export function* stopListenToOnlineStatusSaga() {
  yield takeEvery(actions.stopListenToOnlineStatus, executeStopListenToOnlineStatus);
}

function* pollUpdateStatusSagaWorker() {
  while (true) {
    const rtdb: Database = yield select(loadBalancerSelectors.getRTDB);
    const user: AuthUser = yield select(authSelectors.getCurrentUser);
    const gameId: string = yield select(gameSelectors.getSelectedGameId);
    yield call(callUpdateOnlineStatus, rtdb, user.id, gameId, 'online');
    yield put(actions.updateOnlineStatusSuccess('online'));
    yield call(delay, 5000);
  }
}

export function* pollUpdateStatusSagaWatcher() {
  while (true) {
    yield take(actions.startPollingOnlineStatus);
    yield race([call(pollUpdateStatusSagaWorker), take(actions.stopPollingOnlineStatus)]);
  }
}

export function* watchStatusChannel() {
  while (true) {
    const action = yield take(statusChannel);
    yield put(action);
  }
}

function* executeInitializeRTDB(action: ReturnType<typeof loadGameActions.saveGame>) {
  const app = firebase.initializeApp({
    databaseURL: `https://${action.payload.rtdbInstance}.firebaseio.com`,
  });
  const rtdb = app.database();
  yield put(actions.updateRTDB(rtdb));
}

export function* initializeRTDB() {
  yield takeEvery(loadGameActions.saveGame, executeInitializeRTDB);
}
