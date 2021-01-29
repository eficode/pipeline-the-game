import { call, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import saveCardLock from '../apis/saveCardLock';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';

function* executeSaveCardLock(action: ReturnType<typeof actions.lockCard>) {
  const currentGameId = yield select(selectors.getGameId);
  const { id: userId }: AuthUser = yield select(authSelectors.getCurrentUser);
  yield call(saveCardLock, userId, currentGameId, action.payload);
}

export default function* saveCardLockSaga() {
  yield takeEvery(actions.lockCard, addRequestStatusManagement(executeSaveCardLock, 'game.saveCardLock'));
}
