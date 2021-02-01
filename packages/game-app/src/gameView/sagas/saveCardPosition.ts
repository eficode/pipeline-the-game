import { call, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import saveCardState from '../apis/saveCardState';

function* executeSaveCardPosition(action: ReturnType<typeof actions.updateCardPosition>) {
  const currentGameId = yield select(selectors.getGameId);
  yield call(saveCardState, currentGameId, action.payload);
}

export default function* saveCardPositionSaga() {
  yield takeEvery(
    actions.updateCardPosition,
    addRequestStatusManagement(executeSaveCardPosition, 'game.saveCardPosition'),
  );
}
