import {
  initializeRTDB,
  pollUpdateStatusSagaWatcher,
  startListenToOnlineStatusSaga,
  stopListenToOnlineStatusSaga,
  updateOnlineStatusSaga,
  watchStatusChannel,
  startPolling,
} from './loadBalancer';
import { all } from 'redux-saga/effects';

export default function* loadBalancerSaga() {
  yield all([
    initializeRTDB(),
    updateOnlineStatusSaga(),
    startListenToOnlineStatusSaga(),
    stopListenToOnlineStatusSaga(),
    pollUpdateStatusSagaWatcher(),
    watchStatusChannel(),
    startPolling(),
  ]);
}
