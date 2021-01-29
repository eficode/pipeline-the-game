import { call, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import saveCardEstimation from '../apis/saveCardEstimation';

function* executeSaveEstimationSaga(action: ReturnType<typeof actions.setEstimation>) {
  const currentGameId = yield select(selectors.getGameId);
  yield call(saveCardEstimation, currentGameId, action.payload);
}

export default function* saveEstimationSaga() {
  yield takeEvery(actions.setEstimation, addRequestStatusManagement(executeSaveEstimationSaga, 'game.saveEstimation'));
}
