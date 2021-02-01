import { call, put, select, takeEvery, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { actions } from '../slice';
import { actions as loadGameActions, selectors as gameSelectors } from '../../gameView/slice';
import { startListenToOnlineStatus, stopListenToOnlineStatus } from '../apis/callUpdateConnections';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';
import { GameEntity } from '@pipeline/models';

const statusChannel = channel();

function* executeStartListenToOnlineStatus(action: ReturnType<typeof actions.startListenToOnlineStatus>) {
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const game: GameEntity = yield select(gameSelectors.getGame);

  yield call(
    startListenToOnlineStatus,
    user.id,
    game.id,
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
  const game: GameEntity = yield select(gameSelectors.getGame);
  yield call(stopListenToOnlineStatus, game.id);
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
  if (action.payload.rtdbInstance) {
    yield put(actions.startListenToOnlineStatus());
  }
}

export function* initializeRTDB() {
  yield takeEvery(loadGameActions.saveGame, executeInitializeRTDB);
}
