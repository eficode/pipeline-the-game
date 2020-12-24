import {Saga} from 'redux-saga';
import {all, call, put, spawn, takeEvery} from 'redux-saga/effects'

function* testSaga() {
  yield put({type: 'pong'});
}

function * testSagaRunner(){
  yield takeEvery('ping', testSaga);
}

export default function* rootSaga() {
  const sagas: Saga[] = [
    testSagaRunner
  ];

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
