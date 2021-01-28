import { all } from 'redux-saga/effects';
import loadCards from './loadCards';
import { loadGameSaga } from './loadGame';

export default function* gameSaga() {
  yield all([loadCards(), loadGameSaga()]);
}
