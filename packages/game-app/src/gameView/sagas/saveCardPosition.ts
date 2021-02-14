import { call, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import saveCardState from '../apis/saveCardState';
import { CardState } from '@pipeline/common';

function* executeSaveCardPosition(action: ReturnType<typeof actions.updateCardPosition>) {
  const currentGameId: string = yield select(selectors.getGameId);
  const cardState: CardState = yield select(selectors.getCardAdditionalInfo(action.payload.cardId));
  // for performance test measurement
  if (window.logFacilitatorEvent) {
    window.logFacilitatorEvent(action.payload.cardId, cardState);
  }
  yield call(saveCardState, currentGameId, { ...action.payload, zIndex: cardState.zIndex });
}

export default function* saveCardPositionSaga() {
  yield takeEvery(
    actions.updateCardPosition,
    addRequestStatusManagement(executeSaveCardPosition, 'game.saveCardPosition'),
  );
}
