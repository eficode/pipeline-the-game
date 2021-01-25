import {
  initializeRTDB,
  startListenToOnlineStatusSaga,
  stopListenToOnlineStatusSaga,
  updateOnlineStatusSaga,
  watchStatusChannel,
  startListen,
} from './loadBalancer';
import { all } from 'redux-saga/effects';

export default function* loadBalancerSaga() {
  yield all([
    initializeRTDB(),
    updateOnlineStatusSaga(),
    startListenToOnlineStatusSaga(),
    stopListenToOnlineStatusSaga(),
    watchStatusChannel(),
    startListen(),
  ]);
}
