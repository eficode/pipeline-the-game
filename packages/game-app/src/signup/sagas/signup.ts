import * as actions from '../actions';
import { executeSignup } from '../apis/executeSignup';
import { call, takeLeading } from 'redux-saga/effects';
import { addRequestStatusManagement } from '@pipeline/requests-status';

function* signupSaga(action: ReturnType<typeof actions.signup>) {
  try {
    yield call(executeSignup, action.payload);
  } catch (e) {
    throw e;
  }
}

export default function* runSignup() {
  yield takeLeading(actions.signup, addRequestStatusManagement(signupSaga, 'signup'));
}
