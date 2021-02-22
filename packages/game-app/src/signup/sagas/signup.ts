import * as actions from '../actions';
import { executeSignup } from '../apis/executeSignup';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { actions as authActions, AuthUser } from '@pipeline/auth';
import { actions as analyticsActions } from '@pipeline/analytics';
import { selectors as dynamicSelectors } from '@pipeline/dynamicData';

function* signupSaga(action: ReturnType<typeof actions.signup>) {
  const user: AuthUser = yield call(executeSignup, action.payload);
  yield put(authActions.setLoggedUser(user));
  const maturities = yield select(dynamicSelectors.getDevOpsMaturitiesMap);
  const roles = yield select(dynamicSelectors.getGameRolesMap);
  const crmInfo = {
    email: action.payload.email,
    firstName: action.payload.firstName,
    lastName: action.payload.lastName,
    how_mature_are_your_devops_practices_: maturities[action.payload.devOpsMaturity],
    what_is_your_role_in_the_company_: roles[action.payload.role],
    id: user.id,
  };
  yield put(analyticsActions.identify(crmInfo));
}

export default function* runSignup() {
  yield takeLeading(actions.signup, addRequestStatusManagement(signupSaga, 'signup'));
}
