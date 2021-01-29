import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import callCreateGame, { DEFAULT_DECK_ID } from '../apis/callCreateGame';
import { actions as gameActions } from '../../gameView/slice';
import { AuthUser, selectors as authSelectors } from '@pipeline/auth';
import { DEFAULT_BOARD_DIMENSIONS } from '@pipeline/common';

function* executeCreateGame(action: ReturnType<typeof actions.createGame>) {
  const user: AuthUser = yield select(authSelectors.getCurrentUser);
  const newGameId: string = yield call(callCreateGame, action.payload, user.id);
  yield put(
    gameActions.saveGame({
      id: newGameId,
      scenarioTitle: action.payload.scenarioTitle,
      scenarioContent: action.payload.scenarioContent,
      scenarioCardId: action.payload.scenarioCardId || null,
      deckId: DEFAULT_DECK_ID,
      facilitator: {
        id: user.id,
      },
      rtdbInstance: null,
      cards: null,
      review: true,
      boardDimensions: DEFAULT_BOARD_DIMENSIONS,
      createdAt: action.payload.createdAt!,
    }),
  );
}

export default function* createGameSaga() {
  yield takeEvery(actions.createGame, addRequestStatusManagement(executeCreateGame, 'createGame'));
}
