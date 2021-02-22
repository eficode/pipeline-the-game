import { call, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import saveCardUnlock from '../apis/saveCardUnlock';

function* executeSaveCardUnlock(action: ReturnType<typeof actions.lockCard>) {
  const currentGameId = yield select(selectors.getGameId);
  yield call(saveCardUnlock, currentGameId, action.payload.cardId);
}

export default function* saveCardLockSaga() {
  yield takeEvery(actions.unlockCard, addRequestStatusManagement(executeSaveCardUnlock, 'game.saveUnlockCard'));
}
