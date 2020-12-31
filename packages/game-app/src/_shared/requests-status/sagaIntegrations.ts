import { RequestsKeys } from './requestsKeys';
import { call, put } from 'redux-saga/effects';
import { actions } from './index';
import { SagaIterator } from 'redux-saga';

/**
 *
 * Just wrap your saga using this function when registering like this
 *
 * @example
 * ```typescript
 *
 * function* mySaga(){
 *   ...
 * }
 *
 * yield takeLeading(actions.myAction, addRequestStatusManagement(mySaga, 'requestKey'));
 *
 * ```
 *
 * Before executing your saga the status is set to loading.
 * If the saga throws an error it is saved into the state under the give key
 * otherwise the request is considered successfully executed.
 *
 * This means that if you catch any error that must be handled with some custom
 * code then you have to rethrow it in the standard form of {code:string;message:string;}
 *
 * @example
 * ```typescript
 * try{
 *
 * } catch(e){
 *    // some custom code to handle the error or parse it
 *    throw {code, message};
 * }
 * ```
 *
 * @param gen classical saga generator function
 * @param requestKey the key to save request status
 */
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
