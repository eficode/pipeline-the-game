import { RequestsKeys } from './requestsKeys';
import { call, put } from 'redux-saga/effects';
import { actions as loadingActions } from './index';
import { SagaIterator } from 'redux-saga';

export function addRequestStatusManagement<T = any, Fn extends (...args: any[]) => SagaIterator<T> = () => any>(
  gen: Fn,
  requestKey: keyof RequestsKeys,
) {
  return function* composed(...args: Parameters<Fn>) {
    try {
      yield put(loadingActions.startRequest(requestKey));
      yield call(gen, ...args);
      yield put(loadingActions.requestSuccess(requestKey));
    } catch (e) {
      yield put(loadingActions.requestError({ key: requestKey, error: e }));
    }
  };
}
