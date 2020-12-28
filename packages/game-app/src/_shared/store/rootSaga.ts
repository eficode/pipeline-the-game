import { Saga } from 'redux-saga';
import { all, call, spawn } from 'redux-saga/effects';
import { saga as authSaga } from '@pipeline/auth';
import signupSaga from '../../signup/sagas';

export default function* rootSaga() {
  const sagas: Saga[] = [authSaga, signupSaga];
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
