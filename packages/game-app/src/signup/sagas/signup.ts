import * as actions from '../actions';
import { executeSignup } from '../apis/executeSignup';
import { call, takeEvery, takeLeading } from 'redux-saga/effects';
import { User } from '../../_shared/auth/slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';

function* signupSaga(action: ReturnType<typeof actions.signup>) {
  try {
    const user: User = yield call(executeSignup, action.payload);
  } catch (e) {
    throw e;
  }
}

export default function* runSignup() {
  yield takeLeading(actions.signup, addRequestStatusManagement(signupSaga, 'signup'));
}
