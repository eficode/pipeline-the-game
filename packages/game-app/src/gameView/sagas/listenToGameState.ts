import { call, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { CardState } from '@pipeline/common';

import { actions } from '../slice';
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

function* listenToCardState(action: ReturnType<typeof actions.startListenToGameState>) {
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
