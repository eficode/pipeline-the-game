import { call, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import saveReview from '../apis/saveReview';

function* executeSaveEstimationSaga(action: ReturnType<typeof actions.setReview>) {
  const currentGameId = yield select(selectors.getGameId);
  yield call(saveReview, currentGameId, action.payload);
}

export default function* saveEstimationSaga() {
  yield takeEvery(actions.setReview, addRequestStatusManagement(executeSaveEstimationSaga, 'game.saveReview'));
}
