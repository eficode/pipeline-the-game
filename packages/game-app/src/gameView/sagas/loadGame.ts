import { call, put, take, takeEvery } from 'redux-saga/effects';

import { Game } from '@pipeline/models';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { CardEntity } from '@pipeline/common';

import { actions } from '../slice';
import selectBestRTDBInstance from '../../userGameStatus/apis/selectBestRTDBInstance';
import loadGame from '../apis/callLoadGame';
import loadCardsForDeck from '../apis/callLoadCardsForDeck';
import { initializeRTDB } from '../apis/initializeRTDBInstance';

function* executeLoadGame(action: ReturnType<typeof actions.loadGame>) {
  const gameId = action.payload;
  const game: Game = yield call(loadGame, gameId);
  const cards: CardEntity[] = yield call(loadCardsForDeck, game.deckId);
  yield put(actions.saveCards(cards));
  // TODO load actual game state from firestore

  if (!game.rtdbInstance) {
    game.rtdbInstance = yield call(selectBestRTDBInstance, gameId);
  }

  //keep initialization before game saving
  yield call(initializeRTDB, game.rtdbInstance!, gameId);

  yield put(actions.saveGame({ ...game, id: action.payload }));

  yield take(actions.setInitialGameState);
}

export function* loadGameSaga() {
  yield takeEvery(actions.loadGame, addRequestStatusManagement(executeLoadGame, 'game.loadGame'));
}
