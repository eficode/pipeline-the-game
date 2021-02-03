import { all } from 'redux-saga/effects';
import loadCards from './loadCards';
import saveCardPosition from './saveCardPosition';
import saveEstimation from './saveEstimation';
import saveCardLock from './saveCardLock';
import saveReview from './saveReview';
import listenToCardStateSaga from './listenToGameState';
import { loadGameSaga } from './loadGame';

export default function* gameSaga() {
  yield all([
    loadCards(),
    loadGameSaga(),
    saveCardPosition(),
    saveEstimation(),
    saveCardLock(),
    saveReview(),
    listenToCardStateSaga(),
  ]);
}
