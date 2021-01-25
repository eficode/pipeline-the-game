import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, GameState } from '../slice';
import selectBestRTDBInstance from '../../loadBalancer/apis/selectBestRTDBInstance';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { CardEntity, CardTypes, Game } from '@pipeline/common';
import loadGame from '../apis/callLoadGame';
import loadCardsForDeck from '../apis/callLoadCardsForDeck';

function* executeLoadGame(action: ReturnType<typeof actions.loadGame>) {
  const game: Game = yield call(loadGame, action.payload);
  const cards: CardEntity[] = yield call(loadCardsForDeck, game.deckId);
  yield put(actions.saveCards(cards));
  // TODO load actual game state from firestore

  if (game.rtdbInstance) {
    yield put(actions.saveGame(game));
  } else {
    const bestRTDBInstance = yield call(selectBestRTDBInstance, action.payload);
    yield put(actions.saveGame({ ...game, rtdbInstance: bestRTDBInstance }));
  }

  const gameState: GameState = {
    boardCards: [],
    deckCards: cards.filter(c => c.type === CardTypes.PipelineStep).map(c => c.id),
    cardsState: {},
    maxZIndex: -1000,
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

export default function* loadGameSaga() {
  yield takeEvery(actions.loadGame, addRequestStatusManagement(executeLoadGame, 'game.loadGame'));
}
