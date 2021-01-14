import { call, put, takeEvery } from 'redux-saga/effects';
import { actions } from '../slice';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { CardEntity } from '@pipeline/common';
import loadCards from '../apis/callLoadCards';

function* executeLoadCards() {
  const cards: CardEntity[] = yield call(loadCards);
  yield put(actions.saveCards(cards));
}

export default function* loadCardsSaga() {
  yield takeEvery(actions.loadCards, addRequestStatusManagement(executeLoadCards, 'game.loadCards'));
}
