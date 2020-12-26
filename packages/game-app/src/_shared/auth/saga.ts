import { call, put, takeEvery } from 'redux-saga/effects';
import { actions, User } from './slice';
import firebase from 'firebase/app';
import 'firebase/auth';

function getCurrentUser(): Promise<User | null> {
  return new Promise<User | null>(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve({
          id: user.uid,
          email: user.email!,
        });
      } else {
        resolve(null);
      }
    });
  });
}

function* initializeAuthSaga() {
  const user: User | null = yield call(getCurrentUser);
  yield put(actions.setLoggedUser(user));
}

export default function* authSaga() {
  yield takeEvery(actions.initialize, initializeAuthSaga);
}
