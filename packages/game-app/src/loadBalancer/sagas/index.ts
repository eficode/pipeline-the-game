import {
  initializeRTDB,
  pollUpdateStatusSagaWatcher,
  startListenToOnlineStatusSaga,
  stopListenToOnlineStatusSaga,
  updateOnlineStatusSaga,
  watchStatusChannel,
} from './updateOnlineStatus';
import { all } from 'redux-saga/effects';

export default function* loadBalancerSaga() {
  yield all([
    initializeRTDB(),
    updateOnlineStatusSaga(),
    startListenToOnlineStatusSaga(),
    stopListenToOnlineStatusSaga(),
    pollUpdateStatusSagaWatcher(),
    watchStatusChannel(),
  ]);
}
