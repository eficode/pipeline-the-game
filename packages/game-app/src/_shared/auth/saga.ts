import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, AuthUser, selectors } from './slice';
import firebase from 'firebase/app';
import 'firebase/auth';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { RoutingPath } from '@pipeline/routing';
import CONFIG from '@pipeline/app-config';
import { actions as analyticsActions } from '@pipeline/analytics';

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
  if (user && (CONFIG.REACT_APP_ENV === 'dev' || CONFIG.REACT_APP_ENV === 'test')) {
    yield call(() => firebase.auth().currentUser?.getIdToken(true));
  }
  if (user) {
    const crmInfo = { email: user?.email, id: user?.id };
    yield put(analyticsActions.identify(crmInfo));
  }
  yield put(actions.setLoggedUser(user));
}

function* resendVerificationEmail() {
  yield call(() => firebase.auth().currentUser?.sendEmailVerification());
}

function* sendResetPasswordEmail(action: ReturnType<typeof actions.sendResetPasswordEmail>) {
  yield call(() =>
    firebase.auth().sendPasswordResetEmail(action.payload, {
      url: `${window.location.origin}${RoutingPath.ResetPassword}`,
    }),
  );
}

function* executeResetPassword(action: ReturnType<typeof actions.resetPassword>) {
  yield call(() => firebase.auth().confirmPasswordReset(action.payload.code, action.payload.password));
}

function* executeVerifyPasswordResetCode(action: ReturnType<typeof actions.verifyPasswordResetCode>) {
  yield call(() => firebase.auth().verifyPasswordResetCode(action.payload));
}

function* executeEmailVerification(action: ReturnType<typeof actions.verifyEmail>) {
  yield call(() => firebase.auth().applyActionCode(action.payload.code));
  const currentUser: AuthUser = yield select(selectors.getCurrentUser);
  const firebaseUser = firebase.auth().currentUser;
  // need to refresh user to get token with email verified set to true
  if (currentUser && firebaseUser) {
    yield call(() => firebaseUser.reload());
    yield call(() => firebaseUser.getIdToken(true));
    const newUser = firebase.auth().currentUser!;
    yield put(
      actions.setLoggedUser({
        emailVerified: true,
        email: newUser.email!,
        id: newUser.uid,
      }),
    );
  }
}

function* executeLogin({ payload: { email, password } }: ReturnType<typeof actions.login>) {
  const { user }: firebase.auth.UserCredential = yield call(() =>
    firebase.auth().signInWithEmailAndPassword(email, password),
  );
  if (user) {
    const crmInfo = { email: user?.email!, id: user?.uid };
    yield put(analyticsActions.identify(crmInfo));
    yield put(
      actions.setLoggedUser({
        emailVerified: user.emailVerified,
        id: user.uid,
        email: user.email!,
      }),
    );
  }
}

function* executeLogout() {
  yield call(() => firebase.auth().signOut());
  yield put(actions.setLoggedUser(null));
}

export default function* authSaga() {
  yield takeEvery(actions.initialize, initializeAuthSaga);
  yield takeEvery(
    actions.resendEmailVerification,
    addRequestStatusManagement(resendVerificationEmail, 'auth.resendVerificationEmail'),
  );
  yield takeEvery(actions.verifyEmail, addRequestStatusManagement(executeEmailVerification, 'auth.emailVerification'));
  yield takeEvery(actions.login, addRequestStatusManagement(executeLogin, 'auth.login'));
  yield takeEvery(actions.logout, addRequestStatusManagement(executeLogout, 'auth.logout'));
  yield takeEvery(
    actions.sendResetPasswordEmail,
    addRequestStatusManagement(sendResetPasswordEmail, 'auth.sendResetPasswordEmail'),
  );
  yield takeEvery(actions.resetPassword, addRequestStatusManagement(executeResetPassword, 'auth.resetPassword'));
  yield takeEvery(
    actions.verifyPasswordResetCode,
    addRequestStatusManagement(executeVerifyPasswordResetCode, 'auth.verifyPasswordResetCode'),
  );
}
