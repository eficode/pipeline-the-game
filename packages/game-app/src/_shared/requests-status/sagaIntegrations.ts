import { RequestsKeys } from './requestsKeys';
import { call, put } from 'redux-saga/effects';
import { actions } from './index';
import { SagaIterator } from 'redux-saga';

export function addRequestStatusManagement<T = any, Fn extends (...args: any[]) => SagaIterator<T> = () => any>(
  gen: Fn,
  requestKey: keyof RequestsKeys,
) {
  return function* composed(...args: Parameters<Fn>) {
    try {
      yield put(actions.startRequest(requestKey));
      yield call(gen, ...args);
      yield put(actions.requestSuccess(requestKey));
    } catch (e) {
      yield put(actions.requestError({ key: requestKey, error: e }));
    }
  };
}
