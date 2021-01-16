import { call, put, takeEvery } from 'redux-saga/effects';
import { actions, GameState } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { CardEntity, CardTypes, Game } from '@pipeline/common';
import loadGame from '../apis/callLoadGame';
import loadCardsForDeck from '../apis/callLoadCardsForDeck';

function* executeLoadGame(action: ReturnType<typeof actions.loadGame>) {
  const game: Game = yield call(loadGame, action.payload);

  const cards: CardEntity[] = yield call(loadCardsForDeck, game.deckId);
  yield put(actions.saveCards(cards));
  // TODO load actual game state from firestore
  const gameState: GameState = {
    boardCards: [],
    deckCards: cards.filter(c => c.type === CardTypes.PipelineStep).map(c => c.id),
    cardsState: {},
  };
  yield put(actions.setInitialGameState({ state: gameState, gameId: action.payload }));
}

export default function* loadGameSaga() {
  yield takeEvery(actions.loadGame, addRequestStatusManagement(executeLoadGame, 'game.loadGame'));
}
