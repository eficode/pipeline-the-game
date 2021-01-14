import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import callCreateGame from '../apis/callCreateGame';
import { actions as gameActions } from '../../gameView/slice';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';

function* executeCreateGame(action: ReturnType<typeof actions.createGame>) {
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const newGameId: string = yield call(callCreateGame, action.payload, user.id);
  yield put(gameActions.setSelectedGameId(newGameId));
}

export default function* createGameSaga() {
  yield takeEvery(actions.createGame, addRequestStatusManagement(executeCreateGame, 'createGame'));
}
