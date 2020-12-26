import { Saga } from 'redux-saga';
import { all, call, spawn } from 'redux-saga/effects';
import { saga as authSaga } from '@pipeline/auth';

export default function* rootSaga() {
  const sagas: Saga[] = [authSaga];
  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}
