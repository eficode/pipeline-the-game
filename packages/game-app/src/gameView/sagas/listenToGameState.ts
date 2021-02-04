import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { CardEntity, CardState, CardTypes } from '@pipeline/common';

import { actions, GameState, selectors } from '../slice';
import listenToGameChanges from '../apis/listenToGameChanges';
import callLoadInitialCardsState from '../apis/callLoadInitialCardsState';

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

function* listenToCardState(action: ReturnType<typeof actions.startListenToGameState>) {
  const cardsState: { [cardId: string]: CardState } = yield call(callLoadInitialCardsState, action.payload);
  const cards: CardEntity[] = yield select(selectors.getAllCards);

  const deckCardsIds = cards
    .filter(c => {
      return c.type === CardTypes.PipelineStep && (!(c.id in cardsState) || cardsState[c.id].parent === 'panel');
    })
    .map(c => c.id);

  const boardCardsIds = cards
    .filter(c => {
      return c.type === CardTypes.PipelineStep && cardsState[c.id]?.parent === 'board';
    })
    .map(c => c.id);

  const maxZIndex = boardCardsIds.reduce((acc, val) => {
    acc = acc === undefined || cardsState[val]?.zIndex > acc ? cardsState[val]?.zIndex : acc;
    return acc;
  }, -1000);

  const gameState: GameState = {
    boardCards: boardCardsIds,
    deckCards: deckCardsIds,
    cardsState: cardsState as any,
    nextZIndex: maxZIndex + 1,
    review: false,
  };
  yield put(
    actions.setInitialGameState({
      state: gameState,
      gameId: action.payload,
    }),
  );
  const channel = yield call(firebaseGameChannel, action.payload);

  yield takeEvery(channel, function* (value: any) {
    const { state, cardId } = value;
    yield put(actions.setCardState({ cardState: state, cardId }));
  });

  yield take(actions.stopListenOnGame);
  channel.close();
}

export default function* listenToCardStateSaga() {
  yield takeEvery(actions.startListenToGameState, listenToCardState);
}
