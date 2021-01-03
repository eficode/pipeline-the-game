import { call, put, takeEvery } from 'redux-saga/effects';
import { actions, AuthUser } from './slice';
import firebase from 'firebase/app';
import 'firebase/auth';
import { addRequestStatusManagement } from '@pipeline/requests-status';

function getCurrentUser(): Promise<AuthUser | null> {
  return new Promise<AuthUser | null>(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve({
          id: user.uid,
          email: user.email!,
          emailVerified: user.emailVerified,
        });
      } else {
        resolve(null);
      }
    });
  });
}

function* initializeAuthSaga() {
  const user: AuthUser | null = yield call(getCurrentUser);
  yield put(actions.setLoggedUser(user));
}

function* resendVerificationEmail() {
  yield call(() => firebase.auth().currentUser?.sendEmailVerification());
}

export default function* authSaga() {
  yield takeEvery(actions.initialize, initializeAuthSaga);
  yield takeEvery(
    actions.resendEmailVerification,
    addRequestStatusManagement(resendVerificationEmail, 'auth.resendVerificationEmail'),
  );
}
