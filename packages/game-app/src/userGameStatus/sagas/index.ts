import {
  initializeRTDB,
  startListenToOnlineStatusSaga,
  stopListenToOnlineStatusSaga,
  watchStatusChannel,
} from './userGameStatus';
import { all } from 'redux-saga/effects';

export default function* loadBalancerSaga() {
  yield all([initializeRTDB(), startListenToOnlineStatusSaga(), stopListenToOnlineStatusSaga(), watchStatusChannel()]);
}
