import { call, put, spawn, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { Game } from '@pipeline/models';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { CardEntity, CardState, CardTypes } from '@pipeline/common';

import { actions, GameState } from '../slice';
import selectBestRTDBInstance from '../../userGameStatus/apis/selectBestRTDBInstance';
import loadGame from '../apis/callLoadGame';
import loadCardsForDeck from '../apis/callLoadCardsForDeck';
import { initializeRTDB } from '../apis/initializeRTDBInstance';
import listenToGameChanges from '../apis/listenToGameChanges';

function firebaseGameChannel(gameId: string) {
  return eventChannel<{ state: CardState; cardId: string }>(emit => {
    return listenToGameChanges(gameId, data => emit(data));
  });
}

/** TODO
 * child_added is fired for each card available at startup,
 * should we consider to get a snap from game and then start listen with a query on timestamp
 * (this will require to add a timestamp in the cardState)
 *
 * Add zIndex inside the cardSTate in the database and update
 * or use the lastDrag Timestamp to determine the zindex dynamically
 * (pay attention to rerender of each card on update if all zindex ar changed at once)
 *
 * handle errors
 *
 *
 */

function* listenToCardState(gameId: string) {
  const channel = yield call(firebaseGameChannel, gameId);

  yield takeEvery(channel, function* (value: any) {
    const { state, cardId } = value;
    yield put(actions.setCardState({ cardState: state, cardId }));
  });

  yield take(actions.stopListenOnGame);
  channel.close();
}

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

  const gameState: GameState = {
    boardCards: [],
    deckCards: cards.filter(c => c.type === CardTypes.PipelineStep).map(c => c.id),
    cardsState: {},
    maxZIndex: -1000,
    review: false,
  };
  yield put(
    actions.setInitialGameState({
      state: gameState,
      gameId: action.payload,
      scenario: {
        title: game.scenarioTitle,
        content: game.scenarioContent,
      },
    }),
  );

  yield spawn(listenToCardState, gameId);
}

export function* loadGameSaga() {
  yield takeEvery(actions.loadGame, addRequestStatusManagement(executeLoadGame, 'game.loadGame'));
}
