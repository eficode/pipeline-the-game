import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import { CardEntity, CardState, CardType } from '@pipeline/common';

import { actions, GameState, selectors } from '../slice';
import listenToCardsChanges from '../apis/listenToCardsChanges';
import listenToGameChanges from '../apis/listenToGameChanges';
import callLoadInitialCardsState from '../apis/callLoadInitialCardsState';
import { DEFAULT_Z_INDEX } from '@pipeline/common';
import callLoadGameFromRTDB from '../apis/callLoadGameFromRTDB';
import { RTDBGame } from '@pipeline/models';

function firebaseCardsChannel(gameId: string) {
  return eventChannel<{ state: CardState; cardId: string }>(emit => {
    return listenToCardsChanges(gameId, data => emit(data));
  });
}

function firebaseGameChannel(gameId: string) {
  return eventChannel<RTDBGame>(emit => {
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

function* listenToCardState(action: ReturnType<typeof actions.startListenToGameState>) {
  const cardsState: { [cardId: string]: CardState } = yield call(callLoadInitialCardsState, action.payload);
  const rtdbGame: RTDBGame = yield call(callLoadGameFromRTDB, action.payload);
  const cards: CardEntity[] = yield select(selectors.getAllCards);

  const deckCardsIds = cards
    .filter(c => {
      return c.type === CardType.PipelineStep && (!(c.id in cardsState) || cardsState[c.id].parent === 'panel');
    })
    .map(c => c.id);

  const boardCardsIds = cards
    .filter(c => {
      return c.type === CardType.PipelineStep && cardsState[c.id]?.parent === 'board';
    })
    .map(c => c.id);

  const maxZIndex = boardCardsIds.reduce((acc, val) => {
    acc =
      acc === undefined || (cardsState[val]?.zIndex || DEFAULT_Z_INDEX) > acc
        ? cardsState[val]?.zIndex || DEFAULT_Z_INDEX
        : acc;
    return acc;
  }, DEFAULT_Z_INDEX);

  const gameState: GameState = {
    boardCards: boardCardsIds,
    deckCards: deckCardsIds,
    cardsState: cardsState as any,
    nextZIndex: maxZIndex + 1,
    review: rtdbGame.review,
  };
  yield put(
    actions.setInitialGameState({
      state: gameState,
      gameId: action.payload,
    }),
  );
  const cardsChannel: EventChannel<{ state: CardState; cardId: string }> = yield call(
    firebaseCardsChannel,
    action.payload,
  );

  yield takeEvery(cardsChannel, function* (value) {
    const { state, cardId } = value;
    yield put(actions.setCardState({ cardState: { ...state, parent: state.parent || 'panel' }, cardId }));
  });

  const gameChannel: EventChannel<RTDBGame> = yield call(firebaseGameChannel, action.payload);

  yield takeEvery(gameChannel, function* (value) {
    const { review } = value;
    yield put(actions.setReview(review));
  });

  yield take(actions.stopListenOnGame);
  cardsChannel.close();
  gameChannel.close();
}

export default function* listenToCardStateSaga() {
  yield takeEvery(actions.startListenToGameState, listenToCardState);
}
