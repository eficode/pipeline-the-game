import { all } from 'redux-saga/effects';
import loadCards from './loadCards';
import loadGame from './loadGame';

export default function* gameSaga() {
  yield all([loadCards(), loadGame()]);
}
