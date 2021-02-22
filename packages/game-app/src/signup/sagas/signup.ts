import * as actions from '../actions';
import { executeSignup } from '../apis/executeSignup';
import { call, put, takeLeading } from 'redux-saga/effects';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { actions as authActions, AuthUser } from '@pipeline/auth';
import { actions as analyticsActions } from '@pipeline/analytics';

function* signupSaga(action: ReturnType<typeof actions.signup>) {
  const user: AuthUser = yield call(executeSignup, action.payload);
  yield put(authActions.setLoggedUser(user));
  const crmInfo = {
    email: action.payload.email,
    firstName: action.payload.firstName,
    lastName: action.payload.lastName,
    devOpsMaturity: action.payload.devOpsMaturity,
    role: action.payload.role,
    id: user.id,
  };
  yield put(analyticsActions.identify(crmInfo));
}

export default function* runSignup() {
  yield takeLeading(actions.signup, addRequestStatusManagement(signupSaga, 'signup'));
}
