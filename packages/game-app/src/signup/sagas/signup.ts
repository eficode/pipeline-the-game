import * as actions from '../actions';
import { executeSignup } from '../apis/executeSignup';
import { call, put, takeLeading } from 'redux-saga/effects';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { actions as authActions, AuthUser } from '@pipeline/auth';

function* signupSaga(action: ReturnType<typeof actions.signup>) {
  const user: AuthUser = yield call(executeSignup, action.payload);
  yield put(authActions.setLoggedUser(user));
}

export default function* runSignup() {
  yield takeLeading(actions.signup, addRequestStatusManagement(signupSaga, 'signup'));
}
