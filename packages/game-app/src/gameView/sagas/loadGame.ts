import { call, put, takeEvery } from 'redux-saga/effects';
import { actions, GameState } from '../slice';
import selectBestRTDBInstance from '../../userGameStatus/apis/selectBestRTDBInstance';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { CardEntity, CardTypes } from '@pipeline/common';
import loadGame from '../apis/callLoadGame';
import loadCardsForDeck from '../apis/callLoadCardsForDeck';
import { Game } from '@pipeline/models';
import { initializeRTDB } from '../apis/initializeRTDBInstance';

/*
function firebaseGameChannel(gameId: string) {
  return eventChannel(emit => {
    const subscription = firebase.app(gameId).database()
      .ref(`${FirebaseCollection.Cards}/${gameId}`).on('value', snapshot => {
        emit(snapshot.val())
      })
    return () => firebase.app(gameId).database()
      .ref(`${FirebaseCollection.Cards}/${gameId}`).off("value", subscription)
  })
}
*/

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
  initializeRTDB(game.rtdbInstance!, gameId);

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
}

export function* loadGameSaga() {
  yield takeEvery(actions.loadGame, addRequestStatusManagement(executeLoadGame, 'game.loadGame'));
}
